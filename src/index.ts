import Moon from "@/components/Moon.vue"
import Example from "@/components/Example/index.vue"
import { onFrame } from "@/composables/utils"
import { useScroll } from "@/composables/utils/useScroll"

import useShader from "@/composables/primitives/useShader"
import { defaultGLSL } from "@/composables/primitives/useShader/utils"
import scene from "@/composables/scene"
import { useImage } from "@/composables/primitives/usePlane"
import { syncProxyHTML } from "@/composables/primitives/proxySync"

export {
  Moon,
  Example,
  onFrame,
  useShader,
  defaultGLSL,
  useScroll,
  scene,
  useImage,
  syncProxyHTML
}
