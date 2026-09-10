'use client';

import { useEffect, useRef } from 'react';
import { animateHero } from '@/animations/hero';
import { profile } from '@/data/profile';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let revert: (() => void) | undefined;
    const start = () => {
      revert = animateHero(root);
    };

    if (document.documentElement.dataset.ready === 'true') start();
    else window.addEventListener('portfolio:ready', start, { once: true });

    return () => {
      window.removeEventListener('portfolio:ready', start);
      revert?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-14"
    >
      <div className="frame flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6" data-hero="meta">
          <p className="section-kicker">{profile.location}</p>
          <p className="section-kicker">PPLG / 2026</p>
        </div>

        <h1 className="display text-[clamp(4.4rem,18vw,13.5rem)]">
          <span className="sr-only">Malik Fajar</span>
          <span data-hero="line" className="block overflow-hidden" aria-hidden="true">
            <span className="block">Malik</span>
          </span>
        </h1>

        <div
          data-hero="aperture"
          className="aperture relative h-[18vh] min-h-[120px] w-full md:h-[22vh]"
          aria-hidden="true"
        >
          <div className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
            Field / 01
          </div>
          <div className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
            Software × AI × Creative
          </div>
        </div>

        <p className="display text-[clamp(4.4rem,18vw,13.5rem)]" aria-hidden="true">
          <span data-hero="line" className="block overflow-hidden">
            <span className="block">Fajar</span>
          </span>
        </p>

        <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-6" data-hero="role">
            {['Software', 'AI', 'Creative', 'Developer'].map((role) => (
              <li key={role} className="font-display text-xl uppercase tracking-display md:text-3xl">
                {role}
              </li>
            ))}
          </ul>
          <p
            data-hero="foot"
            className="max-w-md text-sm leading-relaxed text-mist md:col-span-4 md:col-start-8 md:text-base"
          >
            {profile.intro}
          </p>
        </div>

        <div
          data-hero="foot"
          className="flex items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-mist"
        >
          <span>Scroll</span>
          <span>Cimahi — Indonesia</span>
        </div>
      </div>
    </section>
  );
}
