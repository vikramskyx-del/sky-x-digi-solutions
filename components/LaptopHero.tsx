'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Cpu, Sparkles, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { STATS } from '@/lib/constants';

const METRIC_THEMES = [
  {
    // Orange — logo X arrow
    tag: 'text-orange-400',
    border: 'hover:border-orange-500/60',
    glow: 'from-orange-500/60 via-orange-500/20 to-transparent',
    numClass: 'text-white group-hover:text-orange-400',
    cardBg: 'from-[#0F172A] via-[#0B0F19] to-[#020617]',
    accentDot: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]',
    badgeBg: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
  },
  {
    // Sky Teal — logo digi solutions
    tag: 'text-sky-400',
    border: 'hover:border-sky-500/60',
    glow: 'from-sky-500/60 via-sky-500/20 to-transparent',
    numClass: 'text-white group-hover:text-sky-400',
    cardBg: 'from-[#0F172A] via-[#0B0F19] to-[#020617]',
    accentDot: 'bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.8)]',
    badgeBg: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
  },
  {
    // Navy — logo SKYX text
    tag: 'text-blue-400',
    border: 'hover:border-blue-500/60',
    glow: 'from-blue-600/60 via-blue-600/20 to-transparent',
    numClass: 'text-white group-hover:text-blue-400',
    cardBg: 'from-[#0F172A] via-[#0B0F19] to-[#020617]',
    accentDot: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]',
    badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

export default function LaptopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D mouse parallax inertia
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buttery smooth cinematic spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.001,
  });

  // Intro titles fade out smoothly
  const headerOpacity = useTransform(smoothProgress, [0.02, 0.14, 0.25], [1, 0.4, 0]);
  const headerY = useTransform(smoothProgress, [0.02, 0.14, 0.25], [0, -10, -25]);
  const hintOpacity = useTransform(smoothProgress, [0.02, 0.10, 0.20], [1, 0.4, 0]);

  // LAYER 1: 3D 16:9 Laptop Zoom & Dissolve
  const laptopScale = useTransform(smoothProgress, [0, 0.18, 0.48, 0.72], [1, 1.06, 1.9, 2.7]);
  const laptopOpacity = useTransform(smoothProgress, [0, 0.38, 0.62], [1, 1, 0]);
  const laptopY = useTransform(smoothProgress, [0, 0.30, 0.60], [0, -4, -8]);
  const baseOpacity = useTransform(smoothProgress, [0.12, 0.38], [1, 0]);

  // LAYER 2: The Next Page (Full-screen Verified Metrics & Architecture Portal)
  const portalOpacity = useTransform(smoothProgress, [0.35, 0.58, 1], [0, 1, 1]);
  const portalScale = useTransform(smoothProgress, [0.35, 0.65, 1], [0.93, 1, 1]);
  const portalY = useTransform(smoothProgress, [0.35, 0.65, 1], [25, 0, 0]);

  // Parallax tilt influenced by mouse only when near top of scroll
  const tiltX = mousePos.y * -2.5;
  const tiltY = mousePos.x * 3.5;

  const scrollToNext = () => {
    const el = document.querySelector('#why-skyx') || document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="experience" ref={containerRef} className="relative h-[220vh] bg-transparent select-none">
      {/* Anchor for external links to metrics */}
      <div id="stats" className="absolute top-1/3" />

      {/* Pinned Viewport Scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Cinematic Ambient Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top Architectural Emerald Spotlight */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1100px] h-[600px] opacity-15"
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, rgba(5,150,105,0.15) 0%, rgba(16,185,129,0.06) 45%, transparent 75%)',
              filter: 'blur(100px)',
            }}
          />

          {/* Mint Emerald luxury ambient on the right */}
          <div
            className="absolute top-1/4 -right-24 w-[600px] h-[600px] opacity-15"
            style={{
              background: 'radial-gradient(circle, #059669 0%, rgba(5,150,105,0.1) 45%, transparent 70%)',
              filter: 'blur(110px)',
            }}
          />

          {/* Deep Floor Glow */}
          <div
            className="absolute bottom-0 inset-x-0 h-full pointer-events-none opacity-25"
            style={{
              background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(16,185,129,0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
          <div className="absolute inset-0 luxury-noise opacity-15" />
        </div>

        {/* Minimal Hero Headline Overlay (Positioned gracefully at top) */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute top-10 sm:top-14 inset-x-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 backdrop-blur-xl mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
            <span className="font-mono text-[9px] tracking-[0.25em] text-orange-700 uppercase font-semibold">
              Interactive 16:9 Hardware Experience
            </span>
          </div>

          <h2 className="text-base sm:text-xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] uppercase">
            Dive Into The Digital Realm
          </h2>
          <p className="text-slate-500 font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase mt-0.5">
            Scroll to zoom through the 16:9 screen into next page
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* LAYER 1: 3D FLOATING PHOTOREALISTIC LAPTOP (16:9 RATIO) */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: laptopOpacity,
            scale: laptopScale,
            y: laptopY,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1200,
          }}
          className="relative z-20 flex flex-col items-center justify-center mt-6 sm:mt-8 pointer-events-none"
        >
          {/* LAPTOP LID / SCREEN ASSEMBLY — STRICT 16:9 RATIO */}
          <div className="relative w-[86vw] sm:w-[70vw] md:w-[58vw] max-w-[590px] lg:max-w-[630px] aspect-[16/9] rounded-2xl p-[6px] sm:p-[8px] bg-gradient-to-b from-[#222825] via-[#141816] to-[#0B0F0D] shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-emerald-500/30">
            {/* CNC Chamfered Outer Bezel Edge */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />

            {/* Top FaceTime Camera Pin & Ambient Light Sensor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-16 sm:w-22 bg-[#060907] rounded-b-xl flex items-center justify-center gap-1.5 z-40 border-b border-x border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#020604] border border-emerald-400/40 relative flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>

            {/* THE LAPTOP SCREEN — 16:9 Live Digital Console */}
            <div className="relative w-full h-full aspect-[16/9] overflow-hidden rounded-xl bg-[#0A0E0C] shadow-inner flex flex-col select-none">
              {/* Anti-Reflective Specular Glare */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 28%, transparent 60%)',
                }}
                className="absolute inset-0 pointer-events-none z-30"
              />

              {/* Console Workspace */}
              <div className="absolute inset-0 z-10 w-full h-full p-2.5 sm:p-3.5 flex flex-col justify-between bg-gradient-to-b from-[#0F1411] via-[#0B0F0D] to-[#070A08]">
                {/* Browser / Console Bar */}
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                    <span className="ml-2 font-mono text-[7px] sm:text-[8px] text-slate-300 px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] flex items-center gap-1">
                      <span className="text-emerald-400">🔒</span> console.skyxdigi.com/growth-hub
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
                    <span className="font-mono text-[7px] sm:text-[7.5px] text-emerald-400 font-semibold tracking-wider">
                      LIVE 99.98% OPTIMAL
                    </span>
                  </div>
                </div>

                {/* Dashboard Center Presentation */}
                <div className="flex-1 flex flex-col justify-between my-1 sm:my-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[7px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                        <Cpu className="w-2.5 h-2.5" /> High-Performance AI Architecture
                      </div>
                      <h4 className="text-xs sm:text-sm font-['Space_Grotesk'] font-bold text-white leading-tight">
                        SKYX Enterprise Growth Platform
                      </h4>
                    </div>
                    <div className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[7px] tracking-wider font-semibold">
                      ACTIVE SPRINT
                    </div>
                  </div>

                  {/* 3 Metric Mini-Cards */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-1.5 my-1">
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                      <div className="text-[6px] sm:text-[7px] font-mono uppercase text-slate-400">Experience</div>
                      <div className="text-xs sm:text-sm font-bold text-white">3+ Years</div>
                      <div className="text-[6px] text-emerald-400 font-mono font-semibold">↑ Established</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                      <div className="text-[6px] sm:text-[7px] font-mono uppercase text-slate-400">Projects</div>
                      <div className="text-xs sm:text-sm font-bold text-white">150+ Done</div>
                      <div className="text-[6px] text-emerald-400 font-mono font-semibold">✦ Global Scale</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                      <div className="text-[6px] sm:text-[7px] font-mono uppercase text-slate-400">Engineers</div>
                      <div className="text-xs sm:text-sm font-bold text-white">30+ Team</div>
                      <div className="text-[6px] text-emerald-400 font-mono font-semibold">⚡ Elite Core</div>
                    </div>
                  </div>

                  {/* Interactive Graph Banner */}
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-[7px] font-mono text-slate-400">Attribution Pipeline Speed</div>
                      <div className="text-[8.5px] sm:text-xs font-semibold text-white">
                        12ms Sub-Second Latency
                      </div>
                    </div>
                    <svg className="w-20 sm:w-28 h-5" viewBox="0 0 100 25" fill="none">
                      <path
                        d="M0 22 Q 25 18, 40 10 T 70 7 T 88 3 T 100 2"
                        stroke="#10B981"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="pt-1.5 border-t border-white/[0.08] flex items-center justify-between text-[6.5px] sm:text-[7.5px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    KRISHNAGIRI HQ • CLOUD DEPLOYED
                  </span>
                  <span className="text-emerald-400 font-semibold tracking-wider">
                    DIVE IN ↓
                  </span>
                </div>
              </div>

              {/* Subtle CRT Screen Scanline */}
              <div className="absolute inset-0 pointer-events-none luxury-noise opacity-20 z-25" />
            </div>
          </div>

          {/* LAPTOP HINGE & BARREL CYLINDER */}
          <motion.div
            style={{ opacity: baseOpacity }}
            className="w-[78vw] sm:w-[62vw] md:w-[50vw] max-w-[520px] lg:max-w-[560px] h-2 bg-gradient-to-r from-[#0C100E] via-[#1E2521] to-[#0C100E] rounded-sm -mt-0.5 z-15 border-t border-emerald-500/20 shadow-sm"
          />

          {/* LAPTOP BASE CHASSIS (Lower Deck with Illuminated Keyboard & Trackpad) */}
          <motion.div
            style={{
              opacity: baseOpacity,
              transform: 'perspective(600px) rotateX(46deg) translateZ(-6px)',
              transformOrigin: 'top center',
            }}
            className="relative w-[86vw] sm:w-[70vw] md:w-[58vw] max-w-[600px] lg:max-w-[640px] h-16 sm:h-20 bg-gradient-to-b from-[#1C221F] via-[#121614] to-[#0A0D0B] rounded-b-2xl border-x border-b border-emerald-500/20 p-2 sm:p-2.5 shadow-[0_16px_35px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-[#050806] rounded-t-md border-t border-white/20" />

            {/* Backlit Keyboard Deck */}
            <div className="w-[92%] h-9 sm:h-12 rounded-lg bg-[#070A08] p-1 border border-white/[0.06] shadow-inner flex flex-col justify-between opacity-90">
              <div className="flex gap-1 h-1.5 sm:h-2 w-full">
                {Array(14).fill(0).map((_, i) => (
                  <div key={i} className="flex-1 rounded-[1.5px] bg-[#121815] border border-white/[0.06] shadow-sm" />
                ))}
              </div>
              <div className="flex gap-1 h-2 sm:h-2.5 w-full">
                {Array(14).fill(0).map((_, i) => (
                  <div key={i} className="flex-1 rounded-[1.5px] bg-[#121815] border border-white/[0.06] shadow-sm" />
                ))}
              </div>
              <div className="flex gap-1 h-2 sm:h-2.5 w-full">
                {Array(13).fill(0).map((_, i) => (
                  <div key={i} className="flex-1 rounded-[1.5px] bg-[#121815] border border-white/[0.06] shadow-sm" />
                ))}
              </div>
              <div className="flex gap-1 h-2 sm:h-2.5 w-full items-center">
                <div className="w-4 sm:w-5 h-full rounded-[1.5px] bg-[#121815] border border-white/[0.06]" />
                <div className="w-3 sm:w-4 h-full rounded-[1.5px] bg-[#121815] border border-white/[0.06]" />
                <div className="flex-1 h-full rounded-[1.5px] bg-[#17201B] border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.08)]" />
                <div className="w-3 sm:w-4 h-full rounded-[1.5px] bg-[#121815] border border-white/[0.06]" />
                <div className="w-4 sm:w-5 h-full rounded-[1.5px] bg-[#121815] border border-white/[0.06]" />
              </div>
            </div>

            {/* Glass Trackpad */}
            <div className="w-16 sm:w-22 h-3 sm:h-4 rounded bg-gradient-to-b from-[#141A17] to-[#0B0F0D] border border-white/[0.08] shadow-sm mb-0.5" />
          </motion.div>

          {/* Contact shadow */}
          <motion.div
            style={{ opacity: baseOpacity }}
            className="w-[76vw] max-w-[580px] h-5 rounded-[100%] bg-[rgba(0,0,0,0.8)] filter blur-md -mt-2 pointer-events-none"
          />
        </motion.div>

        {/* ========================================================= */}
        {/* LAYER 2: THE NEXT PAGE PORTAL (Verified Metrics & Impact) */}
        {/* Fades in seamlessly as camera zooms through 16:9 screen   */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: portalOpacity,
            scale: portalScale,
            y: portalY,
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 pointer-events-auto"
        >
          {/* Top Section Eyebrow */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[9px] sm:text-xs tracking-widest uppercase mb-2.5">
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span>Next Stage Unlocked • Verified Metrics</span>
            </div>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] uppercase tracking-tight">
              Architecting Digital Dominance
            </h3>
            <p className="mt-1 text-slate-500 text-xs sm:text-sm font-light max-w-lg">
              Enterprise engineering, AI automation, and high-velocity digital growth scaled with measurable results.
            </p>
          </div>

          {/* 3 Signature Obsidian Glass Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mb-6">
            {STATS.map((s, i) => {
              const theme = METRIC_THEMES[i % METRIC_THEMES.length];
              return (
                <div
                  key={s.label}
                  className={`rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group bg-gradient-to-br ${theme.cardBg} border border-white/[0.08] ${theme.border} shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.glow} opacity-60`}
                  />

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}
                    >
                      METRIC 0{i + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${theme.accentDot} animate-pulse`} />
                  </div>

                  <div className="mb-3">
                    <div
                      className={`text-5xl sm:text-6xl font-bold font-['Space_Grotesk'] tracking-tight ${theme.numClass}`}
                    >
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <h4 className="text-xs font-semibold tracking-wide uppercase font-mono text-white mb-1">
                      {s.label}
                    </h4>
                    <p className="text-slate-300 text-xs font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTA Button directly leading to Why SKYX */}
          <button
            onClick={scrollToNext}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F97316] to-[#0EA5E9] text-white font-mono text-xs tracking-wider uppercase font-semibold shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.55)] hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Explore Strategic Architecture</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </motion.div>

        {/* Bottom Initial Scroll Hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-4 inset-x-0 z-30 flex flex-col items-center justify-center gap-1 pointer-events-none"
        >
          <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.3em] text-orange-600 uppercase font-semibold animate-pulse">
            Scroll To Enter Next Page
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3.5 h-5 rounded-full border border-orange-300 flex items-start justify-center p-0.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-orange-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
