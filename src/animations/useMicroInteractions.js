import { useEffect } from 'react';
import { animate } from 'animejs';

/**
 * MICRO-INTERACTIONS (Anime.js v4) — deliberately small scope:
 * 1. Magnetic buttons ([data-magnetic]) — subtle pull toward pointer
 * 2. Tech badges — tiny scale pop on hover
 * 3. Social icons — small rotate wiggle on hover
 *
 * Everything large (hero, reel, scroll reveals, light sweep) stays in GSAP.
 */
export default function useMicroInteractions(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cleanups = [];

    // ── Magnetic buttons ──────────────────────────────────────
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        animate(btn, {
          translateX: dx * 0.18,
          translateY: dy * 0.22,
          duration: 420,
          ease: 'outElastic(1, .5)',
        });
      };
      const onLeave = () => {
        animate(btn, {
          translateX: 0,
          translateY: 0,
          duration: 600,
          ease: 'outElastic(1, .4)',
        });
      };
      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        btn.removeEventListener('pointermove', onMove);
        btn.removeEventListener('pointerleave', onLeave);
        btn.style.transform = '';
      });
    });

    // ── Badge hover pop (delegation works for dynamically added nodes)
    const onOver = (e) => {
      const badge = e.target.closest('.tech-badge');
      if (badge && !badge._mfAnimating) {
        badge._mfAnimating = true;
        animate(badge, {
          scale: [{ to: 1.07 }, { to: 1 }],
          duration: 380,
          ease: 'outQuad',
          onComplete: () => (badge._mfAnimating = false),
        });
        return;
      }
      const social = e.target.closest('.hero-socials a');
      if (social && !social._mfAnimating) {
        social._mfAnimating = true;
        animate(social, {
          rotate: [{ to: -8 }, { to: 6 }, { to: 0 }],
          duration: 420,
          ease: 'inOutSine',
          onComplete: () => (social._mfAnimating = false),
        });
      }
    };
    document.addEventListener('pointerover', onOver);
    cleanups.push(() => document.removeEventListener('pointerover', onOver));

    return () => cleanups.forEach((fn) => fn());
  }, [enabled]);
}
