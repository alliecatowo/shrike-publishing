// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon'
  ],

  css: ['~/assets/css/main.css'],

  image: {
    // Enable global $img helper
    inject: true,

    // Image quality (default 80, good balance)
    quality: 80,

    // Default formats (webp first for modern browsers)
    format: ['webp', 'png', 'jpg'],

    // Screen sizes for responsive images
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },

    // Allowed domains for external images
    domains: ['localhost'],

    // IPX configuration for development
    ipx: {
      maxAge: 0, // Disable caching for development
    },

    // Densities for high-DPI displays
    densities: [1, 2],
  },

  fonts: {
    families: [
      { name: 'Merriweather Sans', provider: 'google', weights: [700] },
      { name: 'Volkhov', provider: 'google', weights: [700] },
      { name: 'Lato', provider: 'google', weights: [700] }
    ]
  },

  icon: {
    
    serverBundle: {
      collections: ['mdi']
    },
    fallbackToApi: true
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})