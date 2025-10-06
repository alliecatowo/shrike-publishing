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
    '@nuxt/icon',
    'nuxt-loops'
  ],

  loops: {
    apiKey: process.env.LOOPS_API_KEY
  },

  runtimeConfig: {
    public: {
      loopsFormId: process.env.NUXT_PUBLIC_LOOPS_FORM_ID
    }
  },

  ui: {
    icons: {
      collections: ['lucide']
    }
  },

  css: ['~/assets/css/main.css'],

  image: {
    domains: ['localhost', 'images.unsplash.com'],
    ipx: {
      maxAge: 0 // Disable caching for development
    }
  },

  fonts: {
    families: [
      { name: 'Merriweather Sans', provider: 'google', weights: [400, 700, 800] },
      { name: 'Volkhov', provider: 'google', weights: [400, 700] },
      { name: 'Lato', provider: 'google', weights: [400, 700, 800] }
    ]
  },
  icon: {
    // Use Iconify API for client-side fetching
    provider: 'iconify',
    // Ensure all Lucide icons are available
    collections: ['lucide']
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