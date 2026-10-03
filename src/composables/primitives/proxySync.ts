import { onBeforeRender } from '../utils'
import type { planeInterface } from './usePlane'

interface propInterface {
  src: string | undefined;
  proxy: planeInterface
}

/**
 * Keep a plane on top of its element, every frame before the canvas draws. Once the
 * element has left the page (including after a leave transition), the plane is removed
 * from the scene and its GPU resources are freed.
 */
export function syncProxyHTML({proxy, src}: propInterface) {
  const { plane, attach, element } = proxy
  if(!plane || !element) return
  let refresh = true

  function inView(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const entrySrc = entry.target.getAttribute('src')
      if(entrySrc === src) refresh = entry.isIntersecting
    })
  }

  const observer = new IntersectionObserver(inView, {
    root: document.querySelector('#smooth-content'),
    rootMargin: '600px'
  })
  observer.observe(element)

  function remove() {
    stop()
    observer.disconnect()
    plane!.removeFromParent()
    plane!.geometry.dispose()
    const material = plane!.material
    if('uniforms' in material) material.uniforms.uTexture?.value?.dispose?.()
    material.dispose()
  }

  const stop = onBeforeRender(() => {
    if(!element.isConnected) return remove()
    if(refresh) attach(plane, element)
  })
}
