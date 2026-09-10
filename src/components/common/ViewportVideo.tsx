'use client';

import { useEffect, useRef } from 'react';

interface ViewportVideoProps {
  src: string;
  poster?: string;
  title: string;
  onOpen?: () => void;
}

export function ViewportVideo({ src, poster, title, onOpen }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      data-media-video
      className="absolute inset-0 h-full w-full object-cover"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={title}
      onClick={onOpen}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
