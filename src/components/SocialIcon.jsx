/**
 * Minimal inline icon set (stroke style, 24px grid).
 * Only the networks that exist in the real data.
 */
const PATHS = {
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  devto: (
    <path d="M7.5 6.5v11l6.75-5.5L7.5 6.5zM16.5 7.5v9H18v-9h-1.5zM3 3h18v18H3V3zm2 2v14h14V5H5z" fillRule="evenodd" clipRule="evenodd" />
  ),
  stackoverflow: (
    <path d="M17.36 20.2v-5.38h1.79V22H4v-7.18h1.79v5.38h11.57zM7.95 14.05l8.8 1.84.37-1.78-8.8-1.84-.37 1.78zm1.16-4.21l8.15 3.79.75-1.62-8.15-3.79-.75 1.62zm2.26-4l6.91 5.74 1.14-1.37-6.91-5.74-1.14 1.37zm4.47-4.26l-1.44 1.07 5.37 7.23 1.44-1.07-5.37-7.23zM7.5 18.1h9v-1.8h-9v1.8z" fillRule="evenodd" clipRule="evenodd" />
  ),
};

export default function SocialIcon({ name }) {
  const filled = name === 'github' || name === 'devto' || name === 'stackoverflow';
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.github}
    </svg>
  );
}
