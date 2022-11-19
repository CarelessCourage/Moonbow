# Moonbow :new_moon_with_face:+:rainbow:
Vue component for adding GLSL to images :fire::fire::fire:

## :package: Installation
```bash
npm install moonbow
```

## :crystal_ball: Usage

```vue
<script setup lang="ts">
import Moon from "moonbow";
const imageURL = "https://images.unsplash.com/photo-1642059893618"
</script>

<template>
  <Moon :src="imageURL"/>
</template>
```

## :dna: Primitives
```vue
<script setup>
import { ref, onMounted  } from "vue"
import { useShader, scene, useImage } from "moonbow";

const imageRef = ref(null)

onMounted(() => {
  const shader = useShader(imageRef.value)
  const { plane, attach } = useImage(scene.value, imageRef.value, shader)
  attach(plane)
})
</script>

<template>
  <div class="img-wrapper">
    <img :src="src" ref="imageRef"/>
  </div>
</template>
```