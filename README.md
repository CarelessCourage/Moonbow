# Moonbow :new_moon_with_face:+:rainbow:
Vue component for adding GLSL to images :fire::fire::fire:

> How? Moonbow does this by leveraging three.js to create a 3D space in webGL. It creates a 3 dimensional plane for each image which sticks to the size and position of the HTML img element. Then it checks which images are inside the viewport using an intersection observer and for each image in view will update size and position on each animation frame to align with its hidden HTML img element. 

Benefits of this approach. This lets you take advantage of GLSL for your images while keeping the DOM descriptive of your content. Since images can be both in the HTML - taking up space and flowing with your layout as expected while still taking advantage of GLSL in the 3D proxy. This is also great for accessibility since it means we can accomplish complex image manipulation without sacrificing on the browser inbuilt accessibility tools.

> :warning: This package is in very early alpha and likley wont work in its current state


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