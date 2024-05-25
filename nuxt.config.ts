export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@hypernym/nuxt-anime'
  ],

  runtimeConfig: {
    lastFmApiKey: process.env.LAST_FM_API_KEY,
    public: {
      lastFmApiInterval: Number(process.env.LAST_FM_API_INTERVAL)
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
