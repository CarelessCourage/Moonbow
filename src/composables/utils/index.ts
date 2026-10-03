import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

export function windowDimensions() {
  const height = window.innerHeight
  const width = window.innerWidth
  const aspect = width / height;
  return { height, width, aspect}
}

export function onResize(fn: () => void) {
  window.addEventListener('resize', fn)
}

export function onScroll(fn: () => void) {
  window.addEventListener('scroll', fn)
}

const beforeRender = new Set<() => void>()

/**
 * Run `fn` every frame, just before the canvas draws, so whatever it changes shows in
 * that same frame. Returns a function that stops it.
 */
export function onBeforeRender(fn: () => void) {
  beforeRender.add(fn)
  return () => { beforeRender.delete(fn) }
}

/** Called by the render loop, once per frame, before drawing. */
export function runBeforeRender() {
  beforeRender.forEach(fn => fn())
}

export function onFrame(fn: () => void, condition = true) {
  if(condition) requestAnimationFrame(() => onFrame(fn))
  fn()
}

export function setWindow(renderer: THREE.WebGLRenderer | EffectComposer) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
