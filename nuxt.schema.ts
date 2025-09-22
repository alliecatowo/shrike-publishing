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
  },
  // Content collections exposed to Studio
  content: {
    design: group({
      title: 'Design System',
      description: 'Configure your design system including colors, typography, and spacing.',
      icon: 'i-ph-palette-fill',
      fields: {
        colors: group({
          title: 'Brand Colors',
          description: 'Define your brand color palette.',
          icon: 'i-ph-palette',
          fields: {
            primary: field({
              type: 'string',
              title: 'Primary Color',
              description: 'Main brand color used for primary actions and branding.',
              icon: 'i-ph-palette',
              default: 'red',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            secondary: field({
              type: 'string',
              title: 'Secondary Color',
              description: 'Supporting color for secondary actions and accents.',
              icon: 'i-ph-palette',
              default: 'amber',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            tertiary: field({
              type: 'string',
              title: 'Tertiary Color',
              description: 'Additional color for variety and visual interest.',
              icon: 'i-ph-palette',
              default: 'purple',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            accent: field({
              type: 'string',
              title: 'Accent Color',
              description: 'Color for highlights, links, and special elements.',
              icon: 'i-ph-palette',
              default: 'pink',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            success: field({
              type: 'string',
              title: 'Success Color',
              description: 'Color for success states and positive feedback.',
              icon: 'i-ph-check-circle',
              default: 'green',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            info: field({
              type: 'string',
              title: 'Info Color',
              description: 'Color for informational content and notices.',
              icon: 'i-ph-info',
              default: 'blue',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            warning: field({
              type: 'string',
              title: 'Warning Color',
              description: 'Color for warning states and caution messages.',
              icon: 'i-ph-warning',
              default: 'yellow',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            error: field({
              type: 'string',
              title: 'Error Color',
              description: 'Color for error states and negative feedback.',
              icon: 'i-ph-x-circle',
              default: 'red',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            }),
            neutral: field({
              type: 'string',
              title: 'Neutral Color',
              description: 'Base color for backgrounds and neutral elements.',
              icon: 'i-ph-circle-half',
              default: 'stone',
              required: ['red', 'sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange', 'teal', 'cyan', 'lime', 'stone', 'slate', 'zinc', 'gray', 'neutral']
            })
          }
        }),
        typography: group({
          title: 'Typography',
          description: 'Configure fonts and text styling.',
          icon: 'i-ph-text-aa',
          fields: {
            headings: group({
              title: 'Headings',
              description: 'Typography settings for headings.',
              icon: 'i-ph-text-h',
              fields: {
                fontFamily: field({
                  type: 'string',
                  title: 'Font Family',
                  description: 'Font family for headings.',
                  icon: 'i-ph-font',
                  default: "'Volkhov', serif"
                }),
                fontWeight: field({
                  type: 'string',
                  title: 'Font Weight',
                  description: 'Font weight for headings.',
                  icon: 'i-ph-bold',
                  default: '700',
                  required: ['400', '500', '600', '700', '800', '900']
                })
              }
            }),
            body: group({
              title: 'Body Text',
              description: 'Typography settings for body text.',
              icon: 'i-ph-text-t',
              fields: {
                fontFamily: field({
                  type: 'string',
                  title: 'Font Family',
                  description: 'Font family for body text.',
                  icon: 'i-ph-font',
                  default: "'Merriweather Sans', sans-serif"
                }),
                fontSize: field({
                  type: 'string',
                  title: 'Font Size',
                  description: 'Base font size for body text.',
                  icon: 'i-ph-text-size',
                  default: '1rem'
                }),
                lineHeight: field({
                  type: 'string',
                  title: 'Line Height',
                  description: 'Line height for body text.',
                  icon: 'i-ph-line-height',
                  default: '1.75'
                })
              }
            })
          }
        }),
        spacing: group({
          title: 'Spacing',
          description: 'Configure spacing and layout measurements.',
          icon: 'i-ph-ruler',
          fields: {
            container: field({
              type: 'string',
              title: 'Container Classes',
              description: 'Tailwind classes for main containers.',
              icon: 'i-ph-square',
              default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
            }),
            section: field({
              type: 'string',
              title: 'Section Spacing',
              description: 'Default spacing for page sections.',
              icon: 'i-ph-squares-four',
              default: 'py-8'
            }),
            element: field({
              type: 'string',
              title: 'Element Spacing',
              description: 'Default spacing between elements.',
              icon: 'i-ph-stack',
              default: 'space-y-4'
            })
          }
        }),
        icons: group({
          title: 'Icons',
          description: 'Configure icon rendering settings.',
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
        }),
        branding: group({
          title: 'Branding',
          description: 'Configure brand assets and logos.',
          icon: 'i-ph-palette',
          fields: {
            logo: group({
              title: 'Logo',
              description: 'Main brand logo configuration.',
              icon: 'i-ph-image',
              fields: {
                src: field({
                  type: 'string',
                  title: 'Logo Source',
                  description: 'Path or URL to the logo image.',
                  icon: 'i-ph-link',
                  default: '/ShrikeLogoNov2021.png'
                }),
                alt: field({
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Alternative text for the logo.',
                  icon: 'i-ph-text-aa',
                  default: 'Shrike Publishing'
                }),
                width: field({
                  type: 'string',
                  title: 'Width',
                  description: 'Logo width (e.g., "h-8", "w-32").',
                  icon: 'i-ph-arrows-out',
                  default: 'h-8'
                }),
                height: field({
                  type: 'string',
                  title: 'Height',
                  description: 'Logo height class.',
                  icon: 'i-ph-arrows-out',
                  default: 'w-auto'
                })
              }
            })
          }
        })
      }
    }),

    navigation: group({
      title: 'Navigation',
      description: 'Configure the main navigation menu.',
      icon: 'i-ph-navigation-arrow',
      fields: {
        items: field({
          type: 'array',
          title: 'Navigation Items',
          description: 'Menu items for the main navigation.',
          icon: 'i-ph-list',
          items: {
            type: 'object',
            fields: {
              label: field({
                type: 'string',
                title: 'Label',
                description: 'Display text for the menu item.',
                icon: 'i-ph-text-aa'
              }),
              to: field({
                type: 'string',
                title: 'URL/Path',
                description: 'Internal path or external URL.',
                icon: 'i-ph-link'
              }),
              icon: field({
                type: 'string',
                title: 'Icon',
                description: 'Icon name (Lucide icon set).',
                icon: 'i-ph-image'
              }),
              external: field({
                type: 'boolean',
                title: 'External Link',
                description: 'Whether this is an external link.',
                icon: 'i-ph-arrow-square-out',
                default: false
              }),
              active: field({
                type: 'boolean',
                title: 'Active',
                description: 'Whether this menu item is currently active.',
                icon: 'i-ph-check',
                default: true
              })
            }
          }
        })
      }
    }),

    footer: group({
      title: 'Footer',
      description: 'Configure the site footer content.',
      icon: 'i-ph-rows',
      fields: {
        copyright: field({
          type: 'string',
          title: 'Copyright Text',
          description: 'Copyright notice for the footer.',
          icon: 'i-ph-copyright'
        }),
        tagline: field({
          type: 'string',
          title: 'Tagline',
          description: 'Short descriptive text about your company.',
          icon: 'i-ph-text-aa'
        }),
        sections: field({
          type: 'array',
          title: 'Footer Sections',
          description: 'Link sections in the footer.',
          icon: 'i-ph-squares-four',
          items: {
            type: 'object',
            fields: {
              title: field({
                type: 'string',
                title: 'Section Title',
                description: 'Title for this footer section.',
                icon: 'i-ph-text-h'
              }),
              links: field({
                type: 'array',
                title: 'Links',
                description: 'Links in this section.',
                icon: 'i-ph-list',
                items: {
                  type: 'object',
                  fields: {
                    label: field({
                      type: 'string',
                      title: 'Link Text',
                      description: 'Display text for the link.',
                      icon: 'i-ph-text-aa'
                    }),
                    to: field({
                      type: 'string',
                      title: 'URL/Path',
                      description: 'Internal path or external URL.',
                      icon: 'i-ph-link'
                    }),
                    external: field({
                      type: 'boolean',
                      title: 'External Link',
                      description: 'Whether this is an external link.',
                      icon: 'i-ph-arrow-square-out',
                      default: false
                    }),
                    icon: field({
                      type: 'string',
                      title: 'Icon',
                      description: 'Optional icon for the link.',
                      icon: 'i-ph-image'
                    })
                  }
                }
              })
            }
          }
        }),
        social: group({
          title: 'Social Links',
          description: 'Configure social media links.',
          icon: 'i-ph-share-network',
          fields: {
            title: field({
              type: 'string',
              title: 'Social Section Title',
              description: 'Title for the social links section.',
              icon: 'i-ph-text-h'
            }),
            links: field({
              type: 'array',
              title: 'Social Links',
              description: 'Social media platform links.',
              icon: 'i-ph-share',
              items: {
                type: 'object',
                fields: {
                  platform: field({
                    type: 'string',
                    title: 'Platform',
                    description: 'Name of the social media platform.',
                    icon: 'i-ph-device-mobile'
                  }),
                  url: field({
                    type: 'string',
                    title: 'URL',
                    description: 'Full URL to the social media profile.',
                    icon: 'i-ph-link'
                  }),
                  icon: field({
                    type: 'string',
                    title: 'Icon',
                    description: 'Icon name for the platform.',
                    icon: 'i-ph-image'
                  }),
                }
              }),
            })
          }
        }),
      }
    }),

    components: group({
      title: 'Page Components',
      description: 'Configure reusable page components.',
      icon: 'i-ph-puzzle-piece',
      fields: {
        hero: group({
          title: 'Hero Section',
          description: 'Configure the main hero section.',
          icon: 'i-ph-star',
          fields: {
            title: field({
              type: 'string',
              title: 'Hero Title',
              description: 'Main headline for the hero section.',
              icon: 'i-ph-text-h'
            }),
            subtitle: field({
              type: 'string',
              title: 'Hero Subtitle',
              description: 'Supporting text under the main title.',
              icon: 'i-ph-text-aa'
            }),
            cta: group({
              title: 'Call-to-Action',
              description: 'Primary action button configuration.',
              icon: 'i-ph-cursor-click',
              fields: {
                text: field({
                  type: 'string',
                  title: 'Button Text',
                  description: 'Text displayed on the CTA button.',
                  icon: 'i-ph-text-aa'
                }),
                to: field({
                  type: 'string',
                  title: 'Button Link',
                  description: 'URL or path the button links to.',
                  icon: 'i-ph-link'
                }),
                variant: field({
                  type: 'string',
                  title: 'Button Style',
                  description: 'Visual style of the button.',
                  icon: 'i-ph-palette',
                  default: 'primary',
                  required: ['primary', 'secondary', 'outline', 'ghost']
                }),
                icon: field({
                  type: 'string',
                  title: 'Button Icon',
                  description: 'Optional icon for the button.',
                  icon: 'i-ph-image'
                })
              }
            }),
            background: group({
              title: 'Background',
              description: 'Hero section background configuration.',
              icon: 'i-ph-image',
              fields: {
                type: field({
                  type: 'string',
                  title: 'Background Type',
                  description: 'Type of background for the hero section.',
                  icon: 'i-ph-swatch',
                  required: ['color', 'gradient', 'image']
                }),
                value: field({
                  type: 'string',
                  title: 'Background Value',
                  description: 'CSS classes or URL for the background.',
                  icon: 'i-ph-code'
                })
              }
            })
          }
        }),
        games: group({
          title: 'Games Page',
          description: 'Configure the games listing page.',
          icon: 'i-ph-box',
          fields: {
            title: field({
              type: 'string',
              title: 'Page Title',
              description: 'Main title for the games page.',
              icon: 'i-ph-text-h'
            }),
            description: field({
              type: 'string',
              title: 'Page Description',
              description: 'Description text for the games page.',
              icon: 'i-ph-text-aa'
            }),
            emptyState: group({
              title: 'Empty State',
              description: 'Content shown when no games are available.',
              icon: 'i-ph-file-x',
              fields: {
                title: field({
                  type: 'string',
                  title: 'Empty State Title',
                  description: 'Title for empty state message.',
                  icon: 'i-ph-text-h'
                }),
                description: field({
                  type: 'string',
                  title: 'Empty State Description',
                  description: 'Description for empty state message.',
                  icon: 'i-ph-text-aa'
                }),
                cta: group({
                  title: 'Empty State CTA',
                  description: 'Action button for empty state.',
                  icon: 'i-ph-cursor-click',
                  fields: {
                    text: field({
                      type: 'string',
                      title: 'Button Text',
                      description: 'Text for the empty state button.',
                      icon: 'i-ph-text-aa'
                    }),
                    to: field({
                      type: 'string',
                      title: 'Button Link',
                      description: 'URL the empty state button links to.',
                      icon: 'i-ph-link'
                    })
                  }
                })
              }
            })
          }
        }),
        cta: group({
          title: 'Call-to-Action Section',
          description: 'Configure reusable CTA sections.',
          icon: 'i-ph-cursor-click',
          fields: {
            title: field({
              type: 'string',
              title: 'CTA Title',
              description: 'Title for the CTA section.',
              icon: 'i-ph-text-h'
            }),
            description: field({
              type: 'string',
              title: 'CTA Description',
              description: 'Description text for the CTA section.',
              icon: 'i-ph-text-aa'
            }),
            cta: group({
              title: 'CTA Button',
              description: 'Configuration for the CTA button.',
              icon: 'i-ph-hand-pointing',
              fields: {
                text: field({
                  type: 'string',
                  title: 'Button Text',
                  description: 'Text displayed on the CTA button.',
                  icon: 'i-ph-text-aa'
                }),
                to: field({
                  type: 'string',
                  title: 'Button Link',
                  description: 'URL or path the button links to.',
                  icon: 'i-ph-link'
                }),
                icon: field({
                  type: 'string',
                  title: 'Button Icon',
                  description: 'Optional icon for the button.',
                  icon: 'i-ph-image'
                })
              }
            }),
            background: field({
              type: 'string',
              title: 'Background Style',
              description: 'CSS classes for the CTA section background.',
              icon: 'i-ph-palette'
            })
          }
        })
      }
    })
  }
})
