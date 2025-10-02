export default defineAppConfig({
    ui: {
      // Brand colors - Emphasizing pink, lavender, and red palette
      colors: {
        // Adopt brand maroon using Nuxt UI built-in palette 'rose'
        primary: 'rose',
        secondary: 'pink',
        tertiary: 'violet', // Lavender/violet as tertiary
        accent: 'purple',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        neutral: 'slate'
      },
      // Typography
      prose: {
        h1: { fontFamily: "'Volkhov', serif", fontWeight: '700' },
        h2: { fontFamily: "'Volkhov', serif", fontWeight: '700' },
        h3: { fontFamily: "'Volkhov', serif", fontWeight: '700' },
        h4: { fontFamily: "'Volkhov', serif", fontWeight: '700' },
        h5: { fontFamily: "'Volkhov', serif", fontWeight: '700' },
        h6: { fontFamily: "'Volkhov', serif", fontWeight: '700' },
        p: { fontFamily: "'Merriweather Sans', sans-serif", lineHeight: '1.75' }
      }
    },
    icon: {
        mode: 'css',
        cssLayer: 'base',
        size: '24px' // Set default icon size
      }
  })
  