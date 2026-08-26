// Shared animation utilities — single place for motion preferences

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const EASE = {
  out: 'power3.out',
  softOut: 'power2.out',
  hardOut: 'power4.out',
  expo: 'expo.out',
};

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
};

// Standard reveal for any element entering the viewport
export function revealUp(target, trigger, options = {}) {
  if (prefersReducedMotion()) return;
  const gsap = options.gsap;
  if (!gsap || !gsap.ScrollTrigger) return;

  gsap.fromTo(
    target,
    { autoAlpha: 0, y: 48 },
    {
      autoAlpha: 1,
      y: 0,
      duration: options.duration ?? DUR.base,
      ease: EASE.hardOut,
      scrollTrigger: {
        trigger,
        start: options.start ?? 'top 78%',
        toggleActions: 'play none none none',
      },
    }
  );
}

export function killAllTriggers() {
  if (typeof window !== 'undefined' && window.gsap?.ScrollTrigger) {
    window.gsap.ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
