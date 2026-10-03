import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Terminal, Lightbulb, Compass } from 'lucide-react';

export function About() {
  const containerRef = useRef(null);
  const [activeBlock, setActiveBlock] = useState(null);

  // Scroll progress for vertical red line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const blocks = [
    {
      id: 1,
      title: 'ENTREPRENEUR',
      icon: Compass,
      desc: 'Building companies and exploring ideas that solve real-world problems.',
    },
    {
      id: 2,
      title: 'DEVELOPER',
      icon: Terminal,
      desc: 'Interested in software development, AI and building practical digital products.',
    },
    {
      id: 3,
      title: 'BUILDER',
      icon: Lightbulb,
      desc: 'Turning ideas into working products through technology and experimentation.',
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 bg-[#FFFFFF] border-t border-[#111111]/10 overflow-hidden"
    >
      {/* Scroll Growing Vertical Red Line */}
      <div className="absolute left-6 sm:left-12 lg:left-24 top-0 bottom-0 w-[1px] bg-[#111111]/10 pointer-events-none">
        <motion.div
          style={{ height: lineHeight }}
          className="w-[2px] -ml-[0.5px] bg-[#E63946] origin-top"
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-24">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#111111] uppercase">
            ABOUT
          </span>
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </motion.div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Space_Grotesk'] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[0.98]"
            >
              WHO IS <br />
              VINAYAK<span className="text-[#E63946]">?</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-[#111111]/80 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
            >
              <p>
                Vinayak Manjunath Gouda is an entrepreneur, Founder &amp; CEO of{' '}
                <strong className="text-[#111111] font-semibold">EMSTRAP</strong>, and Co-Founder of{' '}
                <strong className="text-[#111111] font-semibold">Zwapy</strong>, passionate about
                building technology-driven products and innovative solutions that address
                real-world challenges.
              </p>
              <p className="text-sm sm:text-base text-[#111111]/70">
                His interests span software development, artificial intelligence, product building
                and startup innovation.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Three Interactive Identity Blocks */}
          <div className="lg:col-span-6 space-y-3 pt-2">
            {blocks.map((block, index) => {
              const Icon = block.icon;
              const isHovered = activeBlock === block.id;

              return (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onMouseEnter={() => setActiveBlock(block.id)}
                  onMouseLeave={() => setActiveBlock(null)}
                  onClick={() => setActiveBlock(isHovered ? null : block.id)}
                  className={`group relative p-6 border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'border-[#111111] bg-[#111111] text-[#FFFFFF] shadow-lg translate-x-1'
                      : 'border-[#111111]/15 bg-[#FFFFFF] text-[#111111] hover:border-[#111111]/50'
                  }`}
                >
                  {/* Title & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold tracking-tight">
                      {block.title}
                    </h3>
                    <div
                      className={`p-1.5 transition-colors ${
                        isHovered ? 'text-[#E63946]' : 'text-[#111111]/40'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed transition-colors ${
                      isHovered ? 'text-white/80' : 'text-[#111111]/70'
                    }`}
                  >
                    {block.desc}
                  </p>

                  {/* Left Accent indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#E63946] transition-opacity duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
