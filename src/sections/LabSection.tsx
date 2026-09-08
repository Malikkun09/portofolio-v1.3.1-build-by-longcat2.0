'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { labItems } from '@/data/lab';
import SectionHeading from '@/components/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LabSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.lab-row');

      gsap.fromTo(
        rows,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-black text-white"
    >
      <div className="max-w-[1800px] mx-auto">
        <SectionHeading title="LAB" subtitle="2026" />

        <div className="mt-16 md:mt-24 border-t border-oled-border border-b border-b-oled-border">
          {labItems.map((item) => (
            <div
              key={item.id}
              className="lab-row group flex flex-col md:flex-row md:items-center py-6 md:py-8 border-t border-oled-border first:border-t-0 transition-colors duration-300 hover:bg-[#1A1A1A]/30"
            >
              <div className="w-full md:w-32 flex-shrink-0 font-mono text-muted mb-2 md:mb-0">
                {String(item.id).padStart(3, '0')}
              </div>

              <div className="flex-grow pr-4 transition-transform duration-300 group-hover:translate-x-2">
                <h3 className="font-manrope font-semibold text-lg md:text-xl text-primary mb-1">
                  {item.title}
                </h3>
                <div className="text-xs text-secondary tracking-wider">
                  {item.tags.join(' · ')}
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex-shrink-0 flex items-center gap-2">
                {item.status === 'ACTIVE' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                )}
                <span className="text-xs uppercase tracking-widest text-secondary">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
