import { defineNuxtConfig } from 'nuxt'

const title = 'rxsto - Oskar Lang - full stack bizdevops engineer'
const description = 'I\'m a self-employed full stack bizdevops engineer working on popular projects like the well-known Discord bots Hydra and Groovy.'
const twitterHandle = '@rxsto_official'

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
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title,
      robots: 'index, follow',
      meta: [
        { name: 'description', content: description },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'rxsto' },
        { name: 'og:title', content: title },
        { name: 'og:url', content: 'https://rxs.to' },
        { name: 'og:image', content: 'https://rxs.to/avatar.png' },
        { name: 'twitter:site', content: twitterHandle },
        { name: 'twitter:creator', content: twitterHandle },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: 'https://rxs.to/avatar.png' },
        { name: 'twitter:image:alt', content: 'rxsto\'s avatar' },
      ],
      link: [
        { rel: 'favicon', href: '/favicon.png' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
})
