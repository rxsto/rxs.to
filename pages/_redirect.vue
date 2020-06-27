<template>
  <div class="flex justify-center items-center">
    <p class="text-2xl">
      Redirecting ...
    </p>
  </div>
</template>

<script>
import redirects from '~/assets/redirects.json'

export default {
  validate ({ params }) {
    return redirects.find(redirect => redirect.id === params.redirect)
  },
  mounted () {
    this.$nextTick(() => {
      try {
        location.replace(redirects.find(redirect => redirect.id === this.$route.params.redirect).url)
      } catch (error) {}
    })
  },
  head: {
    title: 'Redirecting ...'
  }
}
</script>
