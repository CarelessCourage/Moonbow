import Moon from "./components/Moon.vue"
import Example from "./components/Example.vue"
import { onFrame } from "./composables/utils"
import { useScroll } from "./composables/utils/useScroll"

import useShader from "./composables/primitives/useShader"
import scene from "./composables/scene"
import { useImage } from "./composables/primitives/usePlane"
import { proxySync } from "./composables/primitives/proxySync"

export {
  Moon,
  Example,
  onFrame,
  useShader,
  useScroll,
  scene,
  useImage,
  proxySync
}
