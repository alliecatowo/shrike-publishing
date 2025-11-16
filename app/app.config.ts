export default defineAppConfig({
    branding: {
      logo: '/ShrikeLogoNov2021.png',
      name: 'Shrike Publishing',
      logoAlt: 'Shrike Publishing'
    },
    ui: {
      // Brand colors - Emphasizing pink, lavender, and red palette
      colors: {
        // Adopt brand maroon using Nuxt UI built-in palette 'rose'
        primary: 'rose',
        secondary: 'pink',

        accent: 'purple',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        neutral: 'slate'
      },
      // Typography - Prose component styling (Nuxt UI v4 native approach)
      // COMMENTED OUT - Testing default Nuxt UI prose rendering
      // prose: {
      //   // Headings - Use Playfair Display font with semantic colors
      //   h1: {
      //     slots: {
      //       base: 'text-4xl sm:text-5xl font-bold text-highlighted mb-6 mt-8 leading-tight',
      //       link: 'inline-flex items-center gap-2'
      //     }
      //   },
      //   h2: {
      //     slots: {
      //       base: 'text-3xl sm:text-4xl font-bold text-highlighted mb-4 mt-10 leading-tight',
      //       leading: 'absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity',
      //       leadingIcon: 'size-4 shrink-0',
      //       link: 'group lg:ps-2 lg:-ms-2'
      //     }
      //   },
      //   h3: {
      //     slots: {
      //       base: 'text-2xl sm:text-3xl font-semibold text-highlighted mb-3 mt-8 leading-snug',
      //       leading: 'absolute -ms-8 top-0.5 opacity-0 group-hover:opacity-100 transition-opacity',
      //       leadingIcon: 'size-4 shrink-0',
      //       link: 'group lg:ps-2 lg:-ms-2'
      //     }
      //   },
      //   h4: {
      //     slots: {
      //       base: 'text-xl font-semibold text-highlighted mb-2 mt-6 leading-snug'
      //     }
      //   },
      //   h5: {
      //     slots: {
      //       base: 'text-lg font-semibold text-highlighted mb-2 mt-4'
      //     }
      //   },
      //   h6: {
      //     slots: {
      //       base: 'text-base font-semibold text-highlighted mb-2 mt-4'
      //     }
      //   },

      //   // Body text with comfortable reading settings
      //   p: {
      //     base: 'my-5 leading-7 text-default text-pretty'
      //   },

      //   // Emphasis and strong
      //   strong: {
      //     base: 'font-bold text-highlighted'
      //   },
      //   em: {
      //     base: 'italic text-default'
      //   },

      //   // Links with brand color
      //   a: {
      //     base: [
      //       'text-primary border-b border-transparent hover:border-primary font-medium',
      //       'transition-colors duration-200 focus-visible:outline-primary'
      //     ]
      //   },

      //   // Lists
      //   ul: {
      //     base: 'my-5 space-y-2 list-disc list-outside ms-6'
      //   },
      //   ol: {
      //     base: 'my-5 space-y-2 list-decimal list-outside ms-6'
      //   },
      //   li: {
      //     base: 'leading-7 text-default'
      //   },

      //   // Code (inline and blocks)
      //   code: {
      //     base: 'px-1.5 py-0.5 rounded bg-elevated text-sm font-mono border border-default text-highlighted'
      //   },
      //   pre: {
      //     slots: {
      //       base: 'my-5 rounded-lg bg-elevated border border-default p-4 overflow-x-auto',
      //       code: 'text-sm font-mono text-default'
      //     }
      //   },

      //   // Blockquotes
      //   blockquote: {
      //     base: 'border-s-4 border-primary ps-4 my-5 italic text-toned'
      //   },

      //   // Horizontal rule
      //   hr: {
      //     base: 'border-t border-default my-12'
      //   },

      //   // Images
      //   img: {
      //     base: 'rounded-lg my-8 w-full'
      //   },

      //   // Tables
      //   table: {
      //     base: 'my-6 w-full border-collapse'
      //   },
      //   thead: {
      //     base: 'border-b border-default'
      //   },
      //   tbody: {
      //     base: 'divide-y divide-default'
      //   },
      //   tr: {
      //     base: ''
      //   },
      //   th: {
      //     base: 'px-4 py-2 text-left font-semibold text-highlighted'
      //   },
      //   td: {
      //     base: 'px-4 py-2 text-default'
      //   }
      // }
      // pageSection: {
      //   slots: {
      //     container: 'flex flex-col lg:grid py-8 sm:py-12 lg:py-16 gap-8 sm:gap-12'
      //   }
      // }

      // Page layout - Add centering to content area
      page: {
        slots: {
          center: 'lg:col-span-8 max-w-4xl mx-auto px-4'
        }
      }
    },
    icon: {
        mode: 'css',
        cssLayer: 'base',
        size: '24px' // Set default icon size
      }
  })
  