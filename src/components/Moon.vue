<script setup lang="ts">
import { ref, onMounted  } from "vue"
import { proxySync } from "../composables/primitives/proxySync"

import useShader from "../composables/primitives/useShader";
import scene from "../composables/scene";
import { useImage } from "../composables/primitives/usePlane";

import vertexShader from '../shaders/default/vertex.glsl';
import fragmentShader from '../shaders/default/fragment.glsl';

const imageRef = ref(null);

const props = withDefaults(defineProps<{
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: any;
  uniformAction?: (material: THREE.ShaderMaterial) => void;
}>(), {
  src: undefined,
  width: 300,
  height: 300,
  alt: undefined,
  fragmentShader,
  vertexShader,
  uniforms: {},
  uniformAction: () => {}
})

onMounted(() => {
  const shader = {
    vertexShader: props.vertexShader,
    fragmentShader: props.fragmentShader,
    uniforms: props.uniforms
  }

  const material = useShader(imageRef.value, shader)
  const proxy = useImage({
    scene: scene.value, 
    element: imageRef.value, 
    material
  })

  proxySync({ proxy, src: props.src })

  if(!material) return
  props.uniformAction && props.uniformAction(material)
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