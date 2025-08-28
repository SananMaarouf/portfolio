import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { I18nFields } from 'sanity-plugin-i18n-fields'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'su5aodm5',
  dataset: 'production',

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
