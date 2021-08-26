<template>
  <div class="flex bg-gray-darker p-2">
    <p class="text-xs text-white opacity-50">
      © rxsto {{ year }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
