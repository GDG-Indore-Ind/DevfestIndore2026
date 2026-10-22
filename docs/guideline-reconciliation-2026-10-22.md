# Registration guideline reconciliation — 22 October 2026

The organizer confirmed in this chat that the website’s ticket rules are correct and requested useful additions from the existing KonfHub page. Current public website records remain authoritative. This document records the reconciliation; the application reads `content/tickets.json`, not this file.

Sources: the approved `content/tickets.json`, the 20 October organizer brief, and read-only review of https://konfhub.com/gdg-devfest-indore-2026 on 22 October. The public KonfHub page has not been edited.

| Topic | Current KonfHub copy | Reconciled treatment |
|---|---|---|
| Profile preparation | No prominent LinkedIn preparation reminder | Added a visible reminder on ticket listing and current pass pages; text comes from the canonical registration checklist |
| Refunds | Refund requests accepted until 21 November | Keep the website’s final-sale rule; remove the old deadline from the replacement copy |
| Transfers | Transfers/resale possible with written approval | Tickets remain personal, non-transferable and not for resale; corrections to an attendee’s own details do not authorize a new attendee |
| Entry | Digital QR ticket and matching physical government-issued photo ID | Added to general website guidelines |
| Accurate information | Eligibility and attendee details may be verified | Added to general website guidelines; each attendee uses their own details |
| Cadet | Student eligibility plus a waitlist reference | Keep the canonical active physical institutional photo-ID requirement, maximum one ticket per order and stated consequences; omit the unconfirmed waitlist |
| Flight Deck | Express interest after another booking; reserved workshop access | Use the canonical curated, private-code booking rule and explicit pass inclusions; do not promise a reserved workshop place |
| Workshops | Standard seats limited by capacity | Carry capacity and announced session-specific access requirements into the website; a conference ticket alone is not a workshop reservation |
| Kits | Blanket limited stock for standard passes; private delegation claims | Follow each canonical pass’s stated kit entitlement and restrictions; no blanket downgrade or new private delegation category |
| Corrections | Contact organizers before the event | Added a contact route for errors in the same attendee’s registration; no transfer exception |
| Conduct | Code-of-conduct requirements and removal for violations | Retain and formalize the website guideline; link to the canonical conduct destination |
| Event time | KonfHub shows 9:00 AM to 11:00 PM | The website’s confirmed check-in remains 8:30 AM IST; no unsupplied programme end time is inferred |

## Replacement copy

`docs/konfhub-guidelines-ready-to-paste.md` is generated from canonical event facts, pass records, registration checklist, policies and declaration. It includes all six approved public pass definitions as an organizer review/export, without internal allocations or private access codes. The website continues to feature only the current or next release.

Run `node scripts/export-registration-guidelines.mjs` after approved JSON changes to refresh the export. Review the generated copy and replace KonfHub’s existing “Before you book” and “Terms & Conditions” sections together; appending it would leave conflicting policies in place. Existing purchases are not changed by this local content revision.

Final prices, fees and checkout setup remain separate launch dependencies. The website booking switch remains off.

Validation: content/schema checks, TypeScript, targeted ESLint and production webpack build passed. Policy tests covered general rules, Cadet/Flight Deck scoping, duplicate policy IDs, invalid pass scopes and absence of the retired refund/transfer/waitlist/VIP workshop claims in the export. Browser checks verified the visible LinkedIn reminder on the ticket listing and Liftoff detail page, rendered reconciled policies and a narrow layout without horizontal overflow.
