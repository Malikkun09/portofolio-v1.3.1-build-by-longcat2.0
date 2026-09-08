'use client';

import { useEffect, useRef } from 'react';
import { createScrollReveal } from '@/animations/gsap-utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, className = '', id }: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    createScrollReveal(headingRef.current, headingRef.current);
  }, []);

  return (
    <div ref={headingRef} id={id} className={`mb-16 md:mb-24 opacity-0 ${className}`}>
      <h2 className="font-manrope text-primary font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-secondary text-sm tracking-wider uppercase font-manrope">
          {subtitle}
        </p>
      )}
    </div>
  );
}
