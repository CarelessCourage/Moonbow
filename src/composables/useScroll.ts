import { ref } from 'vue'
import { onScroll } from './utils'

var checkScrollSpeed = () => {
  var lastPos: number | null = null
  var newPos:  number | null = null 
  var timer = 0 
  var delta = 0 
  var delay = 50

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
  const velocity  = ref(0)

  const updateScroll = () => {
    scroll.value = window.scrollY
  }

  const updateVelocity = () => {
    velocity.value = getVelocity()
  }

  onScroll(updateScroll)
  onScroll(updateVelocity)

  return { scroll, velocity }
}