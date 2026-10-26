# Website content — the single source of truth

Edit the JSON files in this folder to manage DevFest content. The site reads these files directly; saving a valid JSON change updates the local preview. Git history records changes and the normal deployment publishes them.

| File | What you manage |
| --- | --- |
| `event.json` | Event date, timezone, venue, contact, official links and the booking switch |
| `people.json` | One public profile per person: name, photo, bio, role, company and social links |
| `participations.json` | Exact event memberships with one or more roles per person |
| `sessions.json` | Session titles, speaker IDs, edition, descriptions, tracks and optional schedule details |
| `partners.json` | One organization per record, with logos and its edition-specific contributions |
| `team.json` | Existing organizer memberships and organizer-confirmed current team assignments |
| `events.json` | Past editions and community events, with official sources |
| `workshops.json` | Campus sessions, institutions, speaker IDs and supplied links |
| `gallery.json` | Verified photos and accurate captions |
| `tickets.json` | Pass inclusions, eligibility, prices, sold-out labels and policies |
| `themes.json` | Homepage themes, topic copy, icon names and diagrams’ labels |
| `faqs.json` | Event questions and answers |
| `ambassadors.json` | Ambassador directory memberships and public contact selection |
| `directory.json` | New directory copy and the production launch switch |
| `approvals.json` | Existing public revision baselines and explicit organizer approval receipts |
| `pages.json` | Homepage/gallery copy, partner reveal switch, practical-page introductions and guideline policy references |

Every file contains a `$schema` reference. Editors that support JSON Schema can show field suggestions and highlight mistakes. The schemas live in `schemas/`; ordinary content edits do not require changing them.

## The rules that keep data consistent

- Keep IDs stable. Change a name or logo on its existing record; references update throughout the site.
- A person’s name, default photo, bio and links belong in `people.json`. Event participations and sessions reference that ID.
- A session can retain an edition-specific role, company or `profile` override. This preserves historical context when someone changes jobs or photos.
- An organization’s name and logo belong in `partners.json`. Its `partnerships` describe each contribution: collaborator, sponsor, community or media. Financial support is not inferred from a logo or collaboration.
- The past event partner lists are derived from those partnerships. Do not maintain a second partner list in `events.json`.
- `events.json` → `officialSpeakerIds` records the names explicitly supported by that event’s official source. The organizer’s accepted-session archive can contain more speakers.
- Store event dates as ISO timestamps with an explicit offset. Event date labels are derived automatically. Ticket release dates are managed on KonfHub.
- In `tickets.json`, `visible` controls the pass card. Set `soldOut: true` when confirmed on KonfHub to replace its Register action with a sold-out label. There is no local release schedule or automatic expiry. Register links scroll to the widget; KonfHub controls inventory and payment. Keep website labels in sync with KonfHub manually.
- Add approved public information only. These files can be included in browser assets. Keep private contact details, applications, contracts, tentative speakers and unannounced negotiations outside the website repository’s public content.

## Profile review and event participation

The new DevFest Team, Talks and organization directories are implemented behind `directory.json` → `enabled: false`. Individually approved profiles (and talks whose speakers have all been approved) can be linked from the existing listings before the directory-wide launch. Existing published team/speaker/partner pages remain in place until the profile review and launch are complete. Local review is available with `CONTENT_DIRECTORY_PREVIEW=1 npm run dev`; this override works only in development and cannot enable a production build.

Run `npm run content:review` to create review packets under `docs/profile-review/`. These files are never imported by the application and the export never creates approvals. Start with Karan Mittal, as requested by the organizer. Capture fresh verification separately in `docs/profile-review/evidence/` so regeneration preserves it.

Each person and organization must be approved explicitly by the organizer. `approvals.json` contains fingerprints of the existing public baseline; these are **not approvals**. Changes to a baseline record, new profiles, or changes after approval require a matching approval receipt for that exact revision. Receipts include a date and the actual user confirmation reference. Do not change baseline hashes to bypass review or infer approval from permission to implement code.

`emailRedactions` records the organizer-authorized removal of unused person-email fields against the original baseline and the resulting revision. A redaction receipt does not approve a general profile or authorize directory launch; any further profile change still requires approval. Person email fields are not part of the current public model.

`participations.json` has one record per person and exact event, with roles from `core-team`, `volunteer`, `ambassador`, `speaker`. Each role has an event-specific title and order. Existing dated speaker records have been migrated losslessly; event-specific organizer years and categories are not inferred from the old undated team list. After a role is explicitly approved, add it to the correct event participation, remove the corresponding undated legacy team membership and record the approved revision.

An organizer or volunteer role can include an ordered `responsibilities` list. Each item has an `area` and a `level` (`lead`, `co-lead`, `coordinator`, `team-member`, or `volunteer`). This lets one person head several areas and multiple people share an area, independently of their team category. Use the same area name for everyone sharing it. Unconfirmed assignments stay in the review notes.

The organizer-confirmed `team.json` → `assignments` records show current edition responsibilities and Core Team or Volunteer grouping on the compact team cards. These explicit assignment confirmations do not approve or change the rest of a person's profile. Keep existing profile facts as-is until reviewed. Unlisted existing team members retain their existing listing; don't infer additional current responsibilities.

To add a talk, use stable IDs in `sessions.json`, reference an actual event and provide `speakerIds`. Every speaker needs a matching speaker participation for that exact event. Optional `speakerProfiles` retain different historical role/company/photo contexts for co-speakers; a session-level legacy profile applies to its first speaker only. Optional resource links hold approved slides or recordings. Campus workshops remain separate. A confirmed speaker can have no published talk yet.

The schema and validator protect unique person-event memberships, role categories, co-speaker references, multiple organization contributions and approved revisions. Current versus historical views derive from exact event references. A calendar year alone cannot turn a community event into a DevFest appearance.

## Add or update a partner

Find the organization in `partners.json` first. Reuse its ID if it supported an earlier edition.

- Set its `name`, `logoUrl`, public `websiteUrl` and optional description or topic information.
- Add one relationship under `partnerships`: unique ID, `editionId: "2026"`, a `contributions` list of `{kind, role}`, `publication: "confirmed"` and numeric `order`.
- Smaller `order` values appear first. Keep one relationship per organization per edition; its contributions list can describe several explicitly approved contributions.
- Space Club of India uses `featured: "space"`; Qualcomm uses `featured: "technology"`. Leave `featured` absent for further partners so they appear in the row below.
- Within `contributions`, use `kind: "sponsor"` for an agreed sponsorship, `"collaborator"` for technology/knowledge/space contributions, or `"community"` / `"media"` for those relationships.
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

Pass `benefits` are short records with a `label`, a `group` ID and optional `detail` (for example, workshop seating conditions). `benefitGroups` owns their headings and display order. Add more benefits to the appropriate pass without changing the layout; validation checks group references and duplicate labels. Use **DevFest Goodies** for the event swag. LiftOff includes Sessions, Workshop access (first come, first served), Lunch & refreshments, DevFest Goodies, and Community, Expert and Exhibit Lounge access, as confirmed by the organizer on 26 October 2026. Cadet and Commander share these seven inclusions. Flight Deck includes the same access and goodies, plus priority access and lunch with delegates; refreshments remain included. These pass differences were confirmed by the organizer on 26 October 2026. Last Orbit and Observer retain their separate inclusions.

Edit ticket details in `tickets.json`. Keep the full approved pass descriptions, eligibility, inclusions and registration policies visible on the website even if some information is hidden on KonfHub. Each pass can have an optional `price` in INR once approved; omit it while unknown. Zero is treated as a real zero price. `registration` supplies the short KonfHub handoff and LinkedIn reminder beside Register. Adding a price does not enable checkout. Existing pass IDs are stable content identifiers; edit their display names and content without renaming the IDs. Keep eligibility and final-sale policies explicit. Allocation values remain internal content and are not displayed as live remaining counts.

`event.json` owns `booking.enabled`, `booking.widgetUrl` and `links.booking`. Register now moves to the full-width embedded booking section on `/tickets`. The organizer-supplied widget URL is restricted to KonfHub's generated widget path; its title and supporting copy belong in `tickets.json` → `registration`. One iframe is rendered per page with payment permission and responsive height. KonfHub controls ticket availability, pricing, eligibility enforcement and payment; the website does not claim that an upcoming pass can already be purchased. The direct KonfHub link remains available if embedding fails or visitors prefer a separate window. It carries saved referral coupons; the widget URL is preserved exactly because automatic coupon handling there has not been verified. Set `booking.enabled` to `false` to withdraw both booking options.

Tickets use one page at `/tickets`, with current pass details inline. Former `/tickets/...` URLs redirect there and are excluded from the sitemap. Stable pass IDs still identify content and pass-scoped policies. `tickets.json` → `registration` owns the red Register button’s label, LinkedIn reminder and supporting copy. Pass notes are optional; use them for additional pass-specific conditions rather than repeating the general final-sale rule. The public event page may be visible before its ticket sales open.

The call-for-partners form (`links.partnerApplication`), official community destinations and the code-of-conduct link live under `event.json` → `links`. The shared footer uses these values directly; update them here instead of adding separate URLs to page components.

Ticket policies have stable `id` values. Optional `appliesTo` pass IDs limit pass-specific rules (such as Cadet ID checks or Flight Deck invitations) to relevant passes; general rules apply to everyone. Keep `final-sale`, `entry-identification` and `workshop-access` IDs stable because ticket FAQs derive their answers from those records. The registration checklist appears as plain text under Before you book. Catering has no meal-selection step; do not add meal preference instructions.

The full `/guidelines` page reads these same policies. `pages.json` → `guidelines.sections` arranges them by stable `policyIds`; validation requires every policy to appear exactly once and rejects missing or unknown references. Keep the six section IDs stable for shared links. Page copy belongs in `pages.json`; policy wording remains in `tickets.json`. `/partners` reuses confirmed organization records, and `/venue` reuses event facts, the photo, map coordinates and entry policy. Do not add tentative facilities, partner benefits or transport arrangements as page copy.

`pages.json` → `partners.revealed` controls the partner announcement. When `false`: the homepage shows the reveal-soon invitation, while the Partners page focuses on contribution options and the application. Neither renders the featured partner identities. Set it to `true` when ready to restore the existing confirmed cards, horizontal controls and smaller supporter grid. Reveal copy and the full-page introduction/metadata switch together. Community ecosystem records stay visible on the homepage; the additional name wall is explicitly historical and includes edition years. The Partners page does not repeat that community wall.

`pages.json` → `home` owns the Themes heading/tagline, the organizer-confirmed 2014 history origin and community/gallery introduction. The homepage timeline shows each year from that origin through the current edition, reflecting the organizer-confirmed annual DevFest and community gatherings. `historyOriginLabel` and `historyCurrentLabel` label its endpoints. Available edition records still begin in 2022 and link to their archive pages; earlier year markers do not create separate event records. `gallery.json` orders the homepage photo carousel and the gallery, including the campus photos from confirmed Pre-DevFest workshops. Use accurate event captions, optional original `source` links and actual pixel `width`/`height`. Optimized local assets live in `public/images/archive/` and `public/images/workshops/`. See `docs/photo-selection-2026-10-22.md` for the supplied community album sources and selection.

Run `node scripts/export-registration-guidelines.mjs` to generate `docs/konfhub-guidelines-ready-to-paste.md` from the approved JSON. Use it to replace outdated KonfHub guidance after reviewing the full copy; the export does not publish online or alter existing purchases.

FAQs in `faqs.json` use an explicit `kind` (`event` or `tickets`) and optional internal `link` (`href` and `label`). They can use `{{date}}`, `{{venue}}`, `{{address}}` and `{{registrationTime}}` so event facts stay synchronized. `{{entryPolicy}}`, `{{workshopPolicy}}` and `{{finalSalePolicy}}` resolve to the canonical ticket policies. Keep answers brief and link to Tickets, Guidelines or Venue for detail; do not reproduce a pass catalogue. `pages.json` also owns the Tickets and FAQ introductions and the homepage hero copy.

## Check and publish

```sh
npm run content:validate
npm run dev
```

Validation also runs automatically before `npm run dev` and `npm run build`. It checks record shapes, duplicate IDs, references, publication states, required logos, local image paths, links and FAQ tokens. Errors identify the file or record to fix.

Use the normal Git review and deployment workflow after previewing the changes. No spreadsheet export, database, paid CMS or content-generation step is required.

## Files you should not edit as content

`src/content/` contains the typed selectors, relationships and display formatting used directly by the pages. Edit the JSON records here to change content. There is no second data directory or compatibility layer.

The workshop reference spreadsheet and retired workshop records remain under `docs/source-archive/` as reference material; the application does not import them. At the organizer's request, the two session spreadsheets and retired planning data containing contact information were removed from the tracked working tree after verified copies were kept in the ignored local archive. Existing Git history can still contain the former files. Planning briefs in `docs/` are provenance and context; the JSON records here own current website values.

Confirmed partnerships support `visible: false` to hold individual cards back from the public showcase. Space Club of India is revealed; Qualcomm remains hidden. The overall partner reveal switch is enabled. Tickets group inclusions under event access, food and goodies, and lounge access, with visible eligibility and disclosed conditions, plus one shared reminder and policy block above checkout. Last Orbit and Observer remain hidden via their existing pass visibility flags.

`pages.json` → `partners.carousel` owns the featured partner carousel labels. One revealed card stays static; multiple revealed cards enable manual navigation and optional playback. The slideshow starts paused and honors reduced motion.

The homepage exhibit invitation lives in `pages.json` → `home.exhibits`; its form URL is `event.json` → `links.exhibitApplication`. Keep it as an expression-of-interest invitation, and do not add unconfirmed exhibitors or booth benefits. Theme selector labels and its instruction also live under `pages.json` → `home`.

## Ambassador contact directory and phased ticket rollout

Only LiftOff Pass is visible, priced at ₹699. Its website Register action was restored at the organizer’s request on 27 October 2026; KonfHub still controls checkout inventory. Cadet, Commander and Flight Deck are held back with `visible: false`, alongside Last Orbit and Observer. Reveal later passes explicitly when their approved release is ready; the ambassador and standard rollout estimates are not public release dates. Website visibility does not change KonfHub inventory or the embedded widget. Keep KonfHub availability in sync separately.

`/ambassadors` is one shared directory for all ambassadors, separate from Tickets and accessible through the Explore menu. The Tickets page currently focuses on LiftOff; its ambassador link is held back by `pages.json` → `tickets.ambassadorContactEnabled: false`. Enable that flag only when the organizer approves the directory rollout. Standard tickets follow in a later update; there is no automatic phase transition. Its copy belongs in `pages.json` → `ambassadors`. `ambassadors.json` → `directory` references people by `personId`, with a campus/community label and `contactPlatforms`. Names and public LinkedIn URLs remain in `people.json`; the directory shows only LinkedIn and uses initials until photographs are available. Cards without a valid LinkedIn profile URL are hidden until one is added and enabled in `contactPlatforms`. Former invitation URLs redirect to the directory; their old records and codes are retired. Previously saved referral coupons still pass to the direct KonfHub fallback.

For ambassador records, supply each person's name, campus/community and public LinkedIn profile URL. Do not put private phone numbers or unpublished contact information in public JSON.

New-directory launch requires explicit approval receipts for profiles and migration of the undated legacy team. Ambassador-only approvals do not authorize general profile pages or launch the wider directory. Keep held-back partnership reveal flags intact. `directory.enabled` controls navigation, redirects and sitemap changes together. Never enable it just to preview; use the development-only review mode instead.

Karan Mittal’s concise profile was explicitly approved on 27 October 2026. His DevFest 2026 Core Team role is a dated participation. A subsequent organizer correction removed the earlier DevFest 2024/2025 speaker claims: those appearances were at CCD. The supplied poster and official GDG/KonfHub pages verify a CCD 2025 workshop on 12 July 2025. It is stored under `ccd-2025`, appears in community history and is explicitly labelled CCD in Talks. Event filters keep CCD and DevFest appearances distinct, even in the same year. CCD 2024 details remain to be supplied; no missing talk title or date is inferred. Email links are omitted from people-profile displays at the organizer’s request.
