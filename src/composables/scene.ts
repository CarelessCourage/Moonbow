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

function initCanvas(root = document.body) {
  const scene = new THREE.Scene() 
  const camera = getCamera()
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    premultipliedAlpha: false,
  })
  renderer.setClearColor(0x000000, 0); 
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  //renderer.autoClear=false

  root.appendChild(renderer.domElement)
  onResize(() => setWindow(renderer))

  const context = { renderer, scene, camera }
  const composer = getComposer({context, shader: options.shader})

  renderer.setAnimationLoop(() => {
    options.postProcessing
      ? composer.render()
      : renderer.render(scene, camera)
  })

  return scene
}

export default scene