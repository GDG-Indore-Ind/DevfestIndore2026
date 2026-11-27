# Event-day passport

Every distinct activity QR scan adds one to the attendee’s total. Selected activities also
appear on the special-mission checklist. A booth volunteer can show the QR after a demo.
Scanning it again leaves the total unchanged. Gate registration stays with KonfHub.

Attendees sign in with their KonfHub booking ID. Each ticket has its own ID, so every member of a group
booking has a separate passport even when they share an email. Only imported bookings (and walk-ins the
desk creates) can sign in; there is no self-signup. The signed-in passport shows the attendee's name, email, booking ID, activity score, completed mission count
and last sync time. The score is one point per distinct activity, including a special mission's
activity. The signed-in page shows the required IIST check-in and end-of-event feedback, plus expandable mission steps.
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
| D1 schema and mission selection | `cloudflare/pass-schema.sql` |
| Activity codes, SQL and printable QR cards | `scripts/pass-activities.mjs` ← `local/pass/activities.csv` |
| KonfHub export → passport SQL | `scripts/pass-attendees.mjs` |

Everything under `local/pass/` is ignored by Git. It holds the ops timetable, the KonfHub export and
generated SQL with personal data. Both repositories are public, so never commit these files.

## Setup

Run these from the repository root, signed in to the Cloudflare account that owns the Pages project
(`npx wrangler login`).

1. Create the database: `npx wrangler d1 create devfest-pass --location apac`
2. In the Pages project, open **Settings → Bindings**. Add a D1 binding named `DB` pointing to
   `devfest-pass`, once for **Production** and once for **Preview**. Bindings apply from the next deployment.
3. Create the tables: `npx wrangler d1 execute devfest-pass --remote --file=cloudflare/pass-schema.sql`
4. In `local/pass/activities.csv`, use `cake-wallet` or `space-club` in the `mission` column for each step. Leave it blank for regular activities and set `required` to `yes` for the IIST address. For a scheduled row, `agenda_id` links to the published agenda. Run `npm run content:generate` after an agenda edit, then regenerate and reimport the activities. Update booth and feedback times directly in the CSV. Existing stamps count retroactively. Run `npm run pass:activities` and
   `npx wrangler d1 execute devfest-pass --remote --file=local/pass/activities.sql`.
   Codes are created once and kept, so rerunning after a time change doesn't invalidate printed cards.
   Print `local/pass/cards.html` (A5, one card per page) or use the individual PNGs in `local/pass/qr-cards/`.
5. Import the roster (required: only imported booking IDs can sign in). Save the KonfHub attendee export as
   `local/pass/konfhub.csv`, then run `npm run pass:attendees -- local/pass/konfhub.csv` and execute
   `local/pass/attendees.sql` the same way. The script prints the columns it chose. Override them with
   `--booking`, `--email`, `--name` or `--pass` if they're wrong. It stops if one booking ID belongs to
   several names, which means the column is a group order ID rather than the per-ticket ID.
   Rerun it on the morning of the event and during the day, because sales continue. Upserts keep existing stamps.
   A ticket bought after the last import can still get a passport at the desk.
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
9. Add a Cloudflare rate limiting rule on `/api/pass`. The booking ID is the attendee's only
   credential, so this limits guessing. Keep it generous (for example 100 requests per 10 seconds
   per IP), because venue Wi-Fi and mobile carriers put many phones behind one IP address.

Deploy through the usual PR and preview. On the preview's `/pass`, sign in with an imported booking ID
and type a code whose window is open. To test outside the event hours, add a temporary activity:
`INSERT INTO activities VALUES ('TEST01', 'Test', 'session', NULL, NULL)`. Delete it and its
check-ins afterwards.

## How it behaves

- Participants enter their booking ID on each new device. An unknown ID is refused with a pointer to the desk.
- The desk opens a passport by booking ID, or searches by ticket email or part of a name when the ID is lost
  (check photo ID before choosing). For a ticket missing from the roster it creates a walk-in passport and records arrival.
- Each activity code counts once per booking ID. The API also returns the mission checklist without exposing unscanned codes.
- Scheduled session and workshop check-ins open 15 minutes before the agenda start and close 15 minutes after the agenda end. Booth and feedback times are exact when supplied. Blank times mean the full event date. Input is IST, and D1 compares UTC timestamps.
- The phone queues codes during connection loss and retries while the page is open. The server checks the activity window when it receives a scan.
- Completion records a scan. Anyone holding a booking ID can open that passport; physical presence is not verified.

## Organizer counts

Open `/pass-admin` and enter the organizer password to view each activity code’s check-in count,
latest check-in, and window in IST. Filter by workshop, session, booth or feedback, and by
whether check-in is open, upcoming or closed. Totals include desk arrivals, swag handovers,
activity check-ins, distinct participants and feedback check-ins. Counts reflect Passport
records, including when feedback was marked complete. The page refreshes every 30 seconds
while visible and can also be refreshed manually.

Apply the schema before importing the activity SQL, including on an existing D1 database.
The mission, step and desk tables preserve existing codes and check-ins. Run this read-only query
in the D1 console to include activities with zero scans:

```sql
SELECT a.title, a.kind, (m.code IS NOT NULL OR s.code IS NOT NULL) AS special_mission, count(c.booking_id) AS participants
FROM activities a
LEFT JOIN special_missions m ON m.code = a.code
LEFT JOIN passport_mission_steps s ON s.code = a.code
LEFT JOIN stamps c ON c.code = a.code
GROUP BY a.code
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
