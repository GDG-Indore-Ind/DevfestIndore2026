# KonfHub booking widget — 23 October 2026

The organizer supplied the generated [Standard ticket widget](https://konfhub.com/widget/id/0278dd0b-f629-408a-9a47-9fb249bde1cc). It is configured in `content/event.json` under `booking.widgetUrl`. Public copy belongs in `content/tickets.json` under `registration`.

Register now moves to `/tickets#registration`, where one full-width iframe presents KonfHub ticket selection. Its accessible title and payment permission match the supplied embed. The frame is 100% wide, 540px tall on desktop and 650px on mobile; it retains internal scrolling for later booking steps. The loading is deferred until near the viewport. The white surface is intentional in both site themes because the third-party widget has its own theme.

The direct event-page fallback remains below the widget and retains the existing saved referral coupon. A visible referral note directs those users to this link. No undocumented query parameter, auto-resize message protocol, iframe theme override or automatic coupon behavior has been invented. The main booking switch hides both options.

## Colors to enter in KonfHub

Configure these in the widget editor under Developers → Widgets, using the available fields. KonfHub owns the iframe contents; parent-page CSS cannot recolor its buttons or text. See the [official customization guide](https://blog.konfhub.com/simplify-event-registrations-with-konfhubs-embed-ticket-feature).

| Role | Recommended color |
| --- | --- |
| Primary / Proceed button | `#C5221F` |
| Button text | `#FFFFFF` |
| Background | `#FFFFFF` |
| Ticket/card surface | `#F5F7F8` |
| Heading/body text | `#202124` |
| Secondary text | `#4C5159` |
| Borders | `#DADCE0` |
| Links | `#185ABC` |
| Optional accent | `#FBBC04` |

Red/white button contrast is 5.80:1. Body text on white is 16.10:1; secondary text on the card surface is 7.43:1; blue links on white are 6.51:1. All meet AA for normal text. If using a yellow button instead, pair `#FBBC04` with `#202124` text (9.43:1), never white. These are recommendations; no KonfHub dashboard settings were changed.

## Verification

The supplied widget loads in the local ticket page and switches to KonfHub's mobile layout. Desktop and mobile width/overflow, Register anchor navigation, one iframe, payment permission, terms link and referral fallback were checked. The schema rejects non-KonfHub widget URLs. TypeScript, changed-file lint, content validation and production build pass.

The live Liftoff Pass is ₹699 and Coming Soon during this check. Ticket selection, attendee details and payment cannot be completed before KonfHub opens sales; no form or purchase was submitted. The website changes remain local until deployment.
