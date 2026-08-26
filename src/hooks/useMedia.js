import { useEffect, useState } from 'react';

/** Boolean matchMedia hook (re-renders on change). */
export function useMedia(query, initial = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return initial;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion. */
export function useReducedMotion() {
  return useMedia('(prefers-reduced-motion: reduce)');
}
