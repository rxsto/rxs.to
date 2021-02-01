<template>
  <transition name="fade-in">
    <div v-if="latestLoaded" class="p-4 md:p-8 flex fade-in absolute w-full">
      <div class="p-4 sm:px-6 bg-grey-darker w-full rounded-lg flex justify-between items-center">
        <p class="text-white text-xs sm:text-base md:text-lg">
          Check out my latest video!
        </p>
        <a :href="link" target="_blank" class="bg-green-lighter hover:bg-green-darker hover:text-white transition duration-200 px-1 md:px-2 md:py-1 rounded-md text-xs sm:text-base md:text-lg">Watch</a>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('data/videos', ['latest', 'latestLoaded']),
    link () {
      return `https://www.youtube.com/watch?v=${this.latest}`
    }
  },
  mounted () {
    this.$util.execute('data/videos/getLatest', 'Reminder.vue')
  }
}
</script>

<style scoped>
.fade-in-enter-active {
  animation: fade-in 750ms cubic-bezier(.75, -0.25, .25, 1.25);
}

@keyframes fade-in {
  0% {
    transform: translateY(-150px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
