<template>
  <div>
    <div>
      <UiInput v-model="username" placeholder="Username" />
      <UiInput v-model="name" placeholder="Display name" />
      <UiButton @click="signUp">Sign Up</UiButton>
    </div>

    <div>
      <UiInput v-model="username" placeholder="Username" />
      <UiButton @click="signIn">Sign In</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'guest'
})

const { fetch } = useUserSession()
const { register, authenticate } = useWebAuthn()
const username = ref('')
const name = ref('')

async function signUp() {
  await register({
    userName: username.value,
    displayName: name.value
  })
    .then(fetch)
    .then(async () => await navigateTo('/admin'))
    .catch((error) => {
      useSonner.error(error.data?.message || error.message, {
        description: error.data?.data?.issues[0]?.message || error.data?.data
      })
    })
}

async function signIn() {
  await authenticate(username.value)
    .then(fetch)
    .then(async () => await navigateTo('/admin'))
    .catch((error) => {
      useSonner.error(error.data?.message || error.message, {
        description: error.data?.data,
      })
    })
}
</script>
