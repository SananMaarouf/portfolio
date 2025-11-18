import {defineField, defineType} from 'sanity'

export const technologiesType = defineType({
  name: 'technologies',
  title: 'Technologies',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'image',
      options: { 
        hotspot: true, 
      },
      validation: (rule) => rule.required(),
    }),
  ],
})