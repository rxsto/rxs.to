<template>
  <div class="flex flex-col-reverse lg:flex-row relative h-full w-full">
    <div class="flex justify-end lg:w-1/2 h-1/2 lg:h-full z-10 bg-neutral-50 dark:bg-neutral-800 topography">
      <div
        class="flex flex-col gap-2 items-end flex-shrink-0 relative w-full max-w-screen-xl h-full lg:pt-32 2xl:pt-40 lg:pr-8 xl:pl-16">
        <h1
          class="hidden lg:block font-black uppercase absolute landing-name-cover lg:landing-name -top-12 xl:top-1/2 xl:-translate-y-1/2 left-1/2 -translate-x-1/2 text-neutral-800 dark:text-neutral-200 dark:text-opacity-25 text-opacity-10 whitespace-nowrap leading-none">
          rxsto
        </h1>
        <h2
          class="absolute opacity-50 m-6 lg:m-0 lg:relative lg:opacity-100 text-primary-500 font-bold landing-profession text-right uppercase z-20 drop-shadow-lg leading-none">
          full stack<br>bizdevops<br>engineer
        </h2>
        <NuxtLink :to="contactLink" target="_blank"
          class="hidden lg:flex uppercase glassmorphism hover:bg-primary-500 hover:scale-105 text-neutral-800 dark:text-neutral-50 hover:text-white font-bold lg:text-lg py-3 lg:py-4 px-6 lg:px-8 rounded-xl drop-shadow-lg hover:drop-shadow-xl z-20 transition-all">
          get in contact
        </NuxtLink>
      </div>
    </div>
    <div
      class="flex justify-center lg:justify-start items-center w-full lg:w-1/2 h-full z-20 bg-primary-500 shadow-lg lg:shadow-primary-500 blobs drop-shadow-lg">
      <div
        class="flex flex-col items-center lg:items-start flex-shrink-0 lg:max-w-screen-lg max-w-full lg:h-full pt-16 lg:pt-32 2xl:pt-40 lg:pl-8 xl:pl-16">
        <div class="flex justify-center lg:justify-start relative w-2/3 sm:w-3/4 md:w-1/2 lg:w-full">
          <img src="~/assets/img/avatar.jpg" class="rounded-xl drop-shadow-lg w-full lg:w-auto lg:landing-image" />
          <NuxtLink :to="contactLink" target="_blank"
            class="absolute lg:hidden uppercase whitespace-nowrap glassmorphism text-white font-bold lg:text-lg py-4 px-8 rounded-xl -bottom-6">
            get in contact
          </NuxtLink>
          <h3
            class="text-white uppercase font-bold absolute landing-fullname leading-none whitespace-nowrap drop-shadow -top-3 lg:top-auto lg:-bottom-6 xl:-bottom-8 -right-3 lg:-right-6 xl:-right-17">
            oskar lang
          </h3>
        </div>
      </div>
    </div>
    <div id="project-wrapper"
      class="flex z-30 gap-4 lg:gap-8 absolute bottom-0 left-0 p-4 lg:p-8 w-full overflow-x-auto scrolling-container dark:scrolling-container-dark max-w-full">
      <TransitionGroup name="list">
        <LandingCard v-for="project in displayProjects" :key="project.id" :id="`project-${project.id}`"
          :project="project" :class="`${project === activeProject ? 'invisible' : ''}`"
          @click="toggleProject(project)" />
      </TransitionGroup>
    </div>
    <Transition name="fade">
      <div v-if="filterProject" class="bg-neutral-800 opacity-75 absolute top-0 left-0 h-screen w-screen z-50"></div>
    </Transition>
    <div v-if="activeProject" class="absolute top-0 left-0 h-screen w-screen z-50">
      <LandingCard :project="activeProject" :full="fullyActive"
        :class="`transition-all ${fullyActive ? '-translate-x-1/2 -translate-y-1/2' : ''}`"
        :style="`position: absolute; width: ${activeWidth}; height: ${activeHeight}; left: ${activeLeft}; top: ${activeTop};`"
        @dismiss="dismissProject" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { projects } from '~/assets/config/projects'

const contactLink = 'https://discord.gg/r7tqQVs'

const fullyActive = ref(false)

const activeWidth = ref('')
const activeHeight = ref('')
const activeLeft = ref('')
const activeTop = ref('')

const activeProject = ref(null)
const filterProject = ref(null)
const displayProjects = computed(() => projects.filter(p => p.id !== filterProject.value?.id))

let wrapper: HTMLElement = null

onMounted(() => {
  wrapper = document.getElementById('project-wrapper')
})

const toggleProject = (project) => {
  activeProject.value = project
  filterProject.value = project

  if (!project) {
    return
  }

  setPosition(project)
}

const dismissProject = () => {
  fullyActive.value = false
  filterProject.value = null

  nextTick(() => {
    const el = document.getElementById(`project-${activeProject.value.id}`)
    console.log(el.offsetLeft, el.offsetTop, el.scrollLeft, wrapper.scrollLeft)
    activeWidth.value = `${el.offsetWidth}px`
    activeHeight.value = `${el.offsetHeight}px`
    activeLeft.value = `${el.offsetLeft - wrapper.scrollLeft}px`
    activeTop.value = `${el.offsetTop + wrapper.offsetTop}px`

    setTimeout(() => {
      toggleProject(null)
    }, 250)
  })
}

const setPosition = (project) => {
  const el = document.getElementById(`project-${project.id}`)
  console.log(el.offsetLeft, el.offsetTop, el.scrollLeft, wrapper.scrollLeft)

  activeWidth.value = `${el.offsetWidth}px`
  activeHeight.value = `${el.offsetHeight}px`
  activeLeft.value = `${el.offsetLeft - wrapper.scrollLeft}px`
  activeTop.value = `${el.offsetTop + wrapper.offsetTop}px`

  nextTick(() => {
    fullyActive.value = true

    const padding = window.innerWidth > 1024 ? '4rem' : '2rem'

    activeWidth.value = `calc(100% - ${padding})`
    activeHeight.value = `calc(100% - ${padding})`
    activeLeft.value = '50%'
    activeTop.value = '50%'
  })
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
  opacity: .75;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
