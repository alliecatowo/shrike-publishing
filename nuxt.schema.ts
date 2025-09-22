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
            primary: field({
              type: 'string',
              title: 'Primary Color',
              description: 'The primary color used throughout the UI.',
              icon: 'i-ph-palette',
              default: 'red',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            secondary: field({
              type: 'string',
              title: 'Secondary Color',
              description: 'The secondary color for UI elements.',
              icon: 'i-ph-palette',
              default: 'amber',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            tertiary: field({
              type: 'string',
              title: 'Tertiary Color',
              description: 'The tertiary color for additional UI elements.',
              icon: 'i-ph-palette',
              default: 'purple',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            accent: field({
              type: 'string',
              title: 'Accent Color',
              description: 'The accent color for highlights and focus states.',
              icon: 'i-ph-palette',
              default: 'pink',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            success: field({
              type: 'string',
              title: 'Success Color',
              description: 'Color used for success messages and states.',
              icon: 'i-ph-check-circle',
              default: 'green',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            info: field({
              type: 'string',
              title: 'Info Color',
              description: 'Color used for informational messages.',
              icon: 'i-ph-info',
              default: 'blue',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            warning: field({
              type: 'string',
              title: 'Warning Color',
              description: 'Color used for warning messages.',
              icon: 'i-ph-warning',
              default: 'yellow',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            error: field({
              type: 'string',
              title: 'Error Color',
              description: 'Color used for error messages and states.',
              icon: 'i-ph-x-circle',
              default: 'red',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            neutral: field({
              type: 'string',
              title: 'Neutral Color',
              description: 'Neutral color for backgrounds and text.',
              icon: 'i-ph-circle-half',
              default: 'stone',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
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
        mode: field({
          type: 'string',
          title: 'Icon Mode',
          description: 'How icons should be rendered.',
          icon: 'i-ph-gear',
          default: 'css',
          required: ['css', 'svg', 'auto']
        }),
        cssLayer: field({
          type: 'string',
          title: 'CSS Layer',
          description: 'The CSS layer where icon styles are applied.',
          icon: 'i-ph-stack',
          default: 'base',
          required: ['base', 'components', 'utilities']
        })
      }
    })
  }
})
