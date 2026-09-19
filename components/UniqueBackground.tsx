'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

export default function UniqueBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // SKYX Logo Color Particles: orange, navy, teal
    const colors = [
      'rgba(249, 115, 22, ',   // Orange (X arrow)
      'rgba(251, 146, 60, ',   // Light Orange
      'rgba(14, 165, 233, ',   // Sky Teal (digi solutions)
      'rgba(30, 58, 95, ',     // Navy Blue (SKYX text)
      'rgba(56, 189, 248, ',   // Sky Blue accent
    ];

    const particleCount = Math.min(40, Math.floor(width / 38));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.4 + 0.8,
      speedY: -(Math.random() * 0.35 + 0.12),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.18 + 0.06,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.opacity + Math.sin(p.pulsePhase) * 0.06;
        const finalAlpha = Math.max(0.04, Math.min(0.28, currentAlpha));

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 10) {
          p.x -= (dx / dist) * 0.28;
          p.y -= (dy / dist) * 0.28;
        }

        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.6);
        gradient.addColorStop(0, `${p.color}${finalAlpha})`);
        gradient.addColorStop(0.5, `${p.color}${finalAlpha * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(0.45, finalAlpha * 1.6)})`;
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Pearl white base matching SKYX brand */}
      <div className="absolute inset-0 bg-[#F8FAFD]" />

      {/* 2. SKYX Logo Color Ambient Halos */}
      {/* Top: Orange glow (X arrow accent) */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[700px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.18) 0%, rgba(251,146,60,0.08) 45%, transparent 75%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Mid Right: Sky teal (digi solutions color) */}
      <div
        className="absolute top-[30%] -right-[15%] w-[65vw] max-w-[900px] h-[65vw] max-h-[900px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.16) 0%, rgba(56,189,248,0.06) 50%, transparent 75%)',
          filter: 'blur(150px)',
        }}
      />

      {/* Bottom Left: Navy blue (SKYX text color) */}
      <div
        className="absolute top-[65%] left-[5%] w-[55vw] max-w-[750px] h-[55vw] max-h-[750px] rounded-full opacity-12"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,95,0.12) 0%, rgba(37,99,235,0.05) 55%, transparent 75%)',
          filter: 'blur(120px)',
        }}
      />

      {/* 3. Precision Grid — SKYX navy tone */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="skyx-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="rgba(30, 58, 95, 0.07)"
              strokeWidth="0.75"
            />
            <path
              d="M 0 -4 L 0 4 M -4 0 L 4 0"
              fill="none"
              stroke="rgba(249, 115, 22, 0.18)"
              strokeWidth="0.9"
            />
            <circle cx="28" cy="28" r="0.7" fill="rgba(14, 165, 233, 0.18)" />
          </pattern>
          <radialGradient id="grid-skyx-fade" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
          </radialGradient>
          <mask id="skyx-grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-skyx-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#skyx-grid)"
          mask="url(#skyx-grid-mask)"
        />
      </svg>

      {/* 4. Floating Logo-Color Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. Micro-Grain Texture */}
      <div className="absolute inset-0 luxury-noise opacity-[0.035] pointer-events-none" />
    </div>
  );
}
