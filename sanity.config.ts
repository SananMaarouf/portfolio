import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

export default defineConfig({
  projectId: "dilnanz0",
  dataset: "production",
  studioHost: "sanan",
  name: "Portfolio",
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
