import {defineField, defineType} from 'sanity'

export const landingType = defineType({
  name: 'Landing',
  title: 'Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Fallback/thumbnail image'
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video ID ',
      type: 'string',
      description: 'For example: https://www.youtube.com/watch?v=dWXexKyF1U8. Here the video id is dWXexKyF1U8'
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      description: 'Upload a video file to be displayed on the landing page.',
      options: {
        accept: 'video/*', 
      },
    }),
    defineField({
      name: 'ctaText',
      type: 'i18n.string',
      options: {
        ui:{
          type: 'slider',
          position: 'top',
          selected: 'border'
        }
      },
      description: 'Call to action text'
    }),
    defineField({
      name: 'ctaBtnText',
      type: 'i18n.string',
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
  ],
})

