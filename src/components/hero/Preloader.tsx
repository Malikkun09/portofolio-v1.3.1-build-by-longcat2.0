'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '@/lib/media';

const ASSET_HINTS = [
  '/assets/Malik.webp',
  '/assets/projects/project-skillmatch.webp',
  '/assets/projects/project-eduverse.webp',
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const reduced = prefersReducedMotion();
    let cancelled = false;
    const timers: number[] = [];

    const revealSite = () => {
      if (cancelled) return;
      cancelled = true;
      document.documentElement.dataset.ready = 'true';
      window.dispatchEvent(new Event('portfolio:ready'));
      onComplete();
      if (root) {
        root.style.display = 'none';
        root.setAttribute('aria-hidden', 'true');
      }
    };

    if (document.documentElement.dataset.ready === 'true') {
      revealSite();
      return;
    }

    const exit = () => {
      if (cancelled) return;
      setProgress(100);
      if (!root || reduced) {
        revealSite();
        return;
      }

      gsap
        .timeline({ onComplete: revealSite })
        .to(root.querySelector('[data-loader="bar"]'), {
          scaleX: 1,
          duration: 0.25,
          ease: 'power3.out',
        })
        .to(
          root.querySelectorAll('[data-loader="copy"]'),
          { y: -20, opacity: 0, duration: 0.35, stagger: 0.04 },
          0.05
        )
        .to(root, { yPercent: -100, duration: 0.55, ease: 'power4.inOut' }, 0.12);

      timers.push(window.setTimeout(revealSite, 900));
    };

    let loaded = 0;
    const bump = () => {
      loaded += 1;
      const next = Math.min(96, Math.round((loaded / (ASSET_HINTS.length + 1)) * 100));
      setProgress(next);
      if (loaded >= ASSET_HINTS.length && document.readyState === 'complete') {
        timers.push(window.setTimeout(exit, 80));
      }
    };

    ASSET_HINTS.forEach((src) => {
      const image = new Image();
      image.onload = bump;
      image.onerror = bump;
      image.src = src;
      if (image.complete) bump();
    });

    const onLoad = () => {
      setProgress((value) => Math.max(value, 90));
      if (loaded >= ASSET_HINTS.length) timers.push(window.setTimeout(exit, 80));
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);

    timers.push(window.setTimeout(exit, 1200));

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener('load', onLoad);
    };
  }, [onComplete]);

  const label = String(progress).padStart(3, '0');

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink px-6 py-8 text-paper md:px-10"
      style={{ position: 'fixed', inset: 0, zIndex: 70, background: '#080807' }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        data-loader="copy"
        className="flex items-start justify-between text-[11px] uppercase tracking-[0.28em] text-mist"
      >
        <span>Malik Fajar</span>
        <span>Portfolio / 2026</span>
      </div>
      <div className="flex flex-col gap-8">
        <p data-loader="copy" className="display text-[clamp(3.5rem,14vw,9rem)]">
          MF
        </p>
        <div className="flex items-end justify-between gap-8">
          <div className="h-px flex-1 origin-left overflow-hidden bg-line">
            <div
              data-loader="bar"
              className="h-full origin-left bg-brass"
              style={{ transform: `scaleX(${Math.max(progress, 2) / 100})` }}
            />
          </div>
          <span data-loader="copy" className="font-mono text-4xl tabular-nums md:text-6xl">
            {label}%
          </span>
        </div>
      </div>
    </div>
  );
}
