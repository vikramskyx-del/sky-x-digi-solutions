'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { getAssetPath, handleAssetError } from '@/lib/assets';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-3 sm:py-4 px-4 sm:px-8 pointer-events-none">
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 pointer-events-auto px-5 sm:px-7 py-2.5 flex items-center justify-between ${
            scrolled
              ? 'bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
              : 'bg-[#0B0F19]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* SKYX Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center group no-underline transition-all duration-300 py-1"
            aria-label="SKYX Digi Solutions - Home"
          >
            <img
              src={getAssetPath('/assets/skyx-logo.png')}
              alt="SKYX Digi Solutions"
              onError={handleAssetError}
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(249,115,22,0.35))' }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase font-mono text-slate-300 hover:text-orange-400 transition-colors rounded-full hover:bg-white/[0.08]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button — Orange gradient matching logo arrow */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="relative px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 no-underline group text-white bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#0EA5E9] shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_28px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-3 h-3 text-white group-hover:rotate-12 transition-transform" />
              <span>Book Consultation</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-slate-200 hover:text-[#F97316]"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-[#F97316]" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40 pt-24 pb-8 px-6 bg-[#0B0F19]/98 backdrop-blur-3xl border-b border-white/[0.12] shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2.5 px-4 text-sm font-mono text-slate-200 hover:text-orange-400 hover:bg-white/[0.08] rounded-lg transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 mt-2">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                  className="w-full py-3 rounded-full text-center text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#F97316] to-[#0EA5E9] shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Initiate Consultation</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
