# DevFest Indore: visual and content plan

Updated 20 October 2026. This revision follows the organizer’s request for an engineering conference rather than a playful space campaign.

## Direction

Use a technical editorial identity: precise diagrams, real event photography, strong typography, restrained blue accents and compact content. Space is a subject of the conference, expressed through orbital and systems drawings. Google’s four colors remain a small identity cue. Headlines explain the event; labels explain the next action.

The homepage has six chapters:

1. **Event:** DevFest Indore 2026, engineering themes, date, venue, early-bird action.
2. **Programme themes:** a compact topic index with one explanation visible at a time.
3. **Community archive:** one real photograph and three destinations, rather than full speaker/sponsor grids.
4. **Current ticket release:** Liftoff only at this point in the release calendar.
5. **Venue:** real photograph, address, check-in time and directions.
6. **Community and partners:** two visible logos with controlled rotation and a historical sponsor link.

## Applied cuts and replacements

| Previous pattern | Current treatment | Purpose |
|---|---|---|
| Astronaut mascot, ringed ticket planet, tilted year capsule | Orbital systems drawing, ordinary pass action, clear date | Establish an engineering tone |
| Toy telescope and scattered planet controls | Numbered topic index, selected topic detail | Make exploration easy to scan and operate |
| Large directory cards | 72px portraits, two-column rows, session disclosures | Show people without a long wall of cards |
| Repeated speakers across years | One person with grouped appearances | Keep the archive short as it grows |
| Static partner names | Two logo slots, previous/pause/next controls | Support an expanding partner list |
| Campus-only navigation label | Workshops & events | Cover community gatherings and campus sessions |
| Historical and current organizations mixed together | Explicit edition field and separate archive | Avoid implying a current sponsorship |
| Appearance control only in footer | Shared light/dark choices in header and footer | Make appearance easy to find |
| Rounded illustrations and rainbow scrollbar | Small corner radii, fine rules, neutral scrollbar | Make the visual language consistent |

## Graphic system

- Hero: standalone native SVG orbital systems drawing, shared by both themes. Its paths illustrate an engineering concept, not live telemetry or an announced technical partnership.
- Programme: Lucide subject icons, a numbered index and simple signal-path marks. No fake code or fabricated measurements.
- Community: verified 2025 group photograph, captioned with its actual edition.
- Venue: existing Essentia photograph. Avoid generic or generated audience photography.
- Directory: original speaker photographs, with initials only when an image is absent or fails.
- Partner rail: original logo colors on white plates in both themes; do not invert brand logos.
- Motion: a short opacity/translation entrance when a logo changes. Rotation pauses offscreen, on hover/focus and with reduced motion. Hero orbital movement is slow, contained to the illustration, has a pause control and stays paused when reduced motion is requested.

## Pages and content growth

- `/events` combines sourced past community events with the organizer’s workshop directory. It shows six workshops initially and reveals more on request. `/workshops` permanently redirects to `/events#workshops`.
- `/past-events` shows four editions as concise rows. `/past-events/[year]` holds the date, venue, public record, listed partners and verified speaker subset when available.
- `/past-speakers` groups matching names across editions; edition, track and search narrow the results. Complete session text and profiles stay in disclosures. Existing organizer records remain the source of biographies.
- `/past-sponsors` provides separate sponsor and event-partner views. Twelve organizations show initially, with more on request. Repeat organizations are grouped within their relationship. Official partner records retain their source links.
- `/gallery` remains the photo archive; `/team` uses compact organizer rows.
- Homepage archive has its own `archive` visibility control. Existing saved visibility for other sections is preserved.

## Adding partners

Add confirmed partner records to the checked-in data source with name, relationship, logo, URL and event edition. Review the source before merging. Historical editions appear in the organization archive; unassigned legacy entries stay off the current carousel. Adding more entries does not increase the rail’s height or number of visible logos.

The carousel baseline is the developer/community network, labeled by relationship. It does not fabricate paid sponsorship tiers. No remote records were published as part of this local design update.

## Evidence and remaining content gaps

Four official GDG DevFest records establish dates and venues for 2022–2025. The 2025 record names five speakers. The 2024, 2023 and 2022 records establish historical partner relationships. Official records also establish AI Unplugged and Cloud Bytes in 2025. See `docs/archive-sources.md` for direct sources.

The supplied historical sponsor sheet names 25 organizations but supplies no dates or tiers. Those fields remain unassigned. Workshop records do not supply dates, so the directory does not present them as upcoming scheduled sessions. Existing speaker bios are organizer-provided; an official GDG listing link is added only where that listing names the person.

The 2026 programme, speaker lineup, priced checkout and signed partner tiers need organizer-published records before they can be promoted. The site has places for them without adding new homepage grids. Checkout still follows the existing release controls and KonfHub configuration.

## Validation

Check desktop and 375px layouts in both appearances; header keyboard dismissal and saved theme; archive routing; speaker/organization search and disclosures; workshop expansion and legacy redirect; logo manual controls and motion preference. Production build uses the available webpack path because the local Turbopack production helper has a sandbox limitation. This is a local preview; no deployment is included.

### Checks completed on 20 October 2026

- Production webpack build and TypeScript: pass before the static data migration. Re-run after the migration; the admin and backend service code have been removed.
- Partner publication checks: current entries included; historical/unassigned entries excluded from the current rail; duplicate names replaced.
- New text/surface contrasts: drawing 13.03:1, drawing labels 10.03:1, light paper 7.43:1, dark paper 9.48:1.
- Drawing: standalone SVG checked in both appearances after correcting an inline-SVG repaint issue.
- Browser: 375px layouts in both appearances; no horizontal overflow on checked home, speaker, organization, event and edition pages. Saved dark appearance survives navigation and a full load.
- Speaker search: Divyanshu appears once with 2024/2025 sessions; selecting 2024 retains the correct historical affiliation and session.
- Organization search and relationship filter: Women Techmakers groups its 2022–2024 official records.
- Workshops: more-results action, search, disclosure and `/workshops` redirect verified.
- Carousel: two loaded logos, manual next, play/pause and timed rotation verified. Reduced-motion branches reviewed in code; no browser emulation control was available for that preference.

No deployment or changes to remote partner records were made.
