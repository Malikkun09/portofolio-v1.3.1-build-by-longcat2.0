'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from '@/data/profile';
import { scrollTo } from '@/lib/smooth-scroll';
import { coverPage } from '@/animations/page-transitions';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = async (href: string) => {
    setOpen(false);
    const [path, hash] = href.split('#');
    const targetPath = path || '/';

    if (pathname !== targetPath) {
      await coverPage();
      router.push(href);
      return;
    }

    if (hash) scrollTo(`#${hash}`, { offset: -12 });
    else scrollTo(0);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="frame pointer-events-auto flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper"
            onClick={(event) => {
              event.preventDefault();
              void go('/');
            }}
          >
            Malik Fajar
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
                onClick={(event) => {
                  event.preventDefault();
                  void go(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`block h-px w-6 bg-paper transition ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-paper transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-paper transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 bg-ink md:hidden ${open ? 'visible' : 'pointer-events-none invisible'}`}
      >
        <nav className="flex h-full flex-col justify-end px-6 pb-16 pt-28" aria-label="Mobile">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="display border-t border-line py-4 text-[12vw]"
              style={{
                clipPath: open ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                transition: `clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 * index}s`,
              }}
              onClick={(event) => {
                event.preventDefault();
                void go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
