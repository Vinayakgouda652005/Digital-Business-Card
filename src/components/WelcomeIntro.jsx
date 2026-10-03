import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function WelcomeIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reveal timing ~850ms, then lift curtain and finish around 1100ms
    const timer = setTimeout(() => {
      setVisible(false);
    }, 750);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1100);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFFF] pointer-events-none"
        >
          <div className="relative overflow-hidden px-4">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.25em] text-[#111111] uppercase">
                WELCOME
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
                className="h-[2px] w-16 mx-auto bg-[#E63946] mt-4 origin-center"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
