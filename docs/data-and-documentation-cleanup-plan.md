# Data and documentation cleanup plan

Prepared 27 October 2026 for the current local working tree. This plan separates work that can be verified locally from decisions about publication, records and historical source material. It does not authorize a release or enable the wider directory. See [the cleanup inventory](data-cleanup-inventory.md) for the completed email and archive work and the per-person team reconciliation.

## Current state

- `content/*.json` is the public content source; schemas and `npm run content:validate` enforce structure, relationships and approval fingerprints.
- There are 71 people, including 29 ambassador directory memberships; two memberships have no selected LinkedIn profile and are hidden from the directory.
- `team.json` retains 13 undated legacy memberships and 14 organizer-confirmed assignments. The wider directory is disabled; one general person approval and 28 ambassador-only approvals are recorded.
- Forty unused person email fields were removed from the current content with narrowly scoped, baseline-linked redaction receipts; general approval scopes remain unchanged.
- The two source session spreadsheets and retired planning JSON containing contact information were removed from the tracked working tree at the organizer's request after verified copies were retained locally in an ignored directory. Existing Git history may still contain them; the workshop reference material remains tracked.

## Work completed

- Retired the previous invitation records and pages, preserved redirects to `/ambassadors`, and kept previously saved referral coupons working with the direct KonfHub fallback.
- Removed unused invitation-only styles after checking their selectors and shared rules.
- Replaced the mixed current/historical information-architecture document with a current route and navigation reference. Its previous content is preserved in `history/information-architecture-through-2026-10-27.md`.
- Updated the current README and design notes to use the Themes label and reflect the existing header, social links and community preview.
- Audited the source archive, removed affected tracked files after creating verified ignored local copies, and removed old email lines from local review packets.
- Removed unused person email fields and added tests ensuring the redaction receipts cannot approve unrelated changes or directory launch.
- Inventoried all 13 undated legacy team memberships against their confirmed current assignments; none has a separate 2026 participation record. Exact migration and full profile review remain outstanding.

## Next work, in order

1. **Continue the content inventory.** Inspect records and consumers by category, distinguishing current public claims, intentional historical facts, pending announcements and unused fields. Preserve stable IDs, confirmed participation and ticket policies. Do not treat absence of a direct property-name match as proof that data is unused.
2. **Maintain email redactions.** The affected IDs and scope are recorded in the inventory. Removing a field from the working tree does not remove it from Git history.
3. **Complete archive ownership review.** Choose shared private storage and an owner for the local copies. If history remediation is needed, plan it separately with repository owners; ordinary file deletion is insufficient.
4. **Reconcile team data.** Compare each undated membership and current assignment against exact edition and role evidence. Prepare a per-person migration proposal; obtain explicit confirmation for any unverified role or date. Migrate approved roles to participation records, avoid duplicated people and preserve currently published information. Do not infer past participation or turn an ambassador-only approval into a general profile approval.
5. **Prune remaining code and content.** Trace remaining unused fields, assets and styles to actual consumers, including conditional views and exports. Remove only confirmed dead material together with schema, typed view and documentation updates. Preserve records held for an approved future rollout, existing links and policy text unless explicitly changed.
6. **Validate and review.** Run `npm run content:validate`, `npm run check` and `npm run build`; test relevant pages and links at desktop/mobile widths in both themes. Compare before/after public content, sitemap, redirects and approval scopes. Review the Vercel preview using the documented release workflow before any publication.

## Decisions to make when the inventory is ready

- Who owns shared private storage for the removed archive files and any Git-history remediation?
- Which legacy team roles and exact editions are confirmed for migration?

These decisions are independent: documentation and verified dead-code cleanup can proceed without waiting for them. Do not delete historical event records, alter ticket policy, reset user changes, or publish as incidental cleanup.
