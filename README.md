# Welcome to my portfolio
## Here you will find the source code for my portfolio website [Sanan.no](https://sanan.no)
It is created with my [Astro + Sanity-CMS + i18n template repo](https://github.com/SananMaarouf/astro-sanity-i18n)

### Features
- **Astro Framework:** Lightning-fast static and dynamic site generation with a modern developer experience.
- **Sanity CMS Integration:** Flexible, real-time content management with powerful schema definitions—edit content without redeploying.
- **React Support:** Use React components seamlessly alongside Astro and other frameworks.
- **Automated CI/CD:** When code changes it builds a Docker image, pushes it to Docker hub, which is then pulled by Dokploy when the "trigger-deploy" job runs. **This is the better setup since it reduces load on your VPS (if you are renting a cheap, low-power vps primarily meant for hosting), speeds up deployments, and avoids long build queues if you were doing the building on the same machine. [Read more here](https://docs.dokploy.com/docs/core/applications/going-production)**

## Multi language support

It is configured for Norwegian (nb) and English(en), with English as the default language.