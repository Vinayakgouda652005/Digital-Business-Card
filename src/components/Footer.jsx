import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FFFFFF] pt-20 pb-14 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Identity Info */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
              VINAYAK MANJUNATH GOUDA
            </h3>
            <div className="space-y-1 text-sm font-mono text-white/70">
              <p>
                Founder &amp; CEO — <span className="text-[#E63946]">EMSTRAP</span>
              </p>
              <p>Co-Founder — Zwapy</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase block">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="text-white/80 hover:text-[#E63946] transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('emstrap')}
                  className="text-white/80 hover:text-[#E63946] transition-colors cursor-pointer"
                >
                  EMSTRAP
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-white/80 hover:text-[#E63946] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Back to Top */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase block">
                CONNECT
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://www.linkedin.com/in/vinayak-manjunath-gouda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#E63946] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <span className="text-[#E63946]">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vinayak@emstrap.com"
                    className="text-white/80 hover:text-[#E63946] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Email</span>
                    <span className="text-[#E63946]">→</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Back to top button */}
            <div>
              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white/60 hover:text-[#E63946] transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <span className="p-1 border border-white/20 group-hover:border-[#E63946] text-[#E63946] transition-colors">
                  <ArrowUp size={12} />
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © 2026 Vinayak Manjunath Gouda. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
