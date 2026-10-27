# Cloudflare Workers migration

Moving the site off the Dokploy VPS to Cloudflare Workers static assets. The
build is unchanged (`astro build` → `dist/`); only where it runs and where it is
served from changes.

## What changed

| Removed (VPS + GitHub Actions) | Added (Cloudflare) |
| --- | --- |
| `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `nginx.conf` | `wrangler.jsonc` (assets → `./dist`) |
| `.github/workflows/deploy.yml` (Docker build → Docker Hub) | Workers Builds (git integration, configured in the dashboard) |
| `.github/workflows/trigger-deploy.yml` (Dokploy deploy hook) | Sanity webhook → Worker build deploy hook |
| nginx headers/caching | `public/_headers` → parsed from `dist/` |

There is no GitHub Actions workflow for deployment anymore. **Cloudflare Workers
Builds owns build and deploy**, and Sanity triggers it through the Worker's
deploy hook. Running a second deployer (e.g. `wrangler-action` on push) would
race the Cloudflare build on the same Worker for no benefit.

Everything removed in this table still exists on the `self-host` branch (a
snapshot of `master` at migration time).

## 1. Workers Builds setup

Dashboard → Workers & Pages → `portfolio` → Settings → Build:

| Setting | Value |
| --- | --- |
| Git connection | `SananMaarouf/portfolio`, production branch `master` |
| Root directory | `/` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Build variables | `SANITY_PROJECT_ID`, `SANITY_DATASET`, `PUBLIC_PAGE_TITLE`, `PUBLIC_NAVBAR_TITLE`, `PUBLIC_COPYRIGHT_HOLDER` |

Those five variables are build-time only: the build executes every GROQ query
and writes prerendered HTML, so nothing is read at request time and no secret is
bound to the Worker.

## 2. First build

`wrangler.jsonc` ships with the custom-domain `routes` entry commented out, so
the Worker only answers on `https://portfolio.<account>.workers.dev` until the
cutover is deliberate.

- Push to `master`, or hit "Deploy" in the Builds tab, and confirm the build
  finishes green.
- Check on the `workers.dev` URL: `/`, `/nb/`, `/projects/`,
  `/_astro/*.css` (expect `cache-control: public, max-age=31536000, immutable`),
  and a bogus path (expect Astro's 404 page with a 404 status). `/projects`
  should 307 to `/projects/`.

Locally: `npm run preview:cf` (builds, then serves `dist/` through the real
Workers runtime via `wrangler dev`).

## 3. Cut over DNS

Once the `workers.dev` URL checks out:

- **Option A (config):** uncomment `routes` in `wrangler.jsonc`, push — the next
  build claims the `sanan.no` apex record and issues the certificate.
- **Option B (dashboard):** Worker → Settings → Domains & Routes → Add →
  Custom Domain → `sanan.no`.

Either path overwrites the existing apex record, which is what actually moves
traffic off the VPS. Keep the Dokploy app stopped-but-not-deleted for a while so
rollback is a DNS change rather than a rebuild.

Worth deciding at cutover: whether `www.sanan.no` should be a second Custom
Domain or a 301 to the apex.

## 4. Sanity webhook

Re-point the content webhook:

1. Worker → Settings → Build → **Deploy hooks** → create one (e.g. `sanity`),
   copy the URL.
2. Sanity project → API → Webhooks → edit the existing hook → change the target
   URL to that deploy-hook URL, method `POST`.
3. Fire a test edit and confirm a new build appears and the content shows up.

Drop the old `GITHUB_PAT` / `repository_dispatch` plumbing from the hook — with
a static build, hitting the deploy hook re-runs the whole build, which is
exactly what a content change needs.

## 5. Decommission the VPS app

Once production has been happy for a while: delete the Dokploy application, then
drop the now-unused repository secrets `DOKPLOY_DEPLOY_HOOK_URL`,
`CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`, `DOCKERHUB_USERNAME`,
`DOCKERHUB_TOKEN`, `DOCKERHUB_IMAGE_NAME`, and `CLOUDFLARE_API_TOKEN` /
`CLOUDFLARE_ACCOUNT_ID` if they were added.

## Rollback

```bash
git checkout self-host
git push origin self-host:master --force-with-lease   # only if you really mean it
```

Then restore the Dokploy deploy hook + Cloudflare Access secrets, point the
Sanity webhook back at Dokploy, restart the container and re-add the DNS record
to the VPS.
