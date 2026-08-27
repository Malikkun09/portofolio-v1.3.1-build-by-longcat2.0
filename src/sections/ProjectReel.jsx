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
 * One tall pinned stage; scroll scrubs a master timeline where each project
 * runs a 6-beat cinematic sequence: PRE-ENTRY (far right, blurred, small) →
 * ENTER (right→center) → FOCUS (sharpen + content stagger + glow) → HOLD
 * (ambient dwell) → EXIT (center→left, blur/fade). Inner media parallaxes
 * against the container for depth. Landscape media keeps its native ratio.
 */
export default function ProjectReel() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const panelsRef = useRef([]);
  const progressRef = useRef(null);
  const stRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 861px)', () => {
      const panels = panelsRef.current.filter(Boolean);
      const media = panels.map((p) => p.querySelector('.reel-media-inner'));

      // Uniform cadence so exit and next entry OVERLAP — one continuous
      // motion instead of a dead gap between projects. Panel i sits centered
      // at t = i * SLOT; it enters over the ENTER before that and exits over
      // the EXIT after its HOLD, landing exactly as panel i+1 arrives.
      const SLOT = 1;
      const ENTER = 0.55;
      const HOLD = 0.45;
      const EXIT = 0.55;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=' + window.innerHeight * projects.length * 1.1,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => root.classList.toggle('is-active', self.isActive),
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            // Derive the index from timeline TIME, not raw progress, so the
            // counter always matches whichever panel is actually centered.
            const t = self.progress * tl.duration();
            const idx = Math.max(0, Math.min(projects.length - 1, Math.round(t / SLOT)));
            setActive(idx);
          },
        },
      });
      stRef.current = tl.scrollTrigger;

      panels.forEach((panel, i) => {
        const copy = panel.querySelectorAll('.reel-copy > *');
        const badges = panel.querySelectorAll('.tech-badge');
        const img = media[i];
        const center = i * SLOT;

        if (i === 0) {
          // Starts centered — no entry, but declared IN the timeline so
          // scrubbing backwards restores it correctly.
          tl.set(panel, { xPercent: 0, autoAlpha: 1, scale: 1, filter: 'blur(0px)' }, 0);
          tl.set(img, { xPercent: 0, scale: 1.04 }, 0);
        } else {
          // PRE-ENTRY → ENTER (right → center)
          tl.fromTo(
            panel,
            { xPercent: 118, autoAlpha: 0, scale: 0.9, filter: 'blur(10px)' },
            { xPercent: 0, autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: ENTER, ease: 'power3.out' },
            center - ENTER
          )
            // media clip reveal + inner parallax settle
            .fromTo(
              panel.querySelector('.reel-media'),
              { clipPath: 'inset(0% 100% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: ENTER * 0.9, ease: 'power2.out' },
              center - ENTER + 0.06
            )
            .fromTo(
              img,
              { xPercent: 12, scale: 1.14 },
              { xPercent: 0, scale: 1.04, duration: ENTER + 0.2, ease: 'power2.out' },
              center - ENTER
            )
            // FOCUS — copy then badges cascade in
            .fromTo(copy, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, center - 0.3)
            .fromTo(badges, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04 }, center - 0.1);
        }

        // HOLD — ambient breathe while centered
        tl.to(img, { scale: 1.09, duration: HOLD, ease: 'sine.inOut' }, center);

        // EXIT — center → left, blur + fade (last panel stays)
        if (i < panels.length - 1) {
          tl.to(
            panel,
            { xPercent: -60, autoAlpha: 0, scale: 0.92, filter: 'blur(8px)', duration: EXIT, ease: 'power2.in' },
            center + HOLD
          ).to(img, { xPercent: -12, duration: EXIT, ease: 'power2.in' }, center + HOLD);
        }
      });

      // Trailing dwell so the last project holds before the pin releases.
      tl.to({}, { duration: HOLD * 1.5 });

      return () => tl.scrollTrigger?.kill();
    });

    // Stacked mode: each card reveals on scroll (media clip + copy stagger).
    mm.add('(max-width: 860px)', () => {
      const ctx = gsap.context(() => {
        panelsRef.current.filter(Boolean).forEach((panel) => {
          gsap
            .timeline({ scrollTrigger: { trigger: panel, start: 'top 84%' } })
            .fromTo(panel, { autoAlpha: 0, y: 40, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' })
            .fromTo(
              panel.querySelector('.reel-media'),
              { clipPath: 'inset(0% 100% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.out' },
              '-=0.5'
            )
            .fromTo(
              panel.querySelectorAll('.reel-copy > *'),
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 },
              '-=0.4'
            );
        });
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  // HUD nav — jump to the scroll position of the prev/next project.
  const go = useCallback((dir) => {
    const st = stRef.current;
    if (!st) return;
    const step = (st.end - st.start) / projects.length;
    const target = Math.round((window.scrollY - st.start) / step) + dir;
    const clamped = Math.max(0, Math.min(projects.length - 1, target));
    window.scrollTo({ top: st.start + clamped * step + step * 0.45, behavior: 'smooth' });
  }, []);

  const total = String(projects.length).padStart(2, '0');

  return (
    <section ref={rootRef} id="projects" className="reel" aria-label="Project showcase">
      <div className="reel-head container">
        <p className="micro-label">SELECTED WORKS</p>
        <h2 className="sr-only">Projects</h2>
      </div>

      <div className="reel-stage" ref={stageRef}>
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
                    <a className="reel-media" href={p.links[0]?.href ?? '#'} target="_blank" rel="noopener noreferrer">
                      <img
                        className="reel-media-inner"
                        src={p.image}
                        alt={`Tangkapan layar ${p.title}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        width={900}
                        height={600}
                      />
                      {p.video && !reduced && (
                        <video
                          className="reel-hover-video"
                          src={p.video}
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-hidden="true"
                          onCanPlay={(e) => e.currentTarget.closest('.reel-media-wrap')?.classList.add('video-live')}
                          onMouseEnter={(e) => {
                            const v = e.currentTarget;
                            if (v.closest('.reel-media-wrap')?.classList.contains('video-live')) v.play().catch(() => {});
                          }}
                          onMouseLeave={(e) => e.currentTarget.pause()}
                        />
                      )}
                    </a>
                  ) : (
                    <div className="reel-media reel-terminal" aria-hidden="true">
                      <div className="reel-media-inner">
                        <span className="rt-line">$ git remote -v</span>
                        <span className="rt-line">origin github.com/Malikkun09/pkl-crud-laravel-2</span>
                        <span className="rt-line rt-ok">✓ php artisan test — 46 passed</span>
                        <span className="rt-line">✓ app:security-check — exit 0</span>
                        <span className="rt-line rt-dim">role: superadmin · admin · staff · viewer</span>
                        <span className="rt-cursor">▍</span>
                      </div>
                    </div>
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
                      <a key={l.href} className="btn btn-primary" href={l.href} target="_blank" rel="noopener noreferrer" data-magnetic>
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                    <span className="reel-status mono">{p.status}</span>
                  </div>
                </div>
              </div>

              <div className="reel-foot mono">
                <span>PROJECT {p.index}</span>
                <span>{p.index} / {total}</span>
              </div>
            </article>
          ))}
        </div>

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
