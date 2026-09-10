'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { profile } from '@/data/profile';
import { clipOpen, reveal } from '@/animations/core';
import { MediaFrame } from '@/components/common/MediaFrame';

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = root.querySelector('[data-about="media"]');
    const copy = root.querySelectorAll('[data-about="copy"]');
    if (media) clipOpen(media, root);
    if (copy.length) reveal(copy, root, { stagger: 0.08, y: 28 });
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative bg-ink py-24 md:py-36">
      <div className="frame grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="section-kicker">About</p>
          <MediaFrame
            data-about="media"
            ratio="4 / 5"
            className="aperture mt-8"
            data-cursor="view"
          >
            <Image
              src={profile.photo}
              alt="Malik Fajar"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover grayscale-[20%] transition duration-700 hover:grayscale-0"
              style={{ objectFit: 'cover' }}
            />
          </MediaFrame>
        </div>

        <div className="lg:col-span-7 lg:pt-16">
          <h2 data-about="copy" className="display text-[clamp(2.4rem,7vw,6.2rem)]">
            Hi, I&apos;m Malik.
          </h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-paper/85 md:text-lg">
            {profile.about.map((paragraph) => (
              <p key={paragraph} data-about="copy">
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div data-about="copy">
              <dt className="section-kicker">Based in</dt>
              <dd className="mt-2 text-sm uppercase tracking-wide">{profile.location}</dd>
            </div>
            <div data-about="copy">
              <dt className="section-kicker">Study</dt>
              <dd className="mt-2 text-sm uppercase tracking-wide">{profile.studyProgram}</dd>
            </div>
            <div data-about="copy" className="sm:col-span-2">
              <dt className="section-kicker">Focus</dt>
              <dd className="mt-2 text-sm uppercase tracking-wide">{profile.focus.join(' / ')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
