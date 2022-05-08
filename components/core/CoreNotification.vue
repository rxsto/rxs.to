<template>
  <div class="bottom-0 right-0 z-50 p-4 lg:p-8 max-w-full">
    <Transition name="slide-in" mode="out-in">
      <a v-if="latestVideo && !dismissedPopup" target="_blank" @click="open"
        class="relative flex flex-col bg-neutral-800 text-white max-w-full lg:max-w-md overflow-hidden rounded-xl drop-shadow-xl hover:scale-105 cursor-pointer transition-all">
        <div class="flex relative">
          <img :src="latestVideo.snippet.thumbnails.maxres.url" alt="Video Thumbnail">
          <div class="absolute flex items-center gap-4 right-0 bottom-0 p-4">
            <p class="flex items-center gap-2 text-xs drop-shadow">
              <SvgIconEye class="h-4 fill-white" />
              {{ latestVideo.statistics.viewCount }}
            </p>
            <p class="flex items-center gap-2 text-xs drop-shadow">
              <SvgIconThumbsUp class="h-4 fill-white" />
              {{ latestVideo.statistics.likeCount }}
            </p>
          </div>
        </div>
        <div class="flex gap-2 justify-between items-center bg-neutral-800 w-full p-4">
          <div class="flex flex-col overflow-hidden max-w-full">
            <p class="whitespace-nowrap truncate font-bold">
              {{ latestVideo.snippet.title }}
            </p>
            <p class="opacity-75 whitespace-nowrap truncate">
              {{ latestVideo.snippet.description }}
            </p>
          </div>
        </div>
        <a id="button"
          class="absolute flex items-center gap-2 top-4 right-4 text-base fill-white drop-shadow hover:fill-primary-500 hover:text-primary-500 transition-all"
          @click="dismiss">
          <SvgIconClose class="h-4" />
          Dismiss
        </a>
      </a>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useYouTubeStore } from '~/store/youtube'
import useMisc from '~~/composables/useMisc';

const store = useYouTubeStore()
const { latestVideo } = storeToRefs(store)
const dismissedPopup = ref(true)

watch(latestVideo, (newLatestVideo) => {
  if (!localStorage || !newLatestVideo) {
    return
  }

  const value = localStorage.getItem(`dismissed_${latestVideo.value.id}`)
  if (!value) {
    dismissedPopup.value = false
  }
})

store.fetchLatestVideo()

const misc = useMisc()

const open = (e) => {
  const button = document.getElementById('button')
  if (misc.isDescendant(button, e.target)) {
    return
  }

  window.open(`https://www.youtube.com/watch?v=${latestVideo.value.id}`, '_blank');
  dismiss()
}

const dismiss = () => {
  localStorage.setItem(`dismissed_${latestVideo.value.id}`, 'true')
  dismissedPopup.value = true
}
</script>
