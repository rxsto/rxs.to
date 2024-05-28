<template>
  <div class="flex flex-col items-center justify-center gap-10 h-full w-full p-4">
    <div class="flex flex-col items-center gap-2">
      <h1 class="font-bold uppercase flex flex-col items-center text-foreground text-opacity-75">
        <p class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl flex items-center gap-3 md:gap-5">Hey there, I'm <img src="~/assets/img/rxsto.svg"
            alt="rxsto" class="h-[20px] sm:h-[32px] md:h-[42px] lg:h-[49px] glow" /></p>
        <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center px-4">but you can also call me oz or Oskar.</p>
      </h1>
      <h2 class="text-base md:text-lg lg:text-xl opacity-90 font-medium text-center px-4">
        I'm a self-employed freelance full stack bizdevops engineer.
      </h2>
    </div>
    <div class="flex items-center gap-10">
      <NuxtLink v-for="el in subnav" :to="el.url"
        class="flex items-center gap-2 text-base md:text-lg lg:text-xl tracking-wider opacity-50 hover:opacity-100 transition interactable">
        <Icon name="mdi:arrow-right" />
        <p>{{ el.display }}</p>
      </NuxtLink>
    </div>
    <div class="flex p-8">
      <img src="~/assets/img/clients.svg"
        class="md:max-w-[420px] lg:max-w-[512px] opacity-10 hover:opacity-25 transition duration-1000" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import subnav from '~/config/subnav'
</script>

<style scoped>
.glow {
  filter: drop-shadow(0px 0px 16px rgba(241, 233, 218, .35));
}
</style>
