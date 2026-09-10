'use client';

import { useEffect, useRef } from 'react';
import { canUseHeavyVisuals, prefersReducedMotion } from '@/lib/media';

export function FieldCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = prefersReducedMotion();
    const heavy = canUseHeavyVisuals();
    staticRef.current = reduced || !heavy;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let frame = 0;
    let running = true;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const shapes = [
      { x: 0.22, y: 0.38, s: 90, r: 0, v: 0.0016, sides: 6 },
      { x: 0.72, y: 0.28, s: 140, r: 0.4, v: -0.0011, sides: 5 },
      { x: 0.58, y: 0.72, s: 70, r: 1.2, v: 0.002, sides: 4 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.fillStyle = '#0c0c0b';
      ctx.fillRect(0, 0, w, h);

      const offsetX = (pointer.x - 0.5) * 28;
      const offsetY = (pointer.y - 0.5) * 28;
      const gap = 72;
      ctx.strokeStyle = 'rgba(232,226,214,0.045)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = -gap; x < w + gap; x += gap) {
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, h);
      }
      for (let y = -gap; y < h + gap; y += gap) {
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(w, y + offsetY);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(196,165,116,0.18)';
      shapes.forEach((shape, i) => {
        if (!staticRef.current) shape.r += shape.v;
        const cx = shape.x * w + (pointer.x - 0.5) * (18 + i * 10);
        const cy = shape.y * h + (pointer.y - 0.5) * (14 + i * 8);
        ctx.beginPath();
        for (let p = 0; p <= shape.sides; p += 1) {
          const angle = (Math.PI * 2 * p) / shape.sides + shape.r;
          const px = cx + Math.cos(angle) * shape.s;
          const py = cy + Math.sin(angle) * shape.s;
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      ctx.fillStyle = 'rgba(232,226,214,0.03)';
      for (let i = 0; i < 40; i += 1) {
        const gx = (i * 97 + time * 0.01) % w;
        const gy = (i * 53) % h;
        ctx.fillRect(gx, gy, 1, 1);
      }

      if (!staticRef.current) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      pointer.tx = event.clientX / window.innerWidth;
      pointer.ty = event.clientY / window.innerHeight;
    };

    const onVisibility = () => {
      running = document.visibilityState === 'visible' && active;
      if (running && !staticRef.current) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('visibilitychange', onVisibility);

    if (staticRef.current) {
      draw(0);
    } else if (active) {
      frame = requestAnimationFrame(draw);
    } else {
      draw(0);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
