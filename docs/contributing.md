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

The root layout loads `globals.css`, `audience.css`, `engineering.css`, then `space.css`. This order preserves the remaining shared cascade. Globals imports `tokens.css`, which is the single owner of root light/dark theme variables, the shared type scale and the 4px-based layout spacing scale. Globals also owns browser defaults, Tailwind, focus and reduced motion; audience owns shared typography/UI; engineering and space contain the remaining shared layouts and refinements. Do not add root theme variables or duplicate spacing scales to those refinement sheets.

Type and corner sizes come from scales in `tokens.css`. Use `var(--text-10)` through `var(--text-32)` (the number is the pixel size at a 16px root), the fluid headings `--text-h4`, `--text-h3`, `--text-h2` and `--text-h1-sm`, and `--corner-4/8/12/16/24/32`, `--corner-pill` and `--corner-round`. Add a new step to the scale instead of writing a one-off `font-size` or `border-radius`. Google Sans is loaded by `src/app/fonts.ts` through `next/font/local`; the font file lives in `src/app/fonts/`, and `--font-sans` in the token sheet refers to it.

For new isolated components, use a colocated `Component.module.css` with shared CSS variables. The hero, appearance toggle, referral banner, logo marquee and booking widget demonstrate this pattern. When migrating an existing component, move its complete rules, including responsive and reduced-motion variants, and check for selectors in every global sheet. Preserve specificity and cross-component dependencies before removing old selectors. Do not append a fifth override sheet or bulk-delete selectors merely because their class names do not occur literally in JSX.

## Rendering and formatting

Keep static sections as Server Components. Client components are for state, effects, event handlers and browser APIs. Pass server-rendered content through children where appropriate rather than marking a whole page as client rendered.

Run `npm run format` after source edits. It formats application TypeScript, component CSS Modules and the shared token sheet, leaving canonical JSON and historical reference documents untouched. Existing global CSS remains outside this initial formatting scope so semantic migrations stay reviewable.

Saved referral subscriptions live in `src/hooks/useReferral.ts`; booking components use this hook rather than maintaining their own storage listeners. Its server snapshot has no coupon, so hydration remains consistent.

## Images

Drop new photos into `public/images/` or `public/gallery/`. `npm run images` runs automatically before `npm run dev` and `npm run build`; it scales anything wider than 1920px down, re-encodes JPEG and WebP files over 400 KB at quality 80, and recompresses PNGs losslessly, so logos are never degraded. File names and formats stay the same, so content paths do not change, and files that are already small are skipped. `npm run images -- --check` lists what would change without writing. Person photos still go through `npm run photos`.

## Check changes

```sh
npm run check
npm run build
```

`check` validates content, generates Next.js route types, checks TypeScript, lints and checks formatting. CI also builds the production application. Review changed routes on a Vercel preview at mobile and desktop widths, using both themes. For checkout or referral changes, check the disabled-booking and sold-out states, direct-link coupons and the iframe fallback without making a purchase.

See [release instructions](releasing.md) for deployment ownership and review.

## Content tests

`npm run content:test` covers the content relationships and is part of `npm run check`. Add people and photos as described in the [content guide](../content/README.md).
