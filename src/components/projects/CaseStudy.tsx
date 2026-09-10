'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/data/projects';
import { ViewportVideo } from '@/components/common/ViewportVideo';
import { MediaFrame } from '@/components/common/MediaFrame';
import { VideoLightbox } from '@/components/projects/VideoLightbox';
import { coverPage } from '@/animations/page-transitions';
import { reveal } from '@/animations/core';
import { Footer } from '@/components/layout/Footer';

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    reveal(root.querySelectorAll('[data-cs]'), root, { stagger: 0.07, y: 24, immediate: true });
  }, [project.id]);

  const goNext = async () => {
    await coverPage();
    router.push(`/work/${next.id}`);
  };

  return (
    <>
      <article ref={rootRef} className="min-h-[100svh] bg-ink pt-28">
        <div className="frame pb-20">
          <p className="section-kicker" data-cs>
            {project.index} / {project.kind}
          </p>
          <h1 className="display mt-6 text-[clamp(3rem,10vw,8rem)]" data-cs>
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/80" data-cs>
            {project.short}
          </p>

          <div className="mt-12 overflow-hidden" data-cs>
            {project.video ? (
              <button
                type="button"
                className="w-full bg-transparent p-0"
                data-cursor="play"
                onClick={() => setVideoOpen(true)}
              >
                <MediaFrame ratio="16 / 9" className="aperture">
                  <ViewportVideo
                    src={project.video}
                    poster={project.poster ?? undefined}
                    title={project.title}
                  />
                </MediaFrame>
              </button>
            ) : project.image ? (
              <MediaFrame ratio="16 / 10" className="aperture">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </MediaFrame>
            ) : (
              <div className="aperture flex min-h-[40vh] flex-col justify-between p-8 font-mono text-xs uppercase tracking-[0.18em] text-mist">
                <span>{project.technologies.join(' / ')}</span>
                <span className="display text-6xl text-paper">Spec</span>
                <span>{project.status}</span>
              </div>
            )}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <section className="lg:col-span-7" data-cs>
              <h2 className="section-kicker">Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-paper/85">{project.description}</p>
            </section>
            <aside className="lg:col-span-4 lg:col-start-9" data-cs>
              <h2 className="section-kicker">Technology</h2>
              <ul className="mt-4 space-y-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="font-display text-2xl uppercase tracking-display">
                    {tech}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {(project.purpose || project.approach || project.result) && (
            <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
              {project.purpose && (
                <section data-cs>
                  <h2 className="section-kicker">Purpose</h2>
                  <p className="mt-4 text-sm leading-relaxed text-paper/80">{project.purpose}</p>
                </section>
              )}
              {project.approach && (
                <section data-cs>
                  <h2 className="section-kicker">Approach</h2>
                  <p className="mt-4 text-sm leading-relaxed text-paper/80">{project.approach}</p>
                </section>
              )}
              {project.result && (
                <section data-cs>
                  <h2 className="section-kicker">Result</h2>
                  <p className="mt-4 text-sm leading-relaxed text-paper/80">{project.result}</p>
                </section>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => void goNext()}
            data-cursor="explore"
            className="mt-24 flex w-full items-end justify-between border-t border-line pt-10 text-left"
          >
            <span className="section-kicker">Next project</span>
            <span className="display text-[clamp(2rem,6vw,5rem)]">{next.title}</span>
          </button>
        </div>
      </article>
      <Footer />
      {videoOpen && project.video && (
        <VideoLightbox
          src={project.video}
          title={project.title}
          poster={project.poster ?? undefined}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </>
  );
}
