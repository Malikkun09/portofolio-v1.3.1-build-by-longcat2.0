import { useEffect, useRef } from 'react';
import { videoDemos } from '../data/portfolio';
import './lab.scss';

/**
 * LAB — the two real demo videos from the source project.
 * Videos are lazy: they only load when scrolled near (IntersectionObserver)
 * and play muted/loop inline. Poster shows first so nothing flashes.
 */
export default function Lab() {
  return (
    <section id="lab" className="section" aria-label="Demo video">
      <span className="section-index mono" aria-hidden="true">03 / LAB</span>
      <div className="container">
        <div className="lab-section-head">
          <div>
            <p className="micro-label" style={{ marginBottom: '1.2rem' }}>LAB — EXPERIMENTS</p>
            <h2>Recorded <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>experiments</em></h2>
          </div>
          <p>
            Demo rekaman asli: computer vision dengan Python dan eksperimen membangun web bersama AI.
          </p>
        </div>

        <div className="lab-grid">
          {videoDemos.map((d, i) => (
            <article key={d.title} className="lab-card glass-panel">
              <LazyVideo src={d.video} poster={d.poster} title={d.title} />
              <div className="lab-card-meta">
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.description}</p>
                </div>
                <span className="lab-card-num">EXP—{String(i + 1).padStart(2, '0')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LazyVideo({ src, poster, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let playing = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !v.src) {
          v.src = src;
          v.load();
        }
        if (entry.isIntersecting && !playing) {
          v.play().then(() => (playing = true)).catch(() => {});
        } else if (!entry.isIntersecting && playing) {
          v.pause();
          playing = false;
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-label={`Rekaman demo ${title}`}
    />
  );
}
