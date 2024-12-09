<template>
  <div>
    general
    {{ user }}
    <UiButton @click="logout()">Logout</UiButton>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { user, clear } = useUserSession()

function logout () {
  clear()
}
</script>
