<template>
  <div class="flex">
    <div class="flex p-8 gap-4 justify-between w-full">
      <NuxtLink to="/">
        <CoreLogo class="fill-foreground h-12 w-12" />
      </NuxtLink>
      <button @click="toggle" class="h-12 interactable">toggle</button>
    </div>
    <CoreNavigationSplash v-if="active" @close="toggle" />
  </div>
</template>

<script lang="ts" setup>
const active = ref(false)

const toggle = () => {
  active.value = !active.value
}
</script>
