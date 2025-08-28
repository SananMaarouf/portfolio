import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'i18n.string',
      options: {
        ui: {
        type: 'slider',
        position: 'top',
        selected: 'border'
      },
    },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'version',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
          }
        ]
      }],
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'projectType',
      type: 'string',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Web / Mobile', value: 'web / mobile'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'i18n.text',
      options: {
        ui: {
          type: 'slider',
          position: 'top',
          selected: 'border'
        },
      },
    }),
    defineField({
      name: 'githubUrl',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      type: 'url',
    }),
    defineField({
      name: 'Experience',
      type: 'array',
      of: [{
        type: 'i18n.text',
        options: {
          ui: {
            type: 'slider',
            position: 'top',
            selected: 'border'
          },
        },
      }],
      // Not required, so no validation
    }),
  ],
})
