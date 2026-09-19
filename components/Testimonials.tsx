'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-transparent">
      {/* Dynamic emerald ambient glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #10B981 0%, transparent 70%)',
          filter: 'blur(130px)',
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #059669 0%, transparent 70%)',
          filter: 'blur(130px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm"
          >
            Verified Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08] mb-6"
          >
            What Our Partners <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
              Say About Us.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            Real measurable impact shared by ambitious founders, directors, and enterprise executives who scale with SKYX.
          </motion.p>
        </div>

        {/* Full-Screen Testimonial Box with Obsidian Black Theme */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8 sm:p-14 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              {/* Quote Mark Accent */}
              <div className="flex items-center justify-between mb-8">
                <Quote className="w-10 h-10 text-orange-400/50" />
                <div className="flex gap-1">
                  {Array(TESTIMONIALS[idx].rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                    ))}
                </div>
              </div>

              {/* Exact Testimonial Content */}
              <p className="font-['Space_Grotesk'] text-xl sm:text-2xl lg:text-3xl text-slate-100 leading-relaxed font-normal italic mb-10">
                &ldquo;{TESTIMONIALS[idx].text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#0EA5E9] flex items-center justify-center font-bold text-base text-white font-['Space_Grotesk'] shadow-md border border-white/20">
                  {TESTIMONIALS[idx].initial}
                </div>
                <div>
                  <div className="font-semibold text-white font-['Space_Grotesk'] text-base sm:text-lg">
                    {TESTIMONIALS[idx].author}
                  </div>
                  <div className="text-orange-400 text-xs sm:text-sm font-mono tracking-wider font-semibold">
                    {TESTIMONIALS[idx].role} · {TESTIMONIALS[idx].reviews}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-orange-400 flex items-center justify-center text-slate-300 hover:text-orange-400 transition-all bg-[#0F172A]/80 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 36 : 10,
                    background: i === idx ? '#F97316' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-orange-400 flex items-center justify-center text-slate-300 hover:text-orange-400 transition-all bg-[#0F172A]/80 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
