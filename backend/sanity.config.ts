import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import { I18nFields } from 'sanity-plugin-i18n-fields'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'sanity-default',
  title: 'Portfolio',
  projectId,
  dataset,
  plugins: [
    I18nFields({
      ui: {
        position:"top",
      },
      locales:[
        {code: 'nb', label:'Norwegian', title: 'Norwegian', default: true},
        {code: 'en', label:'English', title: 'English'},
      ]
    }),
    structureTool(),
    visionTool()],

  schema: {
    types: schemaTypes,
  },
})
