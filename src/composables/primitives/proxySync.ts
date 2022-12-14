import { onFrame } from '../utils'
import type { planeInterface } from './usePlane'

interface propInterface {
  src: string | undefined;
  proxy: planeInterface
}

export function syncProxyHTML({proxy, src}: propInterface) {
  const { plane, attach, element } = proxy
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

  element && observer.observe(element)

  onFrame(() => 
    (refresh && element && plane) 
      ? attach(plane, element) 
      : null)
}
