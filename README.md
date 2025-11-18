# Astro + Sanity-CMS + i18n Starter
### A minimal template to quickly create a multi-language static website using Astro and Sanity CMS.

### Features

- **Astro Framework:** Lightning-fast static and dynamic site generation with a modern developer experience.
- **Sanity CMS Integration:** Flexible, real-time content management with powerful schema definitions—edit content without redeploying.
- **React Support:** Use React components seamlessly alongside Astro and other frameworks.

# Setup
#### To get started, you need to:
### 1. Create your own `.env` file in the project root, using `.env.example` as a reference:

   ```bash
   cp .env.example .env
   ```
   > The content in .env are now placeholders and will be overwritten with the actual project id and dataset later when you run "npm run sanity:init" later


### 2. Log in to Sanity use the CLI to initialize a project and deploy your Sanity Studio to the web


1. **Login to Sanity:**
   ```bash
   npm run sanity:login
   ```
2. **Create a new organization (if you don't have one):**
   ```bash
   npm run sanity:create-org -- --name "<your-org-name>"
   ```
3. **Initialize a new project or select an existing one:**
   ```bash
   npm run sanity:init
   ```
   Follow the prompts to choose your organization and dataset.

4. **Deploy your Sanity Studio:**
   ```bash
   npm run sanity:deploy
   ```
   >   This will give you a public Studio URL. You can update documents there after the project is deployed. But when developing locally to the "/studio" route. 
   >
   See [Sanity CLI docs](https://www.sanity.io/docs/getting-started-with-sanity-cli) for more info.



## Language support

It is configured for Norwegian (nb) and English(en), with English as the default language.

If you want to change from Norwegian to another locale, update the following files and folders to use your locale code (for example, "fr" or "es"):

- Rename or create pages: /src/pages/nb -> /src/pages/[your-locale]
- astro.config.mjs
- sanity.config.ts
- /src/pages/index.astro
- /src/pages/nb/index.astro (or the equivalent folder for your locale)
- /src/pages/post/[slug].astro
- /src/pages/nb/post/[slug].astro (or the equivalent folder for your locale)

If you only need a single language, consider using the simpler template: https://github.com/SananMaarouf/astro-sanity

## Deployment & Adapters & CORS
If you are only using Astro as a static site builder, you don't need an adapter. But in this template, the Sanity-CMS /studio route is a on-demand rendered route, so we use the Node adapter standalone mode. 
When you run "npm run build" i will generate the static pages (but not the /studio route) to the dist folder.

If you plan on hosting this on a cloud provider such as Netlify, Vercel or Cloudflare, refer to the [Astro docs](https://docs.astro.build/en/guides/on-demand-rendering/) for a list of adapters to use in:
- astro.config.mjs

so it builds correctly in their environment.

## Troubleshooting
If you go to "/studio" route and just get a blank page, check the console log in the browser.
It is likely that the origin (http://localhost:4321) is not allowed access to the project. 
To fix that run:
`npm run sanity:cors-add`  
or go in to sanity and do it. [follow this guide](https://www.sanity.io/docs/content-lake/cors)

## Guides used for creating this template repository
### [Guide to localization in Sanity CMS](https://www.sanity.io/docs/studio/localization)

### [Guide to Internationalization in Astro](https://docs.astro.build/en/guides/internationalization/)