<template>
  <a :class="`${full ? 'glassmorphism-no-hover-active p-8 gap-4 xl:gap-2' : 'w-72 max-w-xs sm:w-full cursor-pointer hover:scale-105 transition-all glassmorphism p-4 lg:p-8 gap-2 lg:gap-4'}`"
    class="relative flex flex-col flex-shrink-0 rounded-xl">
    <Transition name="slide">
      <SvgIconClose v-if="full" class="absolute top-4 right-4 h-8 xl:h-12 z-50 fill-white cursor-pointer hover:fill-primary-500 hover:scale-105 transition" @click="close" />
    </Transition>
    <div :class="`${full ? 'gap-6' : 'gap-2 lg:gap-4'}`" class="flex items-center">
      <img :src="`/img/projects/${project.id}.svg`" :class="`${full ? 'w-16 xl:w-24' : 'w-12'} transition-all`"
        class="p-1 drop-shadow-lg">
      <p :class="`${full ? 'text-3xl xl:text-5xl' : 'text-lg xl:text-xl 2xl:text-2xl'}`"
        class="font-bold text-neutral-600 dark:text-neutral-100 drop-shadow-lg">
        {{ project.name }}
      </p>
    </div>
    <p :class="`${full ? 'text-xl xl:text-3xl xl:mt-4' : 'text-lg xl:text-xl'}`"
      class="text-neutral-600 dark:text-neutral-100 font-medium">
      {{ project.heading }}
    </p>
    <Transition name="slide">
      <div v-if="full" class="flex flex-col items-start h-full text-white gap-4 xl:gap-6">
        <p class="text-neutral-200 xl:text-2xl max-w-screen-lg">
          {{ project.description }}
        </p>
        <div class="flex gap-4 xl:gap-6 items-center flex-wrap">
          <a v-for="technology in project.technologies" :title="technology.display">
            <img :src="`/img/technologies/${technology.id}.svg`" :alt="technology.display" class="h-4 xl:h-8 w-auto">
          </a>
        </div>
        <div class="flex-grow"></div>
        <NuxtLink :to="project.url" target="_blank"
          class="uppercase glassmorphism hover:bg-primary-500 hover:scale-105 text-neutral-800 dark:text-neutral-50 hover:text-white font-bold lg:text-lg py-3 lg:py-4 px-6 lg:px-8 rounded-xl drop-shadow-lg hover:drop-shadow-xl z-20 transition-all">
          visit project
        </NuxtLink>
      </div>
    </Transition>
  </a>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  project: Project,
  full?: boolean
}>(), {
  full: false
})

const emit = defineEmits(['dismiss'])

const close = () => {
  emit('dismiss')
}
</script>

<style scoped>
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(2rem);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
