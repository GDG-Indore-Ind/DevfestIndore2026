# Workshop reconciliation — 23 October 2026

Public records were checked against the [official GDG Indore archive](https://gdg.community.dev/gdg-indore/#eeSGPsrOVmy), each linked event's date and structured speaker listing, the organizer workshop sheet in docs/source-archive/spreadsheets/, and the [supplied photo folder](https://drive.google.com/drive/folders/1PHF1l0cgSZZYGvKaFh3kux4dlUV7deTt). Source files remain reference material; the application reads only canonical JSON.

The public directory contains 13 campus records, all listed in GDG Indore's public past-events archive: 13 exact event links and 10 matched campus photographs. The original records are preserved in docs/source-archive/workshops-before-reconciliation-2026-10-23.json.

## Corrections

- Replaced repeated conference photos and generic Instagram links with matched campus photos and exact workshop pages. Removed unsupported specific talk titles and descriptions; official event tags support the broader AI & Google Cloud label.
- Corrected Prestige to PIEMR and Aurobindo to Sri Aurobindo University. Dates now come from official listings rather than proposed planning dates.
- CDGI's official structured speaker listing identifies Mradula Mittal; Medicaps and IIT Indore identify Soham Sharma. IPS retains Priyal Jain, supported by the sheet and structured speaker listing despite contradictory event-description prose.
- Malwa, NMIMS and SKITM were unconfirmed/not started in the organizer sheet and have no matching official listing in the checked series. They are held outside the public archive pending confirmation. The user's shared chapter URL was used as a source, not interpreted as confirmation.
- Checked the GDG Indore past-events archive through the September 15 listing. IIT Indore's GDG Cloud Indore event does not appear in GDG Indore's archive, so it is held outside public JSON.
- Vaishnav is marked Done in the organizer sheet but does not appear in GDG Indore's archive and has no event page, date or photograph. It is held outside public JSON pending an official archive listing.
- Symbiosis and LNCT have official completed event listings; their older planning statuses were superseded by those records.

## Public records

| ID | Campus | Date | Official source | Photo |
| --- | --- | --- | --- | --- |
| ws-1 | Acropolis Institute of Technology and Research (AITR) | 2026-09-21 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-acropolis-college-exclusive-for-acropolis-college-students-1/) | Matched campus photo |
| ws-2 | Institute of Engineering & Technology, DAVV (IET DAVV) | 2026-09-18 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-iet-davv-college-exclusive-for-iet-davv-college-students/) | Matched campus photo |
| ws-3 | Prestige Institute of Engineering Management & Research (PIEMR) | 2026-09-15 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-prestige-college-exclusive-for-prestige-college-students-1/) | Matched campus photo |
| ws-4 | SAGE University Indore | 2026-09-23 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-sage-college-exclusive-for-sage-college-students/) | Matched campus photo |
| ws-5 | Sri Aurobindo University | 2026-09-23 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-aurbindo-college-exclusive-for-aurbindo-college-students/) | No verified photo |
| ws-6 | IPS Academy, Institute of Engineering and Science | 2026-09-24 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-ips-college-exclusive-for-ips-college-students-2/cohost-gdg-indore/) | Matched campus photo |
| ws-7 | Shri Govindram Seksaria Institute of Technology and Science (SGSITS) | 2026-09-24 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-sgsits-college-exclusive-for-sgsits-college-students/cohost-gdg-cloud-indore/) | Matched campus photo |
| ws-8 | Chameli Devi Group of Institutions (CDGI) | 2026-09-28 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-cdgi-college-exclusive-for-cdgi-college-students-1/) | Matched campus photo |
| ws-9 | International Institute of Professional Studies (IIPS DAVV) | 2026-10-05 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-iips-davv-college-exclusive-for-iips-davv-college-students-1/cohost-gdg-on-campus-iips-international-institute-of-professional-studies-davv-indore-india/) | Matched campus photo |
| ws-10 | Medi-Caps University | 2026-10-05 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-medicaps-college-exclusive-for-medicaps-college-students/) | Matched campus photo |
| ws-11 | Indore Institute of Science and Technology (IIST) | 2026-10-07 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-iist-college-exclusive-for-iist-college-students-1/) | Matched campus photo |
| ws-13 | Symbiosis University of Applied Sciences | 2026-10-16 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-symbiosis-college-exclusive-for-campus-college-students/cohost-gdg-indore/) | No verified photo |
| ws-14 | Lakshmi Narain College of Technology (LNCT Indore) | 2026-10-15 | [Event page](https://gdg.community.dev/events/details/google-gdg-cloud-indore-presents-hands-on-workshop-lnct-college-exclusive-for-lnctindore-college-students/cohost-gdg-cloud-indore/) | No verified photo |

## Validation and preview

Content validation, TypeScript, changed-file ESLint and the production webpack build pass. Negative probes confirm rejection of chapter URLs, cross-campus photo reuse and missing image assets. Desktop and 375px mobile previews cover search/reset, a matched photo dialog, Escape/focus return, direct links and overflow.

## Registration terms

Register now has an asterisk associated with the visible Terms & conditions link. The website keeps the full pass descriptions, eligibility, inclusions and registration rules as originally planned, including details the organizer chooses to hide on KonfHub. The website copy remains unchanged unless the organizer approves a different version. No remote dashboard content was changed.

## KonfHub widget

The organizer subsequently supplied the generated Standard widget code. Register now moves to the embedded booking section; the direct KonfHub fallback retains saved referral coupons. The exact supplied widget URL is preserved. The live widget currently shows Liftoff as Coming Soon, so attendee details, payment and purchase confirmation remain untested. No purchase or registration was submitted during testing. See `docs/konfhub-widget-2026-10-23.md` for integration and color guidance.
