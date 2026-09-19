'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare, ShieldCheck, Zap, Layers } from 'lucide-react';
import Scene from './3d/Scene';
import AbstractSphere from './3d/AbstractSphere';
import Particles from './3d/Particles';

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Gradients & Cyber Glow */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div className="absolute inset-0 hero-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column: Headlines & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-6 w-fit backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              Top Digital Marketing Agency
            </motion.div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold font-['Space_Grotesk'] tracking-tight text-white leading-[1.08] mb-4">
              Empowering <br />
              <span className="gradient-text">Digital Growth.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light mb-8">
              We’re not a typical agency. We build growth-focused digital strategies powered
              by AI, creativity, data, and human insight. From branding to performance
              marketing, we help ambitious businesses scale faster with measurable results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                className="skyx-btn-primary group !bg-gradient-to-r !from-emerald-500 !to-sky-500 !text-slate-950 !border-emerald-400 font-semibold"
              >
                <span>Let&apos;s Grow Your Brand</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                className="skyx-btn-ghost group !border-emerald-500/30 !text-emerald-300"
              >
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>Book Free Consultation</span>
              </a>
            </div>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-3 gap-3 max-w-lg pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Data-Driven ROI</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Zap className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>AI Automation</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Full-Stack Tech</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Ecosystem Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative h-[420px] sm:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            {/* 3D Scene */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <Scene cameraPosition={[0, 0, 4.5]} fov={48}>
                <AbstractSphere />
                <Particles count={130} size={0.04} color="#00d4ff" radius={4.5} />
              </Scene>
            </div>

            {/* Floating Glass Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 -left-4 sm:left-4 z-20 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(0,212,255,0.15)] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-white/40">Technology</div>
                <div className="text-xs font-bold text-white">AI-Powered Systems</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-12 -right-2 sm:right-4 z-20 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-violet-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(124,58,237,0.15)] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-white/40">Growth Impact</div>
                <div className="text-xs font-bold text-white">100% Measurable ROI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
