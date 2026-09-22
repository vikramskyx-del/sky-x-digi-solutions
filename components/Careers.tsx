'use client';
import { motion } from 'framer-motion';
import { CAREERS } from '@/lib/constants';
import { MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { getAssetPath, handleAssetError } from '@/lib/assets';

const careerImages = [
  '/assets/human_laptop_2.jpg',
  '/assets/human_designer_laptop.jpg',
  '/assets/human_laptop_3.jpg',
];

export default function Careers() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="careers" className="py-32 relative overflow-hidden bg-transparent">
      {/* Ambient lighting */}
      <div
        className="absolute top-1/2 right-1/4 w-[700px] h-[700px] pointer-events-none opacity-10"
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
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm"
          >
            Engineering Careers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08] mb-6"
          >
            Build The Future With <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
              Elite Digital Innovators.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            We recruit exceptional engineers, strategists, and creative thinkers driven to construct transformative digital solutions.
          </motion.p>
        </div>

        {/* 3 Job Opportunity Cards with Obsidian Black Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAREERS.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="rounded-2xl overflow-hidden group flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/60 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Top Photography */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={getAssetPath(careerImages[i] || '/assets/human_laptop_1.jpg')}
                  alt={job.title}
                  onError={handleAssetError}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/35 text-orange-400 font-semibold shadow-sm">
                    {job.type}
                  </span>
                  <span className="font-mono text-xs text-white bg-white/[0.1] backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full font-semibold">0{i + 1}</span>
                </div>
              </div>

              {/* Role Information */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-slate-300 text-sm font-light mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2.5 text-slate-300 text-xs font-mono">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-300 text-xs font-mono">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-300 text-xs font-mono">
                      <DollarSign className="w-3.5 h-3.5 text-orange-400" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.04] text-orange-300 font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Link */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToContact();
                    }}
                    className="flex items-center justify-between text-xs font-mono text-orange-400 group-hover:text-orange-300 transition-colors font-semibold"
                  >
                    <span>APPLY FOR ROLE</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
