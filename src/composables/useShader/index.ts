import * as THREE from 'three';
import { ref } from 'vue'

import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

import { coverPlane } from "../plane";
import { windowDimensions } from "../utils";
import { onFrame } from "../utils";

export const velocity = ref(0)

function imageTexture(element: HTMLImageElement) {
  const { width, height } = element.getBoundingClientRect()
  const aspect = width / height
  const t1 = new THREE.TextureLoader().load(element.src, (tex) => coverPlane(tex, aspect))
  return t1
}

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

function coverPlanes(texture: THREE.Texture, aspect: number) {
  var imageAspect = texture.image.width / texture.image.height;
  return aspect > imageAspect
    ? [imageAspect / aspect, 1]
    : [1, aspect / imageAspect]
}

function useShader(element: HTMLImageElement | null) {
  const material =  shader.clone()
  const { width, height } = windowDimensions()
  if(!element) return null
  //when image loads, set the texture and cover
  new THREE.TextureLoader().load(element.src, (tex) =>  {
    //const coverUV = coverPlanes(tex, aspect)
    //material.uniforms.uTextureCover.value = new THREE.Vector2(...coverUV);
    material.uniforms.uTextureSize.value = [tex.image.width, tex.image.height]
    material.uniforms.uScreenSize.value = [width, height]

    material.uniforms.uTexture.value = tex
    material.uniforms.uTexture.needsUpdate = true
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
