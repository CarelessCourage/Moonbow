import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import vertexShader from '@/shaders/default/vertex.glsl'
import fragmentShader from '@/shaders/default/fragment.glsl'

export type ShaderType = THREE.ShaderMaterial | ShaderPass
export type Uniforms = THREE.ShaderMaterialParameters['uniforms']

export interface MoonbowShader extends THREE.ShaderMaterialParameters {
  uniforms?: Uniforms
  uniformAction?: (m: ShaderType) => void
}

let defaultShader: MoonbowShader = {
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uTextureCover: { value: [0, 1] },
    uTextureSize: { value: [0, 1] },
    uScreenSize: { value: [0, 1] }
  }
}

export function defaultGLSL(params: MoonbowShader) {
  const organizedShader = organizeShader(params)
  defaultShader = organizedShader
}

function stripParams(params: MoonbowShader) {
  const stripAction = {...params}
  const {uniformAction, ...rest} = stripAction
  return rest
}

export function getShadePass(params: MoonbowShader) {
  const stripAction = stripParams(params)
  const material: ShaderType = new ShaderPass(stripAction)
  return material
}

export function getShader(params: MoonbowShader) {
  const stripAction = stripParams(params)
  const material: ShaderType = new THREE.ShaderMaterial({
    ...stripAction, 
    //wireframe: true
  })
  return material
}

function deleteUndefinedProperties(obj?: any) {
  for(let key in obj) {
    if(obj[key] === undefined) delete obj[key]
  }
}

export function organizeShader(s?: MoonbowShader, ds = defaultShader) {
  deleteUndefinedProperties(s)
  const uniforms = {...ds.uniforms, ...s?.uniforms}
  const shader = {...ds, ...s}
  const ss = {...shader, uniforms}
  return ss
}
