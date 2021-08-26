export default function ({ app, store }) {
  return {
    youtube: {
      async getLatestVideo () {
        return await app.$axios.$get('https://')
      }
    }
  }
}
