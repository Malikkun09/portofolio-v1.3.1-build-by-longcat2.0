'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { certificates } from '@/data/certificates';
import { CertificateLightbox } from '@/components/certificates/CertificateLightbox';
import { MediaFrame } from '@/components/common/MediaFrame';

export function Certificates() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = certificates.find((item) => item.id === active) ?? null;

  const groups = useMemo(() => {
    const years = Array.from(new Set(certificates.map((item) => item.year)));
    return years.map((year) => ({
      year,
      items: certificates.filter((item) => item.year === year),
    }));
  }, []);

  return (
    <section id="certificates" className="relative bg-ink py-24 md:py-32">
      <div className="frame">
        <p className="section-kicker">Archive</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,8vw,6.5rem)]">Certificates</h2>
        <p className="mt-4 max-w-xl text-sm text-mist">
          Dokumen yang ada di folder sertifikat. Judul dan penerbit dibaca dari dokumen aslinya.
        </p>

        <div className="mt-16 space-y-16">
          {groups.map((group) => (
            <div key={group.year}>
              <div className="mb-6 flex items-center gap-4">
                <p className="font-mono text-sm text-brass">{group.year}</p>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    data-cursor="open"
                    className="group w-full text-left"
                    onClick={() => setActive(item.id)}
                  >
                    <MediaFrame ratio="4 / 3" className="border border-line bg-field">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-3 transition duration-700 group-hover:scale-[1.03]"
                        style={{ objectFit: 'contain', padding: '0.75rem' }}
                      />
                    </MediaFrame>
                    <p className="mt-4 font-mono text-[10px] text-mist">
                      {String(index + 1).padStart(2, '0')} · {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl uppercase tracking-display">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist">
                      {item.issuer}
                      {item.date ? ` · ${item.date}` : ''}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {activeItem && (
        <CertificateLightbox certificate={activeItem} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
