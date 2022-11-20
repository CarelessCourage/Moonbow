import { onFrame } from './utils'
import type { planeInterface } from './plane'

interface propInterface {
  src: string | undefined;
  moonimg: planeInterface
}

export function syncToDOM({moonimg, src}: propInterface) {
  const { plane, attach, element } = moonimg
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