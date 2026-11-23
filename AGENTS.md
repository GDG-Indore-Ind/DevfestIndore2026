# DevFest Indore 2026 — contributor instructions

## Current architecture

- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. Read the installed Next.js guides before framework changes.
- Public event facts live in `content/devfest.sqlite`; the build generates static publication views consumed by `src/content/`. Page copy lives in `src/content/copy.ts`. Read `content/README.md` before editing records.
- Sessionize owns talk proposals; KonfHub owns ticket availability, eligibility enforcement and payment. SQLite is local build/editor storage; there is no deployed database service, custom admin, proposal backend or upload service.
- Person photos live in `public/images/people/<person-id>.webp` and are added with `npm run photos` (see `content/README.md`); artwork renders through Next Image. Do not add an upload workflow to the application.
- The Meta Pixel in `src/app/layout.tsx` is the only analytics integration. Vercel Analytics was removed with the move to Cloudflare Pages; GTM and GA4 were removed on 30 October 2026. Do not add other third-party tracking scripts without the owner's approval.
- Images under `public/images` and `public/gallery` are optimized automatically by `npm run images` before dev and build (see `docs/contributing.md`).

## Design and file ownership

- `design-system.md` owns the current visual direction: light default, saved light/dark choice, clear orbital artwork and readable event facts. Historical implementation notes are reference only.
- `src/app/` owns routes, metadata and page composition.
- `src/components/` groups layout, home, tickets, workshops and shared UI. Import directly from the owning folder; avoid barrel files.
- New isolated component styling belongs beside its component in a CSS Module. Existing global styles retain their import order until their selectors are migrated together. See `docs/contributing.md`.
- Use Server Components by default. Add `"use client"` only for state, effects, browser APIs or interactive handlers.
- Keep JSX readable and run the formatter on changed source files. Do not hide content or change approved ticket policies during refactoring.

## Validation and releases

- Run `npm run check` and `npm run build` before release. Check affected pages at desktop/mobile widths in both themes.
- Work on the branch currently checked out. Ask the user before creating or switching to another branch or using a separate worktree; an explicit request for a particular branch or worktree is sufficient authorization.
- Production is a static export on Cloudflare Pages (`npm run build:cloudflare`, output `out/`). Use pull requests and review the Pages preview before merging into the configured production branch. Never assume a remote named `live` establishes the Pages connection.
- `origin` currently points to the GDG organization repository; `live` points to Karan's repository (`Karan-S-Mittal/devfest-indore-2026`), which the owner controls. Verify the Pages project's connected repository and branch (or its Direct Upload setup) before publishing. See `docs/releasing.md`.
- Preserve existing working-tree changes. Do not publish, enable checkout or change public claims as an incidental cleanup.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Canonical content ownership — updated 14 November 2026

Edit domain records in `content/devfest.sqlite`, normally through `npm run db:studio`. SQLite tables, foreign keys and migrations are defined in `src/db/`. After edits, run `npm run db:export` to refresh the generated `content/database.sql` for review and recovery. Commit the database and export together. Never hand-edit the export or generated publication files.

People and organizations are defined once. Sessions reference presenters through junction tables; presenter assignments imply speaking participation, so a duplicate event speaker role is not required. `event_people` owns a person's presence at an event (optional event profile, source and official roster position); `event_person_roles` holds one row per non-programme role or speaker announcement, with its listing order. Only confirmed information belongs in this public-content database. Never put private codes, contact lists or tentative planning into it.

Page prose, FAQs and interface wording live in `src/content/copy.ts`; website selection and presentation switches live in `src/content/site.ts`. Registration policies are one event-owned document. Passes reference shared inclusion sets without losing restricted-pass differences. Historical editions use the same tables; do not invent dates or infer financial sponsorship tiers.

`npm run content:generate` validates SQLite and writes ignored browser-safe snapshots under `src/content/generated/`. Application components must not import database drivers or script-side loaders. Development watches content edits; production rebuilds are required to publish changes. Run `npm run check` and `npm run build` before release. Schema changes require a reviewed migration and a restore/migration test.
