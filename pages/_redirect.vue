<template>
  <div />
</template>

<script>
import redirects from '~/assets/json/core/redirects'

export default {
  mounted () {
    const redirect = redirects.find(redirect => redirect.id === this.$route.params.redirect)
    window.open(
      redirect.url,
      '_blank'
    )
  }
}
</script>
