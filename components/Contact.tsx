'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import Scene from './3d/Scene';
import DigitalGlobe from './3d/DigitalGlobe';
import Particles from './3d/Particles';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setStatus('success');
    setFormData({ fullName: '', email: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent">
      {/* Background emerald ambient lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #059669 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Powerful Cinematic CTA Headline */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-mono text-[10px] tracking-[0.25em] uppercase mb-4 font-semibold shadow-sm"
          >
            Initiate Collaboration
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] tracking-tight text-[#1E3A5F] leading-[1.05] mb-6"
          >
            LET&apos;S ENGINEER <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] bg-clip-text text-transparent">
              Something Extraordinary.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto"
          >
            Ready to transform your digital presence? We&apos;re here to engineer your next leap in revenue, technology, and market dominance.
          </motion.p>
        </div>

        {/* 2-Column Grid: 3D Globe + Details on Left, Luxury Form on Right */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* 3D Globe Container */}
            <div className="relative h-72 rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-orange-400">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                GLOBAL DIGITAL NETWORK • HQ: KRISHNAGIRI
              </div>
              <Scene cameraPosition={[0, 0, 4.2]} fov={45}>
                <DigitalGlobe />
                <Particles count={60} size={0.03} color="#F97316" />
              </Scene>
            </div>

            {/* Coordinates Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-orange-500/60 transition-all rounded-2xl p-5 flex items-start gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center flex-shrink-0 text-orange-400 shadow-sm group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-orange-400 font-mono font-semibold">
                    Email Direct
                  </div>
                  <a
                    href="mailto:skyxdigisolutions@gmail.com"
                    className="text-white font-medium hover:text-orange-400 transition-colors block text-sm mt-0.5"
                  >
                    skyxdigisolutions@gmail.com
                  </a>
                  <p className="text-slate-400 text-xs mt-0.5">Prompt response within 24 business hours.</p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-sky-500/60 transition-all rounded-2xl p-5 flex items-start gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center flex-shrink-0 text-sky-400 shadow-sm group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-sky-400 font-mono font-semibold">
                    Call Direct
                  </div>
                  <a
                    href="tel:+917845604588"
                    className="text-white font-medium hover:text-sky-400 transition-colors block text-sm mt-0.5"
                  >
                    +91 78456 04588
                  </a>
                  <p className="text-slate-400 text-xs mt-0.5">Mon–Sat from 9:30 AM to 6:30 PM IST.</p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.08] hover:border-blue-500/60 transition-all rounded-2xl p-5 flex items-start gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-blue-400 font-mono font-semibold">
                    Agency Headquarters
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed font-normal">
                    Second Floor, Rayakottai Rd, opp. Stadium Road, Wahab Nagar,
                    Krishnagiri-635002, Tamil Nadu
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <a
                href="https://wa.me/917845604588"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] rounded-2xl p-4 flex items-center justify-between group no-underline border border-emerald-500/30 hover:border-emerald-400 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Instant WhatsApp Connect</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Direct Connection to Strategy Lead</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform font-semibold">
                  CHAT NOW →
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: High-End Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-white/[0.1] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
              {/* Top Filament */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316] via-[#0EA5E9] to-transparent" />

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white">
                    Send Us a Message
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light">
                    Fill out the form below and our strategic team will connect within 24 hours.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-semibold">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  <span>PRIORITY QUEUE</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-200 font-semibold">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-[#0B1120] border border-slate-700/80 focus:border-orange-500 focus:bg-[#0F172A] focus:shadow-[0_0_20px_rgba(249,115,22,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-200 font-semibold">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. elena@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#0B1120] border border-slate-700/80 focus:border-orange-500 focus:bg-[#0F172A] focus:shadow-[0_0_20px_rgba(249,115,22,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-200 font-semibold">
                    Capability Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full bg-[#0B1120] border border-slate-700/80 focus:border-orange-500 focus:bg-[#0F172A] focus:shadow-[0_0_20px_rgba(249,115,22,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">Select a Capability</option>
                    <option value="Digital Marketing" className="bg-slate-900 text-white">Digital Marketing & Performance Ads</option>
                    <option value="Website Development" className="bg-slate-900 text-white">High-Performance Next.js Engineering</option>
                    <option value="Mobile Application" className="bg-slate-900 text-white">Native Mobile iOS & Android Apps</option>
                    <option value="Customized Software" className="bg-slate-900 text-white">Customized Enterprise Software & Microservices</option>
                    <option value="WhatsApp API Solutions" className="bg-slate-900 text-white">WhatsApp Business API Automation</option>
                    <option value="Business Consultation" className="bg-slate-900 text-white">Digital Transformation & Tech Architecture</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-200 font-semibold">
                    Your Message <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your company, goals, or the project you'd like to collaborate on..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-[#0B1120] border border-slate-700/80 focus:border-orange-500 focus:bg-[#0F172A] focus:shadow-[0_0_20px_rgba(249,115,22,0.25)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-xs text-rose-400 font-medium font-mono">{errorMessage}</p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full justify-center py-4 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold relative overflow-hidden group flex items-center gap-2 bg-gradient-to-r from-[#F97316] to-[#0EA5E9] text-white hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_35px_rgba(249,115,22,0.6)] cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
                        Send Strategic Inquiry
                      </span>
                    )}
                  </button>
                </div>
              </form>

              {/* Success Notification */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 rounded-3xl bg-[#0B0F19]/95 border border-orange-500/40 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-8 z-20 shadow-2xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold font-['Space_Grotesk'] text-white mb-2">
                      Inquiry Transmitted
                    </h4>
                    <p className="text-slate-300 text-sm max-w-md mb-6 font-light">
                      ✦ Thank you — The SKYX executive team will analyze your requirements and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-xs px-6 py-2.5 rounded-full font-mono border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition-all font-semibold cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
