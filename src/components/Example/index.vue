<script setup lang="ts">
import { watch } from 'vue'
import { Moon, useScroll } from '../../index'
import ManyMoons from './ManyMoons.vue'

import vertexShader from '@/shaders/scrollDeform/vertex.glsl'
import fragmentShader from '@/shaders/scrollDeform/fragment.glsl'
import images from '../../assets/images'
import { postProcessing } from '../../composables/scene'
import { defaultGLSL } from '../../composables/primitives/useShader/utils'

import vertexShader2 from '@/shaders/bottomScale/vertex.glsl'
import fragmentShader2 from '@/shaders/bottomScale/fragment.glsl'

postProcessing({
  vertexShader: vertexShader2,
  fragmentShader: fragmentShader2,
}, true)

let uniforms = {
  uVelocity: { value: 0 },
}

const scroll = useScroll()
function uniformAction(material: any) {
  watch(scroll, (s) => {
    material.uniforms.uVelocity.value = s
  })
}

defaultGLSL({
  uniforms,
  vertexShader,
  fragmentShader,
  uniformAction
})
</script>

<template>
  <div class="moonbow-wrapper">
    <h1 class="logo">moonbow</h1>
    <div class="banner">
      <Moon  :src="images[0]"/>
    </div>
    <div class="page">
      <ManyMoons :images="images"/>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../css";

.moonbow-wrapper {
  max-width: 100vw;
  overflow: hidden;
}

.moonbow-wrapper .logo {
  pointer-events: none;
  font-size: 9rem;
  position: fixed;
  z-index: 99;
  color: var(--foreground);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  text-align: center;
}

.moonbow-wrapper .banner img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>