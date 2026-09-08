'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const lines = gsap.utils.toArray<HTMLElement>('.headline-line');
        gsap.fromTo(
          lines,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power2.out',
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 lg:py-64 px-6 md:px-8 lg:px-12 bg-black text-white border-t border-oled-border"
    >
      <div className="max-w-[1800px] mx-auto flex flex-col items-center text-center">
        <h2
          ref={titleRef}
          className="font-avenir font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-primary uppercase flex flex-col gap-2 md:gap-4 overflow-hidden"
        >
          <span className="headline-line block opacity-0">LET&apos;S BUILD</span>
          <span className="headline-line block opacity-0">SOMETHING</span>
          <span className="headline-line block opacity-0">INTERESTING.</span>
        </h2>

        <div
          ref={textRef}
          className="mt-8 md:mt-12 flex flex-col items-center w-full"
        >
          <p className="font-avenir text-lg md:text-xl text-secondary mb-12 md:mb-16 opacity-0">
            Have an idea? Let&apos;s talk.
          </p>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full justify-center opacity-0">
            <a
              href="mailto:malikfajar@email.com"
              className="font-manrope text-sm tracking-wider uppercase text-primary hover:text-accent transition-colors duration-300 flex items-center justify-center gap-1 group"
            >
              Email{' '}
              <span className="transform transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-manrope text-sm tracking-wider uppercase text-primary hover:text-accent transition-colors duration-300 flex items-center justify-center gap-1 group"
            >
              GitHub{' '}
              <span className="transform transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-manrope text-sm tracking-wider uppercase text-primary hover:text-accent transition-colors duration-300 flex items-center justify-center gap-1 group"
            >
              LinkedIn{' '}
              <span className="transform transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
