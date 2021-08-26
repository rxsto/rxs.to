import redirects from './assets/json/core/redirects.json'
import { author, host, color, pages } from './assets/json/core/meta.json'
const { short, title, description } = pages.home

export default {
  target: 'static',
  modern: process.env.NODE_ENV === 'production' && 'client',

  head: {
    title,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' },
      { hid: 'publisher', name: 'publisher', content: author },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'application-name', name: 'application-name', content: short }
    ],
    link: [
      { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' }
    ]
  },

  loading: {
    color: color.secondary,
    height: '4px'
  },

  plugins: [
    '~/plugins/extensions/tooltips',
    '~/plugins/util'
  ],

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  generate: {
    subFolders: false,
    routes () {
      return [].concat(
        redirects.map(redirect => `/${redirect.id}`)
      )
    },
    fallback: true
  },

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
    id: 'GTM-N33Q6PV',
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

  sitemap: {
    hostname: 'https://rxs.to',
    exclude: [],
    filter ({ routes }) {
      return routes.filter(route => !redirects.find(redirect => `/${redirect.id}` === route.url))
    },
    defaults: {
      lastmod: new Date()
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
  }
}
