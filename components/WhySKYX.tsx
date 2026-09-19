'use client';
import { motion } from 'framer-motion';
import { WHY_SKYX } from '@/lib/constants';

const pillars3d = [
  // Creative Ideas Geometric Icon
  <svg key="bulb" viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="36" r="20" stroke="#F97316" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6"/>
    <circle cx="40" cy="36" r="10" fill="rgba(249,115,22,0.12)" stroke="#F97316" strokeWidth="1.2"/>
    <circle cx="40" cy="36" r="3" fill="#F97316"/>
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <line
        key={i}
        x1={40 + Math.cos((deg * Math.PI) / 180) * 12}
        y1={36 + Math.sin((deg * Math.PI) / 180) * 12}
        x2={40 + Math.cos((deg * Math.PI) / 180) * 18}
        y2={36 + Math.sin((deg * Math.PI) / 180) * 18}
        stroke="#10B981"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
    ))}
    <path d="M33 56 L47 56 M35 62 L45 62" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
  </svg>,

  // Smart Strategy Neural Network
  <svg key="net" viewBox="0 0 80 80" fill="none" className="w-full h-full">
    {[[40, 18], [20, 52], [60, 52], [40, 38], [26, 32], [54, 32]].map(([x, y], i) => (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={i < 3 ? 5 : 3.5}
        fill={i < 3 ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.15)'}
        stroke="#10B981"
        strokeWidth="1.2"
      />
    ))}
    {[
      [40, 18, 40, 38],
      [40, 38, 20, 52],
      [40, 38, 60, 52],
      [40, 38, 26, 32],
      [40, 38, 54, 32],
      [26, 32, 20, 52],
      [54, 32, 60, 52],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.5" />
    ))}
  </svg>,

  // Real Business Growth Architecture
  <svg key="graph" viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <polyline
      points="14,62 26,50 38,44 50,32 66,16"
      stroke="#10B981"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <polygon points="60,14 70,14 65,24" fill="#10B981" opacity="0.9" />
    <path
      d="M14,62 L26,50 L38,44 L50,32 L66,16 L66,62 Z"
      fill="url(#emeraldLuxuryGrad)"
      opacity="0.2"
    />
    <defs>
      <linearGradient id="emeraldLuxuryGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
    </defs>
    {[[14, 62], [26, 50], [38, 44], [50, 32], [66, 16]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="#10B981" />
    ))}
  </svg>,
];

const romanNumerals = ['I', 'II', 'III'];

const pillarThemes = [
  {
    // Pillar I — Orange (X arrow accent)
    badgeText: 'text-orange-400',
    badgeBorder: 'border-orange-500/35',
    badgeBg: 'bg-orange-500/15',
    hoverLine: 'via-orange-500/80',
    iconBorder: 'group-hover:border-orange-500/50',
    accentText: 'text-orange-400',
  },
  {
    // Pillar II — Sky Teal (digi solutions color)
    badgeText: 'text-sky-400',
    badgeBorder: 'border-sky-500/35',
    badgeBg: 'bg-sky-500/15',
    hoverLine: 'via-sky-400/80',
    iconBorder: 'group-hover:border-sky-500/50',
    accentText: 'text-sky-400',
  },
  {
    // Pillar III — Navy Blue
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/35',
    badgeBg: 'bg-blue-500/15',
    hoverLine: 'via-blue-500/80',
    iconBorder: 'group-hover:border-blue-500/50',
    accentText: 'text-blue-300',
  },
];

export default function WhySKYX() {
  return (
    <section id="why-skyx" className="pt-16 pb-28 relative overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm"
          >
            Core Philosophy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.1] mb-6"
          >
            Digital Growth, <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
              Engineered for Scalability.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            Creative human strategy meets advanced algorithmic technology to produce compounding business value.
            We engineer enduring market dominance for forward-thinking enterprises.
          </motion.p>
        </div>

        {/* 3 Luxury Obsidian Black Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_SKYX.map((item, i) => {
            const theme = pillarThemes[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="rounded-2xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.18)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Top ambient chromatic line */}
                <div
                  className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${theme.hoverLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div>
                  {/* Pillar Index & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`font-mono text-xs tracking-[0.2em] ${theme.accentText} uppercase px-2.5 py-1 rounded-md border ${theme.badgeBorder} ${theme.badgeBg} font-semibold`}
                    >
                      PILLAR {romanNumerals[i]}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] p-2.5 flex items-center justify-center ${theme.iconBorder} transition-colors shadow-inner`}
                    >
                      {pillars3d[i]}
                    </div>
                  </div>

                  <h3 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-white mb-4 tracking-tight group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Watermark Index */}
                <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>SKYX ARCHITECTURE</span>
                  <span className={`font-mono text-2xl font-bold ${theme.accentText} opacity-80`}>
                    0{i + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
