import { useEffect, useRef } from 'react';
import { useMedia } from '../hooks/useMedia';
import './cursor.scss';

/**
 * Subtle custom cursor: small dot + trailing ring.
 * - Grows over links/buttons ([data-cursor] / a / button)
 * - Shows a "view" state over [data-cursor="view"] elements
 * - Disabled on touch devices & coarse pointers automatically
 * - Native cursor stays visible as fallback; we hide it only when active
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');

    let raf = 0;
    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let scale = 1;
    let targetScale = 1;
    let opacity = 0;

    const setState = (s, label) => {
      ring.dataset.state = label ?? '';
      targetScale = s;
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      opacity = 1;
      const el = e.target.closest?.('a, button, [data-cursor]');
      if (!el) return setState(1, '');
      if (el.dataset.cursor === 'view') return setState(2.6, 'view');
      if (el.dataset.cursor === 'open') return setState(2.6, 'open');
      if (el.tagName === 'A' || el.tagName === 'BUTTON') return setState(1.7, 'link');
      setState(1, '');
    };

    const onLeave = () => (opacity = 0);

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      dot.style.opacity = opacity;
      ring.style.opacity = opacity * 0.85;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
