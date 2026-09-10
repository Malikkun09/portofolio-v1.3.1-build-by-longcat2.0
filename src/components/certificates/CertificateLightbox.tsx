'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import type { Certificate } from '@/data/certificates';

export function CertificateLightbox({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-ink/96 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
    >
      <button
        type="button"
        className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.2em] text-brass"
        onClick={onClose}
      >
        Close
      </button>
      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center">
        <div className="relative max-h-[78vh] w-full overflow-hidden">
          <Image
            src={certificate.image}
            alt={certificate.title}
            width={1600}
            height={1100}
            className="mx-auto max-h-[78vh] w-auto object-contain"
            style={{ maxHeight: '78vh', width: 'auto', height: 'auto', maxWidth: '100%' }}
          />
        </div>
        <figcaption className="mt-6 text-center">
          <p className="font-display text-2xl uppercase tracking-display">{certificate.title}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
            {certificate.issuer}
            {certificate.date ? ` · ${certificate.date}` : ''}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
