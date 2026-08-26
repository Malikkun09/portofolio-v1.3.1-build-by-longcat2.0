import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useMedia';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Paragraphs cascade in as the section enters
      gsap.fromTo(
        '.about-copy p',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 72%' },
        }
      );

      // Focus chips pop with a slight back-ease
      gsap.fromTo(
        '.focus-list .tech-badge',
        { autoAlpha: 0, scale: 0.85 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(2.2)',
          scrollTrigger: { trigger: '.focus-list', start: 'top 88%' },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="about" className="section" aria-label="Tentang Malik">
      <span className="section-index mono" aria-hidden="true">01 / ABOUT</span>
      <div className="container about-grid">
        <div>
          <p className="micro-label" style={{ marginBottom: '1.6rem' }}>ABOUT</p>
          <h2 className="about-title">
            Student developer building <em>real things</em> for the web.
          </h2>
        </div>
        <div className="about-copy">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="focus-list">
            {about.focusList.map((f) => (
              <span key={f} className="tech-badge">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
