// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Load .env variables manually
const env = loadEnv('', process.cwd(), '');

const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET;

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    /* 
      Tailwind will pull in vite 7.
      Astro still uses Vite 6.
      This causes a typescript conflict.
      So i am suppressing error until Astro uses Vite 7.
      Read more here: https://github.com/withastro/astro/issues/14030 */
   // @ts-expect-error
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['ViteDevServerStopped']
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nb'],
    fallback: {
      nb: 'en'
    }
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2025-09-21"
      // studioBasePath removed - deploy Sanity Studio separately
      // You can access it at: https://<your-project>.sanity.studio
    }),
    react()
  ]
});