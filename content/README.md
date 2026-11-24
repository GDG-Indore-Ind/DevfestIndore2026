# Editing website content

**Edit event facts in `devfest.sqlite`.** Run `npm run db:studio` and open the URL printed by Drizzle Studio. It is a local editor; no database server or `/admin` route is deployed.

Everything in this database is approved public content. Keep private codes, phone lists, contracts and tentative planning elsewhere. Sessionize owns proposals; KonfHub owns live availability, eligibility enforcement and payments.

| Change | Edit |
| --- | --- |
| Dates, venue, official links, checkout switch | `events` |
| Person profile and photo path | `people` |
| Organizers, volunteers, ambassadors, speaker announcements/order | `event_person_roles` (one row per role), under an `event_people` row |
| Programme content and timing | `sessions`, `rooms` |
| Presenters and presenting organizations | `session_people`, `session_organizations` |
| Organization identity and contributions | `organizations`, `partnerships` |
| Pass price, eligibility, offers, visibility, booking destination | `passes` |
| Included benefits shared by several passes | `pass_inclusion_sets` |
| Photos and newspaper clippings | `media` |
| Registration rules and checklist | The event's `registration_policies`, `registration_checklist`, `registration_declaration` |
| Page prose, FAQs, themes and interface labels | `src/content/copy.ts` |
| Featured event and presentation switches | `src/content/site.ts` |

## Save, preview and review

```sh
npm run db:studio
npm run dev
```

Database and editorial edits automatically refresh the development snapshot. Validation errors appear in the terminal; invalid changes do not replace the last valid snapshot. A production build fails if content is invalid.

If this computer exhausts native filesystem watchers (`EMFILE`), start development with `WATCHPACK_POLLING=1000 npm run dev`.

After database edits:

```sh
npm run db:export
npm run check
npm run build
```

Commit **both `devfest.sqlite` and `database.sql`**. The SQL file is a deterministic generated export for readable review and recovery; never edit it by hand. `db:check` detects a stale export. Public snapshots under `src/content/generated/` are ignored build output, never another editing location.

Publishing still requires a deployment. A Studio save does not change the live website.

## Add a speaker or team member

1. Reuse an existing person ID, or create one in `people`. Keep IDs stable when names change.
2. Add the session in `sessions`, then link the person in `session_people`. That assignment is enough to make them a speaker; do not duplicate it as an event role.
3. For every non-presenter role, first add one `event_people` row for the person at that event, then one `event_person_roles` row per role. A role's `kind` is `speaker`, `core-team`, `volunteer` or `ambassador`; a person holds each kind at most once per event.
4. For someone announced before their session exists, add a `speaker` role. `title` optionally overrides the label ("Keynote speaker"); `listing_order` (from 1) sets the announcement order.
5. Organizers and volunteers use `core-team` or `volunteer` with `responsibilities: [{"area":"Programme & Speakers","level":"co-lead"}]`. Levels are optional; supported values are `lead`, `co-lead`, `coordinator`, `team-member`, `volunteer`. `listing_order` sets the position on the team page.
6. An ambassador role needs `track` (`student` or `professional`) and `community`. Only ambassadors with a usable personal LinkedIn profile appear in the directory. Never store private ambassador codes here.

SQLite rejects a role whose details do not match its kind: responsibilities belong to `core-team`/`volunteer` only, and `track`/`community` to `ambassador` only. Deleting an `event_people` row removes that person's roles at the event. A presenter with no other role needs no `event_people` row at all.

`event_people.official_speaker_order` records a past event's official roster position (from 0). It is a different fact from a role's `listing_order`; do not copy one into the other. In `event_people.profile`, optional `role`, `company`, `avatar`, `bio` and `socials` preserve event-specific details. `session_people.profile` can override these for a particular appearance. Historical profiles imported from the previous content remain snapshots.

Save a photo as `photos-inbox/<person-id>.jpg` (or PNG/HEIC), then run `npm run photos`. This creates `public/images/people/<person-id>.webp`, updates SQLite, refreshes its SQL export and regenerates public content. People without photos show initials. `npm run photos -- --localize` localizes existing remote photos.

## Programme and past events

- Session formats: `talk`, `keynote`, `panel`, `workshop`, `exhibit`, `address`. New talks need a title and description; category, room and timing can be omitted while unknown. Use `rooms.id`, not a repeated room name.
- Category describes the topic; it never changes the presenting organization or the available profile/resource fields. A session can name both people and organizations.
- `sessions.start_time` is the event-local time as 24-hour `HH:MM` (`09:30`, `14:05`); SQLite rejects any other spelling, because the agenda sorts on it. Leave unknown text (description, category, track, level, badge) empty/NULL rather than typing a blank string.
- An event has either `starts_at` (timestamp with offset) or `start_date` (`YYYY-MM-DD`), never both and never neither.
- `running_order` controls order before times are known. Room order is `rooms.display_order`.
- `sessions.promotion` optionally holds a short homepage exhibit highlight (`id`, `title`, `detail`). The homepage list derives from exhibit sessions, so it cannot outlive a removed exhibit.
- Campus workshops are `events.kind = "campus-workshop"` with their own venue, date and session. `parent_event_id` is optional; never infer an affiliation from a year.
- `events.starts_at` holds a timestamp when known; `start_date` supports a date without an invented time. `source_url` records the official source. Leave unknown campus dates absent.
- Prior conferences remain `events.kind = "conference"` and appear in the archive. `site.ts` selects the featured event. Archive cover photos must belong to that event.
- `reported_stats` contains only sourced figures: `registrations`, `rsvps`, `attendees`, `speakers`, `sessions`, `sponsors`, `professionals`, `students`, with optional `approximate: true`. Do not infer missing numbers.
- Media records use `kind: "photo"` or `"press"`. Workshop photos link to their session. Images remain files under `public/`; SQLite holds paths, captions, dimensions and attribution, not image blobs.

## Passes, partners and policies

Pass codes remain `liftoff`, `student` (Cadet), `professional` (Commander), `vip`, `last-orbit`, `observer`. Prices are **integer paise** (`price_minor`), with `currency_code: "INR"`; NULL means unconfirmed and zero means free. `is_published` controls cards; `is_sold_out` controls closed presentation. Keep those snapshots aligned with KonfHub. `booking_route: "ambassador"` routes Cadet through the directory. `events.booking_enabled` controls the checkout widget and direct fallback link.

Liftoff, Cadet, Commander and Last Orbit reference one standard inclusion set. VIP and Observer reference their own sets. Changing a set changes every pass using it; do not broaden a restricted pass accidentally. Benefits are an ordered JSON list of `{ "group", "label", "detail"? }`; groups are `access`, `essentials`, `lounges`.

Registration policies are one ordered event-owned document of sections: `{ "id", "title", "policies": [{ "id", "title", "text", "appliesTo"? }] }`. `appliesTo` lists stable pass codes. Website section references and the KonfHub export derive from that document. Run `node scripts/export-registration-guidelines.mjs` to print the text for KonfHub. Keep approved wording intact.

FAQ prose in `copy.ts` supports `{{date}}`, `{{venue}}`, `{{address}}`, `{{registrationTime}}`, `{{studentPrice}}`, `{{professionalPrice}}`, `{{groupOffer}}`, `{{entryPolicy}}`, `{{workshopPolicy}}` and `{{finalSalePolicy}}`. Policy placeholders use the event's policy document. Unsupported placeholders fail validation; do not duplicate a policy's full wording in the FAQ.

Partners reuse an organization ID. `partnerships.scope` is `event`, `historical` or `ecosystem`; only `event` has an `event_id`. Contribution types are `sponsor`, `collaborator`, `community`, `media`; never infer financial sponsorship. Unknown historical years remain unassigned. `is_published` controls partner visibility; `site.ts` has the overall reveal switch.

## Recovery and schema changes

```sh
npm run db:restore -- --output /tmp/devfest-restored.sqlite
```

Restoration applies tracked migrations, imports the reviewed SQL export and checks integrity. It refuses to overwrite any existing file. Without `--output`, it restores the default database only if that file is missing.

The schema lives in `src/db/schema.ts`. Generate a migration with `npm run db:generate`, review its SQL, test on a restored copy, then run `npm run db:migrate` and `npm run db:export`. Do not use schema push to bypass review. See [the model](../docs/content-model.md) and [release guide](../docs/releasing.md).
