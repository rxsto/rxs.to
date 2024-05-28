<template>
  <div class="h-screen w-screen fixed bg-background bg-opacity-90 backdrop-blur-sm z-30 top-0 left-0 overscroll-none">
    <div class="flex flex-col h-full justify-evenly items-center py-16 md:p-16">
      <NuxtLink v-for="(el, i) in nav" :to="el.url" @click="close"
        class=" h-[48px] overflow-hidden text-3xl md:text-5xl font-bold uppercase text-center tracking-[1.5rem] indent-[2rem] md:tracking-[3rem] md:indent-[2rem] z-20 opacity-80 hover:opacity-100 transition select-none interactable">
        <p class="animated" :style="`animation-delay: ${i * 75}ms;`">
          {{ el.display }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import nav from '~/config/nav'

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

onKeyStroke('Escape', () => close())
</script>

<style scoped>
@keyframes animated {
  from {
    transform: translateY(48px);
  }

  to {
    transform: translateY(0);
  }
}

.animated {
  transform: translateY(-48px);
  animation-name: animated;
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  animation-fill-mode: forwards;
}
</style>
