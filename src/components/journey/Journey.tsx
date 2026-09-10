'use client';

import { useEffect, useRef } from 'react';
import { journey } from '@/data/profile';
import { reveal } from '@/animations/core';

export function Journey() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    reveal(root.querySelectorAll('[data-year]'), root, { stagger: 0.12, y: 28 });
  }, []);

  return (
    <section id="journey" ref={rootRef} className="relative bg-ink py-24 md:py-32">
      <div className="frame">
        <p className="section-kicker">Journey</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,8vw,6.5rem)]">Notes</h2>
        <div className="mt-16 divide-y border-y border-line">
          {journey.map((item) => (
            <article
              key={item.year}
              data-year
              className="grid gap-4 py-10 md:grid-cols-12 md:gap-8"
            >
              <p className="font-mono text-brass md:col-span-2">{item.year}</p>
              <div className="md:col-span-10">
                <h3 className="font-display text-2xl uppercase tracking-display md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/80">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
