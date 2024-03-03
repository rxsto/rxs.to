export default defineEventHandler(async (_) => {
  return await $fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rxsto&api_key=${useRuntimeConfig().lastFmApiKey}&format=json`)
})
