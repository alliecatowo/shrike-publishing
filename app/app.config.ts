export default defineAppConfig({
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
      // Typography - Prose component styling
      prose: {
        h1: {
          slots: {
            base: 'text-4xl sm:text-5xl font-bold text-primary mb-6 mt-8',
          }
        },
        h2: {
          slots: {
            base: 'text-3xl sm:text-4xl font-bold text-primary mb-4 mt-8',
          }
        },
        h3: {
          slots: {
            base: 'text-2xl sm:text-3xl font-semibold text-primary mb-3 mt-6',
          }
        },
        h4: {
          slots: {
            base: 'text-xl font-semibold text-primary mb-2 mt-4',
          }
        },
        p: {
          slots: {
            base: 'leading-7 my-4',
          }
        },
        strong: {
          slots: {
            base: 'font-semibold text-primary',
          }
        }
      }
      // pageSection: {
      //   slots: {
      //     container: 'flex flex-col lg:grid py-8 sm:py-12 lg:py-16 gap-8 sm:gap-12'
      //   }
      // }
    },
    icon: {
        mode: 'css',
        cssLayer: 'base',
        size: '24px' // Set default icon size
      }
  })
  