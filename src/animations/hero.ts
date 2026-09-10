'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/animations/core';
import { prefersReducedMotion } from '@/lib/media';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateHero = (root: HTMLElement) => {
  if (prefersReducedMotion()) {
    gsap.set(root.querySelectorAll('[data-hero]'), { opacity: 1, y: 0, yPercent: 0 });
    return () => undefined;
  }

  const ctx = gsap.context(() => {
    const lines = root.querySelectorAll('[data-hero="line"] span');
    const meta = root.querySelectorAll('[data-hero="meta"]');
    const roles = root.querySelectorAll('[data-hero="role"]');
    const aperture = root.querySelector('[data-hero="aperture"]');
    const footer = root.querySelectorAll('[data-hero="foot"]');

    gsap.set(lines, { yPercent: 110 });
    gsap.set([meta, roles, footer], { opacity: 0, y: 18 });
    gsap.set(aperture, { clipPath: 'inset(50% 0 50% 0)', opacity: 0.4 });

    const tl = gsap.timeline({ defaults: { ease: EASE.expo } });

    tl.to(meta, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.1)
      .to(lines, { yPercent: 0, duration: 1.25, stagger: 0.12 }, 0.15)
      .to(
        aperture,
        { clipPath: 'inset(0% 0 0% 0)', opacity: 1, duration: 1.15, ease: EASE.expo },
        0.45
      )
      .to(roles, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.7)
      .to(footer, { opacity: 1, y: 0, duration: 0.75, stagger: 0.05 }, 0.95);
  }, root);

  return () => ctx.revert();
};
