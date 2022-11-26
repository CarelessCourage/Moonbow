import { shallowRef } from 'vue'
import * as THREE from 'three';
import type { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { getCamera } from './camera.js'
import { onResize } from './utils'
import { setWindow } from './utils'
import { getComposer, defaultShader } from './postprocessing.js'

type actionType = (material: ShaderPass) => void
interface optionsInterface {
  postProcessing: boolean,
  uniformAction: actionType
  shader: any
}

const options: optionsInterface = {
  postProcessing: false,
  shader: defaultShader,
  uniformAction: (material: ShaderPass) => {}
}

let scene = shallowRef<THREE.Scene | null>(null)
scene.value = initCanvas()

export function postProcessing(shader?: any, uniformAction?: actionType) {
  options.postProcessing = true
  
  if(!shader) return
  options.shader = shader

  if(!uniformAction) return
  options.uniformAction = uniformAction
}

function initCanvas(root = document.body) {
  const scene = new THREE.Scene() 
  const camera = getCamera()
  
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setClearColor(0x009900, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  root.appendChild(renderer.domElement)
  onResize(() => setWindow(renderer))

  const context = { renderer, scene, camera }
  const composer = getComposer({context, uniformAction: options.uniformAction})

  renderer.setAnimationLoop(() => {
    options.postProcessing
      ? composer.render()
      : renderer.render(scene, camera)
  })

  return scene
}

export default scene