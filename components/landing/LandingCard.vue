<template>
  <NuxtLink :to="project.url" target="_blank" class="flex flex-col gap-2 lg:gap-4 w-72 max-w-xs sm:w-full flex-shrink-0 p-4 lg:p-8 rounded-xl glassmorphism cursor-pointer hover:scale-105 transition-all">
    <div class="flex gap-2 lg:gap-4 items-center">
      <img :src="`/img/projects/${project.id}.svg`" class="w-12 p-1 drop-shadow-lg">
      <p class="font-bold text-lg xl:text-xl 2xl:text-2xl text-neutral-600 dark:text-neutral-100 drop-shadow-lg">
        {{ project.name }}
      </p>
    </div>
    <p class="text-neutral-600 dark:text-neutral-100 font-medium text-lg">
      {{ project.heading }}
    </p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const { project } = defineProps<{
  project: Project
}>()
</script>
