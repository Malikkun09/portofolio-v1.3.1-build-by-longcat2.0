'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '@/animations/core';
import { prefersReducedMotion } from '@/lib/media';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateProjectPanel = (panel: HTMLElement) => {
  const media = panel.querySelector('[data-project="media"]');
  const visual = panel.querySelector('[data-project="visual"]');
  const copy = panel.querySelectorAll('[data-project="copy"]');

  if (prefersReducedMotion()) {
    gsap.set([media, visual, copy], {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: 'inset(0% 0 0 0)',
    });
    return () => undefined;
  }

  const ctx = gsap.context(() => {
    gsap.set(media, { clipPath: 'inset(100% 0 0 0)', scale: 0.92 });
    gsap.set(visual, { scale: 1.08 });
    gsap.set(copy, { opacity: 0, y: 36 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top 78%',
        end: 'top 18%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(media, {
      clipPath: 'inset(0% 0 0 0)',
      scale: 1,
      duration: 1.25,
      ease: EASE.inOut,
    })
      .to(visual, { scale: 1, duration: 1.25, ease: EASE.inOut }, '<')
      .to(copy, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: EASE.out }, '-=0.75');

    gsap.to(visual, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }, panel);

  return () => ctx.revert();
};
