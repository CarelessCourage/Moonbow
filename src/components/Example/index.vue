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
}, false)

let uniforms = {
  uVelocity: { value: 0 },
}

defaultGLSL({
  uniforms,
  vertexShader,
  fragmentShader,
  uniformAction
})

function uniformAction(material: any) {
  watch(useScroll(), (scroll) => {
    material.uniforms.uVelocity.value = scroll
  })
}
</script>

<template>
  <div>
    <h1 class="logo">moonbow</h1>
    <div class="banner">
      <Moon 
        :src="images[0]"
        :uniformAction="uniformAction"
      />
    </div>
    <div class="page">
      <ManyMoons :images="images"/>
    </div>
  </div>
</template>

<style lang="scss">
.logo {
  font-size: 9rem;
  position: fixed;
  z-index: 99;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min-content;
}

.banner {
  padding: 25px;
}

.banner img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>