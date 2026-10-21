# DevFest Indore attendee design system

Updated 21 October 2026. Direction: clean orbital festival. The organizer has now approved the supplied Figma references: bold DevFest typography, an इंदौर / 2026 pill, rounded artwork windows, and a single Android astronaut. This direction supersedes the earlier technical-editorial hero while retaining its clear copy, navigation and factual content.

## Foundations

Keep the established self-hosted Google Sans family, 1160px container, 32px desktop / 20px mobile gutters, 4px spacing unit and `--audience-*` light/dark tokens. Display uses weights 500–600, with 700 reserved for the DevFest hero; body 400. Use the same Google Sans family for supporting labels and annotations; no monospace treatment. Use pill-shaped primary controls, 24px photograph/artwork windows and 12px topic controls. Prefer spacing and rules elsewhere. Keep the site uncluttered.

Light: #ffffff background, #202124 ink, #4c5159 secondary, #185abc action with white label. Dark: #10141d background, #f1f3f4 ink, #bdc5d3 secondary, #a8c7fa action with #102b54 label. Technical drawing uses #102434 with #dcebf5 ink and #b9d1e2 labels. Paper panels use #f5f7f8 light / #16202b dark. Base tokens remain in `src/app/audience.css`; new public component styles live in `src/app/engineering.css`, imported afterward. Admin/campaign legacy styles are a temporary exception.

Body 16px, secondary directory text 13–14px, overlines 13px, lead 18–26px, section headings 28–36px. Hero name is approximately 64–112px, set left above the compact Hindi city/year lockup. Small diagram labels are graphic annotation, not required event details. Date, venue and purchase action remain ordinary readable HTML.

## Visual language

One Android astronaut illustration carries the hero alongside a single four-point sparkle and a simple orbital motif in rounded windows. Keep generous white space in light mode and quiet dark surfaces in dark mode. Google blue, red, yellow and green are small signals; the primary hero action is yellow with dark ink and an outlined offset shadow. No star fields, neon glows, custom cursors or perpetual decorative motion. Artwork never implies an official product partnership or announced session. Keep original organization logos on white plates in both themes.

New theme tokens and refinements live in `src/app/space.css`, imported after engineering.css. New artwork is `public/images/android-astronaut-2026.webp`, with transparent alpha and an approximately 184 KB payload. The source prompt and generation details are recorded in `docs/space-artwork-2026.md`.

## Key components

- **Space hero:** bold DevFest name, Hindi city/year pill, readable date and venue and ordinary ticket action. One decorative Android astronaut in a rounded window, with two supporting geometric tiles. Static artwork; no motion control needed. Stacks on mobile.
- **Topic index:** four native pressed-state buttons select a distinct story, orbital graphic, concrete topic tags and an illustrative engineering flow. A small speaker CTA follows. Label navigation Themes; agenda and speakers are coming soon. Content changes in a polite live region.
- **ThemeChoice:** paired Sun/Moon native buttons, each 44px, with explicit accessible light/dark labels and pressed state. Shared by header/footer, persisted locally. Existing default light and saved preferences remain.
- **Explore:** compact two-column disclosure. Attend and Archive on the left, Discover on the right. One-column mobile layout, scrollable within viewport. Close on Escape/outside/navigation/focus leaving; Escape restores trigger focus.
- **History preview:** one verified photograph, a short intro and three archive links. Section visibility and order are fixed in checked-in page composition.
- **Compact people:** 72×80 portraits, two-column desktop / one-column mobile rows, all matching speakers in one scrolling list. Group multiple appearances by normalized person name. Biographies and session abstracts stay behind disclosures.
- **Organizations:** five-column desktop / two-column mobile sponsor logo wall, with all sponsors visible. Event partners follow as a separate compact name wall; source links remain visible. Group repeated names across years within the same relationship.
- **Workshops:** all session rows visible in a searchable scrolling list, with descriptions in disclosures. Keep dates absent when not supplied. Community event records remain explicitly historical.
- **Partners & collaborators:** confirmed technology, space, knowledge, media and financial partners share one section. Logo cards scroll horizontally on mobile and as the list grows; no autoplay. Two confirmed partners remain visible together on desktop. Add 44px previous/next controls beyond three cards. Ecosystem organizations use a smaller static row in the same section, with role labels and a Call for Sponsors email CTA.
- **Icons and outbound links:** Lucide 18px / stroke 1.75 for interface actions, hidden from assistive technology beside descriptive labels. Local Lucide v1 contains no brand icons; social links use semantic code/profile/camera icons plus their platform names. Outbound web links use ExternalLink and announce a new tab.

## Accessibility and performance

Use one h1 per page; proper headings, real links, native disclosures and labeled filters. Maintain 44px action targets, visible focus, keyboard access, reduced-motion behavior and no horizontal overflow at 375px. Portraits request appropriately small image sizes. Real photographs below the fold load lazily. No new dependency was introduced.

Existing token contrast: light ink 16.10:1, secondary 7.99:1, primary action 6.51:1; dark ink 16.55:1, secondary 10.61:1, primary action 8.17:1. New drawing and paper combinations are checked with relative luminance in validation. Verified new combinations: drawing text 13.03:1; drawing labels 10.03:1; light paper secondary 7.43:1; dark paper secondary 9.48:1. Fine diagram construction lines need not carry the event’s factual content.

## Migration tracking

| Pattern | Target | Status |
|---|---|---|
| Hero identity | Figma-inspired city/year lockup, one Android astronaut and ordinary CTA | Applied |
| Toy telescope | Compact unnumbered themes | Applied |
| Footer-only theme toggle | Shared header/footer choice | Applied |
| Large speaker and organizer cards | Compact portraits and disclosure rows | Applied |
| Static partner strip | Admin-backed controlled logo rail | Applied |
| Mixed historical/current sponsor claims | Explicit edition and relationship | Applied |
| Campus-only destination | Workshops & events with legacy redirect | Applied |
| Legacy public CSS rules | Isolated new engineering styles; legacy unused selectors remain for existing components | Incremental |
| Custom admin and campaign visual language | Remove `/admin`; keep content changes in Git | Applied |

Historical baseline audit (before the current Figma-led revision): six important gaps (mascot tone, scattered topic controls, footer-only appearance, oversized directories, static partner rail, campus-only labeling) gave 70/100 using the skill’s 5-point deductions. All six targeted gaps are addressed. This limited design score does not claim an independent whole-site accessibility or usability certification; attendee tree testing remains outstanding.

## Content and release constraints

Final event facts remain in `docs/event-final-2026-10-20.md`. Tickets remain phase-based; only Liftoff is shown now. No permanent six-tier grid. Preserve eligibility, final-sale policies, release clock and KonfHub gating. Do not turn on sales or fabricate prices as part of a visual update. Keep the site free of custom telemetry and admin workflows. GA4/GTM remain external analytics destinations; Sessionize and KonfHub own proposals and ticket sales.

See `docs/website-culling-plan.md`, `docs/information-architecture.md` and `docs/archive-sources.md` for chapter structure, route ownership and evidence.

## Orbital theme validation — 20 October 2026

- Production build and all 38 generated pages pass with Next.js webpack. Turbopack production compilation hits a local process/port permission error; no configuration was changed to conceal it.
- TypeScript and lint on updated interactive components pass. Whole-project lint still reports 10 existing errors in older components outside this visual update.
- Browser verified at 1440px desktop and 375px mobile, with no horizontal overflow and no header controls below 44px. Light/dark appearance, Physical AI panel contrast, Explore/Escape focus return, and the homepage-to-ticket route checked. Browser error log empty.
- New contrast ratios: hero action 10.97:1; warm panel 11.74:1; light illustration labels 12.93:1; dark illustration labels 12.41:1; yellow programme icon on white 5.59:1.
- The transparent hero WebP is 184,374 bytes. Existing community and venue photographs and partner logos were verified loaded in the browser.

## Copy and typography refinement

Use Google Sans throughout, including ticket-page labels. Remove the homepage community byline and release teaser, section chapter numbers and topic index numbers. Both homepage ticket actions say “Get tickets”; the lower action is a compact button without pass descriptions, inclusions or allocation facts. The ticket destination retains the release window, eligibility and booking policies.

## Scroll flight sidebar

The homepage and longer secondary pages use route-specific section stops. A rocket follows a thin route in the outer gutter, passing unnumbered section stops and arriving at a planet at the bottom of the document. Section links support pointer/keyboard navigation and reveal labels on hover or focus. Reversing scroll reverses the journey. Desktop targets are 44px, spaced 56px apart. A small decorative rail replaces the navigation below 1024px or in short windows, within the existing outer gutter. It does not capture pointer or scroll input. Scroll updates use a passive listener and one scheduled animation frame to change transforms, without React rerenders. Reduced motion hides the moving craft and keeps ordinary section navigation.

Flight rail verification: TypeScript and component lint pass. Browser checks confirm progress returns to 0 at launch and reaches 1 with the arrived state at document end, section-stop navigation works, and desktop and compact mobile layouts have no horizontal overflow. On mobile the 18px rail stays beyond the content gutter. Light/dark styles checked.

## Secondary pages — 21 October 2026

Shared PageIntro supplies a concise heading, lead and one small orbital motif; the team keeps its real community photograph. The default GDG eyebrow is removed. Tickets, FAQ, team, speakers, sponsors, editions, gallery, workshops and invitations share the same typography, 24px windows, pill filters and quiet page gutters. The 404 page uses this system and links to the actual programme anchor.

Keep compact 18px people names and 72px portraits, visible 16px search fields on mobile, explicit active filters and 44px controls. Archive navigation is present on the gallery too. Preserve historical-source distinctions, booking dates, eligibility, release gating and referral propagation. The invitation avoids a hardcoded release banner and repeated referral-code copy.

The scroll rail now accepts page-specific stops, adapts its height to their count and returns to each page’s actual overview anchor. It lands even when a filtered page is short. Short error and unavailable-pass screens have no rail.

Verification: all 38 pages generated in the production webpack build; TypeScript and lint on changed components passed. Desktop and mobile browser checks cover team filtering, speaker search, sponsor relationship filters, workshop empty/reset states, photo dialog open/close, FAQ disclosures, ticket details, unreleased-pass guidance and the 404 programme link. Light/dark and overflow checks passed. The invitation was checked in the generated HTML without activating a test referral. Existing unrelated whole-project lint issues remain outside this refinement.

## Compact team and historical directories — 21 October 2026

These pages use a compact CommunityPage variant: 32–44px headings, 28px intro padding, one short lead and no large illustration or introductory photograph. Other page layouts retain their existing treatment.

- Team: four-column desktop, two-column tablet, one-column mobile. Show 56px portraits, name, concise role and a link to the existing LinkedIn profile. Keep all 14 people and team filters; remove on-page biographies, repeated team labels and social-link lists.
- Historical organizations: five-column desktop/two-column mobile sponsor logo wall. All 25 sponsor logos use clipped windows into the original organizer artwork. Event partners follow in a separate name wall without tab switching. Preserve relationship distinctions, edition years, historical context and visible source links. Remove the redundant headings, descriptions, search field and per-organization disclosure controls.
- Past events: four compact linked rows containing the year, date and venue. Remove repeated titles and summaries. Edition pages use short name walls for speakers/partners and a short visible summary and available community photograph. Deduplicate speaker names and keep the official record link visible.

Verified team filtering, expansion to all 25 sponsors, the nine recorded event partners, event navigation and highlights disclosure. Mobile and dark layouts have no horizontal overflow. Updated-file lint and TypeScript checks pass.

## Continuous directories — 21 October 2026

Avoid Show all/Show more and directory pagination: visitors scroll through all matching results. Team rows use four desktop columns with 20px gutters and 12px vertical padding; two columns on tablet and one on mobile. Sponsor logos sit on compact white plates in both themes and keep their original proportions. All 27 grouped speakers and 18 workshops render without paging; search and useful session disclosures remain.

Verified 25 logos, all 14 organizers, four team columns at 1440px and 1024px, mobile layouts at 375px with no horizontal overflow, full speaker/workshop lists and speaker search. TypeScript and updated-file lint pass.

## Partner-led edition refinement — 21 October 2026

Confirmed by the organizer: Qualcomm (expo booth and speaker participation) and Space Club of India (space collaborator). These lead a single Partners & collaborators section ahead of the historical archive. Roles describe the contribution without implying a financial tier. Lt Gen PJS Pannu remains a tentative keynote and is not publicly announced. The Space Club of India is named accurately, without implying ISRO or a government agency partnership. Other discussions stay absent until confirmed.

Themes, partners, community and venue share a 1160px content width and a 680px minimum section height at wide desktop, with consistent 56px vertical padding. At smaller sizes, sections grow with their content. The hero and compact final ticket CTA retain their own proportions.

The ticket directory shows the current pass name, audience, short inclusions and booking state/action. No allocation counts, remaining quantities or detailed release tables are shown. Eligibility and detailed inclusions remain available on pass pages; policies use one compact disclosure. Sales gating and referral propagation remain intact; checkout is owned by KonfHub. The footer is a compact relevant-link strip with contact details.

Verification: production webpack build generated all 38 pages; TypeScript and changed-file lint pass. Browser checks covered all four theme selections, dark Physical AI contrast, equal wide-desktop section heights, confirmed logos, speaker/sponsor destinations, mobile partner overflow within its own rail, concise ticket state and pass detail navigation.

## Featured partner hierarchy — 21 October 2026

Space Club of India leads, with a square desktop card and a proportionally larger circular seal. Qualcomm follows in a wider card with its original full wordmark and concrete Edge AI, Physical AI and Local AI context. Both cards share their baseline at wide desktop. Mobile stacks them and permits content to determine height. This richer featured section may grow beyond the shared 680px minimum; the common container and section gutters remain.

Further confirmed sponsors are a separate row below these lead collaborators. Developer ecosystem logos form an unboxed row, link directly to verified Instagram/LinkedIn pages, and use display windows no wider than 2.5:1. Current downloaded profile images replace older logos. Do not infer financial tiers or announce tentative speakers from a collaboration.
