<template>
  <div ref="splash">
    <div class="h-screen w-screen bg-background fixed z-50 flex items-center justify-center"
      transition-style="out:circle:top-left">
      <CoreLogo class="h-16 w-16 punch-in-out" />
    </div>
    <div class="h-screen w-screen bg-background fixed z-40 blur-md fade-out" @animationend="$emit('finish')" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['finish'])
</script>

<style scoped>
@keyframes punch-in-out {
  from {
    filter: opacity(.75) blur(8px);
    transform: scale(.8)
  }
  to {
    filter: opacity(1) blur(0) drop-shadow(0px 0px 16px rgba(241, 233, 218, .35));
    transform: scale(1);
  }
}

.punch-in-out {
  filter: opacity(0);
  animation-duration: .5s;
  animation-name: punch-in-out;
  animation-timing-function: cubic-bezier(.75, .25, .75, 1.75);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-out {
  animation-delay: .75s;
  animation-duration: 1s;
  animation-name: fade-out;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes circle-out-top-left {
  0% {
    clip-path: circle(125%);
  }
  50% {
    clip-path: circle(10% at center);
    filter: opacity(.9);
  }
  100% {
    clip-path: circle(5% at 56px 56px);
    filter: opacity(.1);
  }
}

[transition-style="out:circle:top-left"] {
  animation-delay: .75s;
  animation-duration: 1s;
  animation-name: circle-out-top-left;
  animation-timing-function: cubic-bezier(.25, 1, .30, 1);
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>
