# KonfHub setup — final public release plan

Updated 20 October 2026. The final organizer brief in `event-final-2026-10-20.md` replaces the earlier public pass names, price ranges, refund deadline and student waitlist plan. This website change does not edit KonfHub inventory, issue invitations or alter existing bookings.

## Public categories

| Pass | Window (2026, IST) | Allocation | Checkout requirements |
| --- | --- | --- | --- |
| Liftoff | 24 Oct 12:00 AM–25 Oct 11:00 PM | 70 | Open community access; maximum 2 tickets per order; stop when allocation is exhausted. |
| Cadet | 31 Oct 12:00 AM–18 Nov 11:00 PM | 200 | Active college/university students; maximum 1 per order; college, degree and graduation year required. Physical student photo ID matching the name is mandatory at entry. |
| Commander | 31 Oct 12:00 AM–18 Nov 11:00 PM | 250 | Working professionals; automatic team volume discounts; corporate tax invoice available at checkout. |
| Flight Deck | 18 Nov 12:00 AM–28 Nov 11:00 PM | 20 | Protected tier for curated founders, senior technical leadership and ecosystem partners. Private VIP code unlocks booking. |
| Last Orbit | 20 Nov 12:00 AM–27 Nov 12:00 PM (noon) | 100, subject to venue capacity | Final-phase surge pricing; kits and swag first come, while supplies last. |
| Observer | 26 Nov 12:00 AM–28 Nov 11:00 PM | 100 | Main auditorium keynotes and open tracks only. No lunch, refreshments, workshop halls or swag. |

Final prices, tax/fee presentation, team discount thresholds and the applicable discount amount were not supplied. Configure and verify these before enabling website checkout. Do not reuse the previous website price ranges.

## Form and policies

- Full name, mobile number and LinkedIn profile URL; encourage attendees to prepare their KonfHub profile before the release.
- Unique name, email address and LinkedIn profile for each attendee, including team bookings.
- Cadet: require college name, degree and graduation year. Explain the original physical student ID requirement and the possible cancellation or on-site Commander upgrade for ineligible bookings.
- Food preference: Veg / Jain Veg. Observer has no food entitlement.
- All purchases are final: no cancellations, transfers, rescheduling or refunds, including personal or corporate travel changes.
- Publish the inclusive, harassment-free code of conduct and the organizer's right to dismiss disruptive attendees without refund.
- Use the pass-specific inclusions and notes from `content/event.json` → the current event’s `tickets`. Flight Deck lunch and workshop reservation benefits are not in the final brief; do not carry those older promises forward.

## Launch verification

1. Confirm final prices, fees, invoice delivery and team discount rules.
2. Configure all six release windows, caps, per-order limits and eligibility checks on KonfHub.
3. Protect Flight Deck with private access codes; a public event link must not bypass the restriction.
4. Verify each ticket's inclusions, food/kit entitlement, policy text, attendee credentials and confirmation emails.
5. Review existing Early Bird booking records separately. The new brief does not authorize cancelling or changing already-purchased tickets.
6. Check referral codes against the final categories. The website preserves referrals but does not guarantee a discount; KonfHub must validate it.
7. Verify `content/event.json` → the current event’s `tickets.booking.url`. `tickets.booking.enabled` controls the website's public event-page handoff. Availability, allocation, release windows, payment and private-code enforcement belong to KonfHub. The website has one ticket page.

Previously discussed private delegation and crew categories are outside the final public directory. Confirm their disposition separately before publishing any private offer. Keep private codes and allocations off the public site.

## Public presentation — organizer clarification, 20 October

The six categories are the timed inventory plan. Feature Liftoff only now, not the whole directory. The website reveals current release windows, or the next release during a gap. Alpha Drop remains historical and is not advertised as an active offer. The public KonfHub description was checked and still has the earlier refund/transfer/workshop terms; reconcile it with the final brief before enabling checkout. The supplied screenshot verifies windows and caps but does not provide prices.

## Public page recheck — 22 October 2026

Read-only browser review of the configured event URL still found a 21 November refund deadline, transfers with organizer approval, a student waitlist and reserved VIP workshop access. These differ from the current canonical ticket brief. Reconcile the external copy and checkout requirements before enabling the website booking switch. No KonfHub data or existing bookings were changed. Final approved prices remain absent from the local records.

The ticket website now explains the booking handoff, shows current-pass inclusions and eligibility without another click, displays exact scheduled release times, and marks an unknown price explicitly. An optional `price` field can be added to each canonical pass once approved; it does not activate checkout.

Validation for this revision: canonical content validation, TypeScript, targeted ESLint and production webpack build passed. Price formatting was checked for unknown, zero and paid values; negative prices are rejected. Release checks covered the opening boundary, disabled booking and closure. Browser review covered 375px layouts in light/dark, persistent notice dismissal after reload, current-release-only presentation and no live checkout link while booking is disabled. Checked new text/surface pairs range from 7.37:1 to 14.84:1 in light and 9.21:1 to 14.37:1 in dark. No Lighthouse tool was available, so no performance score is claimed.

## Reconciled participant guidance — 22 October 2026

Run `node scripts/export-registration-guidelines.mjs` to print the current registration guidelines from the JSON, ready to paste into KonfHub.

The registration guidelines now live on `/faq` (anchor `#registration-guidelines`), sourced from these same records; old `/guidelines` links redirect there, alongside `/venue` for arrival information. After deployment, verify their URLs on the production domain before linking them from KonfHub. This implementation has not published external policy changes or enabled ticket checkout.

## Public registration handoff — later organizer update, 22 October 2026

The organizer made the event public/unhidden and requested a large red Register button and no ticket subpages. `booking.enabled` is now true for the website link to that public event. Local pass schedules still select the preview; they no longer disable the event-page link. The single `/tickets` page shows inclusions, eligibility, registration preparation and the red action. Former ticket subpages are removed, redirect to the index with query values preserved, and are absent from the sitemap.

Read-only inspection found the event page publicly accessible, with the LinkedIn reminder and updated general final-sale/entry policies. Liftoff is listed at ₹699, but both KonfHub purchase controls still say Coming Soon. The website button therefore opens the event page without asserting immediate purchase availability. No purchase was attempted, no KonfHub settings were changed, and no new price was entered into the local records.

