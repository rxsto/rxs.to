<template>
  <div class="absolute overflow-hidden h-full w-full top-0 left-0 pointer-events-none">
    <div ref="outer" :class="isLeft || !hasMoved || isInteracting ? 'opacity-0' : 'opacity-50'"
      class="outer transition-opacity duration-300 rounded-full border border-foreground absolute top-0 left-0 z-50" />
    <div ref="inner" :class="isLeft || !hasMoved ? 'opacity-0' : isInteracting ? 'opacity-90 mix-blend-difference' : 'opacity-75'"
      class="inner transition-opacity duration-300 rounded-full bg-foreground absolute top-0 left-0 z-50">
    </div>
    <div ref="blob" class="blob bg-foreground bg-opacity-50 rounded-full absolute top-0 left-0 z-[-1]" />
  </div>
</template>

<script lang="ts" setup>
const OUTER_RADIUS = 32
const INNER_RADIUS = 6
const BLOB_RADIUS = 256

const OUTER_RADIUS_VALUE = `${OUTER_RADIUS}px`
const INNER_RADIUS_VALUE = `${INNER_RADIUS}px`
const BLOB_RADIUS_VALUE = `${BLOB_RADIUS}px`

const { x, y } = useMouse()

const isLeft = usePageLeave()
const { pressed: isPressed } = useMousePressed()
const hasMoved = ref(false)
const isInteracting = ref(false)

const outer = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const blob = ref<HTMLElement | null>(null)

watch(x, () => animateCursor())
watch(y, () => animateCursor())

const animateCursor = () => {
  if (!hasMoved.value) {
    hasMoved.value = true
  }

  if (!outer.value || !inner.value || !blob.value) {
    return
  }

  const el = document.elementFromPoint(x.value, y.value)
  const interactable = el?.closest('.interactable')
  isInteracting.value = interactable !== null

  const keyframesInner = {
    transform: `translate(${x.value - INNER_RADIUS / 2}px, ${y.value - INNER_RADIUS / 2}px) scale(${isInteracting.value ? 10 : 1})`
  }

  const keyframesOuter = {
    transform: `translate(${x.value - OUTER_RADIUS / 2}px, ${y.value - OUTER_RADIUS / 2}px) scale(${isInteracting.value ? 3 : 1}`
  }

  inner.value.animate(keyframesInner, {
    duration: 100,
    fill: "forwards"
  })

  outer.value.animate(keyframesOuter, {
    duration: 400,
    fill: "forwards"
  })

  blob.value.style.transform = `translate(${x.value - BLOB_RADIUS / 2}px, ${y.value - BLOB_RADIUS / 2}px)`
}
</script>

<style scoped>
.outer {
  width: v-bind(OUTER_RADIUS_VALUE);
  height: v-bind(OUTER_RADIUS_VALUE);
  pointer-events: none;
}

.inner {
  width: v-bind(INNER_RADIUS_VALUE);
  height: v-bind(INNER_RADIUS_VALUE);
  pointer-events: none;
  mask-image: url('~/assets/img/arrow.svg');
}

.blob {
  width: v-bind(BLOB_RADIUS_VALUE);
  height: v-bind(BLOB_RADIUS_VALUE);
  filter: blur(v-bind(BLOB_RADIUS_VALUE));
  pointer-events: none;
}
</style>
