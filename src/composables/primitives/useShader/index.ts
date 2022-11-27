import * as THREE from 'three'

import { windowDimensions } from "../../utils"
import { onFrame } from "../../utils"
import { useMaterial } from "./utils"

const clock = new THREE.Clock()

function loadImage(element: HTMLImageElement | null, material: THREE.ShaderMaterial) {
  if(!element) return null
  const { width, height } = windowDimensions()
  new THREE.TextureLoader().load(element.src, (tex) =>  {
    material.uniforms.uTextureSize.value = [tex.image.width, tex.image.height]
    material.uniforms.uScreenSize.value = [width, height]
    material.uniforms.uTexture.value = tex
  })
}

function recordTime(material: THREE.ShaderMaterial) {
  const elapsedTime = clock.getElapsedTime()
  material.uniforms.uTime.value = elapsedTime
}

function useShader(element: HTMLImageElement | null, shader?: THREE.ShaderMaterialParameters) {
  const material =  useMaterial(shader)
  loadImage(element, material)
  onFrame(() => recordTime(material))
  return material  
}

export default useShader
