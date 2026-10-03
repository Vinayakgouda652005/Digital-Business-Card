import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldAlert, HeartPulse, UserCheck } from 'lucide-react';

export function Emstrap() {
  const [activeNodeId, setActiveNodeId] = useState('citizen');

  const nodes = [
    {
      id: 'citizen',
      label: 'CITIZEN',
      description: 'Triggers emergency assistance.',
      icon: UserCheck,
    },
    {
      id: 'ambulance',
      label: 'AMBULANCE',
      description: 'Receives and responds to emergency requests.',
      icon: Activity,
    },
    {
      id: 'hospital',
      label: 'HOSPITAL',
      description: 'Receives patient and emergency information.',
      icon: HeartPulse,
    },
    {
      id: 'responder',
      label: 'RESPONDER',
      description: 'Coordinates emergency response.',
      icon: ShieldAlert,
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <section
      id="emstrap"
      className="relative py-24 sm:py-32 md:py-40 bg-[#FFFFFF] border-t border-[#111111]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Marker */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#111111] uppercase">
            EMSTRAP
          </span>
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </motion.div>

        {/* Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Platform Overview, 3 Statements */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-['Space_Grotesk'] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95]"
              >
                <span className="text-[#111111] block">BUILDING</span>
                <span className="text-[#E63946] block">EMSTRAP</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="font-['Space_Grotesk'] text-base sm:text-lg font-medium text-[#111111] pt-2"
              >
                Emergency Medical Smart Transport &amp; Response Platform
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-lg text-[#111111]/75 leading-relaxed max-w-lg font-normal"
            >
              EMSTRAP is an AI-powered emergency response platform designed to improve coordination
              between citizens, ambulances, hospitals and emergency responders.
            </motion.p>

            {/* Explore Button: Direct Redirect to emstrap.com */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a
                href="https://emstrap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#E63946] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>EXPLORE EMSTRAP</span>
                <span className="text-[#FFFFFF] transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </motion.div>

            {/* Supporting 3 Minimal Statements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-[#111111]/10"
            >
              <div>
                <div className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  FASTER
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/50 mt-1">
                  Response
                </div>
              </div>

              <div>
                <div className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  SMARTER
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/50 mt-1">
                  Coordination
                </div>
              </div>

              <div>
                <div className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  SAFER
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/50 mt-1">
                  Communities
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Network System */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Network Interactive Visualizer Container */}
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center border border-[#111111]/10 bg-white p-4">

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                {/* Citizen Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="310"
                  y2="90"
                  stroke={activeNodeId === 'citizen' ? '#E63946' : '#111111'}
                  strokeWidth={activeNodeId === 'citizen' ? '2.5' : '1'}
                  strokeDasharray={activeNodeId === 'citizen' ? 'none' : '3 3'}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* Ambulance Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="310"
                  y2="310"
                  stroke={activeNodeId === 'ambulance' ? '#E63946' : '#111111'}
                  strokeWidth={activeNodeId === 'ambulance' ? '2.5' : '1'}
                  strokeDasharray={activeNodeId === 'ambulance' ? 'none' : '3 3'}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* Hospital Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="90"
                  y2="310"
                  stroke={activeNodeId === 'hospital' ? '#E63946' : '#111111'}
                  strokeWidth={activeNodeId === 'hospital' ? '2.5' : '1'}
                  strokeDasharray={activeNodeId === 'hospital' ? 'none' : '3 3'}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* Responder Line */}
                <motion.line
                  x1="200"
                  y1="200"
                  x2="90"
                  y2="90"
                  stroke={activeNodeId === 'responder' ? '#E63946' : '#111111'}
                  strokeWidth={activeNodeId === 'responder' ? '2.5' : '1'}
                  strokeDasharray={activeNodeId === 'responder' ? 'none' : '3 3'}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </svg>

              {/* Central EMSTRAP Core Element */}
              <motion.div
                animate={{
                  scale: activeNodeId ? [1, 1.04, 1] : 1,
                  borderColor: activeNodeId ? '#E63946' : '#111111',
                }}
                transition={{ duration: 0.35 }}
                className="relative z-20 w-24 h-24 bg-[#111111] text-white flex flex-col items-center justify-center border-2 shadow-md cursor-pointer select-none"
              >
                <span className="font-['Space_Grotesk'] text-xs font-bold tracking-widest text-white">
                  EMSTRAP
                </span>
              </motion.div>

              {/* 4 Surrounding Satellite Nodes */}
              {/* 1. CITIZEN */}
              <motion.button
                onMouseEnter={() => setActiveNodeId('citizen')}
                onClick={() => setActiveNodeId('citizen')}
                whileHover={{ scale: 1.05, x: 4, y: -4 }}
                className={`absolute top-14 right-6 sm:top-16 sm:right-10 z-20 p-3 sm:p-4 border transition-all duration-200 text-left cursor-pointer focus:outline-none ${
                  activeNodeId === 'citizen'
                    ? 'border-[#E63946] bg-[#111111] text-white shadow-lg'
                    : 'border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck size={14} className={activeNodeId === 'citizen' ? 'text-[#E63946]' : 'text-[#111111]'} />
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold tracking-wider">
                    CITIZEN
                  </span>
                </div>
              </motion.button>

              {/* 2. AMBULANCE */}
              <motion.button
                onMouseEnter={() => setActiveNodeId('ambulance')}
                onClick={() => setActiveNodeId('ambulance')}
                whileHover={{ scale: 1.05, x: 4, y: 4 }}
                className={`absolute bottom-14 right-6 sm:bottom-16 sm:right-10 z-20 p-3 sm:p-4 border transition-all duration-200 text-left cursor-pointer focus:outline-none ${
                  activeNodeId === 'ambulance'
                    ? 'border-[#E63946] bg-[#111111] text-white shadow-lg'
                    : 'border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity size={14} className={activeNodeId === 'ambulance' ? 'text-[#E63946]' : 'text-[#111111]'} />
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold tracking-wider">
                    AMBULANCE
                  </span>
                </div>
              </motion.button>

              {/* 3. HOSPITAL */}
              <motion.button
                onMouseEnter={() => setActiveNodeId('hospital')}
                onClick={() => setActiveNodeId('hospital')}
                whileHover={{ scale: 1.05, x: -4, y: 4 }}
                className={`absolute bottom-14 left-6 sm:bottom-16 sm:left-10 z-20 p-3 sm:p-4 border transition-all duration-200 text-left cursor-pointer focus:outline-none ${
                  activeNodeId === 'hospital'
                    ? 'border-[#E63946] bg-[#111111] text-white shadow-lg'
                    : 'border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <HeartPulse size={14} className={activeNodeId === 'hospital' ? 'text-[#E63946]' : 'text-[#111111]'} />
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold tracking-wider">
                    HOSPITAL
                  </span>
                </div>
              </motion.button>

              {/* 4. RESPONDER */}
              <motion.button
                onMouseEnter={() => setActiveNodeId('responder')}
                onClick={() => setActiveNodeId('responder')}
                whileHover={{ scale: 1.05, x: -4, y: -4 }}
                className={`absolute top-14 left-6 sm:top-16 sm:left-10 z-20 p-3 sm:p-4 border transition-all duration-200 text-left cursor-pointer focus:outline-none ${
                  activeNodeId === 'responder'
                    ? 'border-[#E63946] bg-[#111111] text-white shadow-lg'
                    : 'border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className={activeNodeId === 'responder' ? 'text-[#E63946]' : 'text-[#111111]'} />
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold tracking-wider">
                    RESPONDER
                  </span>
                </div>
              </motion.button>

            </div>

            {/* Active Node Description */}
            <div className="w-full max-w-[480px] mt-4 p-4 border border-[#111111] bg-[#111111] text-white">
              <span className="font-['Space_Grotesk'] text-xs font-bold tracking-wider text-[#E63946] block mb-1">
                {activeNode.label}
              </span>
              <p className="text-xs text-white/90 font-normal">
                {activeNode.description}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
