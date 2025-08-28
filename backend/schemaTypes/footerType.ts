import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'Footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'instagramURL',
      type: 'string',
      description: 'Instagram URL',
    }),
    defineField({
      name: 'cellNumber',
      type: 'i18n.string',
    }),
    defineField({
      name: 'email',
      type: 'i18n.string',
    }),
    defineField({
      name: 'address',
      type: 'i18n.string',
    }),
    
  ],
})