<template>
  <div class="fixed left-8 md:left-auto top-8 right-8 z-20">
    <transition name="slide-in">
      <div
        v-if="shouldShow"
        class="flex flex-col gap-1 p-4 bg-green-lighter cursor-pointer rounded shadow ease-in-out duration-200 transform hover:-translate-y-1 hover:shadow-lg"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @click="redirect()"
      >
        <p class="text-xs uppercase opacity-75">
          Check out my latest video on YouTube
        </p>
        <div class="flex items-center gap-2">
          <div class="hidden md:flex w-24 h-auto">
            <img class="rounded shadow" :src="latestVideo.thumbnails.maxres.url">
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-sm md:text-base font-bold opacity-80 md:truncate max-w-xs">
              {{ latestVideo.title }}
            </p>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 px-0.5">
              <p class="flex items-center gap-2 text-green-dark opacity-75 text-sm">
                <fa icon="eye" />
                {{ latestVideo.viewCount }}
              </p>
              <p class="flex items-center gap-2 text-green-dark opacity-75 text-sm">
                <fa icon="thumbs-up" />
                {{ latestVideo.likeCount }}
              </p>
              <p class="flex items-center gap-2 text-green-dark opacity-75 text-sm">
                <fa icon="comments" />
                {{ latestVideo.commentCount }}
              </p>
              <div class="hidden md:flex flex-grow" />
              <p class="text-xs text-green-light opacity-75">
                {{ $dayjs(latestVideo.publishedAt).fromNow() }}
              </p>
            </div>
          </div>
        </div>
        <transition name="jump-in">
          <fa v-if="hovering" icon="external-link-square-alt" class="absolute top-1 right-1 text-2xl text-green-dark opacity-75" />
        </transition>
      </div>
    </transition>
    <transition name="jump-in">
      <fa
        v-if="shouldShow"
        icon="times-circle"
        class="absolute -top-5 -left-5 text-lg text-gray-light opacity-75 duration-100 ease-in-out cursor-pointer hover:opacity-100"
        @click="hidePopup()"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      hovering: false,
      hidden: true
    }
  },
  computed: {
    ...mapState('data/youtube', ['latestVideo']),
    shouldShow () {
      return !!this.latestVideo && !this.hidden
    },
    wasAlreadyHidden () {
      return this.notificationLocalStorage && Boolean(this.notificationLocalStorage)
    },
    notificationLocalStorage () {
      return this.$storage.getLocalStorage('latest-youtube-video-notification-hidden')
    }
  },
  async mounted () {
    try {
      await this.$util.executions.add([{ root: 'data/youtube', actions: ['getLatestVideo'] }])
    } catch (err) {
      this.$util.log(['e', err.message])
    }
    setTimeout(() => {
      this.hidden = this.wasAlreadyHidden
    }, 4000)
  },
  methods: {
    redirect () {
      this.hidePopup()
      window.open(
        `https://youtube.com/watch?v=${this.latestVideo.id}`,
        '_blank'
      )
    },
    hidePopup () {
      this.hidden = true
      this.$storage.setLocalStorage('latest-youtube-video-notification-hidden', true)
    }
  }
}
</script>

<style scoped>
.jump-in-enter-active, .jump-in-leave-active {
  transition: all 100ms cubic-bezier(0, 0, .25, 1) !important;
  transform: scale(.75) !important;
  opacity: 1 !important;
}

.jump-in-enter, .jump-in-leave-to {
  transform: scale(0.9) !important;
  opacity: 0 !important;
}

.slide-in-enter-active, .slide-in-leave-active {
  transition: all 250ms cubic-bezier(0, 0, .25, 1) !important;
  transform: translateX(0) !important;
}

.slide-in-enter, .slide-in-leave-to {
  transform: translateX(100%) !important;
}
</style>
