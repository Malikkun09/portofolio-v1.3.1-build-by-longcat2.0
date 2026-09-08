'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLHeadingElement>(null);
  const name2Ref = useRef<HTMLHeadingElement>(null);
  const role1Ref = useRef<HTMLHeadingElement>(null);
  const role2Ref = useRef<HTMLHeadingElement>(null);
  const taglinesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        }
      });
      
      const elements = [
        metadataRef.current,
        name1Ref.current,
        name2Ref.current,
        role1Ref.current,
        role2Ref.current,
        taglinesRef.current?.children,
        scrollIndicatorRef.current
      ];
      
      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        gsap.set('[data-nav]', { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(elements, { opacity: 0 });
      gsap.set('[data-nav]', { opacity: 0, y: -20 });

      // 1. t=0: metadata fades in
      tl.fromTo(metadataRef.current, { y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0);
      
      // 2. t=0.2: 'MALIK' reveals
      tl.fromTo(name1Ref.current, { y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
      
      // 3. t=0.35: 'FAJAR' reveals
      tl.fromTo(name2Ref.current, { y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35);
      
      // 4. t=0.5: 'SOFTWARE DEVELOPER'
      tl.fromTo(role1Ref.current, { y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
      
      // 5. t=0.65: '& AI ENGINEER'
      tl.fromTo(role2Ref.current, { y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.65);
      
      // 8. t=0.6: navbar fades in
      tl.to('[data-nav]', { opacity: 1, y: 0, duration: 0.5 }, 0.6);

      // 6. t=0.8: tagline lines stagger in
      if (taglinesRef.current) {
        tl.fromTo(taglinesRef.current.children, { y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, 0.8);
      }
      
      // 7. t=1.0: scroll indicator fades in
      tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.0);
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center bg-[#000000] overflow-hidden px-6 md:px-8 lg:px-12 text-primary"
    >
      <div className="flex flex-col gap-6 md:gap-10 w-full max-w-7xl mx-auto -mt-12 md:-mt-20">
        {/* Metadata */}
        <div ref={metadataRef} className="text-[#8A8A8A] text-xs uppercase tracking-widest opacity-0 font-satoshi">
          <p>CIMAHI, INDONESIA</p>
          <p>2026</p>
        </div>

        {/* Main Name Block */}
        <div 
          className="flex flex-col font-satoshi font-black uppercase text-primary leading-[0.85]" 
          style={{ fontSize: 'clamp(3.5rem, 12vw, 12rem)', letterSpacing: '-0.06em' }}
        >
          <h1 ref={name1Ref} className="opacity-0 m-0">MALIK</h1>
          <h1 ref={name2Ref} className="opacity-0 m-0">FAJAR</h1>
        </div>

        {/* Roles Block */}
        <div 
          className="flex flex-col font-satoshi font-bold text-primary tracking-tight leading-tight mt-2 md:mt-4" 
          style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
        >
          <h2 ref={role1Ref} className="opacity-0 m-0">SOFTWARE DEVELOPER</h2>
          <h2 ref={role2Ref} className="opacity-0 m-0">& AI ENGINEER</h2>
        </div>

        {/* Tagline Block */}
        <div ref={taglinesRef} className="flex flex-col font-satoshi font-medium text-base md:text-lg text-[#8A8A8A] uppercase tracking-wider mt-6 md:mt-10">
          <p className="opacity-0 m-0">BUILDING SOFTWARE.</p>
          <p className="opacity-0 m-0">EXPLORING AI.</p>
          <p className="opacity-0 m-0">DESIGNING EXPERIENCES.</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <div className="w-px h-12 bg-[#8A8A8A]"></div>
        <span className="text-[10px] text-[#8A8A8A] uppercase tracking-widest font-satoshi">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
