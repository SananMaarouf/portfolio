import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  name: process.env.SANITY_STUDIO_PROJECT_NAME!,
  plugins: [
    structureTool(),
    internationalizedArray({
      languages: [
        {id: 'en', title: 'English'},
        {id: 'nb', title: 'Norwegian Bokmål'}
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text', 'blockContent'],
    })
  ],
  schema,
});
