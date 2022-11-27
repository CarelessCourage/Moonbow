<script setup lang="ts">
import { watch } from 'vue'
import { Moon, useScroll } from '../index'

import vertexShader from '../shaders/scrollDeform/vertex.glsl'
import fragmentShader from '../shaders/scrollDeform/fragment.glsl'
import imagesss from '../assets/images'
import { postProcessing } from '../composables/scene'

import vertexShader2 from '../shaders/bottomScale/vertex.glsl'
import fragmentShader2 from '../shaders/bottomScale/fragment.glsl'

export interface ExampleProps {
  images?: string[];
}

withDefaults(defineProps<ExampleProps>(), {
  images: imagesss,
})

postProcessing({
  vertexShader: vertexShader2,
  fragmentShader: fragmentShader2,
  uniforms: {
    uVelocity: { value: 0 },
  }
})

let uniforms = {
  uVelocity: { value: 0 },
}

const velocity = useScroll()
const uniformControls = {
  vertexShader,
  fragmentShader,
  uniforms,
  uniformAction: (material: THREE.ShaderMaterial) => {
    watch(velocity, (velocity) => {
      material.uniforms.uVelocity.value = velocity
    })
  }
}
</script>

<template>
  <div>
    <h1 class="logo">moonbow</h1>
    <div class="banner">
      <Moon
        :src="images[0]"
        v-bind="uniformControls"
      />
    </div>
    <div class="page">
      <div class="images">
        <div v-for="image in images" class="image-container" :key="image">
          <Moon 
            :src="image"
            v-bind="uniformControls"
          />
          <div class="meta">
            <h3>Title</h3>
            <p>date</p>
            <p>Some description</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../css";

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

.title {
  margin: 100px 0px;
}

.images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  max-width: 100%;
}

.banner {
  padding: 25px;
}

.banner img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.image-container {
  cursor: pointer;
  overflow: hidden;
  transition: .2s;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .img-wrapper {
    border: solid 1px var(--foreground);
    transition: .1s;
  }
  &:hover .meta {
    background-color: var(--foreground);
    color: var(--background);
  }
  &:hover {
    border: solid 1px var(--foreground);
    border: solid 8px var(--foreground);
  }
}

.meta {
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: var(--background);
  padding: 12px;
  border: solid 1px var(--foreground);
  transition: .2s;
}

body > *:not(canvas[data-engine]) {
  position: relative;
  z-index: 1;
}

canvas[data-engine] {
  position: fixed;
  top: 0px; left: 0px;
  z-index: 0;
  max-width: 100vw;
  user-select: none;
  pointer-events: none;
}
</style>