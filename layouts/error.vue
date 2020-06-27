<template>
  <div class="flex flex-col justify-center items-center">
    <p class="text-6xl font-bold">
      {{ code }}
    </p>
    <h1 class="text-3xl mt-4">
      Oh no! 😔
    </h1>
    <p class="text-lg text-center mx-4">
      {{ message }}
    </p>
    <nuxt-link class="flex items-center mt-4 text-green-base" to="/">
      <fa icon="arrow-left" />
      <p class="ml-4">
        back to home
      </p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    code () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message || '<%= messages.client_error %>'
    }
  },
  head () {
    return {
      title: `${this.code} - ${this.message.substring(0, 55)}`
    }
  }
}
</script>
