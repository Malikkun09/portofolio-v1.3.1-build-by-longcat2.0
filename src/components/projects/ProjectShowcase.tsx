'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { projects, type Project } from '@/data/projects';
import { animateProjectPanel } from '@/animations/projects';
import { coverPage } from '@/animations/page-transitions';
import { ViewportVideo } from '@/components/common/ViewportVideo';
import { MediaFrame } from '@/components/common/MediaFrame';

function ProjectPanel({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!ref.current) return;
    return animateProjectPanel(ref.current);
  }, []);

  const open = async () => {
    await coverPage();
    router.push(`/work/${project.id}`);
  };

  return (
    <article
      ref={ref}
      className="grid items-end gap-10 border-t border-line py-16 md:py-24 lg:grid-cols-12"
    >
      <div className="lg:col-span-4" data-project="copy">
        <p className="font-mono text-xs text-mist">{project.index}</p>
        <h3 className="display mt-4 text-[clamp(2.2rem,5vw,4.6rem)]">{project.title}</h3>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          {project.kind} · {project.year}
        </p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/80">{project.short}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="font-mono text-[10px] uppercase tracking-[0.16em] text-mist">
              {tech}
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-cursor="explore"
          onClick={() => void open()}
          className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass"
        >
          Explore project
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="lg:col-span-8">
        <button
          type="button"
          data-project="media"
          data-cursor="view"
          className="w-full bg-transparent p-0 text-left"
          aria-label={`Open ${project.title}`}
          onClick={() => void open()}
        >
          <MediaFrame ratio="16 / 10" className="aperture bg-field">
            {project.video ? (
              <div data-project="visual" className="absolute inset-0">
                <ViewportVideo
                  src={project.video}
                  poster={project.poster ?? undefined}
                  title={project.title}
                />
              </div>
            ) : project.image ? (
              <Image
                data-project="visual"
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div
                data-project="visual"
                className="absolute inset-0 flex flex-col justify-between p-6 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-mist"
              >
                <span>Laravel 13 / PHP 8.3 / MySQL</span>
                <span className="display text-5xl text-paper md:text-7xl">Inventaris</span>
                <span>PKL system · role access · stock ledger</span>
              </div>
            )}
          </MediaFrame>
        </button>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  return (
    <section id="projects" className="relative bg-ink py-10 md:py-16">
      <div className="frame">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Selected projects</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,8vw,7rem)]">Work</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist md:block">
            Enam karya yang sudah ada. Bukan mockup.
          </p>
        </div>
        <div className="mt-6">
          {projects.map((project) => (
            <ProjectPanel key={project.id} project={project} />
          ))}
        </div>
        <div className="border-t border-line py-8 text-right">
          <Link href="/work/inventaris" className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Open case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
