<template>
  <div class="h-12 w-12 flex relative z-40 cursor-pointer interactable">
    <div ref="top" key="top" class="base top" />
    <div ref="center" key="center" class="base center" />
    <div ref="bottom" key="bottom" class="base bottom" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  active: boolean
}>()

const { active } = toRefs(props)

const duration = ref('.35s')

const top = ref<HTMLElement | null>(null)
const center = ref<HTMLElement | null>(null)
const bottom = ref<HTMLElement | null>(null)

watch(active, (newActive) => {
  if (!top.value || !center.value || !bottom.value) {
    return
  }

  function open(el: HTMLElement, id: string) {
    el.classList.remove(`${id}-closing`)
    el.classList.add(`${id}-opening`)
  }

  function close(el: HTMLElement, id: string) {
    el.classList.remove(`${id}-opening`)
    el.classList.add(`${id}-closing`)
  }

  if (newActive) {
    open(top.value, 'top')
    open(center.value, 'center')
    open(bottom.value, 'bottom')
  } else {
    close(top.value, 'top')
    close(center.value, 'center')
    close(bottom.value, 'bottom')
  }
})
</script>

<style scoped>
.base {
  @apply w-12 h-1.5 bg-foreground absolute origin-center;
}

.top {
  top: 4px;
}

@keyframes top-opening {
  50% {
    top: 50%;
    transform: translateY(-50%);
  }

  100% {
    top: 50%;
    transform: translateY(-50%) rotate(225deg);
  }
}

.top-opening {
  animation-name: top-opening;
  animation-duration: v-bind(duration);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes top-closing {
  0% {
    top: 50%;
    transform: translateY(-50%) rotate(225deg);
  }

  50% {
    top: 50%;
    transform: translateY(-50%);
  }

  100% {
    top: 4px;
    transform: translateY(0);
  }
}

.top-closing {
  animation-name: top-closing;
  animation-duration: v-bind(duration);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

.center {
  top: 50%;
  transform: translateY(-50%) translateX(-12px);
}

@keyframes center-opening {
  to {
    opacity: 0;
    transform: translateX(1000%);
  }
}

.center-opening {
  animation-name: center-opening;
  animation-duration: v-bind(duration);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes center-closing {
  from {
    opacity: 0;
    transform: translateX(1000%);
  }

  to {
    opacity: 1;
    transform: translateY(-50%) translateX(-12px);
  }
}

.center-closing {
  animation-name: center-closing;
  animation-duration: v-bind(duration);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

.bottom {
  bottom: 4px;
}

@keyframes bottom-opening {
  50% {
    bottom: 50%;
    transform: translateY(50%);
  }

  100% {
    bottom: 50%;
    transform: translateY(50%) rotate(-225deg);
  }
}

.bottom-opening {
  animation-name: bottom-opening;
  animation-duration: v-bind(duration);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes bottom-closing {
  0% {
    bottom: 50%;
    transform: translateY(50%) rotate(-225deg);
  }

  50% {
    bottom: 50%;
    transform: translateY(50%);
  }

  100% {
    bottom: 4px;
    transform: translateY(0);
  }
}

.bottom-closing {
  animation-name: bottom-closing;
  animation-duration: v-bind(duration);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}
</style>
