# Moonbow :new_moon_with_face::rainbow:
Vue component for adding GLSL to images :fire::fire::fire:

## Installation
```bash
npm install ...
```

## Usage

```vue
<script setup lang="ts">
import Moon from "./Moon.vue";
const imageURL = "https://images.unsplash.com/photo-1642059893618-22daf30e92a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1566&q=80"
</script>

<template>
  <Moon :src="imageURL"/>
</template>
```

## Primitives
```vue
<script setup>
import { ref, onMounted  } from "vue"

import useShader from "../composables/useShader";
import scene from "../composables/canvas";
import { useImage } from "../composables/plane";

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