import {defineField, defineType} from 'sanity'

export const feedbackType = defineType({
  name: 'Testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Title of the feedback document',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'feedback',
      type: 'i18n.text',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      description: 'Feedback from the person',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'who',
      type: 'string',
      description: 'Name of the person giving feedback',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      type: 'i18n.string',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      description: 'Position of the person giving feedback',
    }),
  ],
})