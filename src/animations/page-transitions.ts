'use client';

import { gsap } from 'gsap';
import { EASE } from '@/animations/core';
import { prefersReducedMotion } from '@/lib/media';

export const coverPage = () => {
  const layer = document.querySelector<HTMLElement>('[data-page-transition]');
  if (!layer || prefersReducedMotion()) {
    if (layer) gsap.set(layer, { yPercent: -100 });
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    window.setTimeout(done, 700);
    gsap.fromTo(
      layer,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: EASE.inOut, onComplete: done }
    );
  });
};

export const revealPage = () => {
  const layer = document.querySelector<HTMLElement>('[data-page-transition]');
  if (!layer) return;
  if (prefersReducedMotion()) {
    gsap.set(layer, { yPercent: -100 });
    return;
  }

  gsap.fromTo(
    layer,
    { yPercent: 0 },
    { yPercent: -100, duration: 0.65, ease: EASE.expo, delay: 0.04 }
  );
};
