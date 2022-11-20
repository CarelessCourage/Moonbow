<script setup lang="ts">
import { ref, onMounted  } from "vue"
import { onFrame } from "../composables/utils"

import useShader from "../composables/useShader";
import scene from "../composables/canvas";
import { useImage } from "../composables/plane";

import vertexShader from '../shaders/default/vertex.glsl';
import fragmentShader from '../shaders/default/fragment.glsl';

const imageRef = ref(null)

interface Props {
  src?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: any
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  width: 300,
  height: 300,
  alt: undefined,
  fragmentShader,
  vertexShader,
  uniforms: {}
})

onMounted(() => {
  const shader = {
    vertexShader: props.vertexShader,
    fragmentShader: props.fragmentShader,
    uniforms: props.uniforms
  }

  const material = useShader(imageRef.value, shader)
  const { plane, attach } = useImage(scene.value, imageRef.value, material)

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
  <img
    v-bind="props"
    ref="imageRef"
  />
</template>

<style lang="scss" scoped>
img {
  opacity: 0.2;
  object-fit: cover;
  overflow: hidden;
}

img.proxy { opacity: 0; }
</style>