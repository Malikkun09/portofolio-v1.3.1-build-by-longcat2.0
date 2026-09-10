'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface VideoLightboxProps {
  src: string;
  title: string;
  poster?: string;
  onClose: () => void;
}

const formatTime = (value: number) => {
  if (!Number.isFinite(value)) return '00:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export function VideoLightbox({ src, title, poster, onClose }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power3.out' });
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[75] flex flex-col bg-ink/95 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass"
        >
          Close
        </button>
      </div>
      <video
        ref={videoRef}
        className="mx-auto max-h-[70vh] w-full max-w-5xl object-contain"
        src={src}
        poster={poster}
        autoPlay
        playsInline
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />
      <div className="mx-auto mt-6 flex w-full max-w-5xl flex-col gap-3">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={time}
          aria-label="Video progress"
          onChange={(event) => {
            const next = Number(event.target.value);
            if (videoRef.current) videoRef.current.currentTime = next;
            setTime(next);
          }}
        />
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
          <div className="flex gap-4">
            <button type="button" onClick={toggle}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              onClick={() => {
                const video = videoRef.current;
                if (!video) return;
                video.muted = !video.muted;
                setMuted(video.muted);
              }}
            >
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
          <span>
            {formatTime(time)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
