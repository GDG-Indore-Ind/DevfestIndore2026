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
| `pages.json` | Homepage/gallery copy, partner reveal switch, practical-page introductions and guideline policy references |

Every file contains a `$schema` reference. Editors that support JSON Schema can show field suggestions and highlight mistakes. The schemas live in `schemas/`; ordinary content edits do not require changing them.

## The rules that keep data consistent

- Keep IDs stable. Change a name or logo on its existing record; references update throughout the site.
- A person’s name, default photo, bio and links belong in `people.json`. Team memberships, speaker appearances and sessions reference that ID.
- A session can retain an edition-specific role, company or `profile` override. This preserves historical context when someone changes jobs or photos.
- An organization’s name and logo belong in `partners.json`. Its `partnerships` describe each contribution: collaborator, sponsor, community or media. Financial support is not inferred from a logo or collaboration.
- The past event partner lists are derived from those partnerships. Do not maintain a second partner list in `events.json`.
- `events.json` → `officialSpeakerIds` records the names explicitly supported by that event’s official source. The organizer’s accepted-session archive can contain more speakers.
- Store dates as ISO timestamps with an explicit offset. Ticket opening labels, release windows and event date labels are derived automatically.
- In `tickets.json`, set a pass's `visible` field to `false` to hide its website card. Visible future passes stay listed without release timings. Register links scroll to the widget, where KonfHub controls availability; `closesAt` removes expired website cards automatically. Set the matching ticket's availability in KonfHub as well, since the embedded checkout controls its own inventory.
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
- Community organizations need a verified public destination in `websiteUrl` or `socialUrl`; use the official chapter page or platform when available. Homepage and archive community logos link to that destination, preferring `websiteUrl` and falling back to `socialUrl`.
- Ecosystem organizations use `editionId: "ecosystem"`, `publication: "ecosystem"` and a community URL. Do not infer a current sponsorship from an ecosystem listing.
- `logoShape` supports `square`, `wide` (2:1) or `wide-large` (2.5:1) for community logo display windows.

Put original image assets under `public/images/partners/` and use a path such as `/images/partners/qualcomm.png`. Existing historical sponsors use `archiveLogoWindow` to display their logo from the supplied organizer sheet; that sheet remains the provenance for those historical listings. Historical communities use original `logoUrl` assets from official event records, with dates derived from their archived relationships. Home previews six past sponsors in archive order and keeps historical community logos separate from current edition announcements. See `docs/historical-logos-and-cleanup-2026-10-23.md` for artwork sources.

## Add or update a campus workshop

`workshops.json` owns public campus records. Reuse speaker IDs from `people.json`; use the official campus name, a verified `date` in `YYYY-MM-DD` format and an exact GDG `/events/details/…` URL. Chapter/profile links are rejected. Omit an unknown date, topic or link rather than inferring one. The page derives speaker names, date labels and chronological order.

Each `photos` entry needs a local `/images/workshops/*.webp` asset, accurate campus caption, pixel dimensions and original source URL. Match the source filename and photograph to its campus before publishing. Do not reuse a DevFest photograph or another campus's image. Validation rejects missing assets and photograph reuse across campuses. An empty photo list displays a neutral placeholder.

Only completed or confirmed public sessions belong here. Unconfirmed proposals remain outside public JSON. The October 23 reconciliation retains the 13 campus workshops listed in GDG Indore's public past-events archive, with 13 event links and 10 matching photos. IIT Indore and Vaishnav are held outside public JSON because they are not listed in that archive. See `docs/workshop-reconciliation-2026-10-23.md` for the evidence and held records. Directory labels and introductions belong in `pages.json` under `workshops` and `pastSpeakers`.

Homepage ecosystem and historical logos use compact marquees with pause controls, keyboard/hover pause and a static scrolling row for reduced motion. Logos and relationships still derive from `partners.json`; no second list is maintained.

## Update tickets or event facts

Edit ticket details in `tickets.json`. Keep the full approved pass descriptions, eligibility, inclusions and registration policies visible on the website even if some information is hidden on KonfHub. Each pass can have an optional `price` in INR once approved; omit it while unknown. Zero is treated as a real zero price. `registration` supplies the short KonfHub handoff and LinkedIn reminder beside Register. `bookingSteps` retains the earlier procedural copy as reference; it is no longer rendered on public pages. Adding a price does not enable checkout. Existing pass IDs are stable content identifiers; edit their display names and content without renaming the IDs. Keep eligibility and final-sale policies explicit. Allocation values remain internal content and are not displayed as live remaining counts.

`event.json` owns `booking.enabled`, `booking.widgetUrl` and `links.booking`. Register now moves to the full-width embedded booking section on `/tickets`. The organizer-supplied widget URL is restricted to KonfHub's generated widget path; its title and supporting copy belong in `tickets.json` → `registration`. One iframe is rendered per page with payment permission and responsive height. KonfHub controls ticket availability, pricing, eligibility enforcement and payment; the website does not claim that an upcoming pass can already be purchased. The direct KonfHub link remains available if embedding fails or visitors prefer a separate window. It carries saved referral coupons; the widget URL is preserved exactly because automatic coupon handling there has not been verified. Set `booking.enabled` to `false` to withdraw both booking options.

Tickets use one page at `/tickets`, with current pass details inline. Former `/tickets/...` URLs redirect there and are excluded from the sitemap. Stable pass IDs still identify content and pass-scoped policies. `tickets.json` → `registration` owns the red Register button’s label, LinkedIn reminder and supporting copy. Pass notes are optional; use them for additional pass-specific conditions rather than repeating the general final-sale rule. The public event page may be visible before its ticket sales open.

The call-for-partners form (`links.partnerApplication`), official community destinations and the code-of-conduct link live under `event.json` → `links`. The shared footer uses these values directly; update them here instead of adding separate URLs to page components.

Ticket policies have stable `id` values. Optional `appliesTo` pass IDs limit pass-specific rules (such as Cadet ID checks or Flight Deck codes) to relevant releases; general rules apply to everyone. Keep `final-sale`, `entry-identification` and `workshop-access` IDs stable because ticket FAQs derive their answers from those records. The first registration-checklist entry supplies the visible KonfHub/LinkedIn reminder.

The full `/guidelines` page reads these same policies. `pages.json` → `guidelines.sections` arranges them by stable `policyIds`; validation requires every policy to appear exactly once and rejects missing or unknown references. Keep the six section IDs stable for shared links. Page copy belongs in `pages.json`; policy wording remains in `tickets.json`. `/partners` reuses confirmed organization records, and `/venue` reuses event facts, the photo, map coordinates and entry policy. Do not add tentative facilities, partner benefits or transport arrangements as page copy.

`pages.json` → `partners.revealed` controls the partner announcement. When `false`: the homepage shows the reveal-soon invitation, while the Partners page focuses on contribution options and the application. Neither renders the featured partner identities. Set it to `true` when ready to restore the existing confirmed cards, horizontal controls and smaller supporter grid. Reveal copy and the full-page introduction/metadata switch together. Community ecosystem records stay visible on the homepage; the additional name wall is explicitly historical and includes edition years. The Partners page does not repeat that community wall.

`pages.json` → `home` owns the Programme heading/tagline, the organizer-confirmed 2014 history origin and community/gallery introduction. The homepage timeline shows each year from that origin through the current edition, reflecting the organizer-confirmed annual DevFest and community gatherings. `historyOriginLabel` and `historyCurrentLabel` label its endpoints. Available edition records still begin in 2022 and link to their archive pages; earlier year markers do not create separate event records. `gallery.json` orders the homepage photo carousel and the gallery, including the campus photos from confirmed Pre-DevFest workshops. Use accurate event captions, optional original `source` links and actual pixel `width`/`height`. Optimized local assets live in `public/images/archive/` and `public/images/workshops/`. See `docs/photo-selection-2026-10-22.md` for the supplied community album sources and selection.

Run `node scripts/export-registration-guidelines.mjs` to generate `docs/konfhub-guidelines-ready-to-paste.md` from the approved JSON. Use it to replace outdated KonfHub guidance after reviewing the full copy; the export does not publish online or alter existing purchases.

FAQs in `faqs.json` use an explicit `kind` (`event` or `tickets`) and optional internal `link` (`href` and `label`). They can use `{{date}}`, `{{venue}}`, `{{address}}` and `{{registrationTime}}` so event facts stay synchronized. `{{entryPolicy}}`, `{{workshopPolicy}}` and `{{finalSalePolicy}}` resolve to the canonical ticket policies. Keep answers brief and link to Tickets, Guidelines or Venue for detail; do not reproduce a pass catalogue. `pages.json` also owns the Tickets and FAQ introductions and the homepage hero copy.

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

Confirmed partnerships support `visible: false` to hold individual cards back from the public showcase. Space Club of India is revealed; Qualcomm remains hidden. The overall partner reveal switch is enabled. Tickets use compact inclusion cards with eligibility and conditions in disclosures, plus one shared reminder and policy block above checkout. Last Orbit and Observer remain hidden via their existing pass visibility flags.

`pages.json` → `partners.carousel` owns the featured partner carousel labels. One revealed card stays static; multiple revealed cards enable manual navigation and optional playback. The slideshow starts paused and honors reduced motion.

The homepage exhibit invitation lives in `pages.json` → `home.exhibits`; its form URL is `event.json` → `links.exhibitApplication`. Keep it as an expression-of-interest invitation, and do not add unconfirmed exhibitors or booth benefits. Theme selector labels and the swipe hint also live under `pages.json` → `home`.
