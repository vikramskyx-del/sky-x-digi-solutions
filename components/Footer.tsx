'use client';
import { Mail, Phone, MapPin, ArrowUp, MessageSquare } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-50 pt-24 pb-12 overflow-hidden select-none border-t border-slate-200">
      {/* SKYX Brand Top Hairline — Orange (X arrow) to Teal (digi solutions) */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316] via-[#FB923C] via-[#0EA5E9] to-transparent" />

      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Col 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <img
                src="/assets/skyx-logo.png"
                alt="SKYX Digi Solutions"
                className="h-10 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 1px 6px rgba(5,150,105,0.2))' }}
              />
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-light">
              Empowering ambitious businesses with cutting-edge digital solutions. We combine strategic engineering, data intelligence, and bespoke design to drive exponential growth.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                className="px-4 py-2 rounded-full text-xs font-mono inline-flex items-center gap-2 border border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                <span>Initiate Consultation</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#1E3A5F] font-semibold mb-5">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Hardware Experience', href: '#experience' },
                { label: 'Verified Metrics', href: '#stats' },
                { label: 'Architecture', href: '#why-skyx' },
                { label: 'Capabilities', href: '#services' },
                { label: 'Portfolio', href: '#work' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="text-slate-500 hover:text-[#F97316] transition-colors text-xs font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Index (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#1E3A5F] font-semibold mb-5">
              Capabilities
            </h5>
            <ul className="space-y-3">
              {[
                'Digital Marketing & Meta Ads',
                'High-Performance Web Engineering',
                'Mobile iOS & Android Apps',
                'Custom Software & Microservices',
                'WhatsApp Business API Automation',
                'Cloud Architecture & Consulting',
              ].map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#services');
                    }}
                    className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-xs font-light block"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#1E3A5F] font-semibold mb-5">
              Krishnagiri HQ
            </h5>

            <div className="space-y-3 text-xs text-slate-500 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Second Floor, Rayakottai Rd, opp. Stadium Road, Wahab Nagar,
                  Krishnagiri-635002, Tamil Nadu, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:skyxdigisolutions@gmail.com"
                  className="hover:text-emerald-400 transition-colors"
                >
                  skyxdigisolutions@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+917845604588" className="hover:text-emerald-400 transition-colors">
                  +91 78456 04588
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 SKYX Digi Solutions. Engineered for Global Digital Dominance.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
