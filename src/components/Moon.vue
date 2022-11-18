<script setup lang="ts">
import { ref, onMounted  } from "vue"
import { onFrame } from "../composables/utils"

import useShader from "../composables/useShader";
import scene from "../composables/canvas";
import { useImage } from "../composables/plane";

const imageRef = ref(null)

interface Props {
  src?: string | undefined;
  speed?: number,
  width?: number,
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  width: 300,
  height: 300,
  speed: 1
})

onMounted(() => {
  const shader = useShader(imageRef.value)
  const { plane, attach } = useImage(scene.value, imageRef.value, shader)

  let refresh = true

  function inView(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const src = entry.target.getAttribute('src')
      if(src === props.src) refresh = entry.isIntersecting
    })
  }

  const observer = new IntersectionObserver(inView, {
    root: document.querySelector('#smooth-content'),
    rootMargin: '600px'
  })

  imageRef.value && observer.observe(imageRef.value)
  onFrame(() => refresh && attach && attach(plane))
})
</script>

<template>
  <div class="img-wrapper">
    <img :src="src" :width="width" :height="height" ref="imageRef" :data-speed="speed"/>
  </div>
</template>

<style lang="scss" scoped>
img {
  opacity: 0.2;
  object-fit: cover;
  overflow: hidden;
}

img.proxy {
  opacity: 0;
}
</style>