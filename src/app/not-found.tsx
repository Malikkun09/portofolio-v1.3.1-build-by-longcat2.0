import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-start justify-end px-8 pb-16 pt-32">
      <p className="section-kicker">404</p>
      <h1 className="display mt-6 text-[clamp(4rem,14vw,10rem)]">Lost</h1>
      <Link href="/" className="mt-8 font-mono text-sm uppercase tracking-[0.2em] text-brass">
        Back home →
      </Link>
    </main>
  );
}
