import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './loader.scss';

/**
 * Boot loader — digital tachometer.
 * A semicircle gauge (SVG arc + ticks + needle) whose needle + arc + big
 * bottom-right percentage are all driven by ONE gsap counter so motion stays
 * smooth. Progress eases to ~90% immediately, snaps to 100% on window load,
 * then plays a cinematic redline pulse + clip exit into the hero.
 */
const PHASES = [
  { at: 0, label: 'SYSTEM INITIALIZATION' },
  { at: 20, label: 'LOADING ASSETS' },
  { at: 45, label: 'SYNCING PROJECTS' },
  { at: 70, label: 'BUILDING INTERFACE' },
  { at: 90, label: 'PRIMING ANIMATION' },
  { at: 100, label: 'READY' },
];

// Arc geometry (viewBox 0 0 320 190). Semicircle, pathLength normalised to 100.
const ARC = 'M 40 170 A 120 120 0 0 1 280 170';
// Needle sweeps -96deg (left rest) → +96deg (right redline) across 0–100%.
const angleFor = (p) => -96 + (p / 100) * 192;

export default function Loader({ onComplete }) {
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const arcRef = useRef(null);
  const needleRef = useRef(null);
  const phaseRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const done = () => onComplete?.();

    if (reduced) {
      const t = setTimeout(done, 260);
      return () => clearTimeout(t);
    }

    const counter = { v: 0 };
    let handedOver = false;
    let curPhase = -1;

    const render = () => {
      const v = counter.v;
      if (numRef.current) numRef.current.textContent = String(Math.round(v)).padStart(3, '0');
      if (arcRef.current) arcRef.current.style.strokeDashoffset = String(100 - v);
      if (needleRef.current) needleRef.current.style.transform = `rotate(${angleFor(v)}deg)`;
      // phase label swap
      let idx = 0;
      for (let i = 0; i < PHASES.length; i++) if (v >= PHASES[i].at) idx = i;
      if (idx !== curPhase && phaseRef.current) {
        curPhase = idx;
        gsap.fromTo(phaseRef.current, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 });
        phaseRef.current.textContent = PHASES[idx].label;
      }
    };

    const ctx = gsap.context(() => {
      // Drive the counter toward 90% with soft easing while assets load.
      const drive = gsap.to(counter, {
        v: 90,
        duration: 2.4,
        ease: 'power2.out',
        onUpdate: render,
      });

      const onReady = () => {
        if (handedOver) return;
        handedOver = true;
        drive.kill(); // hand the counter over — avoid two tweens on `v`
        gsap.to(counter, {
          v: 100,
          duration: 0.9,
          ease: 'power3.inOut',
          onUpdate: render,
          onComplete: playExit,
        });
      };

      const playExit = () => {
        const tl = gsap.timeline({ onComplete: done });
        tl.to('.gauge-needle', { rotate: 104, duration: 0.18, ease: 'power3.in', transformOrigin: '50% 100%' })
          .to('.gauge-redline', { autoAlpha: 1, duration: 0.14 }, '<')
          .to(['.gauge', '.loader-num'], { scale: 1.04, duration: 0.16, ease: 'power2.out' }, '<')
          .to('.loader-flash', { autoAlpha: 0.9, duration: 0.12 })
          .to('.loader-flash', { autoAlpha: 0, duration: 0.4 })
          .to(rootRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.7,
            ease: 'power4.inOut',
          }, '-=0.15');
      };

      if (document.readyState === 'complete') {
        // let a beat of gauge motion play first
        gsap.delayedCall(0.9, onReady);
      } else {
        window.addEventListener('load', onReady, { once: true });
        // hard fallback so we never hang on a stalled asset
        gsap.delayedCall(6, onReady);
      }
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader" ref={rootRef} role="status" aria-label="Memuat portfolio">
      <div className="loader-flash" aria-hidden="true" />
      <div className="loader-grid" aria-hidden="true" />

      <div className="loader-tele mono" aria-hidden="true">
        <span>PORTFOLIO_V3</span>
        <span>MALIK::FAJAR</span>
      </div>

      <div className="gauge-wrap">
        <svg className="gauge" viewBox="0 0 320 190" role="img" aria-label="Indikator loading">
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="70%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="#ff5a5a" />
            </linearGradient>
          </defs>

          {/* tick marks */}
          <g className="gauge-ticks">
            {Array.from({ length: 21 }, (_, i) => {
              const a = (-96 + (i / 20) * 192) * (Math.PI / 180);
              const r1 = i % 5 === 0 ? 96 : 104;
              const r2 = 114;
              const cx = 160, cy = 170;
              return (
                <line
                  key={i}
                  x1={cx + Math.sin(a) * r1}
                  y1={cy - Math.cos(a) * r1}
                  x2={cx + Math.sin(a) * r2}
                  y2={cy - Math.cos(a) * r2}
                  className={i % 5 === 0 ? 'tick major' : 'tick'}
                  stroke={i >= 18 ? '#ff5a5a' : 'currentColor'}
                />
              );
            })}
          </g>

          <path className="gauge-track" d={ARC} pathLength="100" />
          <path
            className="gauge-redline"
            d={ARC}
            pathLength="100"
            style={{ strokeDasharray: '10 100', strokeDashoffset: -90 }}
          />
          <path
            ref={arcRef}
            className="gauge-arc"
            d={ARC}
            pathLength="100"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
          />

          <line ref={needleRef} className="gauge-needle" x1="160" y1="170" x2="160" y2="66" />
          <circle className="gauge-hub" cx="160" cy="170" r="8" />
        </svg>
        <span className="gauge-unit mono">SYS · LOAD</span>
      </div>

      <p className="loader-phase mono" ref={phaseRef} aria-live="polite">
        SYSTEM INITIALIZATION
      </p>

      <div className="loader-num" aria-hidden="true">
        <span ref={numRef}>000</span><i>%</i>
      </div>
    </div>
  );
}
