import { ref } from 'vue'
import { onScroll, onFrame } from './utils'
import { velocity } from './useShader'

var checkScrollSpeed = () => {
  var lastPos: number | null = null
  var newPos:  number | null = null 
  var timer = 0 
  var delta = 0 
  var delay = 100

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();
  
  return function() {
    newPos = window.scrollY;
    if(lastPos != null) delta = newPos -  lastPos
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
}

const getVelocity = checkScrollSpeed()

export const useScroll = () => {
  const scroll = ref(0)
  const speed  = ref(0)

  onScroll(() => {
    scroll.value = window.scrollY
    speed.value = getVelocity()
  })

   //reduce speed to 0 when not scrolling
   onFrame(() => {
    const change = 0.1
    if(speed.value > 0) speed.value -= change
    if(speed.value < 0) speed.value += change
    velocity.value = (100 * speed.value)
   })

  return { scroll, speed }
}