'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import ProjectShowcase from '@/sections/ProjectShowcase';
import VideoShowcase from '@/sections/VideoShowcase';
import LabSection from '@/sections/LabSection';
import AboutSection from '@/sections/AboutSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { initSmoothScroll, destroySmoothScroll } from '@/lib/smooth-scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      destroySmoothScroll();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ProjectShowcase />
        <VideoShowcase />
        <LabSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
