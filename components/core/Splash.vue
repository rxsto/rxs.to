<template>
  <div v-if="!hidden" ref="splash" class="flex justify-center items-center w-full min-h-screen absolute z-50 bg-green-lighter">
    <div class="spin flex relative justify-center items-center h-64 w-64" style="transform: scale(0)">
      <div class="absolute h-8 w-40 bg-green-dark rounded-full transform rotate-45" />
      <div class="absolute h-8 w-40 bg-green-dark rounded-full transform -rotate-45" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hidden: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.splash.classList.add('fade-out')
      setTimeout(() => {
        this.hidden = true
        this.releaseSplash()
      }, 500)
    }, 2750)
  },
  methods: {
    releaseSplash () {
      document.getElementsByTagName('body')[0].style.overflowY = 'visible'
    }
  }
}
</script>

<style scoped>
.fade-out {
  animation-duration: 500ms;
  animation-name: fadeOut;
  animation-timing-function: ease-in-out;
}

.spin {
  animation-name: zoomIn, spin, zoomOut;
  animation-delay: .5s, 1s, 3s;
  animation-duration: .5s, 1s, .5s;
  animation-iteration-count: 1, 2, 1;
  animation-fill-mode: forwards, forwards, forwards;
  animation-timing-function: ease-in-out;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(5);
  }
}

@keyframes spin {
  25% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
