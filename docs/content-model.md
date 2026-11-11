# Historical content model proposal

This is a historical proposal, not the live model or a migration plan. The current architecture keeps six canonical files in `content/*.json`; their Zod schemas live in `src/content/schema/current/` and generate the editor schemas. See [the content guide](../content/README.md) for the current model. The earlier event-folder prototype was retired after the current-file schemas were implemented.

## Principles

1. **schema.org vocabulary.** A field uses the schema.org property name when one exists (`startDate`, `location`, `performer`, `jobTitle`, `sameAs`, `contentUrl`, `headline`). Source files stay plain JSON: no `@context` or `@type`, and nested schema.org objects are flattened to IDs or strings. The site generates JSON-LD from these records. A field with no schema.org match keeps a short plain name (`track`, `order`, `featured`).
2. **One home per fact.** A record is written once. A relationship lives on the record that points outward, as an ID. People and organizations never list their events. Events never list their speakers.
3. **The folder is the event.** Everything that happened at one event lives in `content/events/<event-id>/`. Records there carry no `eventId`, because the folder already says it.
4. **Shared things are shared.** People, organizations, photographs and press clippings exist across years, so they live at the top level. A shared record ties itself to an event with `about: "<event-id>"`.
5. **Zod is the single definition.** The schemas in `src/content/schema/` produce the TypeScript types, the build-time validation and, through `z.toJSONSchema()`, the JSON Schemas in `content/schemas/` that editors use for autocomplete. Nobody edits the JSON Schemas by hand.
6. **Facts are not repeated as flags.** "Current" is `site.json → currentEvent`. "Archived" means the event is in the past. Only confirmed information goes into these files, so there is no `publication` field.

## Layout

```
content/
  site.json                     Organization + WebSite: GDG Indore, links, currentEvent, feature switches
  people.json                   Person[]
  organizations.json            Organization[]
  photos.json                   ImageObject[]   (about → event or sub-event id)
  press.json                    NewsArticle[]   (about → event id)
  copy/                         page text only, one file per page: home.json, tickets.json, faq.json, …
  events/
    devfest-2026/
      event.json                Event
      sessions.json             Event[]  talks, keynotes, panels
      workshops.json            Event[]  campus workshops before the main day
      team.json                 organizers and volunteers
      ambassadors.json          campus and professional ambassadors
      partners.json             organizations and what they contributed
      tickets.json              Offer[] + policies + booking
      faq.json                  Question[]
      themes.json               programme themes
    devfest-2025/
      event.json
      sessions.json
      partners.json
    ccd-2025/
      event.json
      sessions.json
    ai-unplugged-2025/
      event.json
    …
  schemas/                      generated from Zod; do not edit
```

An event folder holds only the files it needs. A past event can be a single `event.json`. Starting next year means copying the current folder and clearing what does not carry over.

Assets follow the same split under `public/images/`:

```
public/images/
  people/<person-id>.webp
  organizations/<organization-id>.(svg|webp|png)
  photos/<event-id>/<name>.webp
  press/<event-id>-<publication>-<headline>.jpg
  events/<event-id>/…          venue photo, event artwork
```

## People: JSON, not SQLite

`people.json` stays a single JSON file.

- Next.js imports it at build time with no database driver, and Vercel builds need nothing extra.
- Changes show up as readable diffs in pull requests. A SQLite file is binary, so a reviewer cannot see what changed.
- The `$schema` line gives autocomplete and inline errors in VS Code. SQLite has no equivalent without extra tooling.
- About 70 records loads instantly. SQLite becomes worth considering at thousands of records or when non-developers need a table editor, and moving to it then is mechanical.

## Records

### `site.json`

```json
{
  "$schema": "./schemas/site.schema.json",
  "name": "Google Developer Group Indore",
  "url": "https://devfest.indore.community",
  "email": "gdgindore@gmail.com",
  "logo": "/images/organizations/gdg-indore.svg",
  "sameAs": [
    "https://gdg.community.dev/gdg-indore/",
    "https://www.linkedin.com/company/gdg-indore/",
    "https://www.instagram.com/gdgindore/",
    "https://youtube.com/@GDGIndore",
    "https://github.com/GDG-Indore",
    "https://x.com/GDG_Indore"
  ],
  "codeOfConduct": "https://developers.google.com/community-guidelines",
  "currentEvent": "devfest-2026",
  "ecosystem": ["google-for-developers", "…"],
  "historicalSponsors": ["…"],
  "features": {
    "partnersRevealed": true,
    "ambassadorContact": false
  }
}
```

`historicalSponsors` holds the 25 sponsors from the old logo sheet, whose year is unknown. Each logo is cut out into its own file in `public/images/organizations/`, which removes `archiveLogoSheet` and `archiveLogoWindow`.

### `people.json` (Person)

```json
{
  "id": "kartikey-rawat",
  "name": "Kartikey Rawat",
  "jobTitle": "Senior Engineer",
  "worksFor": "Qualcomm",
  "description": "One or two sentences.",
  "image": "/images/people/kartikey-rawat.webp",
  "hasCredential": ["Google Developer Expert"],
  "sameAs": ["https://www.linkedin.com/in/…", "https://github.com/…"]
}
```

- `sameAs` is a list of profile URLs. The site recognises LinkedIn, X, GitHub, Instagram and so on from the domain, so there is no fixed set of link keys.
- `hasCredential` holds recognitions of the person, such as "Google Developer Expert", which used to be repeated on each talk as `spotlightBadge`. Editorial labels stay on the talk as the performer's `badge`.
- `worksFor` is a plain name. Most employers are not partners and do not need an organization record.
- There is no `kind: "group"`. `gdg-technical-team` becomes an organization, and sessions can name an organization as performer.

### `organizations.json` (Organization)

```json
{
  "id": "qualcomm",
  "name": "Qualcomm",
  "description": "…",
  "logo": "/images/organizations/qualcomm.png",
  "logoShape": "wide",
  "url": "https://www.qualcomm.com/",
  "sameAs": ["https://www.linkedin.com/company/qualcomm/"]
}
```

### `events/<id>/event.json` (Event)

```json
{
  "$schema": "../../schemas/event.schema.json",
  "id": "devfest-2026",
  "name": "DevFest Indore 2026",
  "series": "devfest",
  "startDate": "2026-11-28T09:00:00+05:30",
  "endDate": "2026-11-28T18:00:00+05:30",
  "timezone": "Asia/Kolkata",
  "eventStatus": "scheduled",
  "eventAttendanceMode": "offline",
  "tagline": "A day for developers, by developers",
  "description": "Applied AI, cloud, modern systems and physical AI",
  "location": {
    "name": "Essentia Luxury Hotel Indore",
    "address": {
      "streetAddress": "Near World Cup Square, Pipliyahana, Ring Road",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452016",
      "addressCountry": "IN"
    },
    "geo": { "latitude": 22.71013, "longitude": 75.9039 },
    "hasMap": "https://maps.google.com/?q=…",
    "image": "/images/events/devfest-2026/venue.jpg"
  },
  "url": "https://gdg.community.dev/events/details/…",
  "links": {
    "callForProposals": "https://sessionize.com/devfest-indore-2026/",
    "partnerApplication": "https://forms.gle/…",
    "exhibitApplication": "https://forms.gle/…"
  }
}
```

- `id` must equal the folder name; validation checks this.
- `series` is `devfest` or `community` and replaces `type`. An online session such as Cloud Bytes is `community` with `eventAttendanceMode: "online"`.
- `eventStatus` uses schema.org's values (`scheduled`, `cancelled`, `postponed`, `rescheduled`). Past or current comes from the date and `site.json`.
- Past events fill in only what is known, for example `name`, `startDate`, `location.name`, `description`, `url`.

### `sessions.json` and `workshops.json` (Event, as sub-events)

```json
{
  "id": "devfest-2026-kartikey-rawat",
  "name": "Building AI at the Edge: …",
  "format": "talk",
  "description": "…",
  "performer": [
    { "person": "kartikey-rawat", "jobTitle": "Senior Engineer, Developer Relations", "badge": "Engineering Leader" }
  ],
  "track": "Edge AI",
  "keywords": ["GenAI"],
  "educationalLevel": "intermediate",
  "startDate": "2026-11-28T11:00:00+05:30",
  "location": "Hall A"
}
```

- `performer` entries name either a `person` or an `organization`. `jobTitle` and `worksFor` on a performer are optional, used only when the title shown for that talk differs from the person record. `badge` is an optional editorial label for that talk, such as "Engineering Leader", "Founder & Executive" or "Featured Speaker".
- A session without `name` appears on the agenda as "Session to be announced", so a confirmed speaker can be listed before their title is known.
- Speakers are whoever performs in `sessions.json`. There is no separate speaker role and no `officialSpeakerIds`.
- `format` is `talk`, `keynote`, `panel` or `workshop`. `keywords` replaces `category`.

Campus workshops use the same shape with a campus `location` and their GDG event `url`:

```json
{
  "id": "campus-acropolis-2026",
  "name": "AI & Google Cloud",
  "format": "workshop",
  "startDate": "2026-09-21",
  "location": { "name": "Acropolis Institute of Technology and Research (AITR)" },
  "performer": [{ "person": "soham-sharma" }],
  "url": "https://gdg.community.dev/events/details/…"
}
```

Sub-event IDs are unique across all events, so a photo can point at one with `about`. Old `legacyId` links (`ws-1` …) move to `redirects()` in `next.config.ts`.

### `team.json`

```json
{
  "person": "tushar-pal",
  "group": "core-team",
  "order": 1,
  "responsibilities": [
    { "area": "Event", "level": "lead" },
    { "area": "Community & Outreach", "level": "lead" }
  ]
}
```

`group` is `core-team` or `volunteers`. `order` sorts within the group; entries without one follow in file order.

### `ambassadors.json`

```json
{ "person": "karan-mittal", "track": "professional", "community": "…" }
```

### `partners.json`

```json
{
  "organization": "qualcomm",
  "roleName": "Physical AI partner",
  "type": "collaborator",
  "featured": "technology",
  "announced": true,
  "order": 2
}
```

- `type` is `sponsor`, `collaborator`, `community` or `media`. Use `sponsor` only for an agreed sponsorship.
- An organization appears once per event with one `type`. No current partner contributes in two ways; if one ever does, `type` can become a list.
- `announced: false` holds back a confirmed partner. `site.json → features.partnersRevealed` switches the whole section.

### `tickets.json` (Offer)

```json
{
  "booking": {
    "enabled": true,
    "url": "https://konfhub.com/gdg-devfest-indore-2026",
    "widgetUrl": "https://konfhub.com/widget/id/…"
  },
  "offers": [
    {
      "id": "student",
      "name": "Cadet Pass",
      "price": 849,
      "priceCurrency": "INR",
      "availability": "in-stock",
      "inventoryLevel": 200,
      "eligibleCustomerType": "Students only",
      "eligibility": ["Currently enrolled students only", "…"],
      "description": "Full-day access for college and university students.",
      "bookingRoute": "ambassador",
      "listed": true,
      "benefits": [{ "group": "access", "label": "Workshop access", "detail": "First come, first served" }],
      "note": "…"
    }
  ],
  "benefitGroups": [{ "id": "access", "label": "Event access" }],
  "policies": [{ "id": "final-sale", "title": "All sales are final", "text": "…" }],
  "guidelines": [{ "id": "before-booking", "title": "Before you book", "policies": ["accurate-details"] }],
  "registrationChecklist": [{ "title": "Add your LinkedIn URL", "text": "…" }],
  "registrationDeclaration": "…"
}
```

- `availability` is `in-stock`, `sold-out` or `pre-order`. It replaces `soldOut`.
- `listed: false` hides a pass card; it replaces `visible`.
- Button and heading text from `tickets.registration` moves to `copy/tickets.json`.

### `faq.json` and `themes.json`

```json
{ "id": "what-is-devfest", "question": "What is GDG DevFest Indore 2026?", "answer": "…", "topic": "event" }
```

Themes keep their current shape. Both are per event, because the questions and themes change each year.

### `photos.json` (ImageObject)

```json
{
  "id": "devfest-2025-community",
  "name": "Together at DevFest Indore",
  "caption": "The DevFest Indore community on stage at the 2025 edition.",
  "contentUrl": "/images/photos/devfest-2025/community.webp",
  "width": 1400,
  "height": 933,
  "about": "devfest-2025",
  "keywords": ["community"],
  "featured": true,
  "isBasedOn": "https://…"
}
```

- `about` points at an event or a sub-event such as `campus-acropolis-2026`. That replaces the workshop's `photoIds` list.
- `keywords` replaces `category`. `featured` replaces `showInGallery`.

### `press.json` (NewsArticle)

```json
{
  "id": "devfest-2025-naidunia-ai-and-cultural-intelligence",
  "headline": "Not just AI: human and cultural understanding matter too",
  "publisher": "Nai Dunia",
  "datePublished": "2025-12-21",
  "inLanguage": "hi",
  "about": "devfest-2025",
  "image": {
    "contentUrl": "/images/press/devfest-2025-naidunia-ai-and-cultural-intelligence.jpg",
    "width": 1080,
    "height": 1041
  }
}
```

`about` replaces the free-text `event: "DevFest Indore 2025"`. The file wraps the list as `{ "articles": [...] }`.

### `copy/*.json`

Page text only: headings, leads, button and accessibility labels. No switches, no lists of records. One file per page keeps each small. Text that names the year reads it from the current event rather than hard-coding it.

## What validation still checks in code

Zod covers shapes, enums and the speaker/team/ambassador variants. A short cross-reference pass in `superRefine` checks:

- every `person`, `organization` and `about` ID exists;
- each event folder name equals its `id`, and `site.json → currentEvent` names a folder;
- IDs are unique within their collection, and sub-event IDs are unique across events;
- an organization appears at most once in an event's `partners.json`, and only one partner per `featured` slot;
- every ticket policy appears in exactly one guideline section, and the required policies exist;
- asset paths exist under `public/`, and FAQ template tokens are known.

Everything else in today's `validateContent` exists to reconcile duplicated fields and goes away with them.

## Migration order

1. ✅ Add Zod and write the schemas in `src/content/schema/`, with `scripts/content-schemas.mjs` to write `content/schemas/`. Its output replaces the old hand-written schemas as each collection moves, so it is not wired into npm scripts yet.
2. Move people and organizations (shared records), then split roles into each event's `team.json` and `ambassadors.json`.
3. Create the event folders, and move sessions, workshops, partners, tickets, FAQs and themes into them.
4. Move photos and press into the top-level files, and reorganise `public/images/`.
5. Split `pages.json` into `site.json → features` and `copy/`.
6. Replace `src/content/*` views and `scripts/lib/*` adapters with loaders that read the new files, and update pages to the new field names.
7. Rewrite `content/README.md` for editors, then run `npm run check` and `npm run build`.

Each step ends with the site building and `npm run check` passing.
