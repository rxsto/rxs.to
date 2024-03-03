export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],

  runtimeConfig: {
    lastFmApiKey: process.env.LAST_FM_API_KEY,
    public: {
      lastFmApiInterval: Number(process.env.LAST_FM_API_INTERVAL)
    }
  }
})
