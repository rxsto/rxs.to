export default {
  mode: 'universal',

  head: {
    title: 'Rxsto',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'author', name: 'author', content: 'Oskar "Rxsto" Lang (https://rxsto.me)' },
      { hid: 'publisher', name: 'publisher', content: 'Oskar "Rxsto" Lang (https://rxsto.me)' },
      { hid: 'image', name: 'image', content: 'https://rxsto.me/img/avatar.png' },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'application-name', name: 'application-name', content: 'Rxsto' },
      { hid: 'theme-color', name: 'theme-color', content: '#cedb9d' },
      { hid: 'og:title', property: 'og:title', content: 'Rxsto' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Rxsto' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://groovy.bot' },
      { hid: 'og:description', property: 'og:description', content: '' },
      { hid: 'og:locale', property: 'og:locale', content: 'en_US' },
      { hid: 'og:image', property: 'og:image', content: 'https://rxsto.me/img/avatar.png' },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image:width', property: 'og:image:width', content: '750' },
      { hid: 'og:image:height', property: 'og:image:height', content: '750' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'Rxsto\'s avatar' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@rxsto_official' }
    ],
    link: [
      { rel: 'canonical', href: 'https://rxsto.me' },
      { rel: 'icon', type: 'image/x-icon', href: '/img/rxsto_rounded.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Space+Mono:400,700' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css' }
    ]
  },

  loading: { color: '#cedb9d' },

  css: [
    '~/static/css/reset.css'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
