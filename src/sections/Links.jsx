import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials, domains } from '../data/portfolio';
import SocialIcon from '../components/SocialIcon';
import { useReducedMotion } from '../hooks/useMedia';

gsap.registerPlugin(ScrollTrigger);

export default function Links() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.link-row',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.links-wall', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.term',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.term', start: 'top 82%' },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const cleanDomain = (d) => d.replace(/^www\./, '');

  return (
    <section ref={rootRef} id="links" className="section" aria-label="Tautan dan domain">
      <span className="section-index mono" aria-hidden="true">06 / LINKS</span>
      <div className="container">
        <p className="micro-label" style={{ marginBottom: '1.6rem' }}>FIND ME AROUND THE WEB</p>
        <h2 className="about-title">Digital footprint.</h2>

        <div className="links-wall" style={{ marginTop: '2.6rem' }}>
          {socials.map((s) => (
            <a key={s.href} className="link-row" href={s.href} target="_blank" rel="noopener noreferrer">
              <SocialIcon name={s.icon} />
              <span className="l-label">{s.label}</span>
              <span className="l-sub">{s.sub}</span>
              <span className="l-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        {/* Domain ecosystem — terminal style */}
        <div style={{ marginTop: 'clamp(3rem, 7vh, 5rem)' }}>
          <p className="mono" style={{ fontSize: 'var(--fs-micro)', letterSpacing: '0.24em', color: 'var(--text-faint)', marginBottom: '1.2rem' }}>
            DOMAIN ECOSYSTEM
          </p>
          <div className="term">
            <div className="term-bar">
              <i /><i /><i />
              <span>malik@web:~$ ls domains/</span>
            </div>
            <div className="term-body">
              {domains.map((d, i) => (
                <div key={d.domain} className="term-line">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <a className="d link-underline" href={d.href} target="_blank" rel="noopener noreferrer">
                    {cleanDomain(d.domain)}
                  </a>
                  <span className="note">// {d.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
