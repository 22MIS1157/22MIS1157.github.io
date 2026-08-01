import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Specialized Inline SVG Helper for Cybersecurity Attacks, Defense & Operations
const CustomIconSvg = ({ type }) => {
  switch (type) {
    // --- BOX 1: CYBERSECURITY ATTACKS & DEFENSE SYMBOLS ---
    case 'vpn':
      return (
        /* VPN Encrypted Tunnel Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      );
    case 'ddos':
      return (
        /* DDoS Traffic Overload Vectors Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          <path d="M4 4l4 4M20 4l-4 4"/>
        </svg>
      );
    case 'fingerprinting':
      return (
        /* Biometric OS / Device Fingerprinting Reticle */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
          <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      );
    case 'bruteforce':
      return (
        /* Brute Force Password Cracking Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>
          <path d="M7 16h10"/>
        </svg>
      );
    case 'sqli':
      return (
        /* SQL Injection Database Attack Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      );
    case 'session_hacking':
      return (
        /* Session Hijacking & Cookie Hijack Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          <line x1="8" y1="12" x2="16" y2="12" strokeDasharray="2 2"/>
        </svg>
      );
    case 'phishing':
      return (
        /* Phishing & Social Engineering Hook Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 12.5V10a6 6 0 0 0-12 0v2.5"/>
          <path d="M12 2v4M12 18a4 4 0 0 1-4-4v-1.5h8V14a4 4 0 0 1-4 4z"/>
        </svg>
      );
    case 'malware':
      return (
        /* Malware / Trojan Virus Bug Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="6" width="8" height="14" rx="4"/>
          <path d="M6 18h12M6 12h12M6 6h12M12 2v4"/>
        </svg>
      );
    case 'port_scan':
      return (
        /* Port Scanning Radar Sweep Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 12L19 5"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      );
    case 'root_shell':
      return (
        /* Root Terminal Shell Access Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5"/>
          <line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
      );

    // --- BOX 3: SHARK TANK, HACKATHON 24H & INDUSTRIAL VISIT SYMBOLS ---
    case 'sharktank':
      return (
        /* Shark Tank / Investor Pitch Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          <path d="M2 20c4-4 8-1 12-6 2-2 4-2 6-1"/>
        </svg>
      );
    case 'hackathon24h':
      return (
        /* 24-Hour Hackathon Timer Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
          <path d="M16 2v4M8 2v4"/>
        </svg>
      );
    case 'industrialvisit':
      return (
        /* Industrial Visit / Tech Factory Gear Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20M4 20V10l4 2V8l4 2V6l4 2v12"/>
          <circle cx="18" cy="14" r="3"/>
        </svg>
      );
    case 'startup':
      return (
        /* Innovation Pitch Launch Rocket Symbol */
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-1.5 1.76-2.34L4.5 16.5z"/>
          <path d="M12 15l-3-3 7.5-7.5c1.38-1.38 3.62-1.38 5 0 1.38 1.38 1.38 3.62 0 5L14 17l-2-2z"/>
        </svg>
      );
    default:
      return null;
  }
};

const SimpleIconBg = ({ slug, isDark }) => (
  <img 
    src={`https://cdn.simpleicons.org/${slug}`}
    alt=""
    className="w-11 h-11 md:w-13 md:h-13 opacity-35 dark:opacity-45 transition-all duration-300 pointer-events-none"
    style={{
      filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)'
    }}
    draggable={false}
  />
);

const activities = [
  {
    id: 'cybersecurity',
    title: 'Core Member, Cybersecurity Division — Microsoft Innovations Club, VIT Chennai',
    period: 'Oct 2023 – Jun 2024',
    description: 'Collaborated with a multidisciplinary engineering team to plan and execute CTF (Capture The Flag) competitions and hands-on cybersecurity workshops for 100+ students – developing strong communication, event management, and team coordination skills.',
    // Box 1: 100% Custom Cybersecurity Attack & Defense SVGs (VPN, DDoS, SQLi, BruteForce, Fingerprinting, Session Hacking, Root Shell)
    rows: [
      [{ type: 'custom', value: 'vpn' }, { type: 'custom', value: 'ddos' }, { type: 'custom', value: 'fingerprinting' }, { type: 'custom', value: 'sqli' }],
      [{ type: 'custom', value: 'bruteforce' }, { type: 'custom', value: 'session_hacking' }, { type: 'custom', value: 'port_scan' }, { type: 'custom', value: 'root_shell' }],
      [{ type: 'custom', value: 'phishing' }, { type: 'custom', value: 'malware' }, { type: 'custom', value: 'vpn' }, { type: 'custom', value: 'ddos' }],
      [{ type: 'custom', value: 'sqli' }, { type: 'custom', value: 'bruteforce' }, { type: 'custom', value: 'fingerprinting' }, { type: 'custom', value: 'root_shell' }]
    ]
  },
  {
    id: 'ar-vr',
    title: 'Core Member, Marketing & Management — AR/VR Club, VIT Chennai',
    period: 'May 2023 – Mar 2024',
    description: 'Led promotion, outreach, and logistics for campus-wide technology summits and AR/VR hackathons. Practised cross-team communication, campaign strategy, and rapid problem-solving under tight event deadlines.',
    // Box 2: AR/VR & 3D Tools covering 4 rows
    rows: [
      [{ type: 'slug', value: 'unity' }, { type: 'slug', value: 'unrealengine' }, { type: 'slug', value: 'blender' }, { type: 'slug', value: 'oculus' }],
      [{ type: 'slug', value: 'webgl' }, { type: 'slug', value: 'figma' }, { type: 'slug', value: 'canva' }, { type: 'slug', value: 'unity' }],
      [{ type: 'slug', value: 'unrealengine' }, { type: 'slug', value: 'blender' }, { type: 'slug', value: 'oculus' }, { type: 'slug', value: 'webgl' }],
      [{ type: 'slug', value: 'figma' }, { type: 'slug', value: 'unity' }, { type: 'slug', value: 'canva' }, { type: 'slug', value: 'blender' }]
    ]
  },
  {
    id: 'young-innovators',
    title: 'Operations Member — Fraternity of Young Innovators, VIT Chennai',
    period: 'Nov 2023 – Jun 2024',
    description: 'Supported inter-college innovation hackathons and student entrepreneurship programmes, contributing to smooth operations, sponsor coordination, and venue logistics across multiple VIT campuses.',
    // Box 3: Shark Tank, 24h Hackathons, Industrial Visits & Operations Symbols covering 4 rows
    rows: [
      [{ type: 'custom', value: 'sharktank' }, { type: 'custom', value: 'hackathon24h' }, { type: 'custom', value: 'industrialvisit' }, { type: 'custom', value: 'startup' }],
      [{ type: 'slug', value: 'trello' }, { type: 'slug', value: 'jira' }, { type: 'slug', value: 'notion' }, { type: 'slug', value: 'slack' }],
      [{ type: 'custom', value: 'hackathon24h' }, { type: 'custom', value: 'sharktank' }, { type: 'custom', value: 'industrialvisit' }, { type: 'slug', value: 'github' }],
      [{ type: 'slug', value: 'trello' }, { type: 'custom', value: 'startup' }, { type: 'slug', value: 'google' }, { type: 'custom', value: 'hackathon24h' }]
    ]
  },
];

export default function Activities() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
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

  return (
    <section className="section-spacer relative w-full bg-[var(--bg)] text-[var(--fg)]" style={{ paddingTop: '60px', paddingBottom: '60px' }} id="activities">
      <div className="container-custom">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[var(--fg)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--fg)] uppercase">BEYOND CODE</span>
            </div>
            <h2 className="section-heading whitespace-pre-line m-0">
              {"ACTIVITIES &\nLEADERSHIP"}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-inter text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Leadership roles, tech community engagement, hackathon organization, and extracurricular contributions.
            </p>
          </div>
        </div>

        {/* Activities List */}
        <div className="max-w-5xl mx-auto pl-8 md:pl-16 pr-2 md:pr-4 flex flex-col gap-10 md:gap-14">
          {activities.map((act, i) => (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-cursor="pointer"
              className="relative rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--fg)] hover:shadow-2xl transition-all duration-500 text-left group overflow-hidden"
              style={{ padding: '44px 52px' }}
            >
              {/* 4 STAGGERED BACKGROUND ANIMATED ROWS COVERING THE WHOLE BOX TOP-TO-BOTTOM */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-between py-3 z-0 opacity-35 dark:opacity-45">
                {act.rows.map((rowLogos, rIdx) => (
                  <motion.div
                    key={`row-${rIdx}`}
                    className={`flex items-center gap-12 md:gap-16 w-max ${rIdx % 2 === 1 ? '-ml-12' : ''}`}
                    animate={{ x: rIdx % 2 === 0 ? ['-25%', '0%'] : ['0%', '-25%'] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 16 + rIdx * 3,
                      ease: 'easeInOut'
                    }}
                  >
                    {[...rowLogos, ...rowLogos, ...rowLogos, ...rowLogos].map((item, lIdx) => (
                      <div key={`logo-${rIdx}-${lIdx}`} className="shrink-0">
                        {item.type === 'slug' ? (
                          <SimpleIconBg slug={item.value} isDark={isDark} />
                        ) : (
                          <div className="opacity-40 dark:opacity-50 text-[var(--fg)]">
                            <CustomIconSvg type={item.value} />
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Interior Content Div with 24px Left Padding Offset */}
              <div className="relative z-10" style={{ paddingLeft: '24px' }}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <h3 className="font-grotesk font-black text-2xl md:text-3xl text-[var(--text-primary)] leading-snug tracking-tight group-hover:text-[var(--fg)] transition-colors max-w-3xl">
                    {act.title}
                  </h3>
                  <span className="font-mono text-xs font-semibold px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] shrink-0 self-start">
                    {act.period}
                  </span>
                </div>

                <p className="font-inter text-xs md:text-sm text-[var(--text-secondary)] opacity-90 leading-relaxed group-hover:opacity-100 transition-opacity max-w-3xl" style={{ paddingLeft: '4px' }}>
                  {act.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
