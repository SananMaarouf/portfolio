import {defineField, defineType} from 'sanity'

export const landingType = defineType({
  name: 'Landing',
  title: 'Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Page title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'greeting',
      type: 'internationalizedArrayString',
      description: 'Greeting (internationalized)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      description: 'Person name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Profile image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'job',
      type: 'internationalizedArrayString',
      description: 'Job title (internationalized)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'internationalizedArrayString',
      description: 'Location (internationalized)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      location: 'location',
      media: 'image',
    },
    prepare({title, location, media}) {
      const englishLocation = location?.find((item: any) => item._key === 'en')?.value || 'No location'
      return {
        title,
        subtitle: englishLocation,
        media,
      }
    },
  },
})

