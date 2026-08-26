import { useEffect, useState } from 'react';

/**
 * Boot loader: thin progress line + percentage.
 * Fakes progress to ~90% quickly and completes on window load,
 * then hands over to the hero timeline via onComplete().
 */
export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    let p = 0;
    let target = 82;

    const tick = () => {
      // ease towards target
      p += (target - p) * 0.06;
      if (document.readyState === 'complete') target = 100;
      setProgress(Math.round(p));
      if (p >= 99.5 && document.readyState === 'complete') {
        setProgress(100);
        // small beat so 100% is visible
        setTimeout(onComplete, 260);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div className="loader" role="status" aria-label="Memuat portfolio">
      <div className="loader-track">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-meta">
        <span>MF — PORTFOLIO V3</span>
        <span className="pct">{String(progress).padStart(3, '0')}%</span>
      </div>
    </div>
  );
}
