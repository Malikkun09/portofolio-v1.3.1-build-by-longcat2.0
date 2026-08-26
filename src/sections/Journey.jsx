import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journey } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useMedia';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      // Timeline line draws downward as the section scrolls
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      );

      gsap.utils.toArray('.tl-item').forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="journey" className="section" aria-label="Perjalanan">
      <span className="section-index mono" aria-hidden="true">05 / JOURNEY</span>
      <div className="container">
        <p className="micro-label" style={{ marginBottom: '1.6rem' }}>JOURNEY</p>
        <h2 className="about-title">The road so far.</h2>

        <ol className="timeline" role="list">
          <span className="timeline-line" aria-hidden="true" />
          {journey.map((j) => (
            <li key={j.year} className="tl-item">
              <span className="year mono">{j.year}</span>
              <h3>{j.title}</h3>
              <p>{j.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
