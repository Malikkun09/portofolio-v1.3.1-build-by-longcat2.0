'use client';

import { useState } from 'react';
import { experiments } from '@/data/experiments';
import { ViewportVideo } from '@/components/common/ViewportVideo';
import { VideoLightbox } from '@/components/projects/VideoLightbox';

export function Experiments() {
  const [active, setActive] = useState<{ src: string; title: string; poster?: string } | null>(
    null
  );

  return (
    <section id="experiments" className="relative bg-ink py-24 md:py-32">
      <div className="frame">
        <p className="section-kicker">Experiments</p>
        <h2 className="display mt-4 text-[clamp(2.6rem,8vw,7rem)]">Lab</h2>
        <p className="mt-4 max-w-xl text-sm text-mist">
          Tempat uji. Beberapa punya rekaman, beberapa masih dalam proses.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {experiments.map((item) => (
            <article
              key={item.id}
              data-exp
              className="group border border-line bg-ink/80 p-5 transition hover:border-brass/40"
              data-cursor={item.video ? 'play' : 'explore'}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                <span>{item.category}</span>
                <span>{item.status}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl uppercase tracking-display md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/75">{item.description}</p>
              {item.video && (
                <button
                  type="button"
                  className="relative mt-6 aspect-video w-full overflow-hidden"
                  onClick={() =>
                    setActive({ src: item.video!, title: item.title, poster: item.poster })
                  }
                  aria-label={`Play ${item.title}`}
                >
                  <ViewportVideo src={item.video} poster={item.poster} title={item.title} />
                </button>
              )}
              <ul className="mt-5 flex flex-wrap gap-3">
                {item.tags.map((tag) => (
                  <li key={tag} className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      {active && (
        <VideoLightbox
          src={active.src}
          title={active.title}
          poster={active.poster}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
