'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '@/lib/constants';

const METRIC_THEMES = [
  {
    tag: 'text-orange-400',
    border: 'hover:border-orange-500/60',
    glow: 'from-orange-500/60 via-orange-500/20 to-transparent',
    numClass: 'text-white group-hover:text-orange-400',
    cardBg: 'bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617]',
    accentDot: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]',
    badgeBg: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
  },
  {
    tag: 'text-sky-400',
    border: 'hover:border-sky-500/60',
    glow: 'from-sky-500/60 via-sky-500/20 to-transparent',
    numClass: 'text-white group-hover:text-sky-400',
    cardBg: 'bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617]',
    accentDot: 'bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.8)]',
    badgeBg: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
  },
  {
    tag: 'text-blue-400',
    border: 'hover:border-blue-500/60',
    glow: 'from-blue-600/60 via-blue-600/20 to-transparent',
    numClass: 'text-white group-hover:text-blue-400',
    cardBg: 'bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617]',
    accentDot: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]',
    badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  },
];

function StatCounter({
  value,
  suffix,
  label,
  desc,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const theme = METRIC_THEMES[index % METRIC_THEMES.length];

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 5);
      const current = Math.round(eased * value);
      if (numRef.current) numRef.current.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, value, suffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '150px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className={`rounded-2xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between h-full ${theme.cardBg} border border-white/[0.08] ${theme.border} shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:-translate-y-1.5`}
      >
        {/* Top ambient colored shimmer */}
        <div
          className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.glow} opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* Numeric Badge Index */}
        <div className="flex items-center justify-between mb-8">
          <span
            className={`font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border ${theme.badgeBg} font-semibold`}
          >
            METRIC 0{index + 1}
          </span>
          <span className={`w-2 h-2 rounded-full ${theme.accentDot} animate-pulse`} />
        </div>

        {/* Counter Value */}
        <div className="mb-4">
          <div
            className={`text-6xl sm:text-7xl font-bold font-['Space_Grotesk'] tracking-tight ${theme.numClass} transition-colors duration-500`}
          >
            <span ref={numRef}>0{suffix}</span>
          </div>
        </div>

        {/* Label & Description */}
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-white mb-1.5">
            {label}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="pt-6 sm:pt-10 pb-20 relative overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STATS.map((s, i) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              desc={s.desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
