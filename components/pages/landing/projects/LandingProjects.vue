<template>
  <div id="landing-projects" class="flex min-h-screen min-w-full bg-gray-darker">
    <div class="h-full w-full flex justify-center items-center">
      <div class="flex flex-col py-8 px-8 md:px-16 gap-6 md:gap-8">
        <div class="flex flex-col gap-2">
          <p class="text-4xl md:text-7xl mb-4">
            👨‍💻
          </p>
          <h2 class="text-2xl md:text-4xl font-bold text-white">
            Projects
          </h2>
          <p class="text-lg md:text-2xl text-white opacity-75">
            These are the most popular projects I am and have been working on!
          </p>
        </div>
        <div class="flex flex-wrap gap-6 md:gap-8">
          <landing-projects-item
            v-for="project in projects"
            :key="project.id"
            v-bind="project"
          />
        </div>
        <p class="text-base text-white opacity-50">
          There is more to come in the future, lots of projects are in active development!<br>
          If you want to learn more about my work feel free to get in touch on my <a href="/discord" target="_blank" class="text-green-lighter border-b border-green-lighter opacity-75 duration-100 ease-in-out hover:opacity-100">Discord</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import projects from '~/assets/json/projects/all'

export default {
  data () {
    return {
      projects
    }
  }
}
</script>
