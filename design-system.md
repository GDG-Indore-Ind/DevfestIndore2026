# DevFest Indore attendee design system

Updated 24 October 2026. Direction: clean orbital festival. The organizer has now approved the supplied Figma references: bold DevFest typography, an इंदौर / 2026 pill, rounded artwork windows, and a single Android astronaut. This direction supersedes the earlier technical-editorial hero while retaining its clear copy, navigation and factual content.

## Foundations

Keep the established self-hosted Google Sans family, 1160px container, 32px desktop / 20px mobile gutters, 4px spacing unit and `--audience-*` light/dark tokens. Display uses weights 500–600, with 700 reserved for the DevFest hero; body 400. Use the same Google Sans family for supporting labels and annotations; no monospace treatment. Use pill-shaped primary controls, 24px photograph/artwork windows and 12px topic controls. Prefer spacing and rules elsewhere. Keep the site uncluttered.

Light: #ffffff background, #202124 ink, #4c5159 secondary, #185abc action with white label. Dark: #10141d background, #f1f3f4 ink, #bdc5d3 secondary, #a8c7fa action with #102b54 label. Technical drawing uses #102434 with #dcebf5 ink and #b9d1e2 labels. Paper panels use #f5f7f8 light / #16202b dark. Root theme tokens live in `src/app/tokens.css`, imported by globals.css. Existing global layers load in order: globals, audience, engineering, space. New isolated component styles belong in colocated CSS Modules; shared utilities and tokens remain global. There is no admin/campaign UI.

Body 16px, secondary directory text 13–14px, overlines 13px, lead 18–26px, section headings 28–36px. Hero name is approximately 64–112px, set left above the compact Hindi city/year lockup. Small diagram labels are graphic annotation, not required event details. Date, venue and purchase action remain ordinary readable HTML.

## Visual language

One Android astronaut illustration carries the hero alongside a single four-point sparkle and a simple orbital motif in rounded windows. Keep generous white space in light mode and quiet dark surfaces in dark mode. Google blue, red, yellow and green are small signals; the primary hero action is yellow with dark ink and an outlined offset shadow. No star fields, neon glows or custom cursors. Artwork remains static; organizer-requested logo marquees use explicit pause controls. Artwork never implies an official product partnership or announced session. Keep original organization logos on white plates in both themes.

Remaining shared refinements live in `src/app/space.css`, imported after engineering.css. Hero artwork, appearance and referral styling live beside their components in CSS Modules. New artwork is `public/images/android-astronaut-2026.webp`, with transparent alpha and an approximately 184 KB payload. The source prompt and generation details are recorded in `docs/space-artwork-2026.md`.

## Key components

- **Space hero:** bold DevFest name, Hindi city/year pill, readable date and venue and ordinary ticket action. One decorative Android astronaut in a rounded window, with two supporting geometric tiles. Static artwork; no motion control needed. Stacks on mobile.
- **Topic index:** four native pressed-state buttons form a row on desktop and a two-column grid on mobile. A tinted surface, border and check mark identify the selected theme; Left/Right/Home/End keys also select topics. Each choice reveals a story, orbital graphic and concrete topic tags. Motion is brief and interaction-driven, with a static reduced-motion equivalent. A small speaker CTA follows. Label navigation Themes; agenda and speakers are coming soon. Content changes in a polite live region.
- **ThemeChoice:** paired Sun/Moon native buttons, each 44px, with explicit accessible light/dark labels and pressed state. The header choice persists locally. Existing default light and saved preferences remain.
- **Explore:** compact disclosure grouped into Plan your visit, Discover and Past editions. Three columns on desktop; stacked groups with two-column links on mobile, scrollable within the viewport. Close on Escape/outside/navigation/focus leaving; Escape restores trigger focus.
- **History preview:** a community timeline, captioned photo marquee, past sponsor logos and archive links. Section visibility and order are fixed in checked-in page composition.
- **Compact people:** 72×80 portraits, two-column desktop / one-column mobile rows, all matching speakers in one scrolling list. Group multiple appearances by normalized person name. Biographies and session abstracts stay behind disclosures.
- **Organizations:** five-column desktop / two-column mobile sponsor logo wall, with all sponsors visible. Event partners follow as a separate compact name wall; source records remain in canonical content; the public archive does not show an artwork/source disclosure. Group repeated names across years within the same relationship.
- **Workshops:** all session rows visible in a searchable scrolling list, with descriptions in disclosures. Keep dates absent when not supplied. Community event records remain explicitly historical.
- **Partners & collaborators:** confirmed partners use one large card per slide on Home and Partners. A single revealed partner stays static. Multiple partners support touch swiping, keyboard arrows, previous/next and position controls. Optional playback advances every eight seconds and pauses for hover, focus, hidden tabs or offscreen content; reduced motion stays manual. Logos remain on white plates. Individual partnership `visible` flags hold announcements back independently of the overall reveal switch.
- **Icons and outbound links:** Lucide 18px / stroke 1.75 for interface actions, hidden from assistive technology beside descriptive labels. Social links use platform marks with accessible names. Outbound web links use ExternalLink and announce a new tab.

## Accessibility and performance

Use one h1 per page; proper headings, real links, native disclosures and labeled filters. Maintain 44px action targets, visible focus, keyboard access, reduced-motion behavior and no horizontal overflow at 375px. Portraits request appropriately small image sizes. Real photographs below the fold load lazily.

Existing token contrast: light ink 16.10:1, secondary 7.99:1, primary action 6.51:1; dark ink 16.55:1, secondary 10.61:1, primary action 8.17:1. New drawing and paper combinations are checked with relative luminance in validation. Verified new combinations: drawing text 13.03:1; drawing labels 10.03:1; light paper secondary 7.43:1; dark paper secondary 9.48:1. Fine diagram construction lines need not carry the event’s factual content.

## Content and release rules

Canonical event facts live in `content/event.json`; pass facts and policy wording live in `content/tickets.json`. Render passes using their explicit visibility flags, with no local release schedule. Show confirmed prices and sold-out labels, concise inclusions grouped by event access, food and goodies, and lounge access, with visible eligibility and disclosed conditions; keep Last Orbit and Observer hidden until approved. Do not hardcode a currently active pass in components or documentation.

Sessionize owns proposals; KonfHub owns checkout. Preserve eligibility, final-sale wording, referral behavior and the booking switch. Only publish confirmed participation; show historical contributors with edition context. `pages.partners.revealed` controls the public partner announcement.

## Current implementation details

- Keep Get tickets visible in the shared header; Themes is secondary. Explore groups attendee tasks, community destinations and historical directories.
- The homepage composes event, programme, partners, community/history and venue. Supporting directories have their own routes.
- The ticket page renders grouped pass inclusions, visible eligibility, disclosed conditions and one shared reminder/policy area. Register leads to the embedded booking section; all Register links scroll to the widget. A separate direct KonfHub fallback retains saved coupons.
- One white KonfHub iframe appears below pass details, with terms above and a direct fallback below. Keep the supplied widget URL intact. Its styles live beside `tickets/KonfHubRegistration.tsx`.
- Community logo marquees retain pause/resume, hover/keyboard pause and a static reduced-motion row. Their styles live beside `home/LogoMarquee.tsx`.
- Keep partner logos on white plates in both themes. Historical sponsor and community records remain separate from current announcements.
- Workshop directories use verified campus photographs, source links and actual dates. Speaker directories preserve edition context.

## Documentation ownership

This file describes current rules. `docs/information-architecture.md` describes routes; `content/README.md` describes editable records. Previous design iterations and dated validation claims are preserved in [the historical snapshot](docs/history/design-system-through-2026-10-23.md); they are not current test results.

Community photographs use a continuous horizontal marquee with pause/resume, hover and keyboard-focus pause. Reduced motion shows one manually scrollable row and hides duplicate photographs. Captions and order still come from `content/gallery.json`; controls live in `content/pages.json`.

## Main-content actions and color

Prominent destinations within main content use `shared/ContentAction`: outlined pill links with descriptive labels, a colored Lucide icon and a directional arrow. Filled yellow controls remain primary actions. Inline references, directory rows and header/footer links keep their existing treatment. `ContentIcon` supplies 20px icons and 28px heading accents using `--icon-blue`, `--icon-green`, `--icon-red` and `--icon-yellow`; each has a light/dark token. Heading accents complement existing orbital artwork. Themes is the navigation label for the topic explorer; agenda and speaker status remains explicit. The mobile rocket rail shows the current section name above its path, with every destination still named for keyboard and assistive technology.

Icon accent contrast against the page background (light / dark): blue 6.51 / 10.72, green 6.51 / 10.77, red 6.54 / 7.71, yellow 5.59 / 13.10. Icons remain decorative beside descriptive labels.

## Exhibit invitation

Home places a single mixed exhibit invitation after Themes and before Sponsors & partners, with its own Exhibits rocket stop and Explore link. Software demos, physical AI, space ideas and other projects share one invitation for developers, makers, startups and companies. The panel uses a static illustration and one “Exhibit at DevFest” interest-form action; it does not announce accepted exhibitors, guaranteed space, pricing or benefits. `event.links.exhibitApplication` owns the form URL; `pages.home.exhibits` owns the invitation copy. Themes styling now lives entirely in `home/ExploreSection.module.css`.

Help and policy links use shared `SupportLinks` with 24px horizontal and 8px vertical gaps, 44px link targets and natural wrapping. Before you book uses plain policy headings and paragraphs, including the LinkedIn reminder; do not turn it into a highlighted panel.

Explore uses a decorative 18px Lucide icon beside each text label, with one accessible accent color per group. Plan your visit includes ambassador contact; Discover covers the current event and community; Past editions connects the archive. Keep each group concise and retain the text labels and 44px link targets.

The footer uses three aligned navigation groups with small decorative icons, a labelled help email, and a separate community row with social icons and the chapter link. The code-of-conduct link sits beside the closing disclaimer. Social icons retain accessible platform names and 44px targets; keep all destinations visible on mobile.
