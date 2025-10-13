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
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'theme-color', content: '#8B1538' }
      ]
    }
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      gitInfo: {
        name: 'shrike-publishing',
        owner: 'alliecatowo',
        url: 'https://github.com/alliecatowo/shrike-publishing'
      }
    },
    // Enable experimental features for better Studio integration
    experimental: {
      search: true
    }
  }
})