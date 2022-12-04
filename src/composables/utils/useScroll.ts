import { ref } from 'vue'
import { onScroll, onFrame } from './'

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
const velocity = ref(0)

export function useScroll() {
  const scroll = ref(0)
  const speed  = ref(0)

  onScroll(() => {
    scroll.value = window.scrollY
    speed.value = getVelocity()
  })

  onFrame(() => {
    const change = 0.1
    if(speed.value > 0) speed.value -= change
    if(speed.value < 0) speed.value += change
    const vel = (100 * speed.value)
    const add = (vel - velocity.value) * 0.1
    const addMax = 100
    const fulMax = 1000
    velocity.value += clamp(add, -addMax, addMax)
    velocity.value = clamp(velocity.value, -fulMax, fulMax)
  })

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
  }

  return velocity
}