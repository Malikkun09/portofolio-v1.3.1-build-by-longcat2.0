'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if the device is touch-based or prefers reduced motion
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    setIsMounted(true);
    document.body.classList.add('cursor-none');

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center cursor around mouse position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const textEl = textRef.current;

      if (cursorData === 'project') {
        gsap.to(cursor, {
          width: 80,
          height: 32,
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: 'power3.out',
        });
        if (textEl) {
          textEl.innerText = 'VIEW ↗';
          gsap.to(textEl, { opacity: 1, color: 'black', duration: 0.2 });
        }
      } else if (cursorData === 'video') {
        gsap.to(cursor, {
          width: 80,
          height: 32,
          mixBlendMode: 'normal',
          duration: 0.3,
          ease: 'power3.out',
        });
        if (textEl) {
          textEl.innerText = 'PLAY ▶';
          gsap.to(textEl, { opacity: 1, color: 'black', duration: 0.2 });
        }
      } else {
        gsap.to(cursor, {
          width: 8,
          height: 8,
          mixBlendMode: 'difference',
          duration: 0.3,
          ease: 'power3.out',
        });
        if (textEl) {
          gsap.to(textEl, { opacity: 0, duration: 0.2 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center overflow-hidden"
    >
      <span
        ref={textRef}
        className="opacity-0 text-[10px] font-bold tracking-wider whitespace-nowrap"
      ></span>
    </div>
  );
}
