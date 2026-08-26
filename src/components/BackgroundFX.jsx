import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * OLED micro-grid background + vertical light sweep.
 *
 * - Grid: two layered repeating gradients (fine cells + stronger every Nth
 *   line), opacity extremely low so it reads as a faint tech surface.
 * - Light sweep: a masked gradient beam travels TOP → BOTTOM over ~3.6s,
 *   then rests; full cycle repeats every ~10s (GSAP repeatDelay).
 * - Pointer parallax: subtle translate of the grid (desktop only).
 */
export default function BackgroundFX() {
  const beamRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !beamRef.current) return;

    const ctx = gsap.context(() => {
      // Vertical light sweep — cycle ~10s (travel ~3.4s + rest)
      gsap.timeline({
        repeat: -1,
        repeatDelay: 6.6,
        defaults: { ease: 'power2.inOut' },
      })
        .fromTo(
          beamRef.current,
          { yPercent: -120, autoAlpha: 0 },
          { yPercent: -40, autoAlpha: 1, duration: 0.9 }
        )
        .to(beamRef.current, { yPercent: 130, duration: 2.5 })
        .to(beamRef.current, { autoAlpha: 0, duration: 0.45 }, '-=0.35');

      // Gentle pointer parallax on the whole layer
      const xTo = gsap.quickTo('.bgfx-grid', 'x', { duration: 1.2, ease: 'power3' });
      const yTo = gsap.quickTo('.bgfx-grid', 'y', { duration: 1.2, ease: 'power3' });
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        xTo(nx * -18);
        yTo(ny * -12);
      };
      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bgfx-vignette" />
      <div className="bgfx-grid" />
      <div ref={beamRef} className="bgfx-beam" />
    </div>
  );
}
