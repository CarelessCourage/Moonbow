import { shallowRef } from 'vue'
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import vertexShader from './postprocessing/vertex.glsl';
import fragmentShader from './postprocessing/fragment.glsl';
import { getCamera } from './camera.js'
import { onResize } from './utils.js'
import { setWindow } from './utils.js'
import { onFrame } from './utils.js'

import { velocity } from './useShader'

let scene = shallowRef<THREE.Scene | null>(null)
scene.value = initCanvas()

function usePostProcessing(
  renderer: THREE.WebGLRenderer, 
  scene: THREE.Scene, 
  camera: THREE.OrthographicCamera) 
{
  const composer = new EffectComposer(renderer)
  composer.setSize(window.innerWidth, window.innerHeight)
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const shaderPass = new ShaderPass({
    uniforms: {
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      tDiffuse: { value: null },
      uResolution: { value: new THREE.Vector2() }
    },
    vertexShader,
    fragmentShader,
  })

  const clock = new THREE.Clock()

  onFrame(() => {
    const elapsedTime = clock.getElapsedTime()
    shaderPass.uniforms.uTime.value = elapsedTime
    shaderPass.uniforms.uVelocity.value = velocity.value
  })
  composer.addPass(shaderPass)
  return composer
}

export function initCanvas(root = document.body) {
  const options = {
    postProcessing: true
  }

  const scene = new THREE.Scene()
  const camera = getCamera()
  
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setClearColor(0x009900, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  root.appendChild(renderer.domElement)

  const composer = options.postProcessing 
    ? usePostProcessing(renderer, scene, camera) 
    : null

  onResize(() => {
    setWindow(renderer)
    if(options.postProcessing && composer) setWindow(composer)
  })

  renderer.setAnimationLoop(() => {
    options.postProcessing
      ? composer && composer.render() 
      : renderer.render(scene, camera)
  })

  return scene
}

export default scene