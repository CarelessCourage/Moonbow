import { onFrame } from './utils'
import type { planeInterface } from './plane'

interface propInterface {
  src: string | undefined;
  proxyimg: planeInterface
}

export function syncToDOM({proxyimg, src}: propInterface) {
  const { plane, attach, element } = proxyimg
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