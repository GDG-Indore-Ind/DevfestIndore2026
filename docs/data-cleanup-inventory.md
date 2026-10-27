# Data cleanup inventory — 27 October 2026

This inventory contains IDs, counts and decisions, not contact details. It describes the local working tree, not a production release.

## Email-only cleanup

Removed unused person email fields from 40 baseline records. Each receipt in `content/approvals.json` binds the original baseline and the email-free revision. Existing baseline hashes and general approvals remain unchanged. Receipt IDs: abhishek-doshi, nikhilesh-tayal, ganesh-divekar, himanshu-jain, divyanshu-bhargava, ankit-sharma, mrinal-jain, shachita-jain, shashank-saxena, rahul-chautel, sunny-ralli, gautam-billore, srashti-jain, harsh-tonde, dhananjay-kumar, usha-ramani, varun-srinivas, abhishek-sharma, drijesh-ppatel, ramesh-rajini, jitendra-gupta, soumya-upadhyay, sudip-mazumder, adeen-shukla, prasad-seth, manish-gehlot, dr-gautam-billore, tushar-pal, akash-gangrade, darshan-kusumakar, priyal-jain, yash-jain, manan-chimnani, vikas-ratnawat, shubham-sharma, kunal-singh, tanmay-jain, mradula-mittal, aarti-jethaniya, meenal-saxena.

Person schemas no longer accept email fields. Existing personal email lines were also removed from local generated review packets; no other packet content was intentionally rewritten. These changes do not remove data from earlier Git history.

## Archive inventory

| Material | Finding | Current working-tree action |
|---|---|---|
| 2024 accepted-session spreadsheet | Email and contact-number fields | Verified copy in the ignored local archive; tracked copy removed at the organizer’s request |
| 2025 accepted-session spreadsheet | Email and contact-number fields | Verified copy in the ignored local archive; tracked copy removed at the organizer’s request |
| Retired planning JSON | Person email fields | Verified copy in the ignored local archive; tracked copy removed at the organizer’s request |
| Workshop spreadsheet | No email or phone-like values found by the local scan | Retained as reference; scanning is not proof of absence of all non-public data |
| Prior workshop JSON | No email or phone-like values found by the local scan | Retained as reference; scanning is not proof of absence of all non-public data |
| Local profile review packets | 40 email lines from old person records | Removed those lines, retaining other review material |

Private local copies are in `local_storage_private/source-archive-cleanup-2026-10-27/`; this ignored folder is neither a shared backup nor a guarantee of restricted access. The repository owner must choose shared private storage and separately assess whether existing Git history requires remediation.

## Team reconciliation

Each legacy membership below has a confirmed 2026 assignment in the person's `teamAssignments` in `people.json`; the assignment confirms the current category and responsibilities, not the date of the older membership or the rest of the person's profile. None has a separate 2026 participation record yet. These rows are migration candidates, not newly approved profiles. Review the exact role mapping and profile revision before migrating; preserve the undated legacy context until then.

| Person | 2026 category | Existing confirmed responsibilities | 2026 participation |
|---|---|---|---|
| Tushar Pal | Core Team | Event Lead; Community & Outreach Lead | Not yet recorded |
| Akash Gangrade | Core Team | Partnerships & Sponsorships Lead | Not yet recorded |
| Darshan Kusumakar | Core Team | Operations & Venue Lead | Not yet recorded |
| Priyal Jain | Core Team | Marketing & Communications Lead | Not yet recorded |
| Yash Jain | Core Team | Marketing & Communications Co-Lead | Not yet recorded |
| Manan Chimnani | Core Team | Design & Creative Co-Lead | Not yet recorded |
| Vikas Ratnawat | Core Team | Marketing & Communications Co-Lead | Not yet recorded |
| Shubham Sharma | Core Team | Community & Outreach Co-Lead | Not yet recorded |
| Kunal Singh | Core Team | Community & Outreach Co-Lead | Not yet recorded |
| Tanmay Jain | Volunteer | Marketing & Communications Co-Lead; Technology & Production Co-Lead | Not yet recorded |
| Mradula Mittal | Core Team | Design & Creative Lead | Not yet recorded |
| Aarti Jethaniya | Core Team | Pre-DevFest events; Design & Creative Co-Lead; Technology & Production Co-Lead | Not yet recorded |
| Meenal Saxena | Core Team | People & Volunteer Coordination Lead; Programme & Speakers Co-Lead | Not yet recorded |

Karan already has a 2026 participation record and is not in the 13 undated membership rows. Ambassador-only approvals do not authorize general profile pages or directory launch.
