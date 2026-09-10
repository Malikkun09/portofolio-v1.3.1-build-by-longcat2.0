'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import 'lenis/dist/lenis.css';
import { destroySmoothScroll, getLenis, initSmoothScroll, scrollTo } from '@/lib/smooth-scroll';
import { ScrollTrigger } from '@/animations/core';
import { FieldCanvas } from '@/components/background/FieldCanvas';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Navbar } from '@/components/navigation/Navbar';
import { Preloader } from '@/components/hero/Preloader';
import { PageTransition } from '@/components/transitions/PageTransition';
import { prefersReducedMotion } from '@/lib/media';

export function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const pathname = usePathname();

  useEffect(() => {
    if (!prefersReducedMotion()) initSmoothScroll();

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 280);
    const failSafe = window.setTimeout(() => {
      document.documentElement.dataset.ready = 'true';
      window.dispatchEvent(new Event('portfolio:ready'));
      setReady(true);
    }, 1800);
    const onHash = () => {
      if (!window.location.hash) return;
      window.setTimeout(() => scrollTo(window.location.hash), 80);
    };
    window.addEventListener('portfolio:ready', onHash);

    return () => {
      window.clearTimeout(refresh);
      window.clearTimeout(failSafe);
      window.removeEventListener('portfolio:ready', onHash);
      destroySmoothScroll();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.setTimeout(() => scrollTo(window.location.hash), 120);
      return () => window.clearTimeout(id);
    }

    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Preloader onComplete={onReady} />
      <FieldCanvas active={ready} />
      <CustomCursor />
      <PageTransition />
      <Navbar />
      <div
        id="main"
        className={`relative z-10 transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ position: 'relative', zIndex: 10, opacity: ready ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  );
}
