![chrome-capture-2022-10-20 (1)](https://user-images.githubusercontent.com/12764398/202879736-57d00d6e-7e60-430d-a351-7dcad5cf9fb9.gif)

# Moonbow :new_moon_with_face:+:rainbow:
Vue img component for adding [GLSL](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) to images :fire::fire::fire:
> :warning: This package is in very early alpha and likley wont work in its current state

## :package: Installation
```bash
npm install moonbow
```

## :building_construction: Setup
You can inject GLSL as a string but if you want to actually use it you're going to want to store GLSL in files that you can import. In order to do that you need to let Vite know how to handle GLSL files though. Import the [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl) package and register it as a plugin in your vite.config file.

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [vue(), glsl()],
})
```

## :crystal_ball: Usage
Simple example using default GLSL
```vue
<script setup lang="ts">
import { Moon } from "moonbow"
import "moonbow/dist/style.css"
const imageURL = "https://images.unsplash.com/photo-1642059893618"
</script>

<template>
  <Moon :src="imageURL"/>
</template>
```

Adding your own custom GLSL
```vue
<script setup lang="ts">
import { Moon } from "moonbow"
import "moonbow/dist/style.css"

import vertexShader from '../shaders/scrollDeform/vertex.glsl'
import fragmentShader from '../shaders/scrollDeform/fragment.glsl'
</script>

<template>
  <Moon 
    src="https://images.unsplash.com/photo-1642059893618" 
    :vertexShader="vertexShader"
    :fragmentShader="fragmentShader"
  />
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

## :alembic: How it works
> Moonbow does this by leveraging [three.js](https://github.com/mrdoob/three.js/) to create a 3D space in webGL. It creates a 3 dimensional plane for each image which sticks to the size and position of the HTML img element. Then it checks which images are inside the viewport using an intersection observer and for each image in view will update size and position on each animation frame to align with its hidden HTML img element. 

- :kissing_cat: ***Simple*** - Just a simple image component needed. Nothing more
- :muscle: ***Flexible*** - Flexible primitives underneath that let you build your own logic
- :telescope: ***Typesafe*** - Written fully in typescript 
- :hammer_and_wrench: ***Maintainable*** - HTML stays descriptive of content so canvas image flows with the HTML elements
- :man_in_manual_wheelchair: ***Accessible*** - Since canvas elements have their HTML counterparts so you dont lose accessibility controls like other approaches would

#### :test_tube: Benefits of this approach
This lets you take advantage of GLSL for your images while keeping the DOM descriptive of your content. Since images can be both in the HTML - taking up space and flowing with your layout as expected while still taking advantage of GLSL in the 3D proxy. This is also great for accessibility since it means we can accomplish complex image manipulation without sacrificing on the browser inbuilt accessibility tools.

## :scroll: Resources
Learn how to write GLSL: [Book of Shaders](https://thebookofshaders.com/)
