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

- `event.json`: event facts, official links and the registration-link switch.
- `tickets.json`: pass visibility, eligibility, inclusions, prices and policies.
- `people.json`, `participations.json`, `sessions.json`, `team.json`: identities and edition-specific participation.
- `partners.json`: organization artwork and confirmed, ecosystem or historical relationships.
- `pages.json`, `themes.json`, `faqs.json`: page wording and partner reveal control.
- `events.json`, `workshops.json`, `gallery.json`, `ambassadors.json`: archives, community activities, photographs and the ambassador directory.

People and organizations are defined once and referenced by stable IDs. Publish only approved records. Historical appearances and community logos never imply current participation.

## Attendee journeys

- Home introduces the event, Themes, exhibit and partner invitations, communities, past-event photographs and venue.
- `/tickets` shows explicitly visible passes, their inclusions and confirmed prices. Sold-out passes retain their details without a Register action. Other Register actions scroll to the embedded KonfHub checkout. KonfHub owns live inventory, pricing and payment; there is no local release calendar. `booking.enabled` controls the widget and direct fallback link.
- `/guidelines` contains complete registration and attendance rules. Short reminders stay beside Register, including the LinkedIn profile reminder and final-sale notice.
- `/partners` contains contribution options and the official partner form. `pages.partners.revealed` holds collaborator announcements until approved.
- `/venue` contains the verified photo, address, directions, map and check-in information.
- `/faq`, `/team`, `/events`, `/gallery`, `/past-events`, `/past-speakers` and `/past-sponsors` provide supporting information and historical records.

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

Use feature branches and review the Vercel preview before merging. This checkout has separate GDG organization and Soham remotes; confirm which repository and production branch Vercel tracks before publishing. See [release instructions](docs/releasing.md).

## Project references

- [Documentation map](docs/README.md)
- [Engineering instructions](AGENTS.md)
- [Design system](design-system.md)
- [Information architecture](docs/information-architecture.md)
- [Content refinement plan](docs/content-culling-plan-2026-10-22.md)
- [Historical artwork and cleanup](docs/historical-logos-and-cleanup-2026-10-23.md)
- [KonfHub setup](docs/konfhub-setup.md)

`docs/source-archive/` preserves original reference material and is never imported by application code. Earlier design/planning notes are historical context; canonical JSON owns current public facts.

Local changes are reviewed in Git. Publishing follows the repository’s normal deployment process; a local commit does not deploy the site.

The new directory layout is held behind `content/directory.json` until review is complete. Individually approved profiles can be linked from existing listings before that launch. Review packets are in `docs/profile-review/`; `content/approvals.json` distinguishes existing-public baselines from explicit approvals.
