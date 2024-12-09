<template>
  <div>
    landing
    <UiButton @click="login()">Login</UiButton>
  </div>
</template>

<script lang="ts" setup>
function login () {
  navigateTo('/login')
}
</script>
