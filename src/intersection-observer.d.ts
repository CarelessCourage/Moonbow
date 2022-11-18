// https://wicg.github.io/IntersectionObserver/#intersection-observer-private-slots

interface Bounds {
  readonly height: number;
  readonly width: number;
  readonly top: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
}

interface IntersectionObserverEntry {
  readonly time: number;
  readonly rootBounds: Bounds;
  readonly boundingClientRect: Bounds;
  readonly intersectionRect: Bounds;
  readonly intersectionRatio: number;
  readonly target: Element;
}

type IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

interface IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

declare class IntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: number[];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit);

  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
  takeRecords(): IntersectionObserverEntry[];
}