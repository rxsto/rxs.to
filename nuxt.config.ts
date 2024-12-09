export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "radix-vue/nuxt",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@samk-dev/nuxt-vcalendar",
    "@nuxthub/core",
    "nuxt-auth-utils"
  ],

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true
  },

  colorMode: {
    classSuffix: ""
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv"
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }]
  },

  build: {
    transpile: ["vue-sonner"]
  },

  hub: {
    blob: true,
    database: true,
    kv: true,
    remote: true
  },

  auth: {
    webAuthn: true
  }
})
