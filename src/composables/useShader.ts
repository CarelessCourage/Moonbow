import { ref } from 'vue'
import * as THREE from 'three';

import vertexShader from '../shaders/default/vertex.glsl';
import fragmentShader from '../shaders/default/fragment.glsl';

import { windowDimensions } from "./utils";
import { onFrame } from "./utils";

let uniforms = {
  uTime: { value: 0 },
  uTexture: { value: null },
  uTextureCover: { value: [0, 1] },
  uTextureSize: { value: [0, 1] },
  uScreenSize: { value: [0, 1] }
}

const defaultParams = {
  uniforms,
  vertexShader,
  fragmentShader,
  wireframe: false,
}

function getShader(params: THREE.ShaderMaterialParameters) {
  return new THREE.ShaderMaterial(params)
}

function customShader(params: THREE.ShaderMaterialParameters) {
  return getShader({...defaultParams, ...params, uniforms: {
    ...defaultParams.uniforms,
    ...params.uniforms
  }})
}

const defaultShader = getShader({...defaultParams})

const clock = new THREE.Clock()

function useShader(element: HTMLImageElement | null, shader?: THREE.ShaderMaterialParameters) {
  const material =  shader 
    ? customShader(shader).clone()
    : defaultShader.clone()

  const { width, height } = windowDimensions()
  if(!element) return null
  //when image loads, set the texture and cover
  new THREE.TextureLoader().load(element.src, (tex) =>  {
    material.uniforms.uTextureSize.value = [tex.image.width, tex.image.height]
    material.uniforms.uScreenSize.value = [width, height]
    material.uniforms.uTexture.value = tex
  })

  //update the time and velocity
  onFrame(() => {
    const elapsedTime = clock.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime
  })

  return material  
}

export default useShader
