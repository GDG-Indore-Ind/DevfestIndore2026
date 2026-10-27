# Release workflow

## Confirm deployment ownership

On 27 October 2026, the organizer confirmed that Vercel is connected to the repository configured as `live`, which pointed to `Karan-S-Mittal/devfest-indore-2026` on GitHub. `origin` pointed to the GDG organization repository. Local aliases can change; check `git remote -v` before releasing.

Before release, verify the Vercel project's Production environment branch tracking; the connected branch has not yet been confirmed. Also confirm that the people responsible for future events have access to the repository and Vercel project. The reported Vercel host is https://devfest2026-iota.vercel.app/.

## Publish a reviewed change

1. Review local changes first. Keep content corrections, code restructuring and visual redesigns in separate commits when practical. Never discard another contributor's work to obtain a clean tree.
2. Work on the checked-out branch. Ask before creating or switching to another branch or using a separate worktree, unless the user explicitly requested one. Update the selected branch against the actual target repository's production branch before opening the PR; inspect and resolve differences rather than force-pushing.
3. Run `npm run check` and `npm run build`.
4. Push the selected branch to the repository Vercel actually tracks and open a PR targeting its production branch. A branch on the other repository does not guarantee a preview for this project.
5. Review the preview: home, tickets, registration guidelines, venue, navigation, light/dark appearance and mobile layout. Confirm public facts and partner publication settings with the content owner.
6. Merge the approved PR. Verify the resulting production deployment and its important links.

Configure repository rules to require review and the `Quality checks` workflow before merge where the hosting plan supports them. The workflow file alone does not enable branch protection. Do not push directly to the production branch for routine updates.

## Recover from a bad release

Use Vercel's deployment rollback controls to restore a known good deployment when available, then revert the problematic commit through a PR so repository history and production agree. Record which commit was restored. Recheck event content and the ticket booking switch after recovery.

## Ownership handover

Prefer one canonical repository under the GDG organization and shared Vercel project ownership. Moving the production connection is a separate deployment change: first confirm permissions, environment settings, domains and a working preview. Keep the current production connection until the replacement has been verified.
