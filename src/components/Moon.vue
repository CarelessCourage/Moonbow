<script setup lang="ts">
import { ref, onMounted  } from "vue"
import { syncProxyHTML } from "../composables/primitives/proxySync"

import useShader from "../composables/primitives/useShader";
import type { MoonbowShader, ShaderType } from "../composables/primitives/useShader/utils";
import sceneRef from "../composables/scene";
import { useImage } from "../composables/primitives/usePlane";

const imageRef = ref(null);
const props = withDefaults(defineProps<{
  src: string;
  width?: number | string;
  height?: number | string;
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: any;
  uniformAction?: (material: ShaderType) => void;
}>(), {
  width: 300,
  height: 300,
})

onMounted(() => {
  const src = props.src;
  const element = imageRef.value
  const scene = sceneRef.value
  const shader: MoonbowShader = {
    vertexShader: props.vertexShader,
    fragmentShader: props.fragmentShader,
    uniforms: props.uniforms,
    uniformAction: props.uniformAction
  }

  const material = useShader(element, shader)
  const proxy = useImage({scene, element, material})
  syncProxyHTML({ proxy, src })
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