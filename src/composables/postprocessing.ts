import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import vertexShader from '../shaders/bottomScale/vertex.glsl';
import fragmentShader from '../shaders/bottomScale/fragment.glsl';

import { onFrame, onResize, setWindow } from './utils'
import { 
  organizeShader, 
  getShadePass, 
  type MoonbowShader
} from './primitives/useShader/utils'

const uniforms = {
  uTime: { value: 0 },
  tDiffuse: { value: null },
  uResolution: { value: new THREE.Vector2() }
}

export const defaultShader: MoonbowShader = {
  uniforms,
  vertexShader,
  fragmentShader
}

interface composerInterface {
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera
}

interface postProcessingInterface {
  context: composerInterface,
  shader: MoonbowShader,
}

export function getComposer({context, shader}: postProcessingInterface) {
  const composer = usePostProcessing({context, shader}) 
  onResize(() => setWindow(composer))
  return composer
}

function usePostProcessing({context, shader}: postProcessingInterface) {
  const { renderer, scene, camera } = context

  var width = window.innerWidth
  var height = window.innerHeight
  var renderTarget = new THREE.WebGLRenderTarget(width, height, { 
    minFilter: THREE.LinearFilter, 
    magFilter: THREE.LinearFilter, 
    format: THREE.RGBAFormat, 
    stencilBuffer: false 
  })

  const composer = new EffectComposer(renderer, renderTarget)
  //composer.setSize(window.innerWidth, window.innerHeight)
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const renderPass = new RenderPass(scene, camera)
  //renderPass.clear=false 
  composer.addPass(renderPass)

  const clock = new THREE.Clock()

  const organizedShader = organizeShader(shader, defaultShader)
  const shaderPass = getShadePass(organizedShader)
  //shaderPass.material.transparent = true

  onFrame(() => {
    const elapsedTime = clock.getElapsedTime()
    shaderPass.uniforms.uTime.value = elapsedTime
  })

  composer.addPass(shaderPass)
  return composer
}