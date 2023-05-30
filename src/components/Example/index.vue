<script setup lang="ts">
import { Moon } from '@/index'
import ManyMoons from './ManyMoons.vue'
import { images, cover } from '@/assets/images'
import { applyShader } from '@/shaders'

applyShader()
</script>

<template>
  <div class="moonbow-wrapper">
    <h1 class="logo">moonbow</h1>
    <div class="banner">
      <Moon :src="cover"/>
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
  @media screen and (max-width: 768px) {
    font-size: 7rem;
  }

}

.moonbow-wrapper .banner img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>