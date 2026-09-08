'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const fadeInUp = (
  element: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.8, y = 40, stagger = 0 } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    }
  );
};

export const clipReveal = (
  element: gsap.TweenTarget,
  options: {
    trigger?: string | Element;
    start?: string;
    inset?: number;
    duration?: number;
    scale?: number;
  } = {}
) => {
  const {
    trigger,
    start = 'top 80%',
    inset = 8,
    duration = 1.2,
    scale = 1.05,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      opacity: 1,
    });
    return;
  }

  return gsap.fromTo(
    element,
    {
      clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}%)`,
      scale,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
};

export const staggerText = (
  elements: gsap.TweenTarget,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    y?: number;
  } = {}
) => {
  const { delay = 0, duration = 0.6, stagger = 0.08, y = 60 } = options;

  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    }
  );
};

export const createScrollReveal = (
  element: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    start?: string;
    y?: number;
    duration?: number;
  } = {}
) => {
  const { start = 'top 85%', y = 50, duration = 0.8 } = options;

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

export { gsap, ScrollTrigger };
