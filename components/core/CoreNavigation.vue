<template>
  <div class="flex gap-4 w-full justify-between p-4 lg:p-10 z-30">
    <div class="relative flex p-1 lg:p-0 lg:pl-1">
      <a class="cursor-pointer" @click="increase">
        <SvgLogo
          class="h-8 lg:h-12 fill-white lg:fill-primary-500 drop-shadow-lg hover:drop-shadow-xl hover:scale-105 transition-all"
          :style="`transform: rotate(${clicks * 360}deg);`" />
      </a>
      <div
        class="absolute z-20 lg:top-1/2 lg:-translate-y-1/2 -left-1 lg:left-auto -bottom-12 lg:bottom-auto lg:-right-8 h-8">
        <TransitionGroup name="slide" tag="div">
          <p v-for="tooltip in tooltips" :key="tooltip"
            class="absolute text-xs drop-shadow flex items-center justify-center glassmorphism h-8 px-3 rounded-lg text-white whitespace-nowrap">
            {{ display(tooltip) }}
          </p>
        </TransitionGroup>
      </div>
    </div>
    <div class="flex gap-4">
      <NuxtLink v-for="social in socials" :to="social.url" target="_blank" :title="social.display"
        class="flex items-center justify-center flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12 rounded-xl cursor-pointer glassmorphism hover:scale-105">
        <component :is="social.component" class="h-4 lg:h-6 fill-white" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { socials } from '~/assets/config/socials';

const isMounted = ref(false)

const clicks = ref(0)
const tooltips = ref([])

watch(clicks, (newClicks) => {
  if (!isMounted.value) {
    return
  }

  localStorage.setItem('biscuits', `${newClicks}`)
})

onMounted(() => {
  isMounted.value = true
  clicks.value = Number(localStorage.getItem('biscuits'))
})

const increase = () => {
  if (!isMounted.value) {
    return
  }

  clicks.value++
  tooltips.value.push(clicks.value)
  setTimeout(() => {
    tooltips.value.shift()
  }, 1000)
}

const exclamations = [
  'EPIC!',
  'INSANE!',
  'WHAT THE HELL!',
  'GODMODE!',
  'WHY...',
  'HOLY SHIT!',
  'MAD!',
  'SICK!',
  'DOPE!',
  'OH MY GOD!',
  'STREAK!',
  'OVERPOWERED!',
  'hi there',
]

const display = (tooltip) => {
  return tooltip % 100 === 0 ? exclamations[tooltip % exclamations.length] : tooltip
}
</script>

<style scoped>
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-4rem);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(4rem);
}

@media (min-width: 1024px) {
  .slide-enter-from {
    opacity: 0;
    transform: translateY(4rem);
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateY(-4rem);
  }
}

.slide-leave-active {
  position: absolute;
}
</style>
