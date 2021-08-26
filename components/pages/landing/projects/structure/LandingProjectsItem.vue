<template>
  <div
    class="relative overflow-visible flex items-center sm:justify-center w-full sm:w-auto gap-4 md:gap-6 bg-gray-light py-4 md:py-6 px-6 md:px-8 rounded shadow cursor-pointer ease-in-out duration-100 transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-lighter"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @click="redirect()"
  >
    <div class="flex items-center justify-center h-12 w-12 md:h-16 md:w-16 flex-shrink-0 rounded-full shadow" :style="`background: ${color}`">
      <img class="h-full w-auto" :src="require(`~/assets/img/projects/${id}/logo.png`)">
    </div>
    <div class="flex flex-col">
      <h2 class="text-lg md:text-xl font-bold opacity-75">
        {{ name }}
      </h2>
      <p class="text-sm md:text-lg opacity-50">
        {{ description }}
      </p>
    </div>
    <transition name="jump-in">
      <fa v-if="hovering" icon="external-link-square-alt" class="absolute top-1 right-1 text-2xl text-green-dark opacity-50" />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      hovering: false
    }
  },
  methods: {
    redirect () {
      window.open(
        this.url,
        '_blank'
      )
    }
  }
}
</script>

<style scoped>
.jump-in-enter-active, .jump-in-leave-active {
  transition: all 100ms cubic-bezier(0, 0, .25, 1);
  transform: scale(1);
  opacity: 1;
}

.jump-in-enter, .jump-in-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
