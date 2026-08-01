import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';
import signatureGif from '../assets/afnaan-ahmed-p.gif';

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M22 7l-10 7L2 7"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12L12 4M12 4H6M12 4V10"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInBadgeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
  </svg>
);

const InstagramBadgeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E4405F]">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const VerifiedBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" className="inline-block ml-1">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const SimpleIconBg = ({ slug, isDark }) => (
  <img 
    src={`https://cdn.simpleicons.org/${slug}`}
    alt=""
    className="w-7 h-7 opacity-25 dark:opacity-40 hover:opacity-80 transition-all duration-300 pointer-events-none"
    style={{
      filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)'
    }}
    draggable={false}
  />
);

// Authentic Dynamic Animated GIF Signature Logo Component
const AfnaanSignatureLogo = ({ isDark }) => (
  <div className="flex items-center justify-center relative select-none group/logo w-full h-full p-1" data-cursor="pointer">
    <img
      src={signatureGif}
      alt="Afnaan Ahmed P Animated Signature"
      className="max-h-[75px] md:max-h-[90px] w-auto object-contain transition-transform duration-300 group-hover/logo:scale-105"
      style={{
        filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none',
        mixBlendMode: isDark ? 'screen' : 'multiply'
      }}
      draggable={false}
    />
  </div>
);

const featuredProjects = [
  {
    title: 'ATCC VPARK',
    desc: 'Real-Time AI Smart Parking Solution',
    url: 'https://github.com/22MIS1157/Vpark-Project'
  },
  {
    title: 'LexCloud AI',
    desc: 'Cloud-Native RAG NLP Pipeline',
    url: 'https://github.com/22MIS1157'
  },
  {
    title: 'Anemia Detect',
    desc: 'Non-Invasive Diagnostic CNN',
    url: 'https://github.com/22MIS1157/Anemia-Detection-Using-Nails'
  },
  {
    title: 'ICU Predictor',
    desc: 'MIMIC-IV Clinical XGBoost Classifier',
    url: 'https://github.com/22MIS1157/Sepsis-Mortality-Prediction'
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      setIsDark(theme === 'dark');
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('afnaanahmed.k391@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailBoxClick = (e) => {
    if (e.target.closest('button')) return;
    window.location.href = 'mailto:afnaanahmed.k391@gmail.com';
  };

  return (
    <section className="section-spacer relative w-full bg-[var(--bg)] text-[var(--fg)]" style={{ paddingTop: '60px', paddingBottom: '30px' }} id="contact">
      <div className="container-custom relative z-10 max-w-6xl mx-auto">

        {/* BENTO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

          {/* COLUMN 1: LEFT COLUMN (GET IN TOUCH RETICLE BOX + TALL PORTRAIT CARD) */}
          <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8 justify-between">
            {/* GET IN TOUCH RETICLE BOX */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[140px] shadow-sm"
            >
              {/* Corner Reticle Brackets ┌ ┐ └ ┘ */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--fg)]" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--fg)]" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--fg)]" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--fg)]" />

              <h2 className="font-grotesk font-black text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-tight m-0 leading-snug">
                {"GET IN\nTOUCH"}
              </h2>
            </motion.div>

            {/* TALL VERTICAL PROFILE PORTRAIT CARD (DEFAULT B&W, HOVER SMOOTH FULL COLOR) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex-1 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden flex flex-col justify-between relative group min-h-[440px] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Top Header Info inside Profile Card */}
              <div className="p-6 pb-2 text-center z-10 bg-[var(--bg-card)]">
                <h3 className="font-grotesk font-black text-xl md:text-2xl text-[var(--text-primary)] uppercase tracking-tight m-0 leading-tight">
                  AFNAAN AHMED P
                </h3>
                <p className="font-inter text-[11px] md:text-xs font-medium text-[var(--text-muted)] mt-1 tracking-wider uppercase">
                  Full-Stack & AI Engineer
                </p>
              </div>

              {/* Bottom Portrait Photo (DEFAULT B&W, HOVER SMOOTH FULL COLOR REVEAL) */}
              <div className="relative flex-1 w-full overflow-hidden flex items-end" data-cursor="pointer">
                <img
                  src={profileImg}
                  alt="Afnaan Ahmed P"
                  className="w-full h-full object-cover object-top grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--bg-card)] to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2: CENTER AREA (CENTERED EMAIL BAR + GITHUB SHOWCASE) */}
          <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 justify-between">
            
            {/* CENTERED EMAIL BAR CARD WITH GUARANTEED MAILTO REDIRECTION ON CLICK */}
            <motion.div
              onClick={handleMailBoxClick}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              data-cursor="pointer"
              className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--fg)] transition-all duration-300 p-5 md:p-6 flex items-center justify-center text-center gap-4 min-h-[140px] shadow-sm w-full group/email cursor-pointer"
            >
              <div className="flex items-center justify-center gap-4 max-w-full overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] group-hover/email:border-[var(--fg)] flex items-center justify-center text-[var(--fg)] shrink-0 relative transition-colors shadow-sm">
                  <MailIcon />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-grotesk font-bold text-lg md:text-2xl text-[var(--text-primary)] group-hover/email:text-[var(--fg)] transition-colors truncate">
                  afnaanahmed.k391@gmail.com
                </span>
                <button
                  onClick={handleCopy}
                  className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center hover:border-[var(--fg)] transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--fg)] shrink-0 ml-1"
                  data-cursor="pointer"
                  aria-label="Copy email"
                  title="Copy email address"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </motion.div>

            {/* GITHUB SHOWCASE CARD WITH OFFICIAL PIXEL-ART GITHUB AVATAR HOVER OVERLAY (MATCHING USER SCREENSHOT) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col justify-between gap-5 hover:border-[var(--fg)] transition-all duration-300 shadow-sm hover:shadow-xl group/ghbox flex-1 min-h-[320px] overflow-hidden relative"
            >
              {/* HOVER PROFILE OVERLAY FOR GITHUB (MATCHING GITHUB PROFILE SCREENSHOT) */}
              <div className="absolute inset-0 bg-[#0d1117]/95 backdrop-blur opacity-0 group-hover/ghbox:opacity-100 transition-opacity duration-500 pointer-events-none flex flex-col items-center justify-center p-6 z-20 text-center gap-2.5 text-white">
                <div className="w-20 h-20 rounded-full p-[2px] border-2 border-emerald-400 shadow-2xl overflow-hidden transform group-hover/ghbox:scale-105 transition-transform duration-500 relative bg-black">
                  <img src="https://github.com/22MIS1157.png" alt="AFNAAN AHMED 22MIS1157 GitHub Avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="font-grotesk font-black text-xl text-white tracking-tight m-0">AFNAAN AHMED</h4>
                  <p className="font-mono text-xs text-emerald-400 mt-0.5">22MIS1157 · he/him</p>
                  <p className="font-inter text-[11px] text-zinc-300 italic mt-1 max-w-xs">
                    "Happy to be a programmer and always be serve as a developer"
                  </p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg mt-1">
                  VIEW GITHUB REPOSITORIES ↗
                </div>
              </div>

              {/* GitHub Card Header */}
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3.5 z-10 bg-[var(--bg-card)]/90 backdrop-blur">
                <a
                  href="https://github.com/22MIS1157"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="flex items-center gap-3 group/gh truncate"
                >
                  <div className="p-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] group-hover/gh:border-[var(--fg)] group-hover/gh:scale-110 transition-all shrink-0">
                    <GithubIcon />
                  </div>
                  <span className="font-grotesk font-bold text-base md:text-lg text-[var(--text-primary)] group-hover/gh:text-[var(--fg)] transition-colors truncate">
                    github/22MIS1157
                  </span>
                </a>
                <a
                  href="https://github.com/22MIS1157"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  className="font-mono text-xs font-bold px-4 py-1.5 rounded-lg bg-[var(--fg)] text-[var(--bg)] hover:opacity-90 transition-all shrink-0 shadow-sm"
                >
                  Follow
                </a>
              </div>

              {/* MOVING PROJECT CARDS MARQUEE SLIDER */}
              <div className="relative w-full overflow-hidden py-1 flex-1 flex items-center z-10">
                <motion.div
                  className="flex items-center gap-4 w-max"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                  whileHover={{ animationPlayState: 'paused' }}
                >
                  {[...featuredProjects, ...featuredProjects].map((proj, idx) => (
                    <a 
                      key={`${proj.title}-${idx}`}
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="pointer"
                      className="w-[240px] md:w-[260px] p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--fg)] hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between text-left group/item relative shrink-0 min-h-[130px] shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-grotesk font-bold text-sm text-[var(--text-primary)] group-hover/item:text-[var(--fg)] transition-colors leading-tight">
                          {proj.title}
                        </h4>
                        <div className="text-[var(--text-muted)] group-hover/item:text-[var(--fg)] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0">
                          <ArrowUpRightIcon />
                        </div>
                      </div>
                      <p className="font-inter text-[11px] text-[var(--text-muted)] line-clamp-2 mt-2 leading-relaxed">
                        {proj.desc}
                      </p>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* BOTTOM SPLIT ROW: ANIMATED GIF SIGNATURE (1/3) + CALLOUT BOX (2/3) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              {/* PERSONAL ANIMATED GIF SIGNATURE LOGO BOX WITH RETICLE BRACKETS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="md:col-span-4 relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-4 flex items-center justify-center text-center overflow-hidden min-h-[110px] shadow-sm"
              >
                {/* Corner Reticle Brackets ┌ ┐ └ ┘ */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[var(--fg)]" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[var(--fg)]" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[var(--fg)]" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[var(--fg)]" />

                {/* Animated GIF Signature Logo */}
                <AfnaanSignatureLogo isDark={isDark} />
              </motion.div>

              {/* CALLOUT CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:col-span-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex items-center justify-center text-center min-h-[110px] shadow-sm"
              >
                <p className="font-grotesk font-bold text-base md:text-xl text-[var(--text-primary)] leading-snug tracking-tight m-0">
                  Let’s connect and build something amazing together.
                </p>
              </motion.div>
            </div>
          </div>

          {/* COLUMN 3: RIGHT COLUMN (LINKEDIN & INSTAGRAM WITH CIRCULAR PROFILE PHOTO AVATAR HOVER REVEALS) */}
          <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8 justify-between">
            
            {/* TOP LINKEDIN CARD WITH CIRCULAR PROFILE IMAGE HOVER OVERLAY */}
            <motion.a
              href="https://www.linkedin.com/in/afnaan22mis1157/"
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#0A66C2] hover:shadow-[0_0_30px_rgba(10,102,194,0.3)] transition-all duration-500 p-6 overflow-hidden flex flex-col justify-between text-left group/li min-h-[260px] block shadow-sm flex-1"
            >
              {/* ENHANCED DUAL-ROW FLOATING BACKGROUND ICON EFFECT */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 dark:opacity-40 flex flex-col justify-around py-3">
                {/* Row 1 */}
                <motion.div
                  className="flex items-center gap-7 w-max"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                >
                  {['react', 'node', 'python', 'aws', 'docker', 'git', 'pytorch', 'fastapi', 'postgresql', 'react', 'node', 'python'].map((slug, idx) => (
                    <SimpleIconBg key={`li1-${slug}-${idx}`} slug={slug} isDark={isDark} />
                  ))}
                </motion.div>
                {/* Row 2 */}
                <motion.div
                  className="flex items-center gap-7 w-max"
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                >
                  {['tensorflow', 'typescript', 'javascript', 'html5', 'css3', 'unity', 'opencv', 'docker', 'tensorflow', 'typescript'].map((slug, idx) => (
                    <SimpleIconBg key={`li2-${slug}-${idx}`} slug={slug} isDark={isDark} />
                  ))}
                </motion.div>
              </div>

              {/* CIRCULAR PROFILE IMAGE HOVER OVERLAY FOR LINKEDIN */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A66C2]/95 via-[#084e96]/95 to-[#06386d]/95 backdrop-blur opacity-0 group-hover/li:opacity-100 transition-opacity duration-400 p-6 flex flex-col items-center justify-center text-center text-white z-20 pointer-events-none gap-3">
                <div className="w-20 h-20 rounded-full p-[2.5px] bg-white shadow-2xl overflow-hidden transform group-hover/li:scale-105 transition-transform duration-500 relative">
                  <img src={profileImg} alt="Afnaan Ahmed P" className="w-full h-full object-cover object-top rounded-full" />
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <h4 className="font-grotesk font-black text-lg uppercase tracking-tight text-white m-0">AFNAAN AHMED P</h4>
                    <VerifiedBadge />
                  </div>
                  <p className="font-mono text-xs text-blue-200 mt-1">linkedin.com/in/afnaan22mis1157</p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white text-[#0A66C2] font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg">
                  CONNECT ON LINKEDIN ↗
                </div>
              </div>

              {/* Top Row: LinkedIn Logo Badge & Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="p-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] group-hover/li:border-[#0A66C2] transition-all shrink-0">
                  <LinkedInBadgeIcon />
                </div>
                <div className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] group-hover/li:text-[#0A66C2] group-hover/li:border-[#0A66C2] transition-all">
                  <ArrowUpRightIcon />
                </div>
              </div>

              {/* Lower Middle URL Pill & Bottom Connect Button */}
              <div className="relative z-10 flex flex-col gap-2.5 mt-auto pt-4">
                <div className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] font-mono text-[11px] truncate text-center shadow-sm">
                  linkedin.com/in/afnaan22mis1157
                </div>

                <div className="w-full text-center font-grotesk font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-[#0A66C2] text-white group-hover/li:bg-[#084e96] transition-colors shadow-sm">
                  Connect
                </div>
              </div>
            </motion.a>

            {/* BOTTOM INSTAGRAM CARD WITH CIRCULAR INSTAGRAM STORY PROFILE AVATAR HOVER OVERLAY */}
            <motion.a
              href="https://www.instagram.com/afnaan_k.391/"
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[#E4405F] hover:shadow-[0_0_30px_rgba(228,64,95,0.3)] transition-all duration-500 p-6 overflow-hidden flex flex-col justify-between text-left group/insta min-h-[220px] block shadow-sm"
            >
              {/* Background Ambient Radial Blur & Photo Grid Pattern */}
              <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500 via-rose-500 to-purple-600" />

              {/* CIRCULAR INSTAGRAM STORY AVATAR PROFILE IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] opacity-0 group-hover/insta:opacity-95 transition-opacity duration-400 p-6 flex flex-col items-center justify-center text-center text-white z-20 pointer-events-none gap-3">
                {/* Instagram Animated Story Gradient Avatar Ring */}
                <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-amber-300 via-rose-400 to-purple-300 shadow-2xl overflow-hidden transform group-hover/insta:scale-105 transition-transform duration-500 relative">
                  <img src={profileImg} alt="afnaan_k.391" className="w-full h-full object-cover object-top rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-grotesk font-black text-xl text-white m-0">afnaan_k.391</h4>
                  <p className="font-mono text-xs text-amber-100 mt-0.5">392 Followers • VITian CC 27 🎓</p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white text-[#E4405F] font-mono text-[10px] font-bold tracking-widest uppercase shadow-lg">
                  FOLLOW ON INSTAGRAM ↗
                </div>
              </div>

              {/* Top Row: Instagram Logo Badge & Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="p-2 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] group-hover/insta:border-[#E4405F]/50 transition-colors shrink-0">
                  <InstagramBadgeIcon />
                </div>
                <div className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] group-hover/insta:text-[#E4405F] group-hover/insta:border-[#E4405F]/40 group-hover/insta:scale-110 transition-all">
                  <ArrowUpRightIcon />
                </div>
              </div>

              {/* Bottom Username Pill & Follow Button */}
              <div className="relative z-10 flex flex-col gap-2.5 mt-auto pt-4">
                <div className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/90 backdrop-blur text-[var(--text-secondary)] font-mono text-[11px] truncate text-center shadow-sm group-hover/insta:text-[#E4405F] transition-colors">
                  instagram.com/afnaan_k.391
                </div>

                <div className="w-full text-center font-grotesk font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-md transition-all group-hover/insta:scale-[1.02]">
                  Follow @afnaan_k.391
                </div>
              </div>
            </motion.a>

          </div>

        </div>

        {/* MINIMALIST PAGE FOOTER */}
        <div className="pt-16 pb-4 text-center select-none border-t border-[var(--border)] mt-16">
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
            AFNAAN AHMED P © 2026
          </p>
        </div>

      </div>
    </section>
  );
}
