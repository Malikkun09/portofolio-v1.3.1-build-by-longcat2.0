import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, stack } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useMedia';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-row',
        { autoAlpha: 0, x: -32 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        }
      );

      gsap.fromTo(
        '.stack-cloud .tech-badge',
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: { each: 0.04, from: 'random' },
          ease: 'power2.out',
          scrollTrigger: { trigger: '.stack-cloud', start: 'top 88%' },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="skills" className="section" aria-label="Keahlian">
      <span className="section-index mono" aria-hidden="true">04 / SKILLS</span>
      <div className="container skills-cols">
        <div>
          <p className="micro-label" style={{ marginBottom: '1.6rem' }}>SKILLS</p>
          <h2 className="about-title">What I work with.</h2>
          <p style={{ marginTop: '1.4rem', color: 'var(--text-dim)', maxWidth: '38ch' }}>
            Fokus utama dan teknologi yang benar-benar dipakai di project — bukan daftar wishlist.
          </p>
        </div>

        <div>
          <div role="list" aria-label="Keahlian inti">
            {skills.map((s) => (
              <div key={s.name} className="skill-row" role="listitem">
                <span className="name">{s.name}</span>
                <span className="tag">{s.tag}</span>
              </div>
            ))}
          </div>

          <p className="mono" style={{ marginTop: '2.6rem', fontSize: 'var(--fs-micro)', letterSpacing: '0.24em', color: 'var(--text-faint)' }}>
            STACK IN PRODUCTION
          </p>
          <div className="stack-cloud" style={{ marginTop: '1rem' }}>
            {stack.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
