import { useEffect, useRef, useState } from 'react';
import { useMedia } from '../hooks/useMedia';

/**
 * Sticky navbar. Transparent at top → OLED glass after scroll.
 * Mobile: full-screen menu with GSAP-free CSS transition (kept simple).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const isDesktop = useMedia('(min-width: 821px)');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  // Close menu when resizing up to desktop
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Lab', href: '#lab' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Links', href: '#links' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="nav-logo" href="#home" aria-label="Kembali ke atas">
            MF<span>.</span>
          </a>

          <nav className="nav-links" aria-label="Navigasi utama">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <span className="nav-status">
            <i aria-hidden="true" /> OPEN TO WORK
          </span>

          <button
            className="mmenu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3 7h18M3 12h12M3 17h18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" className="mmenu" ref={panelRef}>
          <ul>
            {links.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="mono" style={{ fontSize: '.55em', color: 'var(--text-faint)', marginRight: '.6em' }}>
                    0{i + 1}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mmenu-meta">MALIK FAJAR — PORTFOLIO V3</p>
        </div>
      )}
    </>
  );
}
