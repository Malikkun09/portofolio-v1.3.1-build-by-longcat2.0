import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useMedia } from '../hooks/useMedia';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Lab', href: '#lab' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Links', href: '#links' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Sticky navbar. Transparent → OLED glass on scroll.
 * Mobile menu: GSAP open/close timeline (reversible), hamburger→X morph,
 * item stagger in + reverse-stagger out. Body scroll lock is always released.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const tlRef = useRef(null);
  const isDesktop = useMedia('(min-width: 821px)');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build a reversible open/close timeline once the panel exists.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.mmenu-item');
      const tl = gsap.timeline({ paused: true });
      if (reduced) {
        tl.set(el, { autoAlpha: 1 }).set(items, { autoAlpha: 1, y: 0 });
      } else {
        tl.set(el, { autoAlpha: 1 })
          .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power4.inOut' })
          .fromTo(items, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '-=0.2')
          .fromTo('.mmenu-meta', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, '-=0.25');
      }
      tlRef.current = tl;
    }, menuRef);
    return () => ctx.revert();
  }, []);

  // Drive the timeline + body scroll lock from `open`.
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      document.body.style.overflow = 'hidden';
      tl.timeScale(1).play();
    } else {
      // reverse faster; hide panel from AT/pointer once collapsed
      tl.timeScale(1.5).reverse();
      document.body.style.overflow = '';
    }
  }, [open]);

  // Close on desktop breakpoint + Escape; always release scroll lock on unmount.
  useEffect(() => {
    if (isDesktop && open) setOpen(false);
  }, [isDesktop, open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
        <div className="container nav-inner">
          <a className="nav-logo" href="#home" aria-label="Kembali ke atas" onClick={() => setOpen(false)}>
            MF<span>.</span>
          </a>

          <nav className="nav-links" aria-label="Navigasi utama">
            {LINKS.filter((l) => l.href !== '#home').map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <span className="nav-status">
            <i aria-hidden="true" /> OPEN TO WORK
          </span>

          <button
            className={`mmenu-btn${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            <span className="bar b1" />
            <span className="bar b2" />
            <span className="bar b3" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className="mmenu"
        ref={menuRef}
        aria-hidden={!open}
        {...(!open ? { inert: '' } : {})}
      >
        <div className="mmenu-grid" aria-hidden="true" />
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.href} className="mmenu-item">
              <a href={l.href} onClick={() => setOpen(false)}>
                <span className="mono idx">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mmenu-meta mono">MALIK FAJAR — PORTFOLIO V3 · PPLG '26</p>
      </div>
    </>
  );
}
