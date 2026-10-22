# DevFest Indore 2026

The main event website for DevFest Indore 2026, organized by GDG Indore. The event brings working developers and technical enthusiasts together for applied AI, cloud architecture, modern systems design, physical AI and hands-on learning.

The site should help visitors understand the experience, choose a ticket and plan their day. Its copy and design are being revised. Current public facts are maintained in `content/`; older planning notes and examples are not publishing inputs.

## Manage website content

The [content editing guide](content/README.md) explains the canonical JSON records for people, speakers, sessions, partners, tickets and other site data. Edit `content/*.json`; pages read them through `src/content/`. `npm run content:validate` runs automatically before development and production builds. Original spreadsheets are reference archives and the app no longer depends on XLSX.

## Event brief

The [20 October brief](docs/event-final-2026-10-20.md) is the provenance for event/pass facts now maintained in `content/event.json` and `content/tickets.json`. Update those JSON records when organizer-approved facts change.

Program planning context recorded on 19 October 2026:

- **Date:** Saturday, 28 November 2026.
- **Venue:** Essentia Luxury Hotel Indore. Date and venue are confirmed by the organizer.
- **Organizer:** GDG Indore. Other participating communities are partners.
- **Audience:** Working developers and technical enthusiasts, including students, technical leaders, founders and exhibition visitors. Working developers anchor the technical program.
- **Opening:** A keynote by the Space Club leader and a panel with space researchers and technologists. The keynote subject has not yet been supplied.
- **Following the opening:** Technical sessions and workshops run in parallel. Areas include AI agents, production systems, physical AI and robotics.
- **Technical level:** Comfortable writing code, while remaining beginner friendly. The emphasis is on understanding systems beyond writing code.
- **Workshops:** Planned activities include building AI agents, solving problems and games. Specific themes and outcomes remain to be supplied.
- **Exhibitions:** Company products, hobby projects, games and a substantial Qualcomm exhibit. Specific exhibit details remain to be supplied.

The intended attendee experience is to learn something new about AI or space, try a hands-on activity, meet people and leave with shared memories. These are program goals, not guaranteed outcomes for every attendee.

## Ticket access

Six final passes: Liftoff (70), Cadet (200), Commander (250), Flight Deck (20), Last Orbit (100, subject to capacity) and Observer (100). The page at `/tickets` shows only the current release; the full six-category inventory is retained in source data. Liftoff is the only featured offer before 24 October. Prices are not yet supplied. Observer excludes food, swag and workshop halls; Flight Deck requires a private VIP code. All purchases are final, non-refundable and non-transferable.

`content/tickets.json` owns the confirmed public pass data. See [KonfHub setup](docs/konfhub-setup.md) for exact windows, per-order limits, student ID requirements and launch checks. Do not infer additional benefits from earlier plans.

## Copy and design direction

Present the event as an event showcase with concrete information about what people can attend, try and explore. The planning documents inform the writing; their structure and internal terminology should not become the website structure or public copy.

- Use direct, specific language and sentence case. Remove inflated claims, broad slogans and repetitive audience or technology lists.
- Give each section one purpose. Publish supported facts; omit speculative speakers, metrics, partners and benefits.
- Let typography, alignment and spacing establish hierarchy. Use a consistent page width and deliberate color, with one clear primary action.
- Keep the DevFest identity and community warmth. Use real event photographs when supplied.
- Take inspiration from the restraint and factual writing of the `karan-s-mittal.github.io` project. Adapt those principles to the event rather than copying the personal site's identity or layout literally.

## Open questions and assets

- **Qualcomm:** What products, devices, demos or activities can we describe publicly? Participation is part of the organizer's event brief; exhibit details will be added later. Do not invent them.
- **Space program:** What is the keynote subject? Which speaker names, panel subjects and affiliations are approved for publication?
- **Technical program:** Which session and workshop titles, facilitators, prerequisites and practical outcomes are confirmed?
- **Tickets:** Confirm final prices, fees, team discount thresholds and verified KonfHub setup. Final names, dates and inclusions are in the 20 October brief.
- **Photography:** Two local group photos are verified in `content/gallery.json`. Supply distinct, accurately captioned photos for other activities.
- **Attendance:** The organizer guide targets 900+ attendees; the concept plan targets 600+ professionals. Resolve the difference before publishing a figure. A target must not be presented as actual attendance.
- **Partnership announcement:** Confirm the Space Club of India agreement status and approved wording before publishing an MOU announcement.
- **Logistics:** Registration opens at 8:30 AM IST and the confirmed postcode is 452016. Confirm the rest of the day’s timetable before publishing it.

## Source documents

- [Organizer guide](https://docs.google.com/document/d/1zHdsS4khMPZ513N_RP4t9l01HkBGPoIDIBVLrUojVE0/edit)
- [Event concept and experience plan](https://docs.google.com/document/d/1t6kYFJwasK32ROcc-tKiApaOF85yQAr9/edit)

These are planning sources, not approved website copy. Later explicit organizer decisions recorded above clarify the brief; unresolved details remain questions.

## Run locally

This project uses Next.js 16, React 19, TypeScript and Tailwind CSS 4.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve a production build |
| `npm run lint` | Run ESLint |

## Where things live

- `src/app/page.tsx`: Static attendee page composition and fixed section order.
- `src/app/layout.tsx`: Fonts and site metadata, including social previews.
- `src/app/globals.css`: Browser defaults, keyboard focus and reduced motion. `src/app/audience.css`: Attendee layout, typography and theme tokens.
- `src/components/`: Event sections and shared interactions.
- `content/`: Canonical public JSON records and JSON Schemas.
- `src/content/`: Typed selectors and date formatting.
- `public/images/`: Local image assets.

## Repository and deployment

- `origin`: `GDG-Indore-Ind/DevfestIndore2026`, the original repository.
- `live`: `soham2710/devfest2026`, the fork identified by the organizer as the live website's source.
- `karan/develop`: Working branch incorporating `live/main` while preserving both repositories’ histories and the revised event brief.

The fork's `AGENTS.md` identifies `main` as the production branch and Vercel as the host. Deployment settings have not been independently verified. Coordinate publishing with the deployment owner.

Read `AGENTS.md` before implementation work, including its requirement to consult the installed Next.js documentation. The organizer's revised copy and design direction above supersedes conflicting older aesthetic guidance in that file.

## Attendee site and performance

The homepage introduces the event, programme, partners, community photographs and venue. Get tickets is the primary hero action and remains visible in the sticky header across pages. Programme is a secondary link; tickets also remain in Explore and the footer. FAQs have a separate page. Talk proposals and organizers are quiet footer links. Public pages use checked-in content; proposals and ticket registration stay with Sessionize and KonfHub.

- `src/app/audience.css` defines the attendee design system. Google Sans is self-hosted from `public/fonts/`, with its license included. No Google Fonts request is needed at runtime.
- `content/event.json` → `links.booking` holds the organizer-provided KonfHub event page (`https://konfhub.com/gdg-devfest-indore-2026`). When sales are enabled, the ticket link opens it directly; the homepage mounts no payment iframe or checkout modal.
- Instagram is an ordinary link. The homepage does not load Elfsight, an Instagram feed, maps, audio, an intro loader, cursor followers, floating particles or 3D scenes. A lightweight scroll rail follows the page using the browser’s animation frame.
- Homepage sections are a fixed, checked-in attendee journey. Content changes are reviewed in Git and published through the normal site deployment.
- Event and ticket FAQs come from checked-in sources; the final confirmed ticket policies take precedence over older event copy.
- The social-card generator remains future work. There is no pretend download or registration confirmation.

The archive, workshop and team pages share the attendee header/footer and Google Sans.

### Ticket release and policies

`content/event.json` → `booking.enabled` remains false until the organizer verifies final KonfHub pricing, inventory, eligibility restrictions and protected VIP access. The website also checks each pass’s opening and closing times. Dates alone do not enable checkout. Referrals preserve their code without guaranteeing a discount or bypassing the launch gate. No external inventory, bookings or descriptions were edited.

Pass preparation and final policies live on `/tickets`; common questions live on `/faq`. The older three-pass price ranges, sold-out Early Bird message, November 21 refund deadline and student waitlist are superseded by the final brief. Preserve existing bookings separately; the new brief does not authorize cancelling them.

See [design-system.md](design-system.md) for visual rules, [information architecture](docs/information-architecture.md) for route responsibilities, and [KonfHub setup](docs/konfhub-setup.md) for external launch dependencies.

### Public page consistency

The footer groups destinations under Attend, Get involved, Community, and Explore more, keeping the header limited to event-day navigation. `/team`, `/past-speakers`, `/gallery`, and `/workshops` use checked-in content, shared attendee typography, spacing, light/dark tokens, rounded photography, archive search/filter/pagination, gallery viewing and campus links. `/admin` and its bespoke editing tools have been removed; Sessionize owns CFP submissions and Git is the content source of truth.

The local DSCF photo series contains repeated group photographs, not separate workshop/robotics/space scenes. The archive uses two visually verified photographs with accurate captions. Campus cards do not repurpose those group photos as campus evidence. Public portraits have consistent crops and an initials fallback if an image expires.

Privacy notice deferred at organizer request on October 19, 2026. No GDPR/DPDP compliance claim or invented data-retention/sharing policy has been added. GA4 and GTM remain the site analytics destinations; no custom visitor or conversion counters run in the website.

### Ticket eligibility and declaration

Cadet is for currently enrolled college and university students and requires an original, active physical student photo ID matching the registration name. Commander is for working professionals and supports team bookings. Flight Deck is curated for founders, senior technical leadership and ecosystem partners, unlocked by a private code at KonfHub. Liftoff is open to all developers and community members during its release. Observer is sessions only.

`REGISTRATION_DECLARATION` summarizes eligibility, accurate details and the final no-refund/no-transfer policy before a future enabled checkout. This browser-side step does not verify eligibility, reserve inventory or grant access. KonfHub must enforce the final checkout rules.

## Website culling plan

The organizer clarified on 20 October that ticket releases are time-based, not a six-pass public catalogue. The shared release clock previews Liftoff now, then shows the open release(s), or the next release in a gap. See [website culling and visual plan](docs/website-culling-plan.md) for the five-chapter homepage, the applied cuts and the next visual refinement pass.
