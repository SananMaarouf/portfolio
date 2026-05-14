// @ts-check
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const { PUBLIC_SANITY_PROJECT_ID: projectId, PUBLIC_SANITY_DATASET: dataset } =
  loadEnv(process.env.NODE_ENV ?? '', process.cwd(), 'PUBLIC_');

// https://astro.build/config
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
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2025-09-21"
    }),
    react()
  ]
});