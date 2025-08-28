import {defineField, defineType} from 'sanity'

export const performanceType = defineType({
  name: 'Performance',
  title: 'Performance',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'performanceType',
      type: 'i18n.string',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      description: 'Type of performance',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'i18n.text',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      description: 'Description of the performance',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaText',
      type: 'i18n.text',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      description: 'Related call to action text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Performance image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true // Enables UI for selecting what areas of an image should be cropped
      }
    }),
  ],
})