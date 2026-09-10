'use client';

import { useEffect, useRef } from 'react';
import { toolkit } from '@/data/toolkit';
import { reveal } from '@/animations/core';

export function Toolkit() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    reveal(root.querySelectorAll('[data-tool]'), root, { stagger: 0.08, y: 20 });
  }, []);

  return (
    <section id="toolkit" ref={rootRef} className="relative bg-ink py-24 md:py-32">
      <div className="frame">
        <p className="section-kicker">Toolkit</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,8vw,6.5rem)]">Stack</h2>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {toolkit.map((group) => (
            <div key={group.label} data-tool className="border-t border-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
                {group.label}
              </p>
              <ul className="mt-6 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="font-display text-3xl uppercase tracking-display md:text-4xl">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
