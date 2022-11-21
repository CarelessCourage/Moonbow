import Moon from "./components/Moon.vue"
import Example from "./components/Example.vue"
import { onFrame } from "./composables/utils"
import { useScroll } from "./composables/useScroll"

import useShader from "./composables/useShader"
import scene from "./composables/canvas"
import { useImage } from "./composables/plane"
import { syncToDOM } from "./composables/syncToDOM"

export {
  Moon,
  Example,
  onFrame,
  useShader,
  useScroll,
  scene,
  useImage,
  syncToDOM
}
