<template>
  <div
    class="relative flex min-h-screen min-w-full bg-cover bg-center bg-opacity-75 bg-blend-multiply bg-gray-darker"
    :style="`background-image: url('${require('~/assets/img/background.jpg')}')`"
  >
    <div class="h-full w-full flex justify-center items-center bg-gray-dark bg-opacity-25 backdrop-filter backdrop-blur">
      <div class="flex justify-between items-center container max-w-6xl px-8">
        <div class="flex flex-col gap-4">
          <p class="text-7xl lg:text-9xl drop-shadow">
            👋
          </p>
          <h1 class="text-6xl lg:text-8xl font-bold text-white drop-shadow md:whitespace-nowrap">
            Hey,<br>
            I'm Oskar!
          </h1>
          <h2 class="text-xl lg:text-2xl font-bold text-white opacity-75 sm:mx-2 drop-shadow md:whitespace-nowrap">
            I'm a self-employed fullstack / devops engineer <br class="hidden md:block">working on various amazing projects!
          </h2>
          <div class="flex flex-wrap gap-4 sm:gap-6 sm:mx-2">
            <a
              v-for="social in socials"
              :key="social.id"
              v-tooltip.bottom="social.display"
              target="_blank"
              :href="`/${social.id}`"
              class="text-xl xs:text-2xl lg:text-3xl text-white cursor-pointer ease-in-out duration-100 hover:opacity-75"
            >
              <fa :icon="['fab', social.icon]" class="drop-shadow" />
            </a>
          </div>
        </div>
        <div class="hidden md:flex flex-shrink max-w-lg">
          <img :src="require('~/assets/img/icon.png')" class="drop-shadow">
        </div>
      </div>
    </div>
    <a class="absolute bottom-8 text-2xl animate-bounce cursor-pointer text-white left-1/2" @click="launchProjects()">
      <fa icon="chevron-down" class="relative -left-1/2" />
    </a>
  </div>
</template>

<script>
import socials from '~/assets/json/core/socials'

export default {
  data () {
    return {
      socials
    }
  },
  methods: {
    launchProjects () {
      document.getElementById('landing-projects').scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>
