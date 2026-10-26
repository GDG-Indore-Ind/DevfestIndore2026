# Working on the website

Start with the [README](../README.md). The [content guide](../content/README.md) is for event editors; this guide is for code changes.

## Find the right file

| Change | Location |
| --- | --- |
| Public facts, copy, people, passes and partners | `content/*.json` |
| Relationships, derived labels and typed content views | `src/content/` |
| Page composition, route metadata and redirects | `src/app/`, `next.config.ts` |
| Header, footer, theme choice and page shell | `src/components/layout/` |
| Homepage sections and community logo marquee | `src/components/home/` |
| Pass presentation, checkout and referral notices | `src/components/tickets/` |
| Campus photo viewer | `src/components/workshops/` |
| Shared links, images, profiles and page introductions | `src/components/shared/` |
| Saved theme | `src/contexts/` |
| Referral URLs and metadata | `src/lib/` |
| Content validation and organizer exports | `scripts/` |

Import components directly from their folders. Keep route-specific code beside its page when it is not reused. Avoid another generic utility or data layer.

## Styling

The root layout loads `globals.css`, `audience.css`, `engineering.css`, then `space.css`. This order preserves the remaining shared cascade. Globals imports `tokens.css`, which is the single owner of root light/dark theme variables. Globals also owns browser defaults, Tailwind, focus and reduced motion; audience owns shared typography/UI; engineering and space contain the remaining shared layouts and refinements. Do not add root theme variables to those refinement sheets.

For new isolated components, use a colocated `Component.module.css` with shared CSS variables. The hero, appearance toggle, referral banner, logo marquee and booking widget demonstrate this pattern. When migrating an existing component, move its complete rules, including responsive and reduced-motion variants, and check for selectors in every global sheet. Preserve specificity and cross-component dependencies before removing old selectors. Do not append a fifth override sheet or bulk-delete selectors merely because their class names do not occur literally in JSX.

## Rendering and formatting

Keep static sections as Server Components. Client components are for state, effects, event handlers and browser APIs. Pass server-rendered content through children where appropriate rather than marking a whole page as client rendered.

Run `npm run format` after source edits. It formats application TypeScript, component CSS Modules and the shared token sheet, leaving canonical JSON and historical reference documents untouched. Existing global CSS remains outside this initial formatting scope so semantic migrations stay reviewable.

Saved referral subscriptions live in `src/hooks/useReferral.ts`; booking components use this hook rather than maintaining their own storage listeners. Its server snapshot has no coupon, so hydration remains consistent.

## Check changes

```sh
npm run check
npm run build
```

`check` validates content, generates Next.js route types, checks TypeScript, lints and checks formatting. CI also builds the production application. Review changed routes on a Vercel preview at mobile and desktop widths, using both themes. For checkout or referral changes, check the disabled-booking and sold-out states, direct-link coupons and the iframe fallback without making a purchase.

See [release instructions](releasing.md) for deployment ownership and review.

## Directory review

`npm run content:test` covers the content relationships and approval gates and is part of `npm run check`. `npm run content:review` exports review packets, never approvals. For a local review of DevFest Team, Talks and linked profiles, run `CONTENT_DIRECTORY_PREVIEW=1 npm run dev`. Production ignores that override. Review the exact profile changes with the organizer before updating approval receipts; do not replace public-baseline fingerprints to accept unreviewed data.
