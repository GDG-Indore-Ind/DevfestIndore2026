# DevFest Indore attendee design system

Updated 23 October 2026. Direction: clean orbital festival. The organizer has now approved the supplied Figma references: bold DevFest typography, an इंदौर / 2026 pill, rounded artwork windows, and a single Android astronaut. This direction supersedes the earlier technical-editorial hero while retaining its clear copy, navigation and factual content.

## Foundations

Keep the established self-hosted Google Sans family, 1160px container, 32px desktop / 20px mobile gutters, 4px spacing unit and `--audience-*` light/dark tokens. Display uses weights 500–600, with 700 reserved for the DevFest hero; body 400. Use the same Google Sans family for supporting labels and annotations; no monospace treatment. Use pill-shaped primary controls, 24px photograph/artwork windows and 12px topic controls. Prefer spacing and rules elsewhere. Keep the site uncluttered.

Light: #ffffff background, #202124 ink, #4c5159 secondary, #185abc action with white label. Dark: #10141d background, #f1f3f4 ink, #bdc5d3 secondary, #a8c7fa action with #102b54 label. Technical drawing uses #102434 with #dcebf5 ink and #b9d1e2 labels. Paper panels use #f5f7f8 light / #16202b dark. Root theme tokens live in `src/app/tokens.css`, imported by globals.css. Existing global layers load in order: globals, audience, engineering, space. New isolated component styles belong in colocated CSS Modules; shared utilities and tokens remain global. There is no admin/campaign UI.

Body 16px, secondary directory text 13–14px, overlines 13px, lead 18–26px, section headings 28–36px. Hero name is approximately 64–112px, set left above the compact Hindi city/year lockup. Small diagram labels are graphic annotation, not required event details. Date, venue and purchase action remain ordinary readable HTML.

## Visual language

One Android astronaut illustration carries the hero alongside a single four-point sparkle and a simple orbital motif in rounded windows. Keep generous white space in light mode and quiet dark surfaces in dark mode. Google blue, red, yellow and green are small signals; the primary hero action is yellow with dark ink and an outlined offset shadow. No star fields, neon glows or custom cursors. Artwork remains static; organizer-requested logo marquees use explicit pause controls. Artwork never implies an official product partnership or announced session. Keep original organization logos on white plates in both themes.

Remaining shared refinements live in `src/app/space.css`, imported after engineering.css. Hero artwork, appearance and referral styling live beside their components in CSS Modules. New artwork is `public/images/android-astronaut-2026.webp`, with transparent alpha and an approximately 184 KB payload. The source prompt and generation details are recorded in `docs/space-artwork-2026.md`.

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

Use one h1 per page; proper headings, real links, native disclosures and labeled filters. Maintain 44px action targets, visible focus, keyboard access, reduced-motion behavior and no horizontal overflow at 375px. Portraits request appropriately small image sizes. Real photographs below the fold load lazily.

Existing token contrast: light ink 16.10:1, secondary 7.99:1, primary action 6.51:1; dark ink 16.55:1, secondary 10.61:1, primary action 8.17:1. New drawing and paper combinations are checked with relative luminance in validation. Verified new combinations: drawing text 13.03:1; drawing labels 10.03:1; light paper secondary 7.43:1; dark paper secondary 9.48:1. Fine diagram construction lines need not carry the event’s factual content.

## Content and release rules

Canonical event facts live in `content/event.json`; pass facts and policy wording live in `content/tickets.json`. Render all visible passes using their release windows. Do not hardcode a currently active pass in components or documentation.

Sessionize owns proposals; KonfHub owns checkout. Preserve eligibility, final-sale wording, referral behavior and the booking switch. Only publish confirmed participation; show historical contributors with edition context. `pages.partners.revealed` controls the public partner announcement.

## Current implementation details

- Keep Get tickets visible in the shared header; Programme is secondary. Explore groups attendee tasks, community destinations and historical directories.
- The homepage composes event, programme, partners, community/history and venue. Supporting directories have their own routes.
- The ticket page renders visible pass details, eligibility, inclusions and policy links. Register leads to the embedded booking section; saved coupons use the direct KonfHub destination.
- One white KonfHub iframe appears below pass details, with terms above and a direct fallback below. Keep the supplied widget URL intact. Its styles live beside `tickets/KonfHubRegistration.tsx`.
- Community logo marquees retain pause/resume, hover/keyboard pause and a static reduced-motion row. Their styles live beside `home/LogoMarquee.tsx`.
- Keep partner logos on white plates in both themes. Historical sponsor and community records remain separate from current announcements.
- Workshop directories use verified campus photographs, source links and actual dates. Speaker directories preserve edition context.

## Documentation ownership

This file describes current rules. `docs/information-architecture.md` describes routes; `content/README.md` describes editable records. Previous design iterations and dated validation claims are preserved in [the historical snapshot](docs/history/design-system-through-2026-10-23.md); they are not current test results.

Community photographs use a continuous horizontal marquee with pause/resume, hover and keyboard-focus pause. Reduced motion shows one manually scrollable row and hides duplicate photographs. Captions and order still come from `content/gallery.json`; controls live in `content/pages.json`.
