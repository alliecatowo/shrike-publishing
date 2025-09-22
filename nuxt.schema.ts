import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    ui: group({
      title: 'UI Configuration',
      description: 'Customize the user interface colors and appearance.',
      icon: 'i-ph-palette-fill',
      fields: {
        colors: group({
          title: 'Colors',
          description: 'Define the color scheme for your application.',
          icon: 'i-ph-palette',
          fields: {
            primary: field({ type: 'string', title: 'Primary Color', default: 'rose', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            secondary: field({ type: 'string', title: 'Secondary Color', default: 'amber', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            tertiary: field({ type: 'string', title: 'Tertiary Color', default: 'purple', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            accent: field({ type: 'string', title: 'Accent Color', default: 'pink', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            success: field({ type: 'string', title: 'Success Color', default: 'green', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            info: field({ type: 'string', title: 'Info Color', default: 'blue', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            warning: field({ type: 'string', title: 'Warning Color', default: 'yellow', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            error: field({ type: 'string', title: 'Error Color', default: 'red', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] }),
            neutral: field({ type: 'string', title: 'Neutral Color', default: 'stone', required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral'] })
          }
        }),
        prose: group({
          title: 'Typography',
          description: 'Configure fonts and text styling for prose content.',
          icon: 'i-ph-text-aa',
          fields: {
            h1: group({
              title: 'Heading 1',
              description: 'Typography settings for H1 headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Volkhov', serif" }),
                fontWeight: field({ type: 'string', title: 'Font Weight', default: '700', required: ['400', '500', '600', '700', '800', '900'] })
              }
            }),
            h2: group({
              title: 'Heading 2',
              description: 'Typography settings for H2 headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Volkhov', serif" }),
                fontWeight: field({ type: 'string', title: 'Font Weight', default: '700', required: ['400', '500', '600', '700', '800', '900'] })
              }
            }),
            h3: group({
              title: 'Heading 3',
              description: 'Typography settings for H3 headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Volkhov', serif" }),
                fontWeight: field({ type: 'string', title: 'Font Weight', default: '700', required: ['400', '500', '600', '700', '800', '900'] })
              }
            }),
            h4: group({
              title: 'Heading 4',
              description: 'Typography settings for H4 headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Volkhov', serif" }),
                fontWeight: field({ type: 'string', title: 'Font Weight', default: '700', required: ['400', '500', '600', '700', '800', '900'] })
              }
            }),
            h5: group({
              title: 'Heading 5',
              description: 'Typography settings for H5 headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Volkhov', serif" }),
                fontWeight: field({ type: 'string', title: 'Font Weight', default: '700', required: ['400', '500', '600', '700', '800', '900'] })
              }
            }),
            h6: group({
              title: 'Heading 6',
              description: 'Typography settings for H6 headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Volkhov', serif" }),
                fontWeight: field({ type: 'string', title: 'Font Weight', default: '700', required: ['400', '500', '600', '700', '800', '900'] })
              }
            }),
            p: group({
              title: 'Paragraph',
              description: 'Typography settings for paragraphs.',
              icon: 'i-ph-text-t',
              fields: {
                fontFamily: field({ type: 'string', title: 'Font Family', default: "'Merriweather Sans', sans-serif" }),
                lineHeight: field({ type: 'string', title: 'Line Height', default: '1.75' })
              }
            })
          }
        })
      }
    }),
    icon: group({
      title: 'Icon Configuration',
      description: 'Configure how icons are rendered in your application.',
      icon: 'i-ph-image-square',
      fields: {
        mode: field({ type: 'string', title: 'Icon Mode', default: 'css', required: ['css', 'svg', 'auto'] }),
        cssLayer: field({ type: 'string', title: 'CSS Layer', default: 'base', required: ['base', 'components', 'utilities'] }),
        size: field({ type: 'string', title: 'Default Icon Size', default: '24px' })
      }
    })
  }
})