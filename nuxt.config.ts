import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
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
