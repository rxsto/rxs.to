<template>
  <NuxtLink v-if="track" ref="wrapper" :to="track.url" target="_blank"
    class="viewer absolute select-none bg-background p-4 overflow-hidden interactable">
    <div class="flex items-center gap-4">
      <div class="flex flex-col w-48 overflow-hidden">
        <div ref="titleWrapper" class="relative flex gap-16 overflow-hidden">
          <p ref="title" class="text-lg font-medium whitespace-nowrap flex-shrink-0">{{ track.name }}</p>
        </div>
        <div ref="artistWrapper" class="relative flex gap-16 overflow-hidden">
          <p ref="artist" class="text-sm opacity-75 whitespace-nowrap flex-shrink-0">{{
            track.artist['#text'] }}</p>
        </div>
      </div>
      <div class="relative mr-1">
        <img v-if="coverArt" :src="coverArt['#text']" class="rounded-full h-10 z-20" draggable="false" />
        <div class="absolute -bottom-0.5 -right-0.5">
          <span class="relative flex h-4 w-4">
            <span v-if="isNowPlaying"
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span :class="isNowPlaying ? 'bg-primary' : 'bg-gray-500'"
              class="relative inline-flex rounded-full h-4 w-4 "></span>
          </span>
        </div>
      </div>
      <img v-if="coverArt" :src="coverArt['#text']"
        class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-20 w-[200%]" />
    </div>
    <div
      class="absolute flex items-center justify-center w-full h-full bg-foreground top-0 left-0 opacity-0 hover:opacity-90 transition">
      <p class="text-background uppercase font-bold text-opacity-75">open on last.fm</p>
    </div>
    <div ref="splash" class="flex top-0 left-0 absolute h-full w-full translate-x-[-512px]">
      <div
        class="absolute bg-foreground top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-12 w-[150%] h-[250%]" />
    </div>
  </NuxtLink>
  <div v-else class="flex items-center justify-center absolute w-[284px] h-20 bg-foreground bg-opacity-50">
    <p class="text-background uppercase font-bold text-opacity-75">loading track...</p>
  </div>
</template>

<script lang="ts" setup>
const live = ref<RecentTracksWrapper | null>(null)

const { data, pending, error, refresh } = await useFetch<RecentTracksWrapper>('/api/lastfm')

const currentId = ref('')

const refreshInterval = ref()

onMounted(() => {
  refreshInterval.value = setInterval(() => update(), useRuntimeConfig().public.lastFmApiInterval)
  live.value = data.value
  next()
  check()
})

onBeforeUnmount(() => clearInterval(refreshInterval.value))

const update = async () => {
  await refresh()
  currentId.value = track.value?.url || ''
  check()
}

watch(data, (newData) => {
  setTimeout(() => {
    live.value = newData
  }, 1000)
})

const track = computed(() => {
  if (!live.value) {
    return null
  }

  if (live.value.error) {
    console.warn(live.value.message)
    clearInterval(refreshInterval.value)
    return null
  }

  return live.value.recenttracks.track[0]
})

const isNowPlaying = computed(() => {
  if (!track.value) {
    return false
  }

  return track.value['@attr']?.nowplaying === 'true'
})

const coverArt = computed(() => {
  if (track.value && track.value.image) {
    const images = track.value.image
    return images[images.length - 1]
  } else {
    return null
  }
})

const title = ref<HTMLElement | null>(null)
const titleWrapper = ref<HTMLElement | null>(null)

const artist = ref<HTMLElement | null>(null)
const artistWrapper = ref<HTMLElement | null>(null)

const animating = ref<HTMLElement[]>([])

const check = () => {
  if (!title.value || !titleWrapper.value) {
    return
  }

  if (isOverflowing(title.value) && !animating.value.includes(title.value)) {
    titleWrapper.value.classList.add('masked-overflow')
    animate(title.value, titleWrapper.value)
  } else if (!isOverflowing(title.value) && animating.value.includes(title.value)) {
    titleWrapper.value.classList.remove('masked-overflow')
    reset(title.value, titleWrapper.value)
  } else if (isOverflowing(title.value) && animating.value.includes(title.value)) {
    // TODO maybe figure out if the track is still the same and avoid resetting?
    reset(title.value, titleWrapper.value)
    animate(title.value, titleWrapper.value)
  }

  if (!artist.value || !artistWrapper.value) {
    return
  }

  if (isOverflowing(artist.value) && !animating.value.includes(artist.value)) {
    artistWrapper.value.classList.add('masked-overflow')
    animate(artist.value, artistWrapper.value)
  } else if (!isOverflowing(artist.value) && animating.value.includes(artist.value)) {
    artistWrapper.value.classList.remove('masked-overflow')
    reset(artist.value, artistWrapper.value)
  } else if (isOverflowing(artist.value) && animating.value.includes(artist.value)) {
    // TODO maybe figure out if the track is still the same and avoid resetting?
    reset(artist.value, artistWrapper.value)
    animate(artist.value, artistWrapper.value)
  }
}

const animations = ref<Map<HTMLElement, Animation[]>>(new Map())

const animate = (el: HTMLElement, wrapper: HTMLElement) => {
  if (!el || !el.parentElement || !wrapper) {
    return
  }

  animating.value.push(el)

  const duplicate = el.cloneNode(true) as HTMLElement
  wrapper.append(duplicate)

  const keyframes = [
    { transform: 'translateX(0px)' },
    { transform: `translateX(-${el.scrollWidth + 64}px)` }
  ]

  const mainAnimation = el.animate(keyframes, {
    duration: 10000,
    iterations: Infinity
  })

  const secondaryAnimation = duplicate.animate(keyframes, {
    duration: 10000,
    iterations: Infinity
  })

  animations.value.set(el, [mainAnimation, secondaryAnimation])
}

const reset = (el: HTMLElement, wrapper: HTMLElement) => {
  if (wrapper.lastChild) {
    wrapper.removeChild(wrapper.lastChild)
  }

  const elementAnimations = animations.value.get(el)
  if (elementAnimations) {
    for (const animation of elementAnimations) {
      animation.cancel()
    }
  }

  animating.value.splice(animating.value.indexOf(el), 1)
}

const isOverflowing = (el: HTMLElement) => {
  if (!el.parentElement) {
    return false
  }

  return el.scrollWidth > el.parentElement.offsetWidth
}

// NOTE any is required here since we're referencing a VueComponent
const splash = ref<HTMLElement | null>(null)

watch(currentId, () => {
  next()
})

const next = () => {
  if (!splash.value) {
    return
  }

  const splashKeyframes = [
    { transform: 'translateX(-512px)' },
    { transform: 'translateX(512px)' }
  ]

  // NOTE since we're referencing a VueComponent we need to extract the HTMLElement from $el
  splash.value.animate(splashKeyframes, {
    duration: 2500,
    easing: 'cubic-bezier(.35, -0.25, .35, 1.25)'
  })
}
</script>

<style scoped>
.viewer {
  box-shadow: 0px 0px 32px 8px rgba(241, 233, 218, 0.15);
}

.marquee {
  animation-name: marquee;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-200%);
  }
}

.masked-overflow {
  mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
}
</style>
