'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getAssetPath, handleAssetError } from '@/lib/assets';

const SHOWCASE_ITEMS = [
  {
    id: '01',
    category: 'Enterprise Digital Marketing',
    title: 'Meta Ads & Omnichannel Performance Engine',
    subtitle: 'ROAS Compaction · 4.8× Multiplier',
    desc: 'Full-funnel automated marketing system synchronizing programmatic PPC, predictive lookalike cohorts, and high-converting creative variants.',
    image: '/assets/portfolio_01.jpg',
    tag: 'AI Marketing',
  },
  {
    id: '02',
    category: 'Next.js Web Platforms',
    title: 'High-Performance Flagship Architectures',
    subtitle: '100/100 Lighthouse · Sub-Second FCP',
    desc: 'Engineered with React 18, Next.js App Router, and headless CMS integrations designed for flawless conversions and global distribution.',
    image: '/assets/portfolio_web.jpg',
    tag: 'Web Engineering',
  },
  {
    id: '03',
    category: 'Mobile Applications',
    title: 'Native iOS & Android Production Systems',
    subtitle: 'Cross-Platform React Native & Swift',
    desc: 'Ultra-smooth native mobile applications with offline synchronization, zero-latency push notifications, and high user retention.',
    image: '/assets/portfolio_app.jpg',
    tag: 'Mobile Apps',
  },
  {
    id: '04',
    category: 'Customized Software & APIs',
    title: 'Distributed Enterprise Microservices',
    subtitle: 'Python, Java & Event-Driven Cloud Systems',
    desc: 'Scalable cloud-native enterprise backend architectures with continuous deployment pipelines and real-time database synchronization.',
    image: '/assets/portfolio_02.jpg',
    tag: 'SaaS Software',
  },
];

export default function CapabilitiesGallery() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="work" className="py-32 relative overflow-hidden bg-transparent">
      {/* Ambient background glow system */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[650px] h-[650px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #059669 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm">
              Featured Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08]">
              Architectural Works & <br />
              <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
                Digital Deployments.
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            A curated selection of high-impact platforms, automated ecosystems, and high-performance digital products crafted for market leaders.
          </p>
        </div>

        {/* 2x2 Showcase Grid with Obsidian Black Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SHOWCASE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="rounded-2xl overflow-hidden group flex flex-col justify-between bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/60 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Showcase Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-950">
                <img
                  src={getAssetPath(item.image)}
                  alt={item.title}
                  onError={handleAssetError}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/35 text-orange-400 font-semibold shadow-sm">
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs text-white bg-white/[0.1] backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full font-semibold">0{i + 1}</span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-8">
                <div className="font-mono text-xs text-orange-400 tracking-wider uppercase mb-2 font-semibold">
                  {item.category}
                </div>
                <h3 className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-sky-400 mb-4 font-semibold">{item.subtitle}</div>
                <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                  {item.desc}
                </p>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 group-hover:text-orange-300 transition-colors font-semibold"
                >
                  <span>REQUEST CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
