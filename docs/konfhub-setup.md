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
- Use the pass-specific inclusions and notes from `content/tickets.json`. Flight Deck lunch and workshop reservation benefits are not in the final brief; do not carry those older promises forward.

## Launch verification

1. Confirm final prices, fees, invoice delivery and team discount rules.
2. Configure all six release windows, caps, per-order limits and eligibility checks on KonfHub.
3. Protect Flight Deck with private access codes; a public event link must not bypass the restriction.
4. Verify each ticket's inclusions, food/kit entitlement, policy text, attendee credentials and confirmation emails.
5. Review existing Early Bird booking records separately. The new brief does not authorize cancelling or changing already-purchased tickets.
6. Check referral codes against the final categories. The website preserves referrals but does not guarantee a discount; KonfHub must validate it.
7. Verify `content/event.json` → `links.booking`, then set `booking.enabled` to true. Each pass page also checks its own window. Availability, allocation and private-code enforcement belong to KonfHub.

Previously discussed private delegation and crew categories are outside the final public directory. Confirm their disposition separately before publishing any private offer. Keep private codes and allocations off the public site.

## Public presentation — organizer clarification, 20 October

The six categories are the timed inventory plan. Feature Liftoff only now, not the whole directory. The website reveals current release windows, or the next release during a gap. Alpha Drop remains historical and is not advertised as an active offer. The public KonfHub description was checked and still has the earlier refund/transfer/workshop terms; reconcile it with the final brief before enabling checkout. The supplied screenshot verifies windows and caps but does not provide prices.
