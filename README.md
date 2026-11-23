# DevFest Indore 2026

The attendee website for GDG DevFest Indore 2026. Built with Next.js App Router, React and checked-in SQLite content, published as static pages.

## Run locally

Use the Node.js LTS version pinned in [`.tool-versions`](.tool-versions). With
mise, run `mise install` from this directory to install the pinned version.

```sh
npm install
npm run dev
```

Open [the local preview](http://localhost:3000). The development badge is hidden; compile and runtime errors still appear when needed.

## Edit content

Read [the content editing guide](content/README.md). Public event facts live in **`content/devfest.sqlite`**, edited with `npm run db:studio`. The build validates SQLite and generates browser-safe content views; no database service is deployed.

- `src/db/schema.ts` and its migrations define the relational model.
- `content/database.sql` is the generated, reviewable export. After editing the database, run `npm run db:export` and commit both files.
- `src/content/copy.ts` owns page prose, FAQs and interface text; `src/content/site.ts` owns website selection and presentation switches.
- Add person photos with `npm run photos`. Development automatically refreshes its content snapshot after database edits.
- `npm run db:restore -- --output /tmp/devfest-restored.sqlite` verifies recovery without overwriting your database.

## Attendee journeys

- Home introduces the event, Themes, ticket passes, exhibit and partner invitations, community photographs and venue.
- `/agenda` lists confirmed speakers and their sessions until the full schedule is published.
- `/tickets` shows open passes and their inclusions above the embedded KonfHub checkout; sold-out passes sit below it without a Register action. Cadet sends students to `/ambassadors`; Commander registers in the widget. KonfHub owns live inventory, pricing and payment; there is no local release calendar. `events.booking_enabled` in SQLite controls the widget and direct fallback link.
- `/faq` holds the common questions followed by the complete registration guidelines (each guideline section keeps its anchor, such as `/faq#eligibility`); `/guidelines` redirects there. Short reminders stay beside Register, including the LinkedIn profile reminder and final-sale notice.
- `/partners` contains contribution options and the official partner form. `pages.partners.revealed` holds collaborator announcements until approved.
- `/venue` contains the verified photo, address, directions, map and check-in information.
- `/agenda` (with `/agenda/workshops`, `/agenda/speakers` and `/agenda/exhibits`), `/faq`, `/team` and `/ambassadors` provide supporting information; `/archive` holds past editions, speakers, sponsors, campus workshops and photographs.

The header keeps Get tickets visible. Section navigation travels along its bottom border. Referrals survive the KonfHub handoff without promising a discount. Sessionize owns talk proposals. There is no custom admin, database or payment flow.

## Validate and build

```sh
npm run content:validate
npm run check
npm run build
```

Where the local Turbopack build cannot run because of process restrictions, use `npm run build -- --webpack`. Check changed pages on desktop and mobile in both appearances before publishing.

## Code and release workflow

See [the contributor guide](docs/contributing.md) for the folder map and stylesheet ownership. Run `npm run format` after source edits; `npm run check` runs the local quality checks. The pull-request workflow also builds the application.

Work on the checked-out branch; ask before creating or switching branches or using a separate worktree. Review the Cloudflare Pages preview before merging. Check the configured remotes and confirm which repository and production branch Pages tracks before publishing. See [release instructions](docs/releasing.md).

## Project references

- [Documentation map](docs/README.md)
- [Engineering instructions](AGENTS.md)
- [Design system](design-system.md)
- [Information architecture](docs/information-architecture.md)
- [KonfHub setup](docs/konfhub.md)

Local changes are reviewed in Git. Publishing follows the repository’s normal deployment process; a local commit does not deploy the site.
