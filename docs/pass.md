# Event-day passport

Every distinct activity QR scan adds one to the attendee’s total. The attendee page shows that score
with progress toward the bonus (more than 10 stamps), every exhibit as a visited or not-yet tile, and
the sessions, workshops and lounges stamped. Exhibit tiles and session details come from the static
agenda at build time, so they add no D1 reads. Mission groups are only reported on `/pass-admin`.
A booth volunteer can show the QR after a demo.
Scanning it again leaves the total unchanged. Gate registration stays with KonfHub.

Attendees sign in with their KonfHub booking ID alone. Each ticket has its own ID, so every
member of a group booking has a separate passport even when they share an email. The booking ID
opens the name and email imported from KonfHub; anyone holding a booking ID can see that profile.
Attendees can't create or edit records. An unknown booking ID tells the attendee to visit the help
desk, where staff add the person or correct a name or email. The signed-in passport
shows the attendee's name, email,
booking ID, activity score, completed mission count, last sync time, and an in-app Showcase view
with hall, track and format tags linked to `/agenda`.
Staff record arrival and swag handover at `/pass-desk`. Arrival adds a stamp. Swag status is returned only to the desk.

This is the one exception to the static-only setup: a Cloudflare Pages Function with a D1 database.
It holds attendee names, emails and booking IDs, so it is separate from `content/devfest.sqlite` and is
deleted after the event.

| Part | File |
| --- | --- |
| Attendee page | `src/app/pass/page.tsx` → `/pass` |
| Staff desk | `src/app/pass-desk/page.tsx` → `/pass-desk` |
| Organizer dashboard | `src/app/pass-admin/page.tsx` → `/pass-admin` |
| API (`POST /api/pass`) | `functions/api/pass.js` |
| D1 schema and aggregate triggers | `cloudflare/pass-schema.sql` |
| Activity codes, SQL and printable QR cards | `scripts/pass-activities.mjs` ← `local/pass/activities.csv` |
| KonfHub export → passport SQL | `scripts/pass-attendees.mjs` |

Everything under `local/pass/` is ignored by Git. It holds the ops timetable, the KonfHub export and
generated SQL with personal data. Both repositories are public, so never commit these files.

## Setup

Run these from the repository root, signed in to the Cloudflare account that owns the Pages project
(`npx wrangler login`).

1. Create (or recreate) the database: `npx wrangler d1 create devfest-pass --location apac`
2. In the Pages project, open **Settings → Bindings**. Add a D1 binding named `DB` pointing to
   `devfest-pass`, once for **Production** and once for **Preview**. Bindings apply from the next deployment.
3. Create the tables, indexes and aggregate triggers: `npx wrangler d1 execute devfest-pass --remote --file=cloudflare/pass-schema.sql`
   Rerunning it on an existing database only adds missing tables, indexes and triggers; it keeps data.
4. In `local/pass/activities.csv`, use `cake-wallet` or `space-club` in the `mission` column for each step. Leave it blank for regular activities and set `required` to `yes` for the IIST address. For a scheduled row, `agenda_id` links to the published agenda and pulls `format`, `hall`, `track` and slot times automatically. Run `npm run content:generate` after an agenda edit, then regenerate and reimport the activities. Update exhibit, activity and feedback times directly in the CSV. Existing stamps count retroactively. Run `npm run pass:activities` and
   `npx wrangler d1 execute devfest-pass --remote --file=local/pass/activities.sql`.
   Codes are created once and kept, so rerunning after a time change doesn't invalidate printed cards.
   Print `local/pass/cards.html` (A5, one card per page) or use the individual PNGs in `local/pass/qr-cards/`.
5. Import the roster: save the KonfHub attendee export as `local/pass/konfhub.csv`, then run
   `npm run pass:attendees -- local/pass/konfhub.csv` and execute `local/pass/attendees.sql` the same way.
   The script prints the columns it chose. Override them with `--booking`, `--email`, `--name` or `--pass` if they're wrong.
   It stops if one booking ID belongs to several names, which means the column is a group order ID rather than the per-ticket ID.
   Rerun it on the morning of the event and during the day, because sales continue. Upserts keep existing stamps.
6. Put the Google Form’s public URL in `PASS_FEEDBACK_FORM_URL` in Pages to show it in Passport.
   Set the same variable when running `npm run pass:activities` to print a feedback QR that opens the form.
   Share the six-character code from `local/pass/feedback-confirmation.txt` after attendees submit
   the form. To show it automatically, paste the prepared message into the form’s confirmation
   message. Attendees enter the code in Passport to check off feedback. Keep the code off public
   signage. The shared code records the Passport check-in independently of the form response.
   The configured feedback check-in window is 17:00–17:40 IST.
7. Set `PASS_STAFF_KEY` as an encrypted Pages secret in each environment that uses the desk. Use at least 24 random characters (for example, from `openssl rand -hex 24`) and share the key with desk staff only. The page is unlisted and the API checks the key on every staff request.
8. To enable the organizer dashboard, set `PASS_ADMIN_PASSWORD` as a separate encrypted Pages secret.
   The dashboard checks this secret on each request and returns aggregate counts.
9. Add a Cloudflare rate limiting rule on `/api/pass`. Keep it generous (for example 100 requests per 10 seconds
   per IP), because venue Wi-Fi and mobile carriers put many phones behind one IP address.

Deploy through the usual PR and preview. On the preview's `/pass`, sign in with an imported booking ID
and type a code whose window is open. To test outside the event hours, add a temporary activity:
`INSERT INTO activities (code, title, kind) VALUES ('TEST01', 'Test', 'session')`. Delete its stamps and the row afterwards.

## How it behaves

- Participants sign in with their booking ID on each new device. Booking IDs missing from the roster are sent to the help desk.
- Once signed in, the passport snapshot is stored in `localStorage` so reopening `/pass` to showcase a profile costs zero D1 reads. Live syncs run only on sign-in and QR scans; there is no Refresh button. Desk-recorded arrival appears with the attendee's next scan.
- The desk opens a passport by booking ID only; there is no name or email search. If an attendee has lost their ID, find it in their KonfHub email or the KonfHub dashboard before adding them, to avoid a duplicate walk-in. **Add a new person** (always visible) creates a passport for someone missing from the roster and records arrival. Enter their KonfHub booking ID, or leave it blank to generate a `WALK####` ID for the attendee to sign in with. **Edit name or email** on the attendee card corrects the record (check photo ID before changing a name).
- Each activity code counts once per booking ID. The API caches the `activities` catalog per isolate (30-minute TTL, auto-reloading on unknown codes, so an edited time window can take up to 30 minutes to apply) so attendee calls read only that participant's rows.
- Scheduled session and workshop check-ins open 15 minutes before the agenda start and close 15 minutes after the agenda end. Exhibit, activity and feedback times are exact when supplied. Blank times mean the full event date. Input is IST, and D1 compares UTC timestamps.
- The phone queues codes during connection loss and retries while the page is open. The server checks the activity window when it receives a scan.

## Organizer counts

Open `/pass-admin` and enter the organizer password to view each activity code’s check-in count,
latest check-in, and window in IST. Filter by workshop, session, exhibit, activity or feedback, and by
whether check-in is open, upcoming or closed. Totals (`arrivals`, `swagHandovers`, `checkins`, `participants`,
`feedbackCheckins`) are maintained in O(1) via D1 triggers on `stamps` and `desk` into `activity_stats`
and `passport_totals`. The dashboard uses manual refresh only (no background polling).

Run this read-only query in the D1 console to inspect per-activity counts including zero-scan items:

```sql
SELECT a.title, a.kind, a.hall, (a.mission IS NOT NULL) AS special_mission, COALESCE(s.checkins, 0) AS participants
FROM activities a
LEFT JOIN activity_stats s ON s.code = a.code
ORDER BY participants DESC, a.title;
```

## After the event

1. Save the aggregate numbers you want (check-ins per activity, mission completions). Don't export emails or booking IDs.
2. Delete the database with `npx wrangler d1 delete devfest-pass` and remove the `DB` binding.
3. Delete `local/pass/konfhub.csv` and `local/pass/attendees.sql`.
4. Remove `functions/`, `src/app/pass/`, `src/app/pass-desk/`, `src/app/pass-admin/` and the passport scripts in a PR, or keep them for the next edition.

## Local testing

`npx wrangler pages dev out --d1 DB=devfest-pass` serves the page and API on port 8788 with a
local D1 under `.wrangler/` (ignored). Without a Wrangler config file, `d1 execute` can't reach that
local database. For the organizer dashboard, save `PASS_ADMIN_PASSWORD` in the ignored
`local/pass/.env.admin` file and add `--env-file local/pass/.env.admin` to the Pages dev command.
Build the Pages export first with `npm run build:cloudflare`, then open `/pass` or `/pass-admin`. Make one request first, then load the schema directly:
`sqlite3 .wrangler/state/v3/d1/miniflare-D1DatabaseObject/<hash>.sqlite < cloudflare/pass-schema.sql`.
