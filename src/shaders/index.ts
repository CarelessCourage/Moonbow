// import { watch } from 'vue'
// import { useScroll } from '@/index'
import type { ShaderType, Uniforms } from '@/composables/primitives/useShader/utils'

import { postProcessing } from '@/composables/scene'
import { defaultGLSL } from '@/composables/primitives/useShader/utils'

import deformVertex from './scrollDeform/vertex.glsl'
import deformFragment from './scrollDeform/fragment.glsl'

import scaleVertex from './bottomScale/vertex.glsl'
import scaleFragment from './bottomScale/fragment.glsl'

interface ShaderPackage {
  vertexShader: string,
  fragmentShader: string,
  uniforms?: Uniforms,
  uniformAction?: (m: ShaderType) => void,
  postprocessing?: {
    vertexShader: string,
    fragmentShader: string,
  }
}

// let scrollVelocityUniforms = {
//   uVelocity: { value: 0 },
// }

// const scroll = useScroll()
// function scrollVelocityUniformAction(material: any) {
//   watch(scroll, (s) => {
//     material.uniforms.uVelocity.value = s
//   })
// }

export const deformShader: ShaderPackage = {
  vertexShader: deformVertex,
  fragmentShader: deformFragment,
  // uniforms: scrollVelocityUniforms,
  // uniformAction: scrollVelocityUniformAction,
  postprocessing: {
    vertexShader: scaleVertex,
    fragmentShader: scaleFragment,
  }
}

export function applyShader(shader?: ShaderPackage) {
  const { 
    fragmentShader, 
    vertexShader, 
    postprocessing,
    uniforms,
    uniformAction
  } = {
    ...deformShader,
    ...shader,
  }

  defaultGLSL({
    uniforms,
    vertexShader,
    fragmentShader,
    uniformAction
  })
  
  if(postprocessing) {
    postProcessing(postprocessing)
  }
}