import { defineStore } from 'pinia'

export const useYouTubeStore = defineStore('youtube', {
  state: () => ({
    latestVideo: null
  } as YouTubeStore),
  actions: {
    async fetchLatestVideo() {
      if (this.latestVideo !== null) {
        return
      }

      this.latestVideo = await $fetch<YouTubeVideo>('/', {
        baseURL: useRuntimeConfig().baseUrl,
        headers: {
          accept: 'application/json'
        }
      })
    }
  }
})
