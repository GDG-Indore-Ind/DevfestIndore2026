# Content and space refinement — 22 October 2026

Status: implemented locally on 23 October 2026. The historical community name wall remains on Home; moving it to the archive is deferred. This plan follows a source review of the current homepage, Tickets, Partners, Venue, Guidelines, FAQ and shared navigation. It builds on `information-architecture.md` and the latest organizer directions in `design-system.md`. The 20 October `website-culling-plan.md` records an earlier visual direction and must not be treated as the current brief.

## Goal and audience

Help prospective attendees understand the event, register, and prepare for arrival with less repeated reading. Give prospective partners a direct enquiry journey. Keep the approved orbital identity, real photographs and useful community context.

This is a content and layout pass, with existing routes, canonical data and publication controls retained. No new pages, ticket subpages, admin work or backend changes are proposed.

## Give each destination one main job

| Destination | Main job | Related detail |
| --- | --- | --- |
| Home | Explain this edition and invite attendance | Short programme, partner/community, history and venue previews |
| `/tickets` | Explain the featured pass and hand off to KonfHub | Essential eligibility, LinkedIn reminder and final-sale notice beside registration |
| `/guidelines` | Hold complete registration and attendance rules | Stable section links for specific policies |
| `/partners` | Explain ways to contribute and invite an enquiry | One application section and organizer contact |
| `/venue` | Help someone arrive | Photo, address, directions, map, check-in time and practical support |
| `/faq` | Answer specific questions briefly | Links to Tickets, Guidelines and Venue for detail |
| Archive pages | Document earlier events, people and organizations | Edition labels, sources and photographs |

Repeat short facts where they support a decision. Keep detailed explanations in their main destination. A date on Home and Tickets is useful; repeating the date through three sections of the Venue page is unnecessary.

## First batch: Tickets and partnership enquiries

### Tickets

Observed: the visible LinkedIn reminder is repeated in the checkout disclosure; a full three-step booking section follows the registration panel; policy disclosures repeat the dedicated Guidelines page. The panel itself has both a registration heading and a large Register button, followed by another Guidelines link. A separate support block repeats the global contact destination.

Proposed composition:

1. Compact title with date and venue.
2. Featured pass name, inclusions and eligibility, alongside the red Register action.
3. A short, prominent LinkedIn reminder immediately before the action, one sentence explaining the KonfHub handoff, the release window and the final-sale notice.
4. One contextual Guidelines link and a compact support line.

Remove the standalone three-step booking section and the two full policy/preparation disclosures. Consolidate duplicated non-transferability wording. Preserve all material rules on Guidelines and keep pass-specific restrictions visible before registration. Preserve `/tickets#attendee-policies` as a useful landing point for the short policy summary.

On mobile, the pass identity, eligibility and LinkedIn reminder must accompany the registration action without requiring readers to find a separate block. The direct KonfHub destination, referral handling and distinction between a published event page and an open pass release remain intact.

### Partners

Observed: the homepage teaser and ecosystem are reused in full on `/partners`, which then adds a separate application section. The teaser also has two headings communicating that announcements are coming soon.

Keep the homepage reveal treatment with one headline, one short explanation and the central **Be our partner** action. Keep the enlarged community logo grid. On `/partners`, use a concise introduction, the existing contribution options and one substantive application section with the official form and contact. Remove the repeated homepage teaser and full ecosystem wall from that page while announcements are held.

The reveal switch and existing collaborator card design must continue to work when announcements are approved. Keep historical affiliations explicitly dated. As a later refinement, consider moving the historical community name wall to the archive while retaining the visible community logo grid on Home.

## Second batch: Homepage and arrival layout

| Area | Proposed cut or consolidation | Retain |
| --- | --- | --- |
| Hero | Remove the topic strip that immediately precedes the same four programme controls. Shorten the descriptive paragraph and reduce four decorative slogans to one. | Android artwork, DevFest identity, large date/location, Get tickets and secondary Programme action |
| Programme | Keep the selected topic explanation and useful tags; remove the additional illustrative text flow where it repeats them. | Four topic controls, orbital graphic, Programme heading, short tagline, agenda status and CFP link |
| History | State the 2014 origin clearly without repeating the story in the overline, paragraph and timeline caption. Shorten the lead. | Timeline, accurate photo captions, carousel controls and the three archive destinations below |
| Home venue preview | Use address and check-in facts directly rather than another full event-date sentence. | Enlarged real photo and grouped directions/arrival actions |
| Venue page | Merge the introductory and venue-detail blocks; show event date and check-in time once. Pair the map with concise arrival information. | Real photo, full address, Directions action, map, ticket/ID reminder and practical contact |

## Third batch: FAQ and visual consistency

Keep the FAQ organized around actual questions. Shorten repeated pass descriptions and inclusion lists when Tickets already explains them; link to the current pass details instead. Preserve useful direct answers about entry, refunds and workshops, with links to the corresponding Guidelines sections. Keep the full rules on Guidelines and remove redundant procedural copy there only when its meaning survives elsewhere in the same page.

Use **Tickets**, **Programme**, **Guidelines**, **Venue & directions**, and **Be our partner** consistently. Keep navigation comprehensive enough to find these destinations. Header actions, homepage actions and footer links serve different moments in the journey; their presence alone is not grounds for removal.

## Space and element rules

- Remove redundant blocks before reducing margins. No font shrinking to fit more copy.
- Let section height follow content. Keep a consistent spacing scale with tighter gaps within a group and clearer gaps between sections.
- Reserve large filled controls for the main action in each context. Use ordinary text links for supporting destinations.
- Use cards for pass choices, logo groups, photographs and interactive content. Prefer simple headings, rows and separators for explanatory text.
- Keep the astronaut, photographs, community logos, accessible controls and intentional breathing room. Preserve the horizontal rocket navigation below the header.
- Give navigation distinct roles: header for global actions; rocket for sections on the current page; Explore and footer for the wider site. Check mobile access before removing any duplicate navigation link.

## Implementation and review

Start with Tickets and the Partners page because their repeated sections sit directly around the main actions. Then refine Home and Venue, followed by FAQ and the shared spacing treatments. Keep these as separate reviewable batches.

Editable public wording remains in `content/*.json`; policy facts remain in the existing ticket records rather than new page-specific copies. Preserve existing URLs, policy IDs, anchor links, metadata, referral behavior and partner publication state. Update the IA and content documentation when the implementation lands.

For each batch, compare desktop and mobile in both appearances. Check that the main action appears early, disclosures and navigation remain keyboard accessible, there is no horizontal overflow, and policy/eligibility details remain discoverable. Verify referral preservation and the outbound Register destination after ticket changes. Run the required content validation, TypeScript and relevant build checks for implementation changes.

No attendee interviews, first-click tests or measured before/after page heights were obtained for this proposal. The priorities above come from the current source structure and organizer requirements; conversion improvements are a hypothesis to validate, not a measured result.

## Implementation verification — 23 October 2026

- Content validation, TypeScript, lint on changed code and the 35-page production webpack build pass.
- Home, Tickets, Partners, Venue, FAQ and Guidelines checked at 1440px and 375px in light and dark appearance; no horizontal overflow. FAQ keyboard disclosure and section navigation targets checked.
- Register remains 76px high, with one adjacent LinkedIn reminder and the saved referral query preserved. All six revised routes return HTTP 200; the former Liftoff URL returns 308 to Tickets with its query preserved.
- All canonical policy records are unchanged; the six Guidelines sections retain complete policy coverage. FAQ validation rejects unknown categories, template tokens and external detail-link destinations.
- The partner reveal switch was tested locally: two collaborator cards return without repeating the ecosystem on the Partners page. The switch was restored to false before the final build.
- No deployment or external form changes were made. User favicon changes were excluded from this work.
