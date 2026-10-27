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

- Astro components (`.astro`) handle server-rendered layout/content (`Landing.astro`, `Projects.astro`, `Posts.astro`, `PortableText.astro`, `SanityImage.astro`, `InternalLink.astro`, `SananArt.astro` — the hero illustration, inlined so its `--art-*` colours follow the theme).
- Interactive pieces are React islands under `src/components/react/` (navbar, language switcher, theme picker, carousels, settings menu). The whole navbar is a single `client:load transition:persist` island.
- `src/components/ui/` holds shadcn/ui primitives (config in `components.json`, style `new-york`, Tailwind v4 via `@tailwindcss/vite`). Path alias `@/*` → `src/*` (see `tsconfig.json`), matching shadcn aliases.

### Theming

Five themes — `light`, `dark`, `nerd` (Tokyo Night), `terminal` (phosphor CRT), `retro95` (Windows 95) — selected by `data-theme` on `<html>`. All of it lives in `src/styles/global.css`; components never branch on the theme.

**Adding a theme** is one `[data-theme="x"] { … }` block plus one entry in `THEMES` (`src/lib/theme.ts`). Four rules make that work, and breaking any of them fails silently:

1. **Every block declares every token.** The theme picker renders swatches as nested `<span data-theme="…">`, and a nested scope inherits from the *enclosing* theme rather than `:root` — a token you omit leaks the parent theme's value. The blocks are currently 44 tokens each; `awk '/^\[data-theme=/{n=0} /^  --/{n++} /^}/{print n}'` over the file should print the same number five times.
2. **Selectors stay bare `[data-theme="x"]`** — never `html[data-theme=…]` or `:root[data-theme=…]`. The higher specificity would stop matching the swatch spans.
3. **Source order is load-bearing.** `:root` and `[data-theme="x"]` tie at specificity (0,1,0), so for `<html data-theme="dark">` both match and only order decides. Light shares the `:root` block (it is the no-JS and bad-value fallback) and must stay first.
4. **New `--color-*` tokens need a matching line in `@theme inline`**, or the Tailwind utility silently won't exist.

Themes carry more than colour: fonts (`--font-body/display/ui/mono`, via `*-raw` names to avoid a self-referential `@theme inline` cycle), `--radius` (the derived steps are *multiplicative*, so `--radius: 0` means zero everywhere), shadows (two primitives, `--shadow-color`/`--shadow-alpha`, from which the `--shadow-*` steps derive — `--shadow-alpha: 0` removes soft shadows wholesale), and per-theme effects.

**Effects and chrome** are token-driven with inert defaults, so no theme has to undo another's:
- `html::after` is a full-viewport overlay gated by `--effect-display` (terminal's scanlines). It lives on `<html>` because `ClientRouter` replaces `<body>` entirely on every navigation.
- `.surface-raised` / `.surface-sunken` render Win95 bevels from `--surface-*` and are no-ops elsewhere. Deliberately plain classes, not Tailwind `shadow-*` utilities, whose `--tw-shadow` composition mangles four-part inset strings.
- `.chrome-bar` (`--chrome-bg/fg/border`) is the retro95 title bar.
- The only theme-specific selectors are one `[data-theme="retro95"] [data-chrome=…]` block; components carry those `data-chrome` attributes unconditionally.

**Application layer** — one resolver, one writer:
- `src/layouts/Layout.astro` holds an `is:inline` pre-paint script (via `define:vars`, so the theme list isn't duplicated). It resolves localStorage → `prefers-color-scheme` and stamps `data-theme` before first paint. The OS-derived seed is deliberately **not** persisted, so an undecided visitor keeps tracking their OS. It also stamps `event.newDocument` on `astro:before-swap` — `ClientRouter` copies `<html>` attributes from the incoming document, so handling only `astro:after-swap` leaves a themeless frame on every client-side navigation.
- `src/lib/theme-store.ts` is a module-level store read through `useSyncExternalStore` (`src/hooks/use-theme.ts`). It owns user-initiated changes only and seeds itself from the DOM attribute the inline script already set. `getServerSnapshot` returns `null` so static HTML renders no active row — that is what removes the pre-hydration flash, and omitting it fails the SSG build. A module store rather than React context because Astro islands are separate React roots.

`--chart-*` and `--sidebar-*` were removed (no consumers); re-add them to the theme blocks *and* `@theme inline` if you `npx shadcn add` something that needs them. `src/lib/card-variants.ts` holds the one card recipe shared by both carousels and the four index pages — a plain `cva` module so `.astro` frontmatter can import it too.

### Deployment

Hosted on **Cloudflare Workers static assets**, built and deployed by **Cloudflare Workers Builds** (Cloudflare's git integration). There is no GitHub Actions deploy pipeline, no container image and no VPS. `wrangler.jsonc` points the Worker at `./dist`, `npm run build` is the only build step, and nothing runs at request time — every page is prerendered HTML.

Worker Builds settings (dashboard → Workers & Pages → `portfolio` → Settings → Build):

- Build command `npm run build`, deploy command `npx wrangler deploy`, root directory `/`, production branch `master`. A push to `master` triggers a build.
- Build-time environment variables: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `PUBLIC_PAGE_TITLE`, `PUBLIC_NAVBAR_TITLE`, `PUBLIC_COPYRIGHT_HOLDER`. Build-time only — no secrets are bound to the Worker, because there is no Worker script.
- Sanity content → production: the Studio webhook targets the Worker's **deploy hook URL** (Settings → Build → Deploy hooks). Hitting it re-runs the build, which re-queries Sanity and redeploys.

**A content edit must go through a rebuild.** Redeploying the same build would ship stale HTML; that is why the webhook triggers a build rather than a deploy.

`public/_headers` carries the security and cache headers — Workers parses it out of the assets directory (Astro copies `public/` into `dist/`). `/_astro/*` gets a one-year immutable cache because those filenames are fingerprinted.

Routing behaviour worth knowing: `assets.not_found_handling: "404-page"` serves Astro's `dist/404.html` with a 404 status, and Wrangler's default `auto-trailing-slash` html handling 307-redirects `/projects` → `/projects/`, matching what the old `try_files` did.

The apex custom domain is deliberately **commented out** in `wrangler.jsonc` so builds land on `portfolio.<account>.workers.dev` until the DNS cutover is a deliberate act. Either uncomment the `routes` entry (the next build then claims the `sanan.no` record and issues the cert) or attach the Custom Domain in the dashboard.

Local: `npm run preview:cf` = build + `wrangler dev` (real Workers runtime); `npm run deploy:cf` deploys from a machine with a wrangler login.

**Self-hosting is preserved on the `self-host` branch** — a snapshot of `master` at migration time with `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `.dockerignore` and the old `deploy.yml` / `trigger-deploy.yml` (Docker Hub → Dokploy). Those files are deleted on `master`. Going back means resetting to that branch, restoring the Dokploy deploy hook and Cloudflare Access secrets, and pointing the Sanity webhook at Dokploy again.

### Environment variables

Two parallel sets of Sanity env vars are used for different consumers — don't assume they're interchangeable:
- `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` / `PUBLIC_SANITY_PROJECT_NAME` — exposed client-side, used by the Astro site.
- `SANITY_PROJECT_ID` / `SANITY_DATASET` — read server-side in `astro.config.mjs` via `loadEnv` for the `@sanity/astro` integration.
- `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` / `SANITY_STUDIO_PROJECT_NAME` — used by `sanity.config.ts` for the Studio itself.

See `.env.example` for the full list. `CLOUDFLARE_ACCOUNT_ID` is needed locally for manual `wrangler` runs; the API token only lives in CI (`.env`/`.dev.vars` are gitignored).