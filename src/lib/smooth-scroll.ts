'use client';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = (): Lenis | null => {
  if (typeof window === 'undefined') return null;

  // Don't init if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return null;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const destroySmoothScroll = () => {
  lenisInstance?.destroy();
  lenisInstance = null;
};

export const scrollTo = (target: string | number | HTMLElement) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2 });
  } else if (typeof window !== 'undefined') {
    // Fallback for when Lenis isn't initialized (reduced motion)
    const element =
      typeof target === 'string'
        ? document.querySelector(target)
        : target instanceof HTMLElement
          ? target
          : null;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
};
