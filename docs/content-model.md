# Event content model

SQLite is the single editable source of approved public event information. The website is a publication of that information; registration, proposals and payments remain external responsibilities.

## Records and ownership

| Table | Grain / key | Owned facts |
| --- | --- | --- |
| `events` | One event occurrence; `id` | Dates, venue, series, official links, reported figures, registration policy document and booking handoff |
| `people` | One person; `id` | Current name, job title, employer, bio, photo and links |
| `event_people` | One person at one event; `(event_id, person_id)` | Event profile, historical source and official roster position |
| `event_person_roles` | One role a person holds at an event; `(event_id, person_id, kind)` | Role kind, label, listing order, responsibilities or ambassador track/community |
| `rooms` | One space at one event; `id` | Name, description and presentation order |
| `sessions` | One programme item at one event; `id` | Format, title, abstract, room, timing, topics, resources and optional promotion copy |
| `session_people` | One presenter assignment; `(session_id, person_id)` | Presenter order and optional appearance-specific profile |
| `session_organizations` | One organization presenting a session; `(session_id, organization_id)` | Presenting organization and order |
| `organizations` | One organization or collective; `id` | Name, description, artwork and public links |
| `partnerships` | One specific contribution; `id` | Organization, event/scope, contribution description, publication and display metadata |
| `passes` | One admission offer at an event; `(event_id, code)` | Price, eligibility, booking route, published/sold-out snapshot, offers and inclusion-set reference |
| `pass_inclusion_sets` | One reusable entitlement list at an event; `id` | Exact ordered benefits; shared only where entitlements are identical |
| `media` | One published photograph/clipping; `id` | Asset path, caption, dimensions, event/session, publication date and attribution |

Sessions use a common model for talks, workshops, exhibits, panels, keynotes and addresses. Campus workshops are events with independent venues/dates and a session. A parent event is optional, never inferred. No separate archive table exists; previous editions remain event records, and preserved edition websites can still be published independently.

There are no generic content/entity tables, private planning records, event-user accounts, orders, issued tickets, payment records, workflow engines or upload services.

## Relationships and small documents

Foreign keys connect entities. A session's room and a pass's inclusion set must belong to the same event. Presenter/organization links are unique, and deleting a session removes its links without deleting identities. Referenced people cannot be deleted accidentally. Event covers and workshop media retain their own protected references.

Small owned values remain JSON columns: social links, venue details, responsibility lists, resources, eligibility prose, inclusion lists, statistics and the registration policy document. These do not need separate tables and identities. Roles are the exception: they are rows in `event_person_roles`, whose checks tie each kind to its own details and whose rows are removed with their `event_people` parent. JSON syntax is constrained in SQLite; public shape/business checks run before publication.

A presenter assignment implies a speaker at that event. An `event_person_roles` speaker row is optional for announcement labels/order or a speaker whose session is not known. It is never a required duplicate of an assignment. Historical `official_speaker_order` preserves a sourced roster without a second speaker ID array.

Person identity stays current. Event profiles override current details, and session profiles override event details. Historical job titles/employers imported from sessions remain intentional snapshots. Collective presenters belong to organizations; the compatibility publication view can render them with the existing group profile presentation.

## Naming and precision

SQL uses plural `snake_case` table names and `snake_case` columns; TypeScript uses `camelCase`. IDs remain stable existing strings. Pass codes are scoped to events. `display_order` is display order, `running_order` is programme order, and presenter order belongs to the assignment.

Event timestamps (`starts_at`) retain their offset. `start_date` supports date-only evidence, and `timezone` identifies the event's display zone. Session `start_time` is event-local 24-hour `HH:MM`, enforced by a check because the agenda sorts on it. Each event has exactly one of `starts_at` and `start_date`. Unknown session text is NULL, never an empty string. Unknown dates/times remain NULL; zero is never used as an unknown price. Money is integer minor units with explicit currency, currently INR.

The database contains approved facts. Publication switches are distinct from event selection; the featured event is selected in `src/content/site.ts`, rather than repeated as mutable `current` flags. The public adapters derive the older `current`/`past` and `confirmed`/`archived` presentation values. These are not extra authored states.

## Publication boundary

1. `scripts/lib/database.ts` opens the database read-only for publication, with foreign keys enabled. Writable connections are limited to editor/import/migration/photo tooling.
2. `scripts/lib/project-content.mjs` reads typed tables and derives the six public collections expected by the existing page views.
3. `scripts/lib/content.mjs` checks shapes, assets, references, policies, public links, FAQ substitutions and historical report consistency. Zod under `src/content/schema/public/` describes these output contracts, not the canonical database.
4. `scripts/generate-content.mjs` writes ignored `src/content/generated/*.json` files only after validation. Components import these snapshots and never SQLite or its driver.
5. Next.js prerenders the site. There is no content API, database network dependency or deployed write path. Production changes require a rebuild.

The six generated collections are compatibility publication contracts, not six sources to edit. Keeping those contracts avoids a page rewrite and preserves approved content while canonical ownership changes underneath.

Publication reads and SQL exports use a single read transaction. Concurrent editing must not combine an old relationship table with newer session or identity rows in one artifact.

## Independence of facts

- Topic/category is descriptive metadata. It never decides whether a session keeps its organizations, presenters, resources or appearance profiles. `talk`/`activity` are presentation adapters over the same `sessions` table, selected from format and presenter relationships.
- Source reference, summary, series, theme, reported figures, cover and recording belong to an event. Selecting that event for the main website does not remove these facts from its public contract.
- Organization-led items use the same current → event → appearance profile precedence as speaker-led items. Their category, resources, source URL and profile overrides remain available in the public programme.
- Archive speaker listings follow presenter assignments across both speaker-led and organization-led items, including workshops and panels.
- FAQ placeholders share one vocabulary between validation and rendering. Policy placeholders read `registration_policies`; unresolved placeholders fail instead of becoming empty text.

`src/content/copy.ts` owns editorial prose, FAQs, theme descriptions and UI labels. `src/content/site.ts` owns featured-event selection and presentation switches. Neither is a database-shaped CMS. Event-dependent prose uses the existing canonical fact substitutions. Exhibit highlights are session-owned so a second list cannot independently claim an exhibit is confirmed.

## Provenance, review and recovery

| Information | Source / trace |
| --- | --- |
| Proposal handling | Sessionize; approved publication records are curated locally |
| Live ticket availability/payment | KonfHub; website flags are deliberate publication snapshots |
| Historical event details and figures | Event `source_url` and `reported_stats`, retaining approximation |
| Historical appearances | Event participation source and appearance-specific profile |
| Partnerships | Contribution `source_url`, explicit scope, no guessed year/tier |
| Photos and press | Media attribution, publication and date fields |
| Content changes | Git versions of the SQLite file and deterministic SQL export |
| JSON migration | `content/migration-report.json`, including full publication comparison |

`content/database.sql` is generated data-only SQL, ordered deterministically by table/key. Review it alongside the binary database change. `npm run db:check` checks SQLite integrity, foreign keys and export parity. Recovery applies versioned schema migrations and then this export into a new database. Existing files are never overwritten.

The one-time `scripts/migrate-json-to-sqlite.mjs --source <directory> --output <new-file>` importer accepts the six former JSON sources recovered from Git. Normal development/builds do not use them. It verifies complete publication equivalence, accounting only for explicit default flags, default talk format and policy grouping order. Every original identity and authored role is checked.

## Scope for later changes

A hosted database can replace the local connection without changing the publication boundary. Moving to PostgreSQL requires dialect-specific DDL/type migration and a tested data import; using Drizzle does not make that automatic. A specialized editor can group related writes into one transaction. Repeated session occurrences or separate draft/published schedules should be introduced only when those workflows are actually needed.
