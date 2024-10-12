// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
).overrideRules({
  'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
})
