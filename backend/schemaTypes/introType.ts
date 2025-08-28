import {defineField, defineType} from 'sanity'

export const introType = defineType({
  name: 'Intro',
  title: 'Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      type: 'i18n.string',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Short introduction about yourselves',
      type: 'i18n.text',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enables UI for selecting focal point
            metadata: ['palette', 'lqip'], // Enables palette & placeholder generation
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (rule) => rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ],
      validation: (rule) => rule.min(1).required(),
      description: 'Add multiple gallery images. First image will be used as thumbnail.'
    }),
  ],
})