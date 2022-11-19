import * as THREE from 'three';
import { ref } from 'vue'

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

import { windowDimensions } from "../utils";
import { onFrame } from "../utils";

export const velocity = ref(0)

const params = {
  wireframe: false
}

const shader = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uVelocity: { value: 0 },
    uTexture: { value: null },
    uTextureCover: { value: [0, 1] },
    uTextureSize: { value: [0, 1] },
    uScreenSize: { value: [0, 1] }
  },
  vertexShader,
  fragmentShader,
  wireframe: params.wireframe
})

const clock = new THREE.Clock()

function useShader(element: HTMLImageElement | null) {
  const material =  shader.clone()
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
    material.uniforms.uVelocity.value = velocity.value
  })

  return material  
}

export default useShader
