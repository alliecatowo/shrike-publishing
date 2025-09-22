// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon'
  ],

  ui: {
    icons: {
      collections: ['lucide']
    }
  },

  css: ['~/assets/css/main.css'],

  image: {
    domains: ['localhost'],
    ipx: {
      maxAge: 0 // Disable caching for development
    }
  },

        fonts: {
          families: [
            { name: 'Merriweather Sans', provider: 'google', weights: [400, 700, 800] },
            { name: 'Volkhov', provider: 'google', weights: [400, 700, 800] },
            { name: 'Lato', provider: 'google', weights: [400, 700, 800] }
          ]
        },
  icon: {
    serverBundle: {
      collections: ['lucide']
    },
    fallbackToApi: true
  },

  nitro: {
    preset: 'github_pages'
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  }
})