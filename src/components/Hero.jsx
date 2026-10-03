import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, Check } from 'lucide-react';
import { downloadVCard } from '../utils/vcard.js';
import { removeCheckerboardBackground } from '../utils/removeCheckerboard.js';

export function Hero({ onExploreClick }) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // Mouse parallax state (desktop only: 5–8px max on image, 2–4px max on typography)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  // VCF download state
  const [vcfState, setVcfState] = useState('idle');

  // Exact Hero photograph state - default to real image in dedicated folder
  const [rawPhotoUrl, setRawPhotoUrl] = useState('/vinayak_raw_photo/vinayak_raw_photo.png');
  const [cutoutPhotoUrl, setCutoutPhotoUrl] = useState('/vinayak_raw_photo/vinayak_raw_photo.png');
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    // 1. Check local storage for previously processed cutout
    const cachedCutout = localStorage.getItem('vinayak_cutout_photo');
    const cachedRaw = localStorage.getItem('vinayak_raw_photo');

    if (cachedCutout) {
      setCutoutPhotoUrl(cachedCutout);
    }
    if (cachedRaw) {
      setRawPhotoUrl(cachedRaw);
    }

    // 2. Try loading candidate photographs from the dedicated /vinayak_raw_photo folder
    const candidatePaths = [
      '/vinayak_raw_photo/vinayak_raw_photo.png',
      '/vinayak_raw_photo/vinayak_raw_photo.png',
      '/vinayak_raw_photo/vinayak_raw_photo.png',
      '/vinayak_raw_photo/vinayak_raw_photo.webp',
      '/vinayak_raw_photo/photo.png',
      '/vinayak_raw_photo/photo.jpg',
      '/Gemini_Generated_Image_5oiovk5oiovk5oio.png',
      '/vinayak_raw_photo/vinayak_raw_photo.svg',
    ];

    const tryLoadImage = (index) => {
      if (index >= candidatePaths.length) return;
      const testImg = new Image();
      testImg.src = candidatePaths[index];
      testImg.onload = () => {
        setRawPhotoUrl(testImg.src);
        try {
          if (candidatePaths[index].endsWith('.svg')) {
            setCutoutPhotoUrl(testImg.src);
          } else {
            const cleaned = removeCheckerboardBackground(testImg);
            setCutoutPhotoUrl(cleaned);
            localStorage.setItem('vinayak_cutout_photo', cleaned);
          }
        } catch {
          setCutoutPhotoUrl(testImg.src);
        }
      };
      testImg.onerror = () => {
        tryLoadImage(index + 1);
      };
    };

    tryLoadImage(0);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Mouse move handler for subtle parallax (5-8px maximum for photo, 2-4px for typography)
  const handleMouseMove = (e) => {
    if (!isDesktop || prefersReduced) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const normY = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x: normX, y: normY });
  };

  // Scroll parallax for mobile/touch
  const { scrollY } = useScroll();
  const mobilePhotoY = useTransform(scrollY, [0, 500], [0, 60]);

  // VCF handler
  const handleSaveContact = async () => {
    if (vcfState !== 'idle') return;
    setVcfState('loading');
    await downloadVCard();
    setVcfState('saved');
    setTimeout(() => {
      setVcfState('idle');
    }, 3000);
  };

  // Process image file: extracts and cleans checkerboard background while preserving the exact person
  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result;
      setRawPhotoUrl(dataUri);
      localStorage.setItem('vinayak_raw_photo', dataUri);

      const img = new Image();
      img.onload = () => {
        try {
          const transparentDataUri = removeCheckerboardBackground(img);
          setCutoutPhotoUrl(transparentDataUri);
          localStorage.setItem('vinayak_cutout_photo', transparentDataUri);
        } catch {
          setCutoutPhotoUrl(dataUri);
        }
      };
      img.onerror = () => {
        setCutoutPhotoUrl(dataUri);
      };
      img.src = dataUri;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Active display image: clean cutout with transparent background
  const activeImage = cutoutPhotoUrl || rawPhotoUrl;

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 md:pt-32 md:pb-24 flex flex-col justify-between overflow-hidden bg-[#FFFFFF]"
    >
      {/* Background Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 relative flex justify-between">
          <div className="w-[1px] h-full bg-[#111111]/[0.04]" />
          <div className="w-[1px] h-full bg-[#111111]/[0.04] hidden sm:block" />
          <div className="w-[1px] h-full bg-[#111111]/[0.04] hidden md:block" />
          <div className="w-[1px] h-full bg-[#111111]/[0.04]" />
        </div>
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-[#111111]/[0.04]" />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end min-h-[580px] lg:min-h-[680px]">
          
          {/* Left Column: Large Editorial Typography (Strictly on the LEFT) */}
          <motion.div
            style={
              isDesktop && !prefersReduced
                ? {
                    x: mousePos.x * -2.5, // 2-4px max
                    y: mousePos.y * -1.8,
                  }
                : {}
            }
            className="lg:col-span-7 flex flex-col justify-end pt-4 pb-2 z-20"
          >
            {/* Editorial Top Marker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-[1.5px] bg-[#E63946]" />
              <p className="text-xs font-mono font-medium tracking-[0.25em] text-[#111111] uppercase">
                ENTREPRENEUR &nbsp;|&nbsp; DEVELOPER &nbsp;|&nbsp; BUILDER
              </p>
            </motion.div>

            {/* Giant Staggered Name: VINAYAK -> MANJUNATH -> GOUDA */}
            <div className="space-y-1 mb-8">
              {/* Line 1: VINAYAK */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-['Space_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.2rem] font-bold text-[#111111] tracking-[-0.04em] leading-[0.92]"
                >
                  VINAYAK
                </motion.h1>
              </div>

              {/* Line 2: MANJUNATH */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-['Space_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.2rem] font-bold text-[#111111] tracking-[-0.04em] leading-[0.92]"
                >
                  MANJUNATH
                </motion.h1>
              </div>

              {/* Line 3: GOUDA */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-['Space_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.2rem] font-bold text-[#111111] tracking-[-0.04em] leading-[0.92]"
                >
                  GOUDA
                </motion.h1>
              </div>
            </div>

            {/* Roles & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="space-y-4 max-w-xl"
            >
              <div className="space-y-1.5 border-l-2 border-[#111111] pl-4">
                <div className="text-base sm:text-lg font-['Space_Grotesk'] font-semibold text-[#111111] tracking-tight">
                  Founder &amp; CEO — <span className="text-[#E63946]">EMSTRAP</span>
                </div>
                <div className="text-sm sm:text-base font-['Space_Grotesk'] font-medium text-[#111111]/80">
                  Co-Founder — Zwapy
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#111111]/70 leading-relaxed font-normal pt-1">
                Building technology-driven products for real-world problems.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {/* Save Contact Button */}
                <button
                  onClick={handleSaveContact}
                  disabled={vcfState !== 'idle'}
                  className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#E63946] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-80"
                >
                  {vcfState === 'idle' && (
                    <>
                      <span>SAVE CONTACT</span>
                      <span className="text-[#FFFFFF] transform group-hover:translate-y-0.5 transition-transform">
                        ↓
                      </span>
                    </>
                  )}
                  {vcfState === 'loading' && (
                    <>
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white animate-spin" />
                      <span>CREATING CONTACT...</span>
                    </>
                  )}
                  {vcfState === 'saved' && (
                    <>
                      <Check size={14} className="text-white" />
                      <span>✓ CONTACT SAVED</span>
                    </>
                  )}
                </button>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/vinayak-manjunath-gouda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#111111] text-[#111111] text-xs font-semibold tracking-[0.15em] uppercase hover:border-[#E63946] hover:text-[#E63946] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>LINKEDIN</span>
                  <span className="text-[#E63946] transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Exact Hero Photograph (Large, Prominent, on RIGHT) */}
          <div className="lg:col-span-5 relative flex flex-col justify-end items-center lg:items-end z-10 mt-8 lg:mt-0">
            {/* Fine architectural backdrop line */}
            <div className="absolute right-0 bottom-0 w-full h-[90%] border-r border-[#111111]/10 pointer-events-none hidden lg:block" />
            <div className="absolute -left-6 bottom-20 w-8 h-[1px] bg-[#E63946] pointer-events-none hidden lg:block" />

            {/* Rising Photo Container */}
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.3,
                type: 'spring',
                stiffness: 90,
                damping: 20,
              }}
              style={
                isDesktop && !prefersReduced
                  ? {
                      x: mousePos.x * 6.5, // 5-8px maximum subtle parallax
                      y: mousePos.y * 5.5,
                    }
                  : { y: mobilePhotoY }
              }
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] xl:max-w-[540px] flex flex-col items-center transition-all ${
                dragOver ? 'ring-2 ring-[#E63946] bg-black/[0.02]' : ''
              }`}
            >
              {/* Photo Area: Large, prominent real photograph */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] flex items-end justify-center select-none overflow-visible">
                <img
                  src={activeImage || '/vinayak_raw_photo/vinayak_raw_photo.jpg'}
                  alt="Vinayak Manjunath Gouda"
                  className="w-full h-auto max-h-[105%] object-contain object-bottom drop-shadow-md select-none transform translate-y-2 pointer-events-none rounded-sm"
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-8 relative z-10 flex items-center justify-center border-t border-[#111111]/10">
        <button
          onClick={onExploreClick}
          className="group inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.2em] text-[#111111] hover:text-[#E63946] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[#E63946] inline-block"
          >
            <ArrowDown size={14} />
          </motion.span>
        </button>
      </div>
    </section>
  );
}
