import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import vertexShader from '../shaders/bottomScale/vertex.glsl';
import fragmentShader from '../shaders/bottomScale/fragment.glsl';

import { onFrame, onResize, setWindow } from './utils.js'

const defaultUniforms = {
  uTime: { value: 0 },
  tDiffuse: { value: null },
  uResolution: { value: new THREE.Vector2() }
}

export const defaultShader = {
  uniforms: defaultUniforms,
  vertexShader,
  fragmentShader,
}

interface composerInterface {
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.OrthographicCamera
}

interface postProcessingInterface {
  context: composerInterface,
  shader?: THREE.ShaderMaterial
  uniformAction?: (material: ShaderPass) => void
}

export function getComposer({context, shader, uniformAction}: postProcessingInterface) {
  const composer = usePostProcessing({context, shader, uniformAction}) 
  onResize(() => setWindow(composer))
  return composer
}

function usePostProcessing({context, shader, uniformAction}: postProcessingInterface) {
  const { renderer, scene, camera } = context

  const composer = new EffectComposer(renderer)
  composer.setSize(window.innerWidth, window.innerHeight)
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const clock = new THREE.Clock()

  const compiledUniforms = {
    ...defaultUniforms,
    ...shader?.uniforms
  }

  const compiledShader = {
    ...defaultShader, 
    ...shader
  }

  const shaderPass = new ShaderPass({...compiledShader, uniforms: compiledUniforms})

  onFrame(() => {
    const elapsedTime = clock.getElapsedTime()
    shaderPass.uniforms.uTime.value = elapsedTime
  })

  if(uniformAction) uniformAction(shaderPass)
  composer.addPass(shaderPass)
  return composer
}