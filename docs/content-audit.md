# Content review — 14 November 2026

Migration preservation and factual completeness are separate checks. Comparing the earlier Git records with the current publication found no missing person/group, programme or organization IDs. That does not establish that the earlier information was complete, current or correct.

## Corrected publication paths

- Team and ambassador views now use approved event-specific profiles, consistent with speaker views. Previously those views always used the current global profile.
- Workshop photos now expose the event already known through their session. The event is derived, not duplicated into another database field. This resolves the association for 10 existing workshop photos.
- Publication rejects a media record whose explicit event conflicts with its session's event.
- Category changes no longer reclassify organization-led sessions as speaker-only talks or discard organization links. Metadata and appearance profiles are retained for every programme format.
- The featured event now retains its summary, source, series, cover, theme, reported figures and recording in the publication contract, just as historical events do. This does not fill fields whose values are still unknown.
- FAQ policy placeholders resolve from the canonical registration document. Validation and rendering now share their token vocabulary and reject unresolved placeholders.
- Publication and reviewable SQL exports read one consistent database snapshot.

## Content needing evidence or organizer input

| Area | Finding | Next input needed |
| --- | --- | --- |
| Current speaker profile | Salman Faris has no bio, photo or job title. These were also absent in the earlier JSON. No matching unlinked person photo exists in the repository. | Approved bio, title and photo |
| Current session descriptions | Descriptions are empty for Kartikey Rawat's talk, Akash Kamerkar's talk and workshop, and Vinayak Gavariya's talk. These were already blank in the earlier JSON. | Approved abstracts |
| Timetable | All 10 current programme entries have no start time; seven have no duration. The public page explicitly says timings are to be announced. | Confirmed timetable; do not treat pending times as migration loss |
| Pending programme | The keynote title and panel participants remain unannounced. | Confirmed titles and participants |
| Current event reference | The current event has no `source_url` or summary. Earlier editions have source URLs. | Official event reference and approved summary |
| Archive coverage | DevFest 2022/2023 and CCD 2024 have no session records. CCD 2023 has a six-person official roster but no session records. | Edition-specific programme sources |
| Older editions | The event registry begins in 2022, while homepage prose refers to community events since 2014. | Sources for earlier editions; do not invent dates or event records |
| Hidden VIP benefits | The stored VIP inclusion set includes lunch with delegates, while `docs/konfhub.md` says this was absent from the final brief. VIP is currently hidden. | Resolve the conflicting references before publishing that offer |

These are review items, not instructions to fill unknowns with guesses. No prices, eligibility rules, public participation claims or ticket visibility were changed by this review.

## Evidence used

- Earlier records: `git show HEAD:content/people.json`, `programme.json`, `event.json`, `organizations.json`.
- Current records: `content/devfest.sqlite`, read through the publication loader.
- Organizer reference: `docs/konfhub.md` (contains dated historical updates and needs reconciliation where it conflicts with current records).

This is a dated review snapshot. Update or resolve items as verified content arrives; it is not another editable source for website facts.
