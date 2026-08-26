import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useMedia';
import './reel.scss';

gsap.registerPlugin(ScrollTrigger);

/**
 * CINEMATIC PROJECT REEL — signature section.
 *
 * One tall pinned stage; scroll scrubs a GSAP timeline where each project
 * travels RIGHT → CENTER → LEFT with image clip reveal on entry and
 * blur/fade exit. Scrub keeps full control: scroll down = forward,
 * scroll up = rewind. A progress line + "01 / 06" counter track the playhead.
 */
export default function ProjectReel() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const panelsRef = useRef([]);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  // Scroll-scrubbed master timeline
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 861px)', () => {
      const panels = panelsRef.current.filter(Boolean);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=' + window.innerWidth * projects.length * 1.15,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const idx = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length + 0.0001)
            );
            setActive(idx);
          },
        },
      });

      const travel = window.innerWidth * 0.62;

      panels.forEach((panel, i) => {
        if (i === 0) {
          // First project starts centered; only animates OUT to the left.
          tl.fromTo(
            panel,
            { xPercent: 0, autoAlpha: 1, filter: 'blur(0px)' },
            { xPercent: -58, autoAlpha: 0.25, scale: 0.94, filter: 'blur(5px)', ease: 'power2.in' }
          );
        } else {
          const label = `p${i}`;
          tl.addLabel(label)
            .fromTo(
              panel,
              { xPercent: 118, autoAlpha: 0 },
              { xPercent: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' },
              label
            )
            .fromTo(
              panel.querySelector('.reel-media'),
              { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.12 },
              { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.9, ease: 'power2.out' },
              `${label}+=0.05`
            )
            .fromTo(
              panel.querySelectorAll('.reel-copy > *'),
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out' },
              `${label}+=0.15`
            )
            .fromTo(
              panel.querySelectorAll('.tech-badge'),
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05 },
              `${label}+=0.35`
            )
            // dwell at center before exiting (plain-object tween = silent no-op)
            .to({ p: 0 }, { p: 1, duration: 0.55 })
            // exit LEFT with blur + fade
            .to(
              panel,
              {
                xPercent: -58,
                autoAlpha: 0.25,
                scale: 0.94,
                filter: 'blur(5px)',
                duration: 1,
                ease: 'power2.in',
              },
              `${label}+=1.2`
            );
        }

        // gap between projects so they don't overlap visually mid-flight
        tl.to({ p: 0 }, { p: 1, duration: 0.18 });
      });

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [reduced]);

  const go = useCallback(
    (dir) => {
      const st = ScrollTrigger.getAll().find((t) => t.vars?.pin === rootRef.current || t.pin === rootRef.current);
      if (!st) return;
      const step = (st.end - st.start) / projects.length;
      const target = Math.round((window.scrollY - st.start) / step) + dir;
      const clamped = Math.max(0, Math.min(projects.length - 1, target));
      window.scrollTo({ top: st.start + clamped * step + step * 0.45, behavior: 'smooth' });
    },
    []
  );

  const total = String(projects.length).padStart(2, '0');

  return (
    <section ref={rootRef} id="projects" className="reel" aria-label="Project showcase">
      <div className="reel-head container">
        <p className="micro-label">SELECTED WORKS</p>
        <h2 className="sr-only">Projects</h2>
      </div>

      <div className="reel-stage" ref={trackRef}>
        <div className="reel-panels">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="reel-panel glass-panel"
              ref={(el) => (panelsRef.current[i] = el)}
              data-index={p.index}
            >
              <div className="reel-grid">
                <div className="reel-media-wrap" data-cursor={p.links[0] ? 'view' : ''}>
                  {p.image ? (
                    <a href={p.links[0]?.href ?? '#'} target="_blank" rel="noopener noreferrer">
                      <img
                        className="reel-media"
                        src={p.image}
                        alt={`Tangkapan layar ${p.title}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        width={1280}
                        height={800}
                      />
                    </a>
                  ) : (
                    <div className="reel-media reel-terminal" aria-hidden="true">
                      <span className="rt-line">$ git remote -v</span>
                      <span className="rt-line">origin github.com/Malikkun09/pkl-crud-laravel-2</span>
                      <span className="rt-line rt-ok">✓ php artisan test — 46 passed</span>
                      <span className="rt-line">✓ app:security-check — exit 0</span>
                      <span className="rt-line rt-dim">role: superadmin · admin · staff · viewer</span>
                      <span className="rt-cursor">▍</span>
                    </div>
                  )}
                  {p.video && !reduced && (
                    <video
                      className="reel-hover-video"
                      src={p.video}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden="true"
                      onCanPlay={(e) => {
                        e.currentTarget.closest('.reel-media-wrap')?.classList.add('video-live');
                      }}
                      onMouseEnter={(e) => {
                        const v = e.currentTarget;
                        if (!v.closest('.reel-media-wrap')?.classList.contains('video-live')) return;
                        v.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  )}
                </div>

                <div className="reel-copy">
                  <div className="reel-topline mono">
                    <span>{p.index}</span>
                    <span>{p.kind}</span>
                  </div>
                  <h3 className="reel-title">{p.title}</h3>
                  <p className="reel-desc">{p.short}</p>
                  <ul className="reel-tech" aria-label="Teknologi">
                    {p.tech.map((t) => (
                      <li key={t} className="tech-badge">{t}</li>
                    ))}
                  </ul>
                  <div className="reel-actions">
                    {p.links.map((l) => (
                      <a key={l.href} className="btn btn-primary" href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                    <span className="reel-status mono">{p.status}</span>
                  </div>
                </div>
              </div>

              {/* Mobile / no-JS fallback pagination hint */}
              <div className="reel-foot mono">
                <span>PROJECT {p.index}</span>
                <span>{p.index} / {total}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Fixed HUD inside pinned stage */}
        <div className="reel-hud">
          <button className="reel-nav-btn" onClick={() => go(-1)} aria-label="Project sebelumnya">←</button>
          <div className="reel-progress"><span ref={progressRef} /></div>
          <button className="reel-nav-btn" onClick={() => go(+1)} aria-label="Project berikutnya">→</button>
          <span className="reel-count mono">{String(active + 1).padStart(2, '0')} / {total}</span>
        </div>
      </div>
    </section>
  );
}
