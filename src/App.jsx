import React, { useState, useCallback } from 'react';
import { WelcomeIntro } from './components/WelcomeIntro.jsx';
import { Navigation } from './components/Navigation.jsx';
import { Hero } from './components/Hero.jsx';
import { About } from './components/About.jsx';
import { Emstrap } from './components/Emstrap.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { downloadVCard } from './utils/vcard.js';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const handleScrollToExplore = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      const top = aboutEl.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSaveContactFromNav = async () => {
    await downloadVCard();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] selection:bg-[#E63946] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 06 — OPENING EXPERIENCE: Quick ~1s Welcome Screen */}
      <WelcomeIntro onComplete={handleIntroComplete} />

      {/* 05 — HEADER / NAVIGATION */}
      <Navigation onSaveContact={handleSaveContactFromNav} />

      <main>
        {/* 07, 08, 09, 10 — HERO SECTION with Real Photograph integration & Parallax */}
        <Hero onExploreClick={handleScrollToExplore} />

        {/* 11, 12 — ABOUT SECTION (No photo, 3 interactive identity blocks, growing red line) */}
        <About />

        {/* 13, 14, 15, 16 — EMSTRAP SECTION (Interactive 4-node dispatch network) */}
        <Emstrap />

        {/* 17, 18, 19 — CONTACT SECTION (Clean interactive rows, VCF generation) */}
        <Contact />
      </main>

      {/* 20 — FOOTER (Black #111111, White #FFFFFF, Red #E63946, Back to Top) */}
      <Footer />
    </div>
  );
}
