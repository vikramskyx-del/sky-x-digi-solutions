'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import { ChevronRight, CheckCircle, X, Sparkles, ArrowRight } from 'lucide-react';

const serviceImages: Record<string, string> = {
  '01': '/assets/svc_marketing.jpg',
  '02': '/assets/svc_web.jpg',
  '03': '/assets/svc_software.jpg',
  '04': '/assets/svc_whatsapp.jpg',
  '05': '/assets/svc_ai.jpg',
  '06': '/assets/svc_app.jpg',
};


const serviceThemes: Record<string, {
  badgeBorder: string;
  badgeText: string;
  badgeBg: string;
  accentHex: string;
  tagColor: string;
}> = {
  '01': {
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700',
    badgeBg: 'bg-orange-50',
    accentHex: '#F97316',
    tagColor: 'text-orange-700 border-orange-200 bg-orange-50/80 font-semibold',
  },
  '02': {
    badgeBorder: 'border-sky-300',
    badgeText: 'text-sky-700',
    badgeBg: 'bg-sky-50',
    accentHex: '#0EA5E9',
    tagColor: 'text-sky-700 border-sky-200 bg-sky-50/80 font-semibold',
  },
  '03': {
    badgeBorder: 'border-blue-300',
    badgeText: 'text-blue-900',
    badgeBg: 'bg-blue-50',
    accentHex: '#1E3A5F',
    tagColor: 'text-blue-900 border-blue-200 bg-blue-50/80 font-semibold',
  },
  '04': {
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700',
    badgeBg: 'bg-orange-50',
    accentHex: '#F97316',
    tagColor: 'text-orange-700 border-orange-200 bg-orange-50/80 font-semibold',
  },
  '05': {
    badgeBorder: 'border-sky-300',
    badgeText: 'text-sky-700',
    badgeBg: 'bg-sky-50',
    accentHex: '#0EA5E9',
    tagColor: 'text-sky-700 border-sky-200 bg-sky-50/80 font-semibold',
  },
  '06': {
    badgeBorder: 'border-blue-300',
    badgeText: 'text-blue-900',
    badgeBg: 'bg-blue-50',
    accentHex: '#1E3A5F',
    tagColor: 'text-blue-900 border-blue-200 bg-blue-50/80 font-semibold',
  },
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm"
            >
              Enterprise Capabilities
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08]"
            >
              Full-Spectrum <br />
              <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
                Digital Engineering.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-md"
          >
            From high-velocity conversion funnels to robust enterprise cloud systems, explore our 6 core capabilities built for uncompromising business growth.
          </motion.p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc, i) => {
            const theme = serviceThemes[svc.id] || serviceThemes['01'];
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                onClick={() => setSelectedService(svc)}
                className="rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between h-full relative bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/60 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Service Hero Image with Zoom Effect */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={serviceImages[svc.id] || '/assets/svc_marketing.jpg'}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

                  {/* Service Tag & Index */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className={`font-mono text-xs px-2.5 py-1 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText} font-semibold shadow-sm backdrop-blur-md`}>
                      {svc.id}
                    </span>
                    <span className="text-xl drop-shadow-md bg-white/[0.08] p-1.5 rounded-full border border-white/10">{svc.icon}</span>
                  </div>
                </div>

                {/* Service Details & Stack */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Space_Grotesk'] font-bold text-xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-light mb-6 line-clamp-3 leading-relaxed">
                      {svc.short}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {svc.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${theme.tagColor}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {svc.stack.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-400 font-semibold">
                          +{svc.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Link */}
                    <div
                      className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-orange-400 group-hover:text-orange-300 transition-colors font-semibold"
                    >
                      <span>EXPLORE CAPABILITY</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SERVICE DETAIL MODAL (Opens with Full Preserved Content) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.1] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-orange-400 tracking-widest uppercase font-semibold">
                  CAPABILITY {selectedService.id}
                </span>
                <span className="text-xl">{selectedService.icon}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white mb-4">
                {selectedService.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8">
                {selectedService.description}
              </p>

              {/* Execution Methodology */}
              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-orange-400 mb-3 font-semibold">
                  Strategic Execution Roadmap
                </h4>
                <div className="space-y-2.5">
                  {selectedService.execution.map((step) => (
                    <div
                      key={step}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3 text-sm text-slate-200 shadow-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Frameworks */}
              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-orange-400 mb-3 font-semibold">
                  Core Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-orange-500/20 text-orange-300 font-semibold shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-white font-medium text-sm">Ready to deploy this capability?</div>
                  <div className="text-slate-400 text-xs">Customized roadmap and architecture within 24 hours.</div>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedService(null);
                    scrollTo('#contact');
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 no-underline text-white bg-gradient-to-r from-[#F97316] to-[#0EA5E9] shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_28px_rgba(249,115,22,0.55)] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Initiate Project</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
