import Moon from "./components/Moon.vue";
import Example from "./components/Example.vue";
import { onFrame } from "./composables/utils"
import { useScroll } from "./composables/useScroll"

import useShader, { velocity } from "./composables/useShader";
import scene from "./composables/canvas";
import { useImage } from "./composables/plane";

export { 
  Moon, 
  Example, 
  onFrame, 
  useShader, 
  velocity, 
  useScroll,
  scene, 
  useImage 
}
