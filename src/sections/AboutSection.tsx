'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imgContainerRef.current) {
        gsap.fromTo(
          imgContainerRef.current,
          { clipPath: 'inset(15% 15% 15% 15%)', scale: 1.05 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
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
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-black text-white"
    >
      <div className="max-w-[1800px] mx-auto">
        <SectionHeading title="ABOUT" />

        <div className="mt-16 md:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2">
            <div
              ref={imgContainerRef}
              className="relative w-full aspect-[4/5] overflow-hidden group cursor-pointer"
              data-cursor="project"
            >
              <Image
                src="/assets/Malik.webp"
                alt="Malik Fajar"
                width={600}
                height={750}
                className="object-cover w-full h-full grayscale-[30%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                priority={false}
              />
            </div>
          </div>

          <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="font-manrope text-lg md:text-xl text-primary leading-relaxed font-light">
                &ldquo;I&apos;m Malik Fajar, a software developer exploring AI, digital products, and interactive experiences.&rdquo;
              </h3>
            </div>

            <div className="flex flex-col gap-6 mt-8 border-t border-oled-border pt-8">
              <div>
                <div className="text-xs text-secondary tracking-widest uppercase mb-1">
                  BASED IN
                </div>
                <div className="text-sm text-primary font-medium">
                  CIMAHI, INDONESIA
                </div>
              </div>

              <div>
                <div className="text-xs text-secondary tracking-widest uppercase mb-1">
                  FOCUS
                </div>
                <div className="text-sm text-primary font-medium">
                  AI / SOFTWARE / DESIGN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
