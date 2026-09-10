'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { isCoarsePointer, prefersReducedMotion } from '@/lib/media';

const LABELS: Record<string, string> = {
  view: 'VIEW',
  open: 'OPEN',
  explore: 'EXPLORE',
  play: 'PLAY',
  drag: 'DRAG',
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    document.body.classList.add('cursor-none');
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });

    const onMove = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const rest = () => {
      gsap.to(cursor, {
        width: 10,
        height: 10,
        backgroundColor: '#E8E2D6',
        duration: 0.28,
        ease: 'power3.out',
      });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    const onOver = (event: MouseEvent) => {
      const host = (event.target as HTMLElement).closest('[data-cursor]');
      const key = host?.getAttribute('data-cursor') ?? '';
      if (!key || !LABELS[key]) {
        rest();
        return;
      }
      label.textContent = LABELS[key];
      gsap.to(cursor, {
        width: 92,
        height: 92,
        backgroundColor: '#C4A574',
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(label, { opacity: 1, duration: 0.2 });
    };

    rest();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-2.5 w-2.5 items-center justify-center rounded-full bg-paper mix-blend-difference md:flex"
      aria-hidden="true"
    >
      <span
        ref={labelRef}
        className="font-mono text-[10px] font-medium tracking-[0.18em] text-ink opacity-0"
      />
    </div>
  );
}
