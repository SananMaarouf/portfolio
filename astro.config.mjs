import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), "");
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    
  },
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nb'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
      dataset: PUBLIC_SANITY_STUDIO_DATASET,
      useCdn: false,
      apiVersion: "2025-09-21"
    }),
    react()
  ]
});