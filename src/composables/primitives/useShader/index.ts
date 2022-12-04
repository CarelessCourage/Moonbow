import * as THREE from 'three'

import { windowDimensions } from "../../utils"
import { onFrame } from "../../utils"
import { 
  getShader,
  organizeShader,
  type MoonbowShader,
  type ShaderType 
} from "./utils"

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

function paramAction(params: MoonbowShader, material: ShaderType) {
  const uniformAction = params.uniformAction;
  if(uniformAction) uniformAction(material)
}

function useShader(element: HTMLImageElement | null, shader?: MoonbowShader) {
  const organizedShader = {...organizeShader(shader)}
  const material = getShader(organizedShader).clone()
  loadImage(element, material)
  onFrame(() => recordTime(material))
  paramAction(organizedShader, material)
  return material
}

export default useShader
