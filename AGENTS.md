# DevFest Indore 2026 — contributor instructions

## Current architecture

- Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. Read the installed Next.js guides before framework changes.
- Public content lives in `content/*.json`; typed views in `src/content/` supply pages. Read `content/README.md` before editing records.
- Sessionize owns talk proposals; KonfHub owns ticket availability, eligibility enforcement and payment. There is no custom admin, proposal backend, database or upload service in this application.
- Existing local/Cloudinary artwork is rendered through Next Image. Do not add a speaker upload workflow.
- GTM, GA4 and Meta Pixel are external analytics integrations in the root layout. Do not infer that GTM already owns GA4 configuration without checking the container.

## Design and file ownership

- `design-system.md` owns the current visual direction: light default, saved light/dark choice, clear orbital artwork and readable event facts. Historical implementation notes are reference only.
- `src/app/` owns routes, metadata and page composition.
- `src/components/` groups layout, home, tickets, workshops and shared UI. Import directly from the owning folder; avoid barrel files.
- New isolated component styling belongs beside its component in a CSS Module. Existing global styles retain their import order until their selectors are migrated together. See `docs/contributing.md`.
- Use Server Components by default. Add `"use client"` only for state, effects, browser APIs or interactive handlers.
- Keep JSX readable and run the formatter on changed source files. Do not hide content or change approved ticket policies during refactoring.

## Validation and releases

- Run `npm run check` and `npm run build` before release. Check affected pages at desktop/mobile widths in both themes.
- Use feature branches and pull requests. Review the Vercel preview before merging into the configured production branch. Never assume a remote named `live` establishes Vercel's connection.
- `origin` currently points to the GDG organization repository; `live` points to Soham's repository. Verify the Vercel project's connected repository and branch before publishing. See `docs/releasing.md`.
- Preserve existing working-tree changes. Do not publish, enable checkout or change public claims as an incidental cleanup.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Canonical content ownership — 21 October 2026

All editable public website data belongs in `content/*.json`. Read `content/README.md` before editing records. The JSON Schemas in `content/schemas/` and `scripts/validate-content.mjs` enforce the data model. `src/content/` derives typed views that pages import directly; there is no separate `src/data/` compatibility layer. Never restore inline speaker, sponsor or ticket arrays or regenerate them from spreadsheets.

People and organizations are defined once and referenced by stable IDs. Partnerships describe their real contribution and edition without inferring financial tiers. Only confirmed 2026 participation may be published. Keep tentative/private planning data outside public records. Event facts and the checkout switch live in `content/event.json`; pass facts live in `content/tickets.json`.

Run `npm run content:validate` and TypeScript checks for data/model changes. Content validation runs before dev/build. Spreadsheets and `docs/source-archive/` are reference material and must not be imported by application code.
