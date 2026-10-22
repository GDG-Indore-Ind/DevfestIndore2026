# Website content — the single source of truth

Edit the JSON files in this folder to manage DevFest content. The site reads these files directly; saving a valid JSON change updates the local preview. Git history records changes and the normal deployment publishes them.

| File | What you manage |
| --- | --- |
| `event.json` | Event date, timezone, venue, contact, official links and the booking switch |
| `people.json` | One public profile per person: name, photo, bio, role, company and social links |
| `speakers.json` | Who is speaking at which edition, linked to a person ID |
| `sessions.json` | Session titles, speaker IDs, edition, descriptions, tracks and optional schedule details |
| `partners.json` | One organization per record, with logos and its edition-specific contributions |
| `team.json` | Organizer roles, teams and display order, linked to person IDs |
| `events.json` | Past editions and community events, with official sources |
| `workshops.json` | Campus sessions, institutions, speaker IDs and supplied links |
| `gallery.json` | Verified photos and accurate captions |
| `tickets.json` | Pass descriptions, eligibility, inclusions, release times, booking steps and policies |
| `themes.json` | Homepage themes, topic copy, icon names and diagrams’ labels |
| `faqs.json` | Event questions and answers |
| `ambassadors.json` | Public invitation profiles and referral codes |

Every file contains a `$schema` reference. Editors that support JSON Schema can show field suggestions and highlight mistakes. The schemas live in `schemas/`; ordinary content edits do not require changing them.

## The rules that keep data consistent

- Keep IDs stable. Change a name or logo on its existing record; references update throughout the site.
- A person’s name, default photo, bio and links belong in `people.json`. Team memberships, speaker appearances and sessions reference that ID.
- A session can retain an edition-specific role, company or `profile` override. This preserves historical context when someone changes jobs or photos.
- An organization’s name and logo belong in `partners.json`. Its `partnerships` describe each contribution: collaborator, sponsor, community or media. Financial support is not inferred from a logo or collaboration.
- The past event partner lists are derived from those partnerships. Do not maintain a second partner list in `events.json`.
- `events.json` → `officialSpeakerIds` records the names explicitly supported by that event’s official source. The organizer’s accepted-session archive can contain more speakers.
- Store dates as ISO timestamps with an explicit offset. Ticket opening labels, release windows and event date labels are derived automatically.
- Add approved public information only. These files can be included in browser assets. Keep private contact details, applications, contracts, tentative speakers and unannounced negotiations outside the website repository’s public content.

## Add a speaker

1. Find the person in `people.json`. Reuse their ID if they already exist; otherwise add one public profile with a stable ID, name and `kind: "person"`.
2. Once participation is confirmed, add a record to `speakers.json` with a unique `id`, the `personId`, `editionId: "2026"` and `publication: "confirmed"`.
3. When the talk is approved, add it to `sessions.json`, using the same person ID as `speakerId` and the same `editionId`. Supply the title and public session information. Add `time` and `hall` only when scheduled.
4. Run validation and preview the affected pages.

The current 2026 speaker list is deliberately empty. No tentative keynote has been promoted to a confirmed speaker by this migration. Historical appearances use `publication: "archived"`.

## Add or update a partner

Find the organization in `partners.json` first. Reuse its ID if it supported an earlier edition.

- Set its `name`, `logoUrl`, public `websiteUrl` and optional description or topic information.
- Add one relationship under `partnerships`: unique ID, `editionId: "2026"`, contribution `kind`, human-readable `role`, `publication: "confirmed"` and numeric `order`.
- Smaller `order` values appear first. Keep one relationship per organization per edition; its role can describe several contributions.
- Space Club of India uses `featured: "space"`; Qualcomm uses `featured: "technology"`. Leave `featured` absent for further partners so they appear in the row below.
- Use `kind: "sponsor"` for an agreed sponsorship, `"collaborator"` for technology/knowledge/space contributions, or `"community"` / `"media"` for those relationships.
- Ecosystem organizations use `editionId: "ecosystem"`, `publication: "ecosystem"` and a verified `socialUrl`. Their community logos link to that social page.
- `logoShape` supports `square`, `wide` (2:1) or `wide-large` (2.5:1) for community logo display windows.

Put original image assets under `public/images/partners/` and use a path such as `/images/partners/qualcomm.png`. Existing historical sponsors use `archiveLogoWindow` to display their logo from the supplied organizer sheet; that sheet remains the provenance for those historical listings.

## Update tickets or event facts

Edit ticket details in `tickets.json`. Each pass can have an optional `price` in INR once approved; omit it while unknown. Zero is treated as a real zero price. `bookingSteps` supplies the public explanation of the KonfHub handoff. Adding a price does not enable checkout. Existing pass IDs are reserved URL identifiers; edit their display names and content without renaming the IDs. Keep eligibility and final-sale policies explicit. Allocation values remain internal content and are not displayed as live remaining counts.

`event.json` owns `booking.enabled` and `links.booking`. Enable booking only after final prices, eligibility restrictions, private-code access and the actual KonfHub setup have been verified. Release dates alone do not enable checkout. Referral URLs use this same booking destination.

The call-for-partners form (`links.partnerApplication`), official community destinations and the code-of-conduct link live under `event.json` → `links`. The shared footer uses these values directly; update them here instead of adding separate URLs to page components.

Ticket policies have stable `id` values. Optional `appliesTo` pass IDs limit pass-specific rules (such as Cadet ID checks or Flight Deck codes) to relevant releases; general rules apply to everyone. Keep `final-sale`, `entry-identification` and `workshop-access` IDs stable because ticket FAQs derive their answers from those records. The first registration-checklist entry supplies the visible KonfHub/LinkedIn reminder.

Run `node scripts/export-registration-guidelines.mjs` to generate `docs/konfhub-guidelines-ready-to-paste.md` from the approved JSON. Use it to replace outdated KonfHub guidance after reviewing the full copy; the export does not publish online or alter existing purchases.

Event FAQs can use `{{date}}`, `{{venue}}`, `{{address}}` and `{{registrationTime}}` so those facts stay synchronized. Ticket FAQs are derived from ticket records.

## Check and publish

```sh
npm run content:validate
npm run dev
```

Validation also runs automatically before `npm run dev` and `npm run build`. It checks record shapes, duplicate IDs, references, publication states, required logos, local image paths, links, release ranges and FAQ tokens. Errors identify the file or record to fix.

Use the normal Git review and deployment workflow after previewing the changes. No spreadsheet export, database, paid CMS or content-generation step is required.

## Files you should not edit as content

`src/content/` contains the typed selectors, relationships and display formatting used directly by the pages. Edit the JSON records here to change content. There is no second data directory or compatibility layer.

Original `.xlsx` files are retained under `docs/source-archive/spreadsheets/` as reference material. The application has no spreadsheet reader dependency or import workflow. Retired speculative examples and contradictory old sponsor tiers are preserved in `docs/source-archive/legacy-planning-data.json`; the site never imports that file. Planning briefs in `docs/` are provenance and context; the JSON records here own the current website values.
