<template>
  <div />
</template>

<script>
import redirects from '~/assets/json/core/redirects'

export default {
  mounted () {
    const redirect = redirects.find(redirect => redirect.id === this.$route.params.redirect)
    location.replace(redirect.url)
  }
}
</script>
