'use client';
import { motion } from 'framer-motion';
import { JOURNEY } from '@/lib/constants';

const VisualMap: Record<string, JSX.Element> = {
  '2023': (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="60" cy="60" r="14" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.2"/>
      <circle cx="60" cy="60" r="4" fill="#10B981"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const len = 22 + (i % 2) * 8;
        const x2 = 60 + Math.cos((deg * Math.PI) / 180) * len;
        const y2 = 60 + Math.sin((deg * Math.PI) / 180) * len;
        return (
          <g key={i}>
            <line x1="60" y1="60" x2={x2} y2={y2} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4"/>
            <circle cx={x2} cy={y2} r="2" fill="#10B981" opacity="0.7"/>
          </g>
        );
      })}
      <circle cx="60" cy="60" r="32" stroke="#10B981" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.3"/>
    </svg>
  ),
  '2024': (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {[[60, 24], [28, 80], [92, 80]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="8" fill="rgba(16,185,129,0.15)" stroke="#10B981" strokeWidth="1.2"/>
          <circle cx={cx} cy={cy} r="3" fill="#10B981"/>
        </g>
      ))}
      {[[60, 24, 28, 80], [60, 24, 92, 80], [28, 80, 92, 80]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4"/>
      ))}
      <circle cx="60" cy="55" r="3" fill="#10B981" opacity="0.8"/>
    </svg>
  ),
  '2025': (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {[0, 1].map((i) => {
        const s = 24 + i * 16;
        const rot = i * 45;
        const pts = [0, 1, 2, 3].map((j) => {
          const a = (j / 4) * Math.PI * 2 + (rot * Math.PI) / 180;
          return [60 + Math.cos(a) * s, 60 + Math.sin(a) * s];
        });
        return (
          <polygon
            key={i}
            points={pts.map((p) => p.join(',')).join(' ')}
            fill="rgba(52,211,153,0.06)"
            stroke="#34D399"
            strokeWidth="1"
            strokeDasharray={i > 0 ? '3 2' : 'none'}
            strokeOpacity="0.5"
          />
        );
      })}
      <circle cx="60" cy="60" r="5" fill="#34D399" opacity="0.9"/>
    </svg>
  ),
  '2026': (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {[[60, 60], [35, 45], [85, 45], [35, 75], [85, 75]].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i === 0 ? 8 : 4}
          fill={i === 0 ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.15)'}
          stroke="#10B981"
          strokeWidth={i === 0 ? 1.5 : 0.8}
        />
      ))}
      {[
        [60, 60, 35, 45],
        [60, 60, 85, 45],
        [60, 60, 35, 75],
        [60, 60, 85, 75],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4"/>
      ))}
      <circle cx="60" cy="60" r="2" fill="#10B981"/>
    </svg>
  ),
};

const yearThemes: Record<string, {
  accentHex: string;
  dotBg: string;
  borderGlow: string;
  textClass: string;
  bulletBg: string;
}> = {
  '2023': {
    accentHex: '#F97316',
    dotBg: 'bg-orange-500',
    borderGlow: 'rgba(249,115,22,0.45)',
    textClass: 'text-orange-600',
    bulletBg: 'bg-orange-500',
  },
  '2024': {
    accentHex: '#0EA5E9',
    dotBg: 'bg-sky-500',
    borderGlow: 'rgba(14,165,233,0.45)',
    textClass: 'text-sky-600',
    bulletBg: 'bg-sky-500',
  },
  '2025': {
    accentHex: '#1E3A5F',
    dotBg: 'bg-[#1E3A5F]',
    borderGlow: 'rgba(30,58,95,0.40)',
    textClass: 'text-[#1E3A5F]',
    bulletBg: 'bg-blue-700',
  },
  '2026': {
    accentHex: '#F97316',
    dotBg: 'bg-orange-500',
    borderGlow: 'rgba(249,115,22,0.45)',
    textClass: 'text-orange-600',
    bulletBg: 'bg-orange-500',
  },
};

export default function Journey() {
  return (
    <section id="journey" className="py-32 relative overflow-hidden bg-transparent">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-300 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold"
          >
            Evolution & Legacy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08] mb-6"
          >
            Milestones That <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
              Define Our Trajectory.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            From a focused vision in Krishnagiri to a multi-disciplinary technology powerhouse — the defining chapters of SKYX Digi Solutions.
          </motion.p>
        </div>

        {/* Timeline Center Filament */}
        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] hidden md:block"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #059669 15%, #10B981 45%, #34D399 75%, #059669 90%, transparent)',
            }}
          />

          <div className="space-y-24">
            {JOURNEY.map((item, i) => {
              const theme = yearThemes[item.year] || yearThemes['2023'];
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`relative flex items-center gap-12 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1">
                    <div className="rounded-2xl p-8 sm:p-10 relative overflow-hidden group bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.18)] transition-all duration-500 hover:-translate-y-2">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="font-bold text-4xl sm:text-5xl font-['Space_Grotesk']"
                          style={{ color: theme.accentHex }}
                        >
                          {item.year}
                        </div>
                        <span className={`font-mono text-[10px] ${theme.textClass} tracking-widest uppercase px-2.5 py-1 rounded bg-white/[0.06] border border-white/10 font-semibold backdrop-blur-md`}>
                          {item.subtitle}
                        </span>
                      </div>

                      <h3 className="font-['Space_Grotesk'] font-bold text-xl text-white mb-4 tracking-tight group-hover:text-orange-400 transition-colors">
                        {item.title}
                      </h3>

                      <ul className="space-y-2.5">
                        {item.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-3 text-slate-300 text-sm font-light">
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.bulletBg} mt-1.5 flex-shrink-0`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Glowing Marker */}
                  <div className="hidden md:flex flex-shrink-0 flex-col items-center">
                    <div
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center z-10 shadow-md"
                      style={{
                        border: `1.5px solid ${theme.accentHex}`,
                        boxShadow: `0 0 20px ${theme.borderGlow}`,
                      }}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${theme.dotBg}`} />
                    </div>
                  </div>

                  {/* 3D Visual Ornament */}
                  <div className="flex-1 hidden md:flex items-center justify-center">
                    <div className="w-44 h-44 relative flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full opacity-20"
                        style={{
                          background: `radial-gradient(circle, ${theme.accentHex} 0%, transparent 70%)`,
                          filter: 'blur(25px)',
                        }}
                      />
                      <div className="relative z-10 w-full h-full p-6">
                        {VisualMap[item.year]}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
