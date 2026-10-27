# Welcome to my portfolio
## Here you will find the source code for my portfolio website [Sanan.no](https://sanan.no)
It is created with my [Astro + Sanity-CMS + i18n template repo](https://github.com/SananMaarouf/astro-sanity-i18n)

### Features
- **Astro Framework:** Lightning-fast static generation with a modern developer experience.
- **Sanity CMS Integration:** Flexible, real-time content management with powerful schema definitions—edit content in the Studio, no deploy step for editing itself.
- **React Support:** Use React components seamlessly alongside Astro and other frameworks.
- **Multi-theme:** Five token-driven themes (light, dark, nerd, terminal, retro95), see `CLAUDE.md`.
- **Automated CI/CD on Cloudflare Workers:** Cloudflare *Workers Builds* watches this repo — on every push to `master` it runs `astro build` (executing all GROQ queries and prerendering every page into `dist/`) and deploys the result to Workers static assets with `wrangler deploy`. No container image, no server to keep running.
  - Because the output is fully static, a content edit must go through a *rebuild*: the Sanity webhook fires the Worker's build deploy-hook URL, which re-runs the build and redeploys.
  - Response headers and caching live in `public/_headers`.
- **Self-hosting option:** the previous Docker + Dokploy pipeline (multi-stage `Dockerfile`, nginx runtime, Docker Hub push, deploy hook) is preserved on the `self-host` branch, snapshotted at the time of the Cloudflare migration.
## Multi language support

It is configured for Norwegian (nb) and English(en), with English as the default language.