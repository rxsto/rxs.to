<template>
  <div class="flex flex-col justify-center items-center py-8">
    <picture class="flex flex-col items-center w-2/3 md:w-1/2 lg:w-1/4 xl:max-w-md">
      <source type="image/webp" srcset="/img/avatars/avatar.webp">
      <source type="image/jp2" srcset="/img/avatars/avatar.jp2">
      <source type="image/jxr" srcset="/img/avatars/avatar.jxr">
      <source type="image/jpeg" srcset="/img/avatars/avatar.jpg">
      <img
        class="rounded-full align-center transition ease-in-out jackInTheBox"
        src="/img/avatars/avatar.jpg"
        alt="rxsto's avatar"
        draggable="false"
      >
    </picture>
    <logo class="w-2/3 md:w-1/2 lg:w-1/4 xl:max-w-md mt-4" />
    <h1 class="text-3xl sm:text-6xl mt-4 sm:mt-6">
      Oskar Lang
    </h1>
    <div class="my-6 sm:my-10">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="`${social.url}${social.url.startsWith('mailto') ? '' : '?utm_source=rxsto&utm_medium=social_links_index&utm_campaign=default'}`"
        :tooltip="social.name"
        :aria-label="social.name"
        target="_blank"
        class="mr-3 sm:mr-6 last:mr-0 relative hover:text-green-base"
      >
        <fa class="text-4xl sm:text-6xl" :icon="[social.brand ? 'fab' : 'fas', social.icon]" />
      </a>
    </div>
    <div class="flex items-center opacity-50">
      <fa :icon="['far', 'copyright']" />
      <p class="ml-2">
        rxsto {{ year }}
      </p>
    </div>
  </div>
</template>

<script>
import socials from '~/assets/social.json'

export default {
  data () {
    return {
      socials
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>
