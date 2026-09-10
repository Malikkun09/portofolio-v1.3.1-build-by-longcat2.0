'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { revealPage } from '@/animations/page-transitions';

export function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    revealPage();
  }, [pathname]);

  return (
    <div
      data-page-transition
      className="pointer-events-none fixed inset-0 z-[65] flex items-end bg-paper px-8 py-10 text-ink"
      style={{ transform: 'translateY(-100%)' }}
      aria-hidden="true"
    >
      <p className="display text-5xl md:text-7xl">MF</p>
    </div>
  );
}
