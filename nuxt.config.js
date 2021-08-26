import { author, host, color, pages } from './assets/json/core/meta.json'
const { short, title, description } = pages.home

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
    '~/plugins/extensions/tooltips',
    '~/plugins/util'
  ],

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  buildModules: [
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/pwa',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
    '@nuxtjs/universal-storage'
  ],

  axios: {
    https: true
  },

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'localizedFormat']
  },

  gtm: {
    id: 'TODO',
    enabled: process.env.NODE_ENV === 'production' && process.env.GTM_ENABLED === 'true',
    debug: process.env.NODE_ENV !== 'production',
    scriptDefer: true
  },

  fontawesome: {
    component: 'fa',
    icons: {
      solid: [
        'faChevronDown',
        'faExternalLinkSquareAlt',
        'faTimesCircle',
        'faEye',
        'faThumbsUp',
        'faComments'
      ],
      brands: [
        'faGithub',
        'faTwitter',
        'faDiscord',
        'faYoutube',
        'faInstagram',
        'faPatreon',
        'faLinkedin'
      ]
    }
  },

  storage: {
    vuex: {
      namespace: 'storage'
    },
    localStorage: {
      prefix: 'r_'
    },
    cookie: false,
    ignoreExceptions: false
  },

  pwa: {
    meta: {
      name: title,
      author,
      description,
      theme_color: color.primary,
      ogTitle: title,
      ogSiteName: short,
      ogDescription: description,
      ogHost: host,
      ogImage: true,
      twitterCard: 'summary',
      twitterSite: '@rxsto_official'
    },
    manifest: {
      lang: 'en',
      name: title,
      short_name: short,
      description,
      background_color: color.contrast
    }
  },

  content: {}
}
