# Information architecture: DevFest Indore 2026

Current local implementation, 27 October 2026. This structure has not been validated with attendee interviews or tree testing. Earlier dated implementation notes are retained in [the historical snapshot](history/information-architecture-through-2026-10-27.md).

## Audience and navigation

Visitors need to understand the event, find a pass, prepare for arrival and explore the community. Get tickets stays prominent in the header; Themes links to the homepage topic selector. Explore groups destinations by task:

- **Plan your visit:** Tickets, Venue & directions, Registration guidelines, Common questions and Contact your ambassador.
- **Discover:** Themes, Exhibits, Workshops & events, Partners & collaborators and Meet the team.
- **Past editions:** Past events, Past speakers, Past sponsors and Photo gallery.

The disclosure uses descriptive labels and decorative icons, closes on navigation, outside click, Escape or focus leaving the header, and scrolls within the viewport when necessary. Anchor destinations are shown only when their homepage sections are visible.

The footer groups Attend, Get involved and Explore more, followed by a community row with social and GDG chapter links. The organizer email and code of conduct are available in the footer. Archive pages link their related directories together.

## Routes and responsibilities

| URL | Purpose |
|---|---|
| `/` | Event introduction, themes, community history, current partners, exhibit invitation and venue, followed by community and past sponsor logos |
| `/tickets` | Visible pass details, policies and KonfHub booking |
| `/tickets/[former-pass-id]` | Permanent redirect to Tickets, preserving query values |
| `/guidelines` | Registration, eligibility, check-in, conduct and ticket policies |
| `/venue` | Venue details, directions, map and check-in |
| `/partners` | Current collaborators and partnership opportunities |
| `/ambassadors` | Searchable ambassador contact directory; only profiles with a usable LinkedIn URL are displayed |
| `/invite/[slug]` | Retired invitation URLs redirect to `/ambassadors`, preserving query values |
| `/events` | Campus workshops and community event records |
| `/workshops` | Permanent redirect to `/events#workshops` |
| `/past-events` and `/past-events/[year]` | Past-edition index and sourced edition details |
| `/past-speakers` | Historical speaker directory while the new directory is disabled |
| `/past-sponsors` | Historical sponsors and listed partners while the new directory is disabled |
| `/gallery` | Community and event photographs |
| `/team` | Organizer directory |
| `/faq` | Event and ticket questions |

The wider people, talks and organization directories remain behind `content/pages.json` → `directory.enabled`. Individually approved general profiles can be published before that launch; ambassador-only approvals do not authorize those pages. Local review mode is development-only. The sitemap reflects the production launch switch and approved general profiles.

## Content ownership

Public records live in `content/*.json`, with typed views in `src/content/`. People and organizations have stable IDs; participations connect people to exact events and roles. Historical affiliation and source information retain their event context. `content/README.md` documents editing, schemas and validation.

The ambassador directory references people by ID and stores their community and selected LinkedIn contact. Its hidden entries remain records; they do not render until a usable LinkedIn URL is supplied. Former invitation records are retired. Previously saved referral coupons can still be passed to the direct KonfHub fallback.

Sessionize owns talk proposals. KonfHub owns availability, eligibility enforcement and payment. Event facts, checkout settings, pass details and policies belong in `event.json`. Archived sources are reference material and are not imported by the application.
