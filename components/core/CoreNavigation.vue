<template>
  <div class="flex gap-4 w-full justify-between p-4 lg:p-10 z-30">
    <div class="flex p-1 lg:p-0 lg:pl-1">
      <NuxtLink to="/">
        <SvgLogo class="h-8 lg:h-12 fill-white lg:fill-primary-500 drop-shadow-lg hover:drop-shadow-xl hover:scale-105 transition-all" />
      </NuxtLink>
    </div>
    <div class="flex gap-4">
      <NuxtLink v-for="social in socials" :to="social.url" target="_blank" :title="social.display" class="flex items-center justify-center flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12 rounded-xl cursor-pointer glassmorphism hover:scale-105">
        <component :is="social.component" class="h-4 lg:h-6 fill-white" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { socials } from '~/assets/config/socials';
</script>
