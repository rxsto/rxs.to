<template>
  <div class="flex absolute w-full">
    <div class="flex p-8 gap-4 justify-between w-full">
      <NuxtLink to="/">
        <CoreLogo class="fill-foreground h-12 w-12 fade-in" />
      </NuxtLink>
      <button @click="toggle" class="h-12 interactable">toggle</button>
    </div>
    <Transition name="fade-in-out">
      <CoreNavigationSplash v-if="active" @close="toggle" />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const active = ref(false)

const toggle = () => {
  active.value = !active.value
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  animation-delay: 1.5s;
  animation-duration: 500ms;
  animation-name: fade-in;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.fade-in-out-enter-active,
.fade-in-out-leave-active {
  transition: opacity .15s ease-in-out;
}

.fade-in-out-enter-from,
.fade-in-out-leave-to {
  opacity: 0;
}
</style>