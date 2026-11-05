# Website content

Edit the JSON files in this folder. The site reads them directly; run `npm run dev` to preview and `npm run content:validate` to check them (it also runs before every dev server and build). Public JSON is reviewed through the pull request, so nothing here needs a separate approval step. Everything in `content/` ships to browsers: never put private contact details, contracts or unannounced speakers in it.

| File | What you manage |
| --- | --- |
| `event.json` | Current event facts, venue, links, tickets and policies; past and community events |
| `people.json` | Every person: photo, bio, links, and their roles (speaker, team, ambassador) per event |
| `programme.json` | Talks and campus workshops, referring to people by ID |
| `organizations.json` | Organizations, logos and what each contributed to which event |
| `gallery.json` | Photos and captions, and newspaper clippings (`press`) |
| `pages.json` | Page copy, themes, FAQs, partner reveal switch |

Each file has a `$schema`, so editors that understand JSON Schema suggest fields and flag mistakes. Typed views in `src/content/` turn these records into what pages render; edit the JSON, not the views.

Zod schemas in `src/content/schema/current/` describe these six files. `npm run content:validate` checks their shapes and cross-file rules. The editor JSON Schemas are generated: after changing a Zod schema, run `npm run content:schemas`; `npm run content:schemas:check` checks that they are current. Do not edit generated schemas by hand.

## Rules

- IDs are stable. Change a name or logo on its existing record and every page updates. Person ids are kebab-case names, e.g. `kartikey-rawat`.
- Publish only confirmed information. Historical appearances and logos never imply current participation.
- Each person is defined once in `people.json`. Talks, workshops and the ambassador list refer to them by ID.
- One event has `status: "current"` (`devfest-2026`); all others are `past`. Dates are ISO timestamps with an offset.

## Add a person and their photo

1. Add a record to `people.json`. A person holds who they are (name, `title`, `organization`, `bio`, `photo`, `links`) and, under `events`, one entry per event with their roles there:

```json
{
  "id": "kartikey-rawat",
  "name": "Kartikey Rawat",
  "kind": "person",
  "title": "Senior Engineer",
  "organization": "Qualcomm",
  "bio": "One or two sentences.",
  "links": { "linkedin": "https://www.linkedin.com/in/…" },
  "events": [
    { "eventId": "devfest-2026", "roles": [{ "kind": "speaker", "order": 2 }] }
  ]
}
```

Role fields depend on `kind` (the schema rejects anything else):

| `kind` | Needs | Notes |
| --- | --- | --- |
| `speaker` | nothing | `title` overrides the label, e.g. `"Keynote speaker"`. Add `sourceUrl` on the event entry for past editions. |
| `core-team`, `volunteer` | `responsibilities` | A list of `{ "area": "Design & Creative", "level": "co-lead" }`. `level` is optional (`lead`, `co-lead`, `coordinator`, `team-member`, `volunteer`). Shown on `/team`. |
| `ambassador` | `track`, `community` | `track` is `professional` or `student`. Shown on `/ambassadors` once the person has a public LinkedIn URL. |

`order` is optional on any role and means one thing: position among roles of the same kind at that event, lowest first. Roles without one follow, in file order. Event entries have no id and no global order; the record id is derived as `<eventId>/<person-id>`. Keep `bio` plain text with a blank line between paragraphs and put profile URLs under `links`.

2. Save the photo as `photos-inbox/<person-id>.jpg` (or `.png`, `.heic`) and run:

```sh
npm run photos
```

It crops the photo square, shrinks it to a small webp at `public/images/people/<person-id>.webp`, sets the person's `photo` field, and moves the original to `photos-inbox/done/` (git-ignored). Files whose name matches no person are reported and left alone, and it lists anyone with a 2026 role who still has no photo. `npm run photos -- --localize` re-encodes any photo that is still remote or outside `public/images/people/`.

People without a photo show their initials.

## Add a newspaper clipping

Save the image as `public/images/press/<event>-<publication>-<short-headline>.jpg` (e.g. `ccd-2025-khulasa-first-ai-in-everyday-work.jpg`), then add a record to `gallery.json` → `press` with an English summary of the headline as `title`, the `eventId` (an id from `event.json`), the `publication` and `date` when the clipping shows them, plus the image's `width` and `height`. The `/archive` page lists them under “In the news”.

## Record a past edition

Past editions are records in `event.json` with `status: "past"`. Record only what you can source; every field after the first five is optional.

- `id`, `name`, `date`, `venue.name`, `summary` and `source` (the official GDG event page) are required. `officialSpeakerIds` can be empty.
- `series` groups editions of one event: `devfest` or `ccd` (Cloud Community Days). Both series are listed on `/archive`.
- `theme` only when the organizers stated one.
- `stats` holds figures from the organizers' event report: `registrations`, `rsvps`, `attendees`, `speakers`, `sessions`, `sponsors`, `professionals`, `students`. Leave out any figure that was not recorded. Set `approximate: true` when the report rounds ("600+"). Validation rejects attendees above registrations and professionals plus students that differ from attendees.
- `recordingUrl` is the full public recording.
- Sponsorship decks hold prices, tiers and private contact details. Never copy those here; take only event figures and facts.

Tag every photo and clipping with the event it belongs to: `eventId` in `gallery.json` (optional on a photo whose event is unknown, required on a clipping). Validation fails on an id that does not exist, so add the event record first.

## Add a talk

Add an entry to `programme.json` with `type: "talk"`, a stable `id`, `eventId`, `speakerIds` and `publication: "confirmed"` (use `"archived"` for past editions). Every speaker needs a `speaker` role for that exact event in `people.json`. A confirmed speaker can exist before their talk title does; `/agenda` shows them with “Session to be announced”. Agenda page copy lives under `agenda` in `pages.json`. Sessionize owns proposals.

Campus workshops use the same list with `type: "campus-workshop"`, `campus`, a verified `date`, an exact GDG event URL and `photoIds`. Add each photo once to `gallery.json` (local `/images/workshops/*.webp`, dimensions, source URL), then reference its id.

## Add or update a partner

Find the organization in `organizations.json` first and reuse its ID. Add one `contributions` entry with a unique `id`, `eventId`, `type` (`sponsor` only for agreed sponsorships; otherwise `collaborator`, `community` or `media`), `title`, `status` and optional `order`. Confirmed, visible contributions for the current event become partner cards; `visible: false` holds one back. `pages.json` → `partners.revealed` switches the whole announcement. Logos live in `public/images/partners/`. For undated history use `scope: "historical"` with `status: "archived"`; for ongoing community support use `scope: "ecosystem"`. Never infer financial sponsorship.

## Tickets and event facts

Passes live in `event.json` → current event → `tickets.passes`.

- `visible` shows a pass card; `soldOut: true` moves it to the closed section below the KonfHub widget with no Register button.
- Keep listing every benefit on every pass. The tickets page works out which benefits all open passes share and shows them once under `pages.json` → `tickets.includedTitle`; each card then lists only what it adds.
- `bookingRoute: "ambassador"` (Cadet) sends the card to `/ambassadors` instead of the widget. `offers` is an array of short discount lines shown under the price. `eligibility` is an array of short lines shown as a list on the pass card. Use paired `**` markers for bold ID terms in supported eligibility, policy, FAQ and ambassador-step text.
- `price` is in INR; leave it out while unconfirmed.
- Stable pass ids: `liftoff`, `student` (Cadet), `professional` (Commander), `vip`, `last-orbit`, `observer`. Rename display names freely, never the ids.
- KonfHub owns live inventory, pricing and payment, so keep `soldOut` and visibility in step with it by hand. `tickets.booking.enabled` turns the widget and direct link on or off.
- Policies have stable ids; `final-sale`, `entry-identification` and `workshop-access` feed the FAQs, and the registration guidelines on `/faq` (`pages.guidelines.sections`) must place every policy exactly once.
- `node scripts/export-registration-guidelines.mjs` prints the guidelines text for pasting into KonfHub.

FAQs are in `pages.json` → `faq.questions` (`kind` is `event` or `tickets`). Answers can use `{{date}}`, `{{venue}}`, `{{address}}`, `{{registrationTime}}`, `{{entryPolicy}}`, `{{workshopPolicy}}`, `{{finalSalePolicy}}`, `{{studentPrice}}`, `{{professionalPrice}}` and `{{groupOffer}}` so facts stay in sync.

The exhibit invitation copy is `pages.json` → `home.exhibits`; its form URL is `event.json` → `links.exhibitApplication`. Do not add unconfirmed exhibitors or booth benefits. Form, community and code-of-conduct links all live under `links`.

## Ambassadors

`/ambassadors` is the Cadet booking route: one shared, searchable directory for students and professionals. Ambassadors are people with an `ambassador` role at the current event (see above). Each card shows the person's LinkedIn and, when they have a personal one, Instagram (the GDG Indore account never appears on a card); people without a usable LinkedIn URL stay hidden. Ambassadors are the people given ambassador codes for the current event; remove anyone who no longer holds one. Do not put phone numbers or other private contact details in these files.

## Check and publish

```sh
npm run content:validate   # shapes, references, assets, links, FAQ tokens
npm run dev
```

Review the change on a Vercel preview before merging (see `docs/releasing.md`).
