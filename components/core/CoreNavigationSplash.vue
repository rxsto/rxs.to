<template>
  <div class="h-screen w-screen absolute bg-background z-30">
    <button @click="close" class="absolute top-8 right-8 h-12 interactable">close</button>
    <div class="flex flex-col h-full justify-center items-start ml-24 gap-4">
      <NuxtLink v-for="(el, i) in nav" :to="el.url" @click="close" class="flex items-end gap-1 interactable">
        <p class="text-lg py-2">
          0{{ i }}
        </p>
        <p class="text-8xl z-20 opacity-80 hover:opacity-100 transition">
          {{ el.display }}
        </p>
      </NuxtLink>
    </div>
    <CoreLogo class="absolute top-1/2 -translate-y-1/2 -left-1/3 opacity-25 z-10" />
    <div class="dots" />
  </div>
</template>

<script lang="ts" setup>
import nav from '~/config/nav'

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.dots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('~/assets/img/dots.svg');
  background-repeat: repeat;
  background-size: 900px;
  opacity: 0.25;
  pointer-events: none;
}
</style>