import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  alias: {
    '@vue/devtools-api': '@vue/devtools-api',
  },
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL
    }
  }
})
