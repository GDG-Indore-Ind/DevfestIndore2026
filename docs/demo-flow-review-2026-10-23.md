# Demo flow review — 23 October 2026

The current local attendee experience has no outstanding blocking UI findings in the flows exercised below. The public demo deployment still needs attention: the Vercel URL in AGENTS.md serves an older implementation, and the canonical domain in event.json did not resolve in the browser. These local changes have not been published.

## Corrections

| Severity | Finding | Correction |
| --- | --- | --- |
| Important | The flight rail and rocket painted over the open Explore menu, including its title/date. | Give the disclosure its own stacking level above the rail in `src/app/space.css`. Verified on phone and desktop, including a DOM hit test over the menu. |
| Minor | Explore's event name and date competed for a narrow row. | Stack the two labels on phones, preserving the desktop row. |
| Critical under the UI skill's touch-target rubric | Workshop disclosure links, official speaker source links and the partner contact email had targets below the project's 44px minimum. | Increase their minimum height to 44px in `src/app/engineering.css` and `src/app/space.css`. Verify the expanded links and email in the browser. |

Targeted finding score: 83/100 before corrections, 100/100 after corrections (one 10-point, one 5-point and one 2-point deduction resolved). This score covers the findings in this review only; it is not a whole-site accessibility, performance or device certification.

## Browser coverage

- Main phone viewport: 375 × 812. Additional narrow-phone spot checks at 320 × 740, tablet checks at 768 × 1024, desktop checks at 1440 × 900.
- Home plus all 15 linked destinations: Tickets, Guidelines, Venue, Partners, Events, FAQ, Team, Gallery, Past speakers, Past sponsors, Past events and its four edition pages. The 15 destinations were measured at phone, tablet and desktop widths. No horizontal document overflow was found; each destination had one h1 and no completed image with a failed natural width at inspection time. Lazy images outside the viewed area were not all forced to load.
- Light and dark appearance, with persisted appearance across navigation; responsive hero, topic panel, tickets, team and photo dialog inspected visually.
- Explore opening, Escape dismissal/focus restoration, archive links reachable by scrolling inside the menu, automatic dismissal on navigation.
- Homepage programme anchor, all four topic selections, community anchor, photo-carousel next action, return-to-launch action and ticket links.
- Tickets to Guidelines; policy section anchors; venue route, photograph, directions destination and loaded map iframe.
- FAQ disclosure; gallery photo opening and Escape closing with focus returned to the original photo button.
- Team category filtering and restoration to 14 people; workshop search with zero results and Clear search restoring the 13 GDG Indore archive-confirmed campus sessions; speaker text search and edition filtering.
- No browser console errors recorded in the inspected local tab.

Checks used the desktop browser at responsive viewport sizes. Physical iOS/Android devices, screen readers, checkout completion and form submission were not exercised. A Lighthouse tool was unavailable; no Core Web Vitals or performance score is claimed.

## External demo dependencies

| Destination | Observed state on 23 October | Demo implication |
| --- | --- | --- |
| [Configured Vercel production URL](https://devfest2026-iota.vercel.app/) | Older long-form design, introductory loader and legacy ticket presentation. | Publish the reviewed current version to the intended demo host before presenting that public URL. |
| [Canonical domain in event.json](https://devfest.gdgindore.in) | Browser reported `ERR_NAME_NOT_RESOLVED`. | Confirm the final domain and its DNS/hosting setup before sharing canonical links. |
| [KonfHub](https://konfhub.com/gdg-devfest-indore-2026) | Event page loads; Liftoff shows ₹699 and a disabled Coming Soon action. Local release information says 24 October at 12:00 am IST. | The registration handoff can be shown, but purchasing was unavailable during this review. Price and inventory remain owned by KonfHub. |
| [Sessionize](https://sessionize.com/devfest-indore-2026/) | CFP open, closes 10 November; Submit a session is present. | Speaker CTA has a working destination. |
| [Partner application](https://forms.gle/M1Hp18HWfen2b5BA8) | Redirects to Google sign-in. | Use an already signed-in browser if the demo includes the form. No submission was made. |

## Verification

Content validation, TypeScript and the final production webpack build pass; 35 pages generated. Full-project ESLint has zero errors and three existing warnings in layout.tsx about analytics scripts and a raw image. Only CSS and this review document were changed; the pre-existing favicon modification was left untouched.

Review screenshots are stored in this chat's visualization directory: `demo-desktop.jpg`, `demo-mobile-home.jpg`, `demo-mobile-menu.jpg` and `deployed-older-version.jpg`.
