export default {
  target: 'static',

  head: {
    title: 'rxs.to',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxt/content',
    '@nuxtjs/axios'
  ],

  axios: {
    https: true
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  content: {}
}
