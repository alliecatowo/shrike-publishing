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

  css: ['~/assets/css/main.css'],

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