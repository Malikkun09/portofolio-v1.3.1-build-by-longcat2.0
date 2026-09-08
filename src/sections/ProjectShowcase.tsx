'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import SectionHeading from '@/components/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((projectRef) => {
        if (!projectRef) return;

        const imageContainer = projectRef.querySelector('.project-image-container');
        const image = projectRef.querySelector('.project-image');
        const content = projectRef.querySelector('.project-content');

        // Initial setup for reveal animation
        gsap.set(imageContainer, { clipPath: 'inset(6% 6% 6% 6%)' });
        gsap.set(image, { scale: 1.05 });
        gsap.set(content, { y: 50, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: projectRef,
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to(imageContainer, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.inOut',
        })
          .to(
            image,
            {
              scale: 1,
              duration: 1.2,
              ease: 'power3.inOut',
            },
            '-=1.2'
          )
          .to(
            content,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
            },
            '-=0.8'
          );

        // Hover animation (desktop only)
        if (window.matchMedia('(min-width: 1024px)').matches && imageContainer && image) {
          const viewText = imageContainer.querySelector('.view-text');
          
          imageContainer.addEventListener('mouseenter', () => {
            gsap.to(image, {
              scale: 1.025,
              duration: 0.6,
              ease: 'power2.out',
            });
            if (viewText) {
              gsap.to(viewText, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
              });
            }
          });

          imageContainer.addEventListener('mouseleave', () => {
            gsap.to(image, {
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
            if (viewText) {
              gsap.to(viewText, {
                opacity: 0,
                y: 10,
                duration: 0.4,
                ease: 'power2.out',
              });
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 w-full max-w-[1800px] mx-auto"
    >
      <SectionHeading title="SELECTED WORK" />

      <div className="mt-16 md:mt-24 lg:mt-32">
        {projects.map((project, index) => {
          const isEven = index % 2 !== 0; // Alternating layout
          
          return (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="relative mb-32 md:mb-48 lg:mb-56 pt-12 md:pt-16 border-t border-oled-border"
            >
              {/* Large background number */}
              <div className="absolute top-0 right-0 -z-10 mt-12 mr-4 select-none pointer-events-none">
                <span className="font-manrope font-bold text-7xl md:text-8xl lg:text-9xl text-[#1A1A1A] opacity-50">
                  0{index + 1}
                </span>
              </div>

              <div
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-12 lg:gap-16 items-start`}
              >
                {/* Image Container */}
                <div
                  className="project-image-container relative w-full lg:w-[70%] aspect-[16/10] overflow-hidden group cursor-pointer"
                  data-cursor="project"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={750}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="project-image object-cover w-full h-full"
                    priority={index < 2}
                  />
                  {/* View Project Text - Hover State Desktop */}
                  <div className="view-text absolute bottom-6 right-6 opacity-0 translate-y-2 hidden lg:flex bg-background/90 backdrop-blur-md px-6 py-3 rounded-full border border-oled-border">
                    <span className="text-primary text-xs font-manrope uppercase tracking-widest font-bold">
                      VIEW PROJECT ↗
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="project-content w-full lg:w-[30%] flex flex-col justify-start lg:pt-8">
                  <h3 className="font-manrope font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase text-primary mb-6">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 text-secondary text-xs tracking-widest uppercase">
                      <span>{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-secondary/50"></span>
                      <span>{project.year || '2023'}</span>
                    </div>

                    <p className="text-secondary text-sm leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
