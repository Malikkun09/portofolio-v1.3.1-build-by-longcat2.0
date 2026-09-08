'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollTo } from '@/lib/smooth-scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'LAB', href: '#lab' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (navRef.current) {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'bg-black/80 backdrop-blur-sm',
          targets: navRef.current,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollTo(href);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        data-nav
        className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 opacity-0 px-6 md:px-8 lg:px-12 py-4 md:py-6"
      >
        <div className="flex items-center justify-between">
          <a
            href="#"
            onClick={scrollToTop}
            className="font-satoshi font-bold tracking-tight text-xl uppercase z-50 relative"
            aria-label="Scroll to top"
          >
            MALIK FAJAR
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition-opacity duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full group-[.active]:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 relative group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transform -translate-y-full"
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-3xl font-satoshi font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
