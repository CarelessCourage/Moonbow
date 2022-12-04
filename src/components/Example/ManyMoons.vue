<script setup lang="ts">
import { Moon } from '../../index'
defineProps<{images: any}>()
</script>

<template>
  <div class="images">
    <div v-for="image in images" class="image-container" :key="image">
      <Moon :src="image"/>
      <div class="meta">
        <h3>Title</h3>
        <p>date</p>
        <p>Some description</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  max-width: 100%;
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
    background-color: var(--shade);
    color: var(--background);
    border: solid 1px var(--background);
  }
  &:hover {
    border: solid 8px var(--shade);
  }
}

.image-container .meta {
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: var(--background);
  text-align: left;
  padding: 12px;
  border: solid 1px var(--foreground);
  transition: .2s;
}
</style>