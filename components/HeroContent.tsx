'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp, Globe } from 'lucide-react';

interface HeroContentProps {
  isEmbedded?: boolean;
}

export default function HeroContent({ isEmbedded = false }: HeroContentProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between select-none ${isEmbedded ? 'p-4 sm:p-6 lg:p-8 max-w-3xl' : 'pt-32 pb-20 px-6 max-w-7xl mx-auto'}`}>
      
      {/* Top Telemetry Bar */}
      <div className={`flex items-center justify-between border-b border-slate-200 ${isEmbedded ? 'pb-2.5 mb-4' : 'pb-4 mb-8'}`}>
        <div className="flex items-center gap-3">
          {/* Orange badge matching X arrow in logo */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[10px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
            Elite Digital Engineering Agency
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400 tracking-wider">
            KRISHNAGIRI HQ → GLOBAL REACH
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] text-slate-400">
          <span className="flex items-center gap-1.5">
            {/* Teal dot matching digi solutions color */}
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span className="text-sky-600 font-semibold">AI ENGINE ACTIVE</span>
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-400">STATUS: 99.98% OPTIMAL</span>
        </div>
      </div>

      {/* Main Hero Typography */}
      <div className="max-w-4xl">
        {/* Navy label line (SKYX text color) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`font-mono text-xs uppercase tracking-[0.3em] text-[#1E3A5F] flex items-center gap-2 font-semibold ${isEmbedded ? 'mb-2' : 'mb-4'}`}
        >
          <span className="w-6 h-px bg-[#F97316]/70" />
          <span>High-Performance Digital Architecture</span>
        </motion.div>

        {/* Heading: navy for "Architecting", orange→teal gradient for "Digital Dominance." */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className={`${
            isEmbedded
              ? 'text-2xl sm:text-4xl lg:text-5xl mb-3'
              : 'text-4xl sm:text-6xl lg:text-7xl mb-6'
          } font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08]`}
        >
          Architecting <br />
          <span className="font-normal italic bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
            Digital Dominance.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-slate-500 font-light ${
            isEmbedded
              ? 'text-xs sm:text-sm leading-relaxed max-w-xl mb-5'
              : 'text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-10'
          }`}
        >
          We engineer bespoke digital systems, scalable cloud applications, and AI-powered performance marketing that transform growing brands into undisputed market leaders with measurable, high-velocity revenue.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          {/* Primary: Orange CTA (logo X arrow color) */}
          <a
            href="#experience"
            onClick={(e) => { e.preventDefault(); scrollTo('#experience'); }}
            className="px-8 py-4 rounded-full inline-flex items-center gap-3 text-xs font-mono uppercase tracking-wider font-semibold group no-underline text-white bg-gradient-to-r from-[#F97316] to-[#FB923C] shadow-[0_4px_24px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_32px_rgba(249,115,22,0.55)] hover:scale-105 transition-all duration-300"
          >
            <span>Explore 3D Hardware Screen</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Secondary: Dark Obsidian box */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="px-8 py-4 rounded-full inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider font-semibold group no-underline border border-white/[0.1] bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] text-white hover:border-orange-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#0EA5E9] group-hover:rotate-12 transition-transform" />
            <span>Consult Architects</span>
          </a>
        </motion.div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-200 bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] p-2.5 rounded-xl border border-white/[0.08] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#F97316] flex-shrink-0" />
            <span>High-Velocity ROI</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200 bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] p-2.5 rounded-xl border border-white/[0.08] shadow-sm">
            <Zap className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
            <span>AI-Driven Strategy</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200 bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] p-2.5 rounded-xl border border-white/[0.08] shadow-sm">
            <TrendingUp className="w-4 h-4 text-[#F97316] flex-shrink-0" />
            <span>Scaled Performance</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-200 bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] p-2.5 rounded-xl border border-white/[0.08] shadow-sm">
            <Globe className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
            <span>Enterprise Quality</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isEmbedded && (
        <div className="pt-12 pb-2 flex items-center justify-center">
          <a
            href="#experience"
            onClick={(e) => { e.preventDefault(); scrollTo('#experience'); }}
            className="inline-flex flex-col items-center gap-2 group cursor-pointer text-[#F97316] hover:text-[#1E3A5F] transition-colors"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400 group-hover:text-[#F97316] transition-colors">
              Scroll To Enter Hardware Experience
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-orange-300 flex items-start justify-center p-1 shadow-sm"
            >
              <div className="w-1 h-2 rounded-full bg-[#F97316]" />
            </motion.div>
          </a>
        </div>
      )}
    </div>
  );
}
