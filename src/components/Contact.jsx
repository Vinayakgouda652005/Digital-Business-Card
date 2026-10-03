import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Linkedin, ArrowUpRight, Check, Copy } from 'lucide-react';
import { downloadVCard } from '../utils/vcard.js';

export function Contact() {
  const [vcfState, setVcfState] = useState('idle');
  const [copiedKey, setCopiedKey] = useState(null);

  const phone = '+91 9880882476';
  const email = 'vinayak@emstrap.com';
  const linkedinUrl = 'https://www.linkedin.com/in/vinayak-manjunath-gouda';
  const linkedinHandle = 'linkedin.com/in/vinayak-manjunath-gouda';

  const handleSaveContact = async () => {
    if (vcfState !== 'idle') return;
    setVcfState('loading');
    await downloadVCard();
    setVcfState('saved');
    setTimeout(() => {
      setVcfState('idle');
    }, 3000);
  };

  const copyToClipboard = (text, key, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const contactRows = [
    {
      key: 'phone',
      label: 'PHONE',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      icon: Phone,
      external: false,
    },
    {
      key: 'email',
      label: 'EMAIL',
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
      external: false,
    },
    {
      key: 'linkedin',
      label: 'LINKEDIN',
      value: linkedinHandle,
      href: linkedinUrl,
      icon: Linkedin,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 md:py-40 bg-[#FFFFFF] border-t border-[#111111]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#111111] uppercase">
            CONTACT
          </span>
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </motion.div>

        {/* Section Grid: Statement & Clean Interactive Rows (NO cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Message */}
          <div className="lg:col-span-5 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-['Space_Grotesk'] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[0.95]"
            >
              LET'S <br />
              CONNECT
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-[#111111]/75 leading-relaxed font-normal max-w-md"
            >
              Feel free to reach out. I'm always open to new opportunities and collaborations.
            </motion.p>

            {/* Save Contact Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={handleSaveContact}
                disabled={vcfState !== 'idle'}
                className="group relative inline-flex items-center gap-3 px-7 py-4 bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#E63946] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-80"
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
            </motion.div>
          </div>

          {/* Right Column: Three Clean Interactive Rows (NO cards, thin dividers) */}
          <div className="lg:col-span-7 space-y-0 pt-4 lg:pt-0">
            {contactRows.map((row, index) => {
              const Icon = row.icon;
              const isCopied = copiedKey === row.key;

              return (
                <motion.div
                  key={row.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative group border-b border-[#111111]/15 first:border-t"
                >
                  <a
                    href={row.href}
                    target={row.external ? '_blank' : undefined}
                    rel={row.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between py-6 sm:py-8 px-2 transition-transform duration-200 group-hover:translate-x-2 block"
                  >
                    {/* Left: Icon, Label, Value */}
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <div className="w-10 h-10 border border-[#111111]/15 group-hover:border-[#E63946] flex items-center justify-center text-[#111111] group-hover:text-[#E63946] transition-colors shrink-0">
                        <Icon size={18} />
                      </div>

                      <div className="space-y-0.5 truncate">
                        <span className="block text-[11px] font-mono tracking-widest text-[#111111]/50 uppercase">
                          {row.label}
                        </span>
                        <span className="block font-['Space_Grotesk'] text-base sm:text-xl font-semibold text-[#111111] group-hover:text-[#E63946] transition-colors truncate">
                          {row.value}
                        </span>
                      </div>
                    </div>

                    {/* Right: Copy & Arrow Action */}
                    <div className="flex items-center gap-3 shrink-0 pl-3">
                      <button
                        onClick={(e) => copyToClipboard(row.value, row.key, e)}
                        className="p-2 text-[#111111]/40 hover:text-[#111111] transition-colors cursor-pointer"
                        title={`Copy ${row.label}`}
                        aria-label={`Copy ${row.label}`}
                      >
                        {isCopied ? (
                          <span className="text-[10px] font-mono font-bold text-[#E63946]">
                            COPIED
                          </span>
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>

                      <div className="w-8 h-8 flex items-center justify-center text-[#111111] group-hover:text-[#E63946] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </a>

                  {/* Red Underline Expand on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
