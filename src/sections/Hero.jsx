import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, socials, marqueeItems } from '../data/portfolio';
import SocialIcon from '../components/SocialIcon';
import { useReducedMotion } from '../hooks/useMedia';
import './hero.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ started }) {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  // Entrance timeline — runs once the loader finishes
  useEffect(() => {
    if (!started) return;
    const el = rootRef.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el.querySelectorAll('[data-hero]'), { clearProps: 'all' });
      gsap.set('.portrait-frame', { clipPath: 'inset(0% 0% 0% 0%)' });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('[data-hero="kicker"]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(
          '[data-hero="name"] .w',
          { autoAlpha: 0, yPercent: 110 },
          { autoAlpha: 1, yPercent: 0, duration: 1.05, stagger: 0.09 },
          '-=0.25'
        )
        .fromTo(
          '[data-hero="role"]',
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          '-=0.55'
        )
        .fromTo(
          '[data-hero="intro"]',
          { autoAlpha: 0, y: 22, filter: 'blur(6px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          '[data-hero="ctas"] > *',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.45'
        )
        .fromTo(
          '[data-hero="socials"] a',
          { autoAlpha: 0, scale: 0.7 },
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2)' },
          '-=0.35'
        )
        .fromTo(
          '.portrait',
          { autoAlpha: 0, x: 60 },
          { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.portrait-frame',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' },
          '<+=0.1'
        )
        .fromTo(
          '.portrait-tag',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          '-=0.5'
        )
        .fromTo(
          '.marquee-strip',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          '-=0.4'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [started, reduced]);

  const words = ['Malik', 'Fajar'];

  return (
    <section ref={rootRef} id="home" className="hero" aria-label="Perkenalan">
      <div className="container hero-grid">
        <div>
          <p className="hero-kicker micro-label" data-hero="kicker">
            PORTFOLIO — V3 / {new Date().getFullYear()}
          </p>

          <h1 className="hero-name" data-hero="name" aria-label={`${profile.name}.`}>
            <span aria-hidden="true">
              {words.map((w) => (
                <span key={w} className="word-mask">
                  <span className="w">{w}</span>
                </span>
              ))}
              <span className="word-mask dot-mask">
                <span className="w accent-dot">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-role" data-hero="role">
            <span>&lt;</span> Developer · UI/UX · Cyber Security Enthusiast <span>/&gt;</span>
            <span className="caret" aria-hidden="true">▍</span>
          </p>

          <p className="hero-intro" data-hero="intro">
            {profile.intro}
          </p>

          <div className="hero-ctas" data-hero="ctas">
            <a className="btn btn-primary" href="#projects" data-magnetic>
              View Projects <span aria-hidden="true">↓</span>
            </a>
            <a className="btn" href="#contact" data-magnetic>
              Contact
            </a>
          </div>

          <nav className="hero-socials" data-hero="socials" aria-label="Media sosial">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </nav>
        </div>

        <figure className="portrait" data-cursor="view">
          <div className="portrait-frame">
            <img
              src={profile.photo}
              alt={`Foto profil ${profile.name}`}
              width={720}
              height={900}
              fetchPriority="high"
            />
          </div>
          <figcaption className="portrait-tag mono">
            PPLG <b>'26</b> — SMK IFI
          </figcaption>
        </figure>
      </div>

      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-strip-inner">
          {[...Array(2)].map((_, dup) => (
            <span key={dup}>
              {marqueeItems.map((item) => (
                <span key={item} style={{ whiteSpace: 'nowrap' }}>
                  {item}
                  <i>◆</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
