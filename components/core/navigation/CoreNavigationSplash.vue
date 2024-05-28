<template>
  <div class="h-screen w-screen fixed bg-background bg-opacity-90 backdrop-blur-sm z-30 top-0 left-0 overscroll-none">
    <!-- <button @click="close" class="absolute top-8 right-8 h-12 interactable">close</button> -->
    <div class="flex flex-col h-full justify-evenly items-center py-16 md:p-16">
      <NuxtLink v-for="el in nav" :to="el.url" @click="close"
        class="text-3xl md:text-5xl font-bold uppercase text-center tracking-[1.5rem] indent-[2rem] md:tracking-[3rem] md:indent-[2rem] z-20 opacity-80 hover:opacity-100 transition select-none interactable">
        {{ el.display }}
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
