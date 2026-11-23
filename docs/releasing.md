# Release workflow

## Build for Cloudflare Pages

Use the Node.js version pinned in [`.tool-versions`](../.tool-versions).
Run `npm run build:cloudflare` from the repository root to build locally.
The command runs image and content generation, then writes the static site
and legacy redirects to `out/`. Upload that directory for a Pages Direct
Upload project.

For a Git-connected Pages project, set the build command to
`npm run build:cloudflare`, the output directory to `out`, and the
`NODE_VERSION` build environment variable to the version in `.tool-versions`.
The npm script runs the prebuild steps that generate the public content from SQLite.

`build:cloudflare` also writes two Pages configuration files into `out/`:
`_redirects`, generated from `scripts/redirects.mjs`, and `_headers`, copied from
[`cloudflare/_headers`](../cloudflare/_headers). Edit those sources, never the copies in `out/`.
Headers set permanent caching for `/_next/static`, short caching for fonts, images and the
gallery, basic security headers, and `noindex` on per-deployment preview hosts.

Cloudflare Pages reads the Node version from the `NODE_VERSION` build variable or a
`.node-version`/`.nvmrc` file, not from `.tool-versions`; keep the variable in step with it.
The Git-connected build compiles `better-sqlite3` during `content:generate`, so confirm the first
build succeeds on the pinned Node version. A Direct Upload of a locally built `out/` avoids that.
After a deploy, open a retired URL such as `/past-events/2024` to confirm `_redirects` applied,
and a missing path to confirm `404.html` is served. Pages limits a deployment to 20,000 files and
25 MiB per file; the export is currently about 740 files.

## Confirm deployment ownership

Production is hosted on Cloudflare Pages. Before release, confirm whether the Pages project is Git-connected or uses Direct Upload, which repository and production branch it tracks, and which custom domain it serves. `origin` points to the GDG organization repository and `live` to `Karan-S-Mittal/devfest-indore-2026`; local aliases can change, so check `git remote -v` before releasing. Also confirm that the people responsible for future events have access to the repository and the Cloudflare account.

## Publish a reviewed change

1. Review local changes first. Keep content corrections, code restructuring and visual redesigns in separate commits when practical. Never discard another contributor's work to obtain a clean tree.
2. Work on the checked-out branch. Ask before creating or switching to another branch or using a separate worktree, unless the user explicitly requested one. Update the selected branch against the actual target repository's production branch before opening the PR; inspect and resolve differences rather than force-pushing.
3. Run `npm run check` and `npm run build:cloudflare`.
4. Push the selected branch to the repository the Pages project tracks and open a PR targeting its production branch. For Direct Upload, deploy the built `out/` as a preview first.
5. Review the preview: home, tickets, registration guidelines, venue, navigation, light/dark appearance and mobile layout. Confirm public facts and partner publication settings with the content owner.
6. Merge the approved PR, or promote the Direct Upload deployment. Verify the resulting production deployment and its important links.

Configure repository rules to require review and the `Quality checks` workflow before merge where the hosting plan supports them. The workflow file alone does not enable branch protection. Do not push directly to the production branch for routine updates.

## Recover from a bad release

Use Cloudflare Pages' deployment rollback to restore a known good deployment, then revert the problematic commit through a PR so repository history and production agree. Record which commit was restored. Recheck event content and the ticket booking switch after recovery.

## Ownership handover

Prefer one canonical repository under the GDG organization and shared Cloudflare account ownership. Moving the production connection is a separate deployment change: first confirm permissions, environment settings, domains and a working preview. Keep the current production connection until the replacement has been verified.
