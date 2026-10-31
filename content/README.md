# Website content

Edit the JSON files in this folder. The site reads them directly; run `npm run dev` to preview and `npm run content:validate` to check them (it also runs before every dev server and build). Public JSON is reviewed through the pull request, so nothing here needs a separate approval step. Everything in `content/` ships to browsers: never put private contact details, contracts or unannounced speakers in it.

| File | What you manage |
| --- | --- |
| `event.json` | Current event facts, venue, links, tickets and policies; past and community events |
| `people.json` | Every person: photo, bio, links, event roles, team and ambassador details |
| `programme.json` | Talks and campus workshops, referring to people by ID |
| `organizations.json` | Organizations, logos and what each contributed to which event |
| `gallery.json` | Photos and captions, and newspaper clippings (`press`) |
| `pages.json` | Page copy, themes, FAQs, partner reveal switch |

Each file has a `$schema`, so editors that understand JSON Schema suggest fields and flag mistakes. Typed views in `src/content/` turn these records into what pages render; edit the JSON, not the views.

## Rules

- IDs are stable. Change a name or logo on its existing record and every page updates. Person ids are kebab-case names, e.g. `kartikey-rawat`.
- Publish only confirmed information. Historical appearances and logos never imply current participation.
- Each person is defined once in `people.json`. Talks, workshops and the ambassador list refer to them by ID.
- One event has `status: "current"` (`devfest-2026`); all others are `past`. Dates are ISO timestamps with an offset.

## Add a person and their photo

1. Add a record to `people.json`:

```json
{
  "id": "kartikey-rawat",
  "name": "Kartikey Rawat",
  "kind": "person",
  "bio": "One or two sentences.",
  "profession": { "title": "Senior Engineer", "organization": "Qualcomm" },
  "links": { "linkedin": "https://www.linkedin.com/in/…" },
  "events": [
    {
      "id": "2026-kartikey-rawat",
      "eventId": "devfest-2026",
      "roles": [{ "kind": "speaker", "title": "Speaker", "order": 1 }],
      "displayOrder": 34
    }
  ]
}
```

Role kinds are `core-team`, `volunteer`, `ambassador` and `speaker`; `order` sorts within the event and `displayOrder` keeps the overall ordering. Team members also have `teamAssignments` (category and responsibilities) for their card on `/team`. Ambassadors have an `ambassador` block (`track`, `community`, `contactPlatforms`, `order`) and a public LinkedIn URL.

2. Save the photo as `photos-inbox/<person-id>.jpg` (or `.png`, `.heic`) and run:

```sh
npm run photos
```

It crops the photo square, shrinks it to a small webp at `public/images/people/<person-id>.webp`, sets the person's `photo` field, and moves the original to `photos-inbox/done/` (git-ignored). Files whose name matches no person are reported and left alone, and it lists anyone with a 2026 role who still has no photo. `npm run photos -- --localize` re-encodes any photo that is still remote or outside `public/images/people/`.

People without a photo show their initials.

## Add a newspaper clipping

Save the image as `public/images/press/<event>-<publication>-<short-headline>.jpg` (e.g. `ccd-2025-khulasa-first-ai-in-everyday-work.jpg`), then add a record to `gallery.json` → `press` with an English summary of the headline as `title`, the `event`, the `publication` and `date` when the clipping shows them, plus the image's `width` and `height`. The `/archive` page lists them under “In the news”.

## Add a talk

Add an entry to `programme.json` with `type: "talk"`, a stable `id`, `eventId`, `speakerIds` and `publication: "confirmed"` (use `"archived"` for past editions). Every speaker needs a `speaker` role for that exact event in `people.json`. A confirmed speaker can exist before their talk title does; `/agenda` shows them with “Session to be announced”. Agenda page copy lives under `agenda` in `pages.json`. Sessionize owns proposals.

Campus workshops use the same list with `type: "campus-workshop"`, `campus`, a verified `date`, an exact GDG event URL and `photoIds`. Add each photo once to `gallery.json` (local `/images/workshops/*.webp`, dimensions, source URL), then reference its id.

## Add or update a partner

Find the organization in `organizations.json` first and reuse its ID. Add one `contributions` entry with a unique `id`, `eventId`, `type` (`sponsor` only for agreed sponsorships; otherwise `collaborator`, `community` or `media`), `title`, `status` and optional `order`. Confirmed, visible contributions for the current event become partner cards; `visible: false` holds one back. `pages.json` → `partners.revealed` switches the whole announcement. Logos live in `public/images/partners/`. For undated history use `scope: "historical"` with `status: "archived"`; for ongoing community support use `scope: "ecosystem"`. Never infer financial sponsorship.

## Tickets and event facts

Passes live in `event.json` → current event → `tickets.passes`.

- `visible` shows a pass card; `soldOut: true` moves it to the closed section below the KonfHub widget with no Register button.
- `bookingRoute: "ambassador"` (Cadet) sends the card to `/ambassadors` instead of the widget. `offer` is a short discount line under the price (Commander: 6–10 tickets, 15% off, applied at KonfHub checkout).
- `price` is in INR; leave it out while unconfirmed.
- Stable pass ids: `liftoff`, `student` (Cadet), `professional` (Commander), `vip`, `last-orbit`, `observer`. Rename display names freely, never the ids.
- KonfHub owns live inventory, pricing and payment, so keep `soldOut` and visibility in step with it by hand. `tickets.booking.enabled` turns the widget and direct link on or off.
- Policies have stable ids; `final-sale`, `entry-identification` and `workshop-access` feed the FAQs, and the registration guidelines on `/faq` (`pages.guidelines.sections`) must place every policy exactly once.
- `node scripts/export-registration-guidelines.mjs` prints the guidelines text for pasting into KonfHub.

FAQs are in `pages.json` → `faq.questions` (`kind` is `event` or `tickets`). Answers can use `{{date}}`, `{{venue}}`, `{{address}}`, `{{registrationTime}}`, `{{entryPolicy}}`, `{{workshopPolicy}}`, `{{finalSalePolicy}}`, `{{studentPrice}}`, `{{professionalPrice}}` and `{{groupOffer}}` so facts stay in sync.

The exhibit invitation copy is `pages.json` → `home.exhibits`; its form URL is `event.json` → `links.exhibitApplication`. Do not add unconfirmed exhibitors or booth benefits. Form, community and code-of-conduct links all live under `links`.

## Ambassadors

`/ambassadors` is the Cadet booking route: one shared, searchable directory, grouped by `track` (`professional` or `student`) in the order of `pages.json` → `ambassadors.groups`. Each person's card shows only a public LinkedIn link; people without a usable LinkedIn URL stay hidden. Do not put phone numbers or other private contact details in these files.

## Check and publish

```sh
npm run content:validate   # shapes, references, assets, links, FAQ tokens
npm run dev
```

Review the change on a Vercel preview before merging (see `docs/releasing.md`).
