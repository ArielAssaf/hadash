# Runbook

All commands run from `hadash-payload` unless noted.

## Build
- `npm run build` - Build the Astro frontend and Payload CMS workspaces. Expected outcome: both builds finish without errors.

## Run
- `npm run dev` - Start the Astro frontend and Payload CMS locally. Expected outcome: Astro on `http://localhost:4321` and CMS on `http://localhost:3000`.

## Test
- `cd hadash-payload/apps/cms; pnpm test` - Run CMS integration and e2e tests. Expected outcome: Vitest and Playwright exit cleanly.

## Seed
- `cd hadash-payload/apps/cms; pnpm seed` - Seed the CMS database with baseline content. Expected outcome: seed script completes and CMS content is populated.

## Deploy
- `git push origin main` - Trigger Vercel deployment for the monorepo when the repo is connected. Expected outcome: new deployment updates `https://hadash.org.il`.

## Roll Back
- `git revert <bad_sha> && git push origin main` - Revert a bad change and redeploy. Expected outcome: Vercel deploys the reverted state.

## Static Site (Legacy)
- GitHub Pages site lives at `https://arielassaf.github.io/hadash/he/`. Source and deploy steps are not tracked in this repo.
