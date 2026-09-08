'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { videos } from '@/data/videos';
import SectionHeading from '@/components/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoShowcase() {
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const videoBlocks = gsap.utils.toArray<HTMLElement>('.video-block');

      videoBlocks.forEach((block) => {
        const videoContainer = block.querySelector('.video-container');
        const meta = block.querySelector('.video-meta');

        if (videoContainer) {
          gsap.fromTo(
            videoContainer,
            { clipPath: 'inset(8% 8% 8% 8%)', scale: 1.05 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
              delay: 0.2,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = (id: string) => {
    setPlaying((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="experiments"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-black"
    >
      <div className="max-w-[1800px] mx-auto">
        <SectionHeading title="SELECTED EXPERIMENTS" />

        <div className="mt-16 md:mt-24">
          {videos.map((video, index) => (
            <div key={video.id} className="video-block mb-24 md:mb-32 last:mb-0">
              <h3 className="font-manrope font-bold text-xl md:text-2xl lg:text-3xl text-primary mb-6">
                {String(index + 1).padStart(2, '0')}. {video.title}
              </h3>

              <div
                className="video-container relative aspect-video w-full lg:w-[80%] mx-auto overflow-hidden bg-black cursor-pointer group"
                data-cursor="video"
                onClick={() => handlePlay(video.id)}
                role="button"
                tabIndex={0}
                aria-label={`Play ${video.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePlay(video.id);
                  }
                }}
              >
                {!playing[video.id] ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 transition-transform duration-300 group-hover:scale-110">
                        ▶
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    src={video.video}
                    autoPlay
                    muted
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="video-meta mt-8 max-w-4xl mx-auto lg:w-[80%] opacity-0">
                <div className="text-xs text-secondary uppercase tracking-wider mb-4">
                  {video.tags.join(' / ')}
                </div>
                <p className="text-sm md:text-base text-secondary leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
