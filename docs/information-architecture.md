# Information architecture: DevFest Indore 2026

Current implementation, 30 October 2026. This structure has not been validated with attendee interviews or tree testing.

## Audience and navigation

Visitors need to understand the event, find a pass, prepare for arrival and explore the community. Get tickets stays prominent in the header; Themes links to the homepage topic selector. Explore groups destinations by task. Agenda sits first, with its Schedule, Workshops, Speakers and Exhibits views, which also appear as a tab row on every agenda page. Nested pages (the agenda views and past-edition pages) show a breadcrumb above the title, with `BreadcrumbList` structured data:

- **Plan your visit:** Tickets, Agenda, Venue & directions, FAQ (including the registration guidelines) and Get an ambassador code.
- **Discover:** Themes, Exhibits, Workshops, Partners & collaborators and Meet the team.

The disclosure uses descriptive labels and decorative icons, closes on navigation, outside click, Escape or focus leaving the header, and scrolls within the viewport when necessary. Anchor destinations are shown only when their homepage sections are visible.

The footer groups Attend, Get involved and Explore more, followed by a community row with social and GDG chapter links. The organizer email and code of conduct are available in the footer.

## Routes and responsibilities

| URL | Purpose |
|---|---|
| `/` | Event introduction, themes, ticket passes, community photos, current partners, exhibit invitation, venue and ecosystem logos |
| `/agenda` | Schedule: confirmed workshops, sessions, keynote and exhibits as ruled rows with format chips, grouped by track; times and rooms appear when published |
| `/agenda/workshops` | The day's workshops (breadcrumb Home › Agenda › Workshops) |
| `/agenda/speakers` | Grid of confirmed speakers, each linking to their agenda row |
| `/agenda/exhibits` | Confirmed exhibits and the invitation to exhibit |
| `/tickets` | Open passes, KonfHub booking and closed passes below it |
| `/tickets/[former-pass-id]` | Permanent redirect to Tickets, preserving query values |
| `/guidelines` | Permanent redirect to `/faq`; section anchors such as `#eligibility` carry over |
| `/venue` | Venue details, directions, map and check-in |
| `/partners` | Current collaborators (Space Club of India, Qualcomm, Indore Institute of Science and Technology), the Space Club of India note and partnership opportunities |
| `/space-club` | Permanent redirect to `/partners#space-club` |
| `/ambassadors` | Searchable ambassador contact directory; only profiles with a usable LinkedIn URL are displayed |
| `/invite/[slug]` | Retired invitation URLs redirect to `/ambassadors`, preserving query values |
| `/workshops` | Permanent redirect to `/agenda/workshops` |
| `/events` | Permanent redirect to `/archive#workshops` |
| `/archive` | Past editions as image cards, plus Pre-DevFest campus workshops, community events, photographs and press (anchors `#editions`, `#workshops`, `#community-events`, `#photos`, `#press`) |
| `/archive/<event-id>` | One past edition: summary, reported figures, speakers with their talks, photographs, press and partner communities |
| `/past-events`, `/past-speakers`, `/past-sponsors`, `/gallery`, `/talks`, `/people/[id]`, `/organizations/[id]` | Permanent redirects to `/archive`, `/team` or `/partners`; known DevFest years under `/past-events/<year>` go directly to their edition |
| `/team` | Organizer directory |
| `/faq` | Event and ticket questions, then the full registration guidelines (eligibility, check-in, workshops, ticket policy, conduct) |

## Content ownership

Public records live in `content/*.json`, with typed views in `src/content/`. People and organizations have stable IDs; participations connect people to exact events and roles. Historical affiliation and source information retain their event context. `content/README.md` documents editing, schemas and validation.

The ambassador directory references people by ID and stores their community and selected LinkedIn contact. Its hidden entries remain records; they do not render until a usable LinkedIn URL is supplied. Former invitation records are retired. Previously saved referral coupons can still be passed to the direct KonfHub fallback.

Sessionize owns talk proposals. KonfHub owns availability, eligibility enforcement and payment. Event facts, checkout settings, pass details and policies belong in `event.json`. Archived sources are reference material and are not imported by the application.

The archive groups editions, photographs and press into separate sections; photo and press previews expand with native disclosures. The ambassador directory is shared by students and professionals. Progress rails appear only on pages with at least four section stops.
