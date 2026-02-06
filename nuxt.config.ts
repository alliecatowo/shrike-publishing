// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // eslint-disable-next-line perfectionist/sort-objects
  modules: [
    '@nuxt/ui',      // Must be before @nuxt/content for prose components
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/eslint',
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
      { name: 'Merriweather Sans', provider: 'google', weights: [300, 400, 500, 600, 700, 800] }
    ]
  },
  icon: {
    // Use Iconify API for client-side fetching
    provider: 'iconify',
    // Ensure all Lucide icons are available
    collections: ['lucide']
  },

  routeRules: {
    // Static pages — prerendered at build time
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/licenses': { prerender: true },
    '/support': { prerender: true },
    '/portfolio': { prerender: true },
    '/resources': { prerender: true },
    '/shop': { prerender: true },
    '/games/**': { prerender: true },

    // Studio & API — always SSR, never cached
    '/_studio': { ssr: true },
    '/__nuxt_studio/**': { ssr: true },
    '/api/**': { ssr: true }
  },

  nitro: {
    prerender: {
      ignore: ['/api/', '/_studio', '/__nuxt_studio']
    }
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
    experimental: {
      search: true,
      nativeSqlite: true
    }
  },

  studio: {
    dev: true,
    repository: {
      provider: 'github',
      owner: 'alliecatowo',
      repo: 'shrike-publishing',
      branch: 'main'
    }
  }
})