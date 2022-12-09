import { shallowRef } from 'vue'
import * as THREE from 'three'

import { getCamera } from './camera.js'
import { onResize } from './utils'
import { setWindow } from './utils'
import { getComposer, defaultShader } from './postprocessing.js'
import type { MoonbowShader } from './primitives/useShader/utils'

interface optionsInterface {
  postProcessing: boolean,
  shader: MoonbowShader
}

const options: optionsInterface = {
  postProcessing: false,
  shader: defaultShader,
}

let scene = shallowRef<THREE.Scene | null>(null)
scene.value = initCanvas()

export function postProcessing(shader: MoonbowShader, toggle = true) {
  if(!shader || !toggle) return
  options.postProcessing = true
  options.shader = shader
}

function hmrUpdate() {
  //refresh the scene on hmr update
  if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', () => {
      scene.value && 
        scene.value.remove.apply(scene, scene.value.children);
    })
  }
}

function initCanvas(root = document.body) {
  const scene = new THREE.Scene() 
  const camera = getCamera()
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    premultipliedAlpha: false,
  })
  renderer.setClearColor(0x902010, 0); 
  setWindow(renderer)
  onResize(() => setWindow(renderer))

  root.appendChild(renderer.domElement)

  const context = { renderer, scene, camera }
  const composer = getComposer({context, shader: options.shader})

  renderer.setAnimationLoop(() => {
    options.postProcessing
      ? composer.render()
      : renderer.render(scene, camera)
  })

  hmrUpdate()
  return scene
}

export default scene