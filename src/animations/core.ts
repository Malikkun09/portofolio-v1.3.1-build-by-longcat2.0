'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/media';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = {
  out: 'power3.out',
  deep: 'power4.out',
  expo: 'expo.out',
  inOut: 'power3.inOut',
} as const;

export const reveal = (
  target: gsap.TweenTarget,
  trigger: Element,
  options: { y?: number; delay?: number; stagger?: number; start?: string; immediate?: boolean } = {}
) => {
  const { y = 48, delay = 0, stagger = 0, start = 'top 82%', immediate = false } = options;

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0, clearProps: 'transform' });
    return;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 1.05,
      delay,
      stagger,
      ease: EASE.out,
      scrollTrigger: immediate
        ? undefined
        : {
            trigger,
            start,
            once: true,
          },
    }
  );
};

export const clipOpen = (
  target: gsap.TweenTarget,
  trigger: Element,
  options: { start?: string } = {}
) => {
  const { start = 'top 78%' } = options;

  if (prefersReducedMotion()) {
    gsap.set(target, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 });
    return;
  }

  return gsap.fromTo(
    target,
    { clipPath: 'inset(100% 0 0 0)', scale: 1.06 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 1.35,
      ease: EASE.expo,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

export { gsap, ScrollTrigger };
