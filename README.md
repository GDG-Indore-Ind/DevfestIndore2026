# DevFest Indore 2026

The attendee website for GDG DevFest Indore 2026. Built with Next.js App Router, React and checked-in JSON content.

## Run locally

```sh
npm install
npm run dev
```

Open [the local preview](http://localhost:3000). The development badge is hidden; compile and runtime errors still appear when needed.

## Edit content

Read [the content editing guide](content/README.md). All editable public records belong in `content/*.json`; typed views in `src/content/` connect them to pages. JSON Schemas and reference validation run before development and builds.

- `event.json`: current and past events, venue, official links, tickets, booking settings and policies.
- `people.json`, `programme.json`: person profiles, photos and roles; talks and campus workshops reference their speakers. Add photos with `npm run photos`.
- `organizations.json`: organization artwork and confirmed, ecosystem or historical relationships.
- `pages.json`: page wording, homepage themes, FAQs and the partner reveal switch.
- `gallery.json`: community photographs.

People and organizations are defined once and referenced by stable IDs. Publish only confirmed records. Historical appearances and community logos never imply current participation.

## Attendee journeys

- Home introduces the event, Themes, ticket passes, exhibit and partner invitations, community photographs and venue.
- `/agenda` lists confirmed speakers and their sessions until the full schedule is published.
- `/tickets` shows open passes and their inclusions above the embedded KonfHub checkout; sold-out passes sit below it without a Register action. Cadet sends students to `/ambassadors`; Commander registers in the widget. KonfHub owns live inventory, pricing and payment; there is no local release calendar. `event.json` → the current event’s `tickets.booking.enabled` controls the widget and direct fallback link.
- `/faq` holds the common questions followed by the complete registration guidelines (each guideline section keeps its anchor, such as `/faq#eligibility`); `/guidelines` redirects there. Short reminders stay beside Register, including the LinkedIn profile reminder and final-sale notice.
- `/partners` contains contribution options and the official partner form. `pages.partners.revealed` holds collaborator announcements until approved.
- `/venue` contains the verified photo, address, directions, map and check-in information.
- `/faq`, `/team`, `/events` and `/ambassadors` provide supporting information; `/archive` holds past editions, speakers, sponsors and photographs.

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

Work on the checked-out branch; ask before creating or switching branches or using a separate worktree. Review the Vercel preview before merging. Check the configured remotes and confirm which repository and production branch Vercel tracks before publishing. See [release instructions](docs/releasing.md).

## Project references

- [Documentation map](docs/README.md)
- [Engineering instructions](AGENTS.md)
- [Design system](design-system.md)
- [Information architecture](docs/information-architecture.md)
- [KonfHub setup](docs/konfhub.md)

Local changes are reviewed in Git. Publishing follows the repository’s normal deployment process; a local commit does not deploy the site.
