# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site ([sanan.no](https://sanan.no)) built from the [astro-sanity-i18n](https://github.com/SananMaarouf/astro-sanity-i18n) template: Astro (static output) + Sanity CMS + React islands, with Norwegian (`nb`) and English (`en`, default) locales.

## Commands

```bash
npm run dev              # astro dev server (--host)
npm run devs             # astro dev + sanity dev concurrently
npm run build             # astro build (static output to dist/)
npm run preview           # preview the built site

npm run sanity:dev        # run Sanity Studio locally
npm run sanity:deploy     # deploy Sanity Studio
npm run sanity:dataset-export / :dataset-import
npm run sanity:documents-query

npm run worker:dev        # wrangler dev for the Cloudflare Worker
npm run worker:deploy     # wrangler deploy
npm run worker:tail       # tail worker logs
```

There is no test suite or lint script configured in `package.json`.

## Architecture

### Content pipeline: Sanity → GROQ → Astro pages

- Schemas live in `src/sanity/schemaTypes/` (`landing.ts`, `post.ts`, `projectType.ts`, `author.ts`, `category.ts`, `technologies.ts`, `footer.ts`, `blockContent.ts`) and are combined in `src/sanity/schemaTypes/index.ts`, referenced by `sanity.config.ts`.
- Two data-fetching layers exist side by side:
  - `src/sanity/lib/load-query.ts` — generic `loadQuery()` wrapper around the `sanity:client` virtual module (used with Astro's Sanity live-query features).
  - `src/utils/sanity.ts` — hand-written GROQ queries (`getPosts`, `getLanding`, `getProjects`, `getProject`, `getPost`, `getExperienceEntries`) called directly from `.astro` pages/components, each taking a `lang` param.
- Response shapes are typed in the root `types/` directory (`post.ts`, `project.ts`, `landing.ts`, etc.), imported with relative paths from `src/utils/sanity.ts`.

### Internationalization

- **Routing**: Astro's built-in i18n (`astro.config.mjs`) with `defaultLocale: 'en'`, `prefixDefaultLocale: false`. English pages live at `src/pages/*`, Norwegian mirrors live under `src/pages/nb/*` (e.g. `src/pages/index.astro` vs `src/pages/nb/index.astro`) — there is no dynamic `[lang]` routing, each locale has its own literal page file passing `lang="en"` / `lang="nb"` into components.
- **Content localization**: uses `sanity-plugin-internationalized-array` (configured in `sanity.config.ts` for `en`/`nb`, fields of type `string`/`text`/`blockContent`). Localized fields are queried in GROQ as `field[language == $lang][0].value`.
- The plugin migrated its language-lookup key from `_key` to a `language` field between v4 and v5. `migrations/migrate-i18n-array-language-field.ts` runs `migrateToLanguageField` for the `post`, `Landing`, and `project` types. When writing or auditing GROQ queries, use the **`i18n-array-groq-query-migration`** skill (`.claude/skills/i18n-array-groq-query-migration/`) to catch any remaining `_key`-based language lookups.

### Frontend composition

- Astro components (`.astro`) handle server-rendered layout/content (`Landing.astro`, `Projects.astro`, `Posts.astro`, `PortableText.astro`, `SanityImage.astro`, `InternalLink.astro`).
- Interactive pieces are React islands under `src/components/react/` (navbar, language switcher, theme switcher, carousels, settings menu).
- `src/components/ui/` holds shadcn/ui primitives (config in `components.json`, style `new-york`, Tailwind v4 via `@tailwindcss/vite`). Path alias `@/*` → `src/*` (see `tsconfig.json`), matching shadcn aliases.

### Cloudflare Worker (CV download)

- `cloudflare-worker-cv.js` + `wrangler.toml` implement a separate, independently deployed Worker that serves CV downloads from an R2 bucket (`CV_BUCKET`) with rate limiting (10 req/min), routed at `sanan.no/download/*` (and `/nb/download/*`). Deployed by its own workflow (`.github/workflows/deploy-worker.yml`), triggered only when `cloudflare-worker-cv.js` or `wrangler.toml` change — unrelated to the main site build.

### Deployment (main site)

CI/CD is intentionally split into a build stage and a separate trigger stage (see README "Known issues"/"Features" and `.github/workflows/`):

1. `deploy.yml` — on push to `master`, builds a Docker image (`Dockerfile`, multi-arg build with `PUBLIC_*` env vars baked in) and pushes it to Docker Hub (`latest`, `master`, and commit-SHA tags). Also triggerable via `repository_dispatch` (`sanity-update`) so Sanity content changes can kick off a rebuild.
2. `trigger-deploy.yml` — called by `deploy.yml`'s `trigger-deployment` job after a successful build (`workflow_call`); hits a Dokploy deploy webhook (through Cloudflare Access, using `CF_ACCESS_CLIENT_ID`/`SECRET`) so Dokploy pulls the freshly pushed image. It has no `repository_dispatch` trigger of its own, so it can only ever run after `deploy.yml` — never directly off the Sanity webhook.

The build-then-trigger ordering isn't just pipeline plumbing — it's required. The Astro site uses **static output**, and `Dockerfile` is a multi-stage build: the `builder` stage runs `npm run build`, which executes every GROQ query against Sanity at build time and renders all pages to static HTML into `/app/dist`. The final `runtime` stage starts fresh from `nginxinc/nginx-unprivileged:alpine` and copies in only `/app/dist` — no Node, no source, no live Sanity connection at runtime, just nginx serving flat files. So a Sanity content edit only reaches production by rebuilding the image (baking in fresh content) and pushing it; if Dokploy redeployed without a rebuild it would just restart the container with the same stale files. This also explains why this split exists at all: the original all-in-one-VPS setup pinned CPU/RAM to 100% during `astro build` on a low-power VPS, so the heavy `builder` stage was moved to GitHub's runners, leaving Dokploy to do a cheap `docker pull` + restart of the small nginx image.

Local Docker usage is via `docker-compose.yml` / `Dockerfile` directly, using the same `PUBLIC_*` build args.

### Environment variables

Two parallel sets of Sanity env vars are used for different consumers — don't assume they're interchangeable:
- `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` / `PUBLIC_SANITY_PROJECT_NAME` — exposed client-side, used by the Astro site.
- `SANITY_PROJECT_ID` / `SANITY_DATASET` — read server-side in `astro.config.mjs` via `loadEnv` for the `@sanity/astro` integration.
- `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` / `SANITY_STUDIO_PROJECT_NAME` — used by `sanity.config.ts` for the Studio itself.

See `.env.example` for the full list, including Dokploy/Cloudflare Access deploy secrets.
