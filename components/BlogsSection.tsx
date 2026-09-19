'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of AI in Digital Marketing: 2026 Strategy Guide',
    category: 'AI & Marketing',
    date: 'May 12, 2024',
    readTime: '6 min read',
    excerpt:
      'Discover how artificial intelligence is revolutionizing the way brands connect with customers, automate creative variants, and optimize predictive conversion pipelines.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    link: '/future-of-ai-digital-marketing.html',
    tagColor: 'border-orange-500/30 bg-orange-500/15 text-orange-400',
  },
  {
    id: 2,
    title: '10 Actionable Tips for High-Growth Social Media Management',
    category: 'Social Media',
    date: 'May 10, 2024',
    readTime: '7 min read',
    excerpt:
      'Master algorithmic distribution with 10 proven strategies that expand your brand footprint, boost organic engagement, and multiply qualified inbound leads.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800',
    link: '/tips-social-media-management.html',
    tagColor: 'border-sky-500/30 bg-sky-500/15 text-sky-400',
  },
  {
    id: 3,
    title: 'Architecting High-Performance Next.js Web Applications',
    category: 'Web Engineering',
    date: 'May 08, 2024',
    readTime: '5 min read',
    excerpt:
      'Learn battle-tested engineering practices for building sub-second loading web applications with 100/100 Lighthouse scores and seamless responsive UX.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    link: '/high-performance-web-apps.html',
    tagColor: 'border-blue-500/30 bg-blue-500/15 text-blue-300',
  },
  {
    id: 4,
    title: 'WhatsApp Business API Automation for Enterprise Conversions',
    category: 'Automation & APIs',
    date: 'April 28, 2024',
    readTime: '8 min read',
    excerpt:
      'How modern businesses are deploying automated WhatsApp workflows, CRM integrations, and interactive chatbots to achieve 98% message open rates.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=800',
    link: '/blog.html',
    tagColor: 'border-orange-500/30 bg-orange-500/15 text-orange-400',
  },
  {
    id: 5,
    title: 'SEO & Programmatic Search Dominance for Scaling Brands',
    category: 'SEO & Search',
    date: 'April 20, 2024',
    readTime: '6 min read',
    excerpt:
      'A deep dive into semantic search optimization, technical site architecture, and content clustering designed to capture top-of-funnel commercial intent.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    link: '/blog.html',
    tagColor: 'border-sky-500/30 bg-sky-500/15 text-sky-400',
  },
  {
    id: 6,
    title: 'Distributed Cloud Architecture & Modern Microservices',
    category: 'Cloud & Tech',
    date: 'April 15, 2024',
    readTime: '9 min read',
    excerpt:
      'Designing fault-tolerant, horizontally scalable backend infrastructure using event-driven microservices, Python, and containerized cloud pipelines.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    link: '/blog.html',
    tagColor: 'border-blue-500/30 bg-blue-500/15 text-blue-300',
  },
];

export default function BlogsSection() {
  return (
    <section id="insights" className="py-32 relative overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm">
              <Sparkles className="w-3 h-3 text-orange-500" />
              Knowledge & Strategy
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.08]">
              Insights That Drive <br />
              <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
                Digital Dominance.
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base font-light max-w-md leading-relaxed">
            Explore battle-tested strategies, AI playbooks, performance benchmarks, and modern engineering blueprints directly from the SKYX team.
          </p>
        </div>

        {/* 6 Editorial Article Cards with Black Luxury Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.7 }}
            >
              {/* Entire Card is a Clickable Link directly navigating to the blog page */}
              <a
                href={post.link}
                className="rounded-2xl overflow-hidden group flex flex-col justify-between h-full bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/60 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.2)] transition-all duration-500 hover:-translate-y-2 block no-underline"
              >
                {/* Featured Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className={`font-mono text-xs px-2.5 py-1 rounded-full backdrop-blur-md border ${post.tagColor} font-semibold shadow-sm`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-300 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-orange-400 group-hover:text-orange-300 transition-colors font-semibold">
                    <span>READ FULL ARTICLE</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-orange-400" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner to All Blogs Portal with Black Theme */}
        <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg font-['Space_Grotesk']">
                Explore The Complete Knowledge Base
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm font-light">
                Discover in-depth playbooks, engineering blueprints, and growth frameworks in our library.
              </p>
            </div>
          </div>

          <a
            href="/blog.html"
            className="px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap text-white bg-gradient-to-r from-[#F97316] to-[#0EA5E9] hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)]"
          >
            <span>ALL BLOGS PORTAL</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
