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
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      type: 'string',
    }),
    
  ],
})