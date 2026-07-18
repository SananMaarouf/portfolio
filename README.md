# Welcome to my portfolio
## Here you will find the source code for my portfolio website [Sanan.no](https://sanan.no)
It is created with my [Astro + Sanity-CMS + i18n template repo](https://github.com/SananMaarouf/astro-sanity-i18n)

### Features
- **Astro Framework:** Lightning-fast static and dynamic site generation with a modern developer experience.
- **Sanity CMS Integration:** Flexible, real-time content management with powerful schema definitions—edit content without redeploying.
- **React Support:** Use React components seamlessly alongside Astro and other frameworks.
- **Automated CI/CD:** When code changes (or Sanity content changes, via webhook) it builds a Docker image, pushes it to Docker Hub, which is then pulled by Dokploy when the "trigger-deploy" job runs. Build-then-trigger is a hard requirement, not just an optimization: the site is static output, and the Dockerfile is a multi-stage build where the `builder` stage runs `astro build` (executing all Sanity GROQ queries and rendering static HTML), while the final `runtime` image is just nginx serving `/dist` — no Node, no live Sanity connection. So content changes only reach production through a fresh image build; redeploying the same image would just restart the container with stale content. **This split also reduces load on your VPS (if you are renting a cheap, low-power vps primarily meant for hosting), speeds up deployments, and avoids long build queues if you were doing the building on the same machine. [Read more here](https://docs.dokploy.com/docs/core/applications/going-production)**
- **Cloudflare worker** For downloading files securely from a bucket with rate limits.

## Multi language support

It is configured for Norwegian (nb) and English(en), with English as the default language.