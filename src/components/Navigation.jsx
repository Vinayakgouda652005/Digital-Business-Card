import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X } from 'lucide-react';

export function Navigation({ onSaveContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'emstrap', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#111111]/10 py-4 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-2 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E63946]"
            aria-label="Vinayak Home"
          >
            <span className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold tracking-tight text-[#111111] group-hover:text-[#E63946] transition-colors">
              VINAYAK
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {[
              { id: 'about', label: 'ABOUT' },
              { id: 'emstrap', label: 'EMSTRAP' },
              { id: 'contact', label: 'CONTACT' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative text-xs tracking-[0.2em] font-medium text-[#111111] hover:text-[#E63946] transition-colors py-1 cursor-pointer focus:outline-none"
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#111111] hover:text-[#E63946] transition-colors px-3 py-2 border border-[#111111]/20 hover:border-[#E63946] cursor-pointer"
            >
              <span>LET'S CONNECT</span>
              <span className="text-[#E63946] transform group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#111111] hover:text-[#E63946] py-2 px-3 border border-[#111111]/20 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            {mobileMenuOpen ? <X size={14} className="text-[#E63946]" /> : <MenuIcon size={14} />}
          </button>
        </div>
      </header>

      {/* Mobile Animated Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#FFFFFF] pt-24 px-8 pb-10 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-8 mt-6">
              <div className="flex flex-col space-y-6">
                {[
                  { id: 'hero', label: 'HOME' },
                  { id: 'about', label: 'ABOUT' },
                  { id: 'emstrap', label: 'EMSTRAP' },
                  { id: 'contact', label: 'CONTACT' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center justify-between text-left group cursor-pointer py-1"
                  >
                    <span className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#E63946] transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-[#111111]/10">
              <button
                onClick={() => scrollTo('contact')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-widest uppercase hover:bg-[#E63946] transition-colors cursor-pointer"
              >
                <span>LET'S CONNECT</span>
                <span>→</span>
              </button>

              {onSaveContact && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSaveContact();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-[#111111] text-[#111111] text-xs font-semibold tracking-widest uppercase hover:border-[#E63946] hover:text-[#E63946] transition-colors cursor-pointer"
                >
                  <span>SAVE CONTACT ↓</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
