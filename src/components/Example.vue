<script setup lang="ts">
import { Moon, useScroll } from "../index"
useScroll()

const images = [
  "https://images.unsplash.com/photo-1642059893618-22daf30e92a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1566&q=80",
  "https://images.unsplash.com/photo-1634855105161-2f328c473638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  "https://images.unsplash.com/photo-1637140945341-f28ada987326?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  "https://images.unsplash.com/photo-1637416067365-2b5e7e8fe8fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  "https://images.unsplash.com/photo-1548811579-017cf2a4268b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
  "https://images.unsplash.com/photo-1578393098337-5594cce112da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=317&q=80",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1604077198996-4eb67c32f6a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=370&q=80",
  "https://images.unsplash.com/photo-1529432337323-223e988a90fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=425&q=80",
  "https://images.unsplash.com/photo-1501441858156-e505fb04bfbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=424&q=80",
  "https://images.unsplash.com/photo-1517776832751-0a7e6993de03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1529982491805-82b594419794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1529982993311-1442aebdf5c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  "https://images.unsplash.com/photo-1513269324025-68264aaab24d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1547256398-b62fc7852828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=424&q=80",
  "https://images.unsplash.com/photo-1646858383294-5297917fd4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  "https://images.unsplash.com/photo-1634674740765-d91530f3eded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
]
</script>

<template>
  <h1 class="logo">moonbow</h1>
  <div class="banner">
    <Moon :src="images[0]" :width="1900" :height="1200" :speed="1.5"/>
  </div>
  <div class="page">
    <h1 class="title">Samsons World</h1>
    <div class="images">
      <div v-for="image in images" class="image-container" :key="image">
        <Moon :src="image" />
        <div class="meta">
          <h3>Title</h3>
          <p>date</p>
          <p>Some description</p>
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
  width: 100vw;
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