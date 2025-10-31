// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;



// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "nb"],
    routing:{
      prefixDefaultLocale: false
    }
  },
  output: "static",
  integrations: [
    astroI18next(),
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2024-12-08",
    }),
    react(),
    tailwind(),
  ],
});