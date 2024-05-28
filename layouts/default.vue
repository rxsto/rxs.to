<template>
  <div class="text-foreground h-screen w-screen overflow-hidden">
    <CoreSplash v-if="!splashFinished" @finish="splashFinished = true" />
    <CoreNavigationBar />
    <div class="h-full">
      <slot />
    </div>
    <CoreMouseEffect />
    <div class="grid" />
    <div class="noise" />
    <div class="bg-background h-screen w-screen absolute top-0 left-0 z-[-3]"></div>
  </div>
</template>

<script lang="ts" setup>
const splashFinished = ref(false)
</script>

<style>
.noise {
  position: fixed;
  width: 600%;
  height: 600%;
  background-image: url('~/assets/img/noise.png');
  background-repeat: repeat;
  background-size: 200px;
  opacity: 0.25;
  top: -300%;
  left: -150%;
  animation: grain 7s steps(10) infinite;
  pointer-events: none;
  z-index: -2;
}

.grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('~/assets/img/grid.svg');
  background-repeat: repeat;
  background-size: 900px;
  opacity: 0.25;
  pointer-events: none;
  z-index: -2;
}

@keyframes grain {
  0%,
  100% {
    transform: translate(0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(7%, -25%);
  }
  40% {
    transform: translate(-5%, 25%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%);
  }
  70% {
    transform: translateY(15%);
  }
  80% {
    transform: translate(3%, 35%);
  }
  90% {
    transform: translate(-10%, 10%);
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.5rem);
  transform: translateY(-4rem);
}
</style>
