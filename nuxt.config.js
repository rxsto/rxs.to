import redirects from './assets/redirects.json'

export default {
  modern: process.env.NODE_ENV === 'production' && 'client',

  target: 'static',

  head: {
    title: 'rxsto - Oskar Lang',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'rxsto\'s public portfolio, including all projects and work. be sure to check out social media!' },
      { hid: 'google-site-verification', name: 'google-site-verification', content: 'a0LyeGNO7c4b47BfgGaDdIm_NZ_5rWpvhCVUimCm8sQ' },
      { hid: 'author', name: 'author', content: 'Oskar "rxsto" Lang (https://rxs.to)' },
      { hid: 'publisher', name: 'publisher', content: 'Oskar "rxsto" Lang (https://rxs.to)' },
      { hid: 'image', name: 'image', content: 'https://rxs.to/icon.png' },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'application-name', name: 'application-name', content: 'rxsto' },
      { hid: 'theme-color', name: 'theme-color', content: '#c6f075' },
      { hid: 'og:title', property: 'og:title', content: 'rxsto' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'rxsto - Oskar Lang' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://rxs.to' },
      { hid: 'og:description', property: 'og:description', content: 'rxsto\'s public portfolio, including all projects and work. be sure to check out social media!' },
      { hid: 'og:locale', property: 'og:locale', content: 'en_US' },
      { hid: 'og:image', property: 'og:image', content: 'https://rxs.to/icon.png' },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image:width', property: 'og:image:width', content: '750' },
      { hid: 'og:image:height', property: 'og:image:height', content: '750' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'rxsto\'s avatar' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@rxsto_official' }
    ],
    link: [
      { rel: 'canonical', href: 'https://rxs.to' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/img/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/img/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/img/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/img/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/img/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/img/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/img/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/img/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/icons/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/icons/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/img/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/img/icons/android-icon-192x192.png' },
      { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' }
    ]
  },

  loading: {
    color: '#cedb9d',
    height: '3px'
  },

  generate: {
    routes () {
      return [].concat(
        redirects.map(redirect => `/${redirect.id}`)
      )
    },
    fallback: true
  },

  build: {
    publicPath: '/assets/'
  },

  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/gtm',
    '@nuxtjs/imagemin',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    'nuxt-user-agent'
  ],

  components: true,

  fontawesome: {
    component: 'fa',
    icons: {
      regular: [
        'faCopyright'
      ],
      solid: [
        'faArrowLeft',
        'faAt'
      ],
      brands: [
        'faTwitter',
        'faGithub',
        'faLinkedin',
        'faDiscord',
        'faInstagram',
        'faYoutube',
        'faPatreon'
      ]
    }
  },

  gtm: {
    id: 'GTM-N33Q6PV'
  },

  sitemap: {
    hostname: 'https://rxs.to',
    exclude: [],
    routes () {
      return []
    }
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ]
}
