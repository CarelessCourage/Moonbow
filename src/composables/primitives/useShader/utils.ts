import * as THREE from 'three'

import vertexShader from '@/shaders/default/vertex.glsl'
import fragmentShader from '@/shaders/default/fragment.glsl'

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

export function useMaterial(shader?: THREE.ShaderMaterialParameters) {
  return shader 
    ? customShader(shader).clone()
    : getShader({...defaultParams}).clone()
}
