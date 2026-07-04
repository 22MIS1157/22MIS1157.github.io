"use client";

import { useState, useEffect } from "react";
import VillageToggle from "@/components/theme/VillageToggle";
import { usePortfolioStore } from "@/lib/store";

const NAV_ITEMS = [
  { href: "#prologue", label: "Home" },
  { href: "#ninja-profile", label: "About" },
  { href: "#jutsu-arsenal", label: "Skills" },
  { href: "#mission-log", label: "Projects" },
  { href: "#rank-history", label: "Experience" },
  { href: "#academy-records", label: "Education" },
  { href: "#summon-hawk", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const loaderComplete = usePortfolioStore((s) => s.loaderComplete);
  const lowFxMode = usePortfolioStore((s) => s.lowFxMode);
  const setLowFxMode = usePortfolioStore((s) => s.setLowFxMode);

  const themeMode = usePortfolioStore((s) => s.themeMode);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => document.querySelector(item.href));
      let current = "";
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            current = `#${section.id}`;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!loaderComplete) return null;

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#prologue" className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {themeMode === "konoha" ? (
            <img
              src="/svg/leaf-spiral.svg"
              alt="Konoha"
              style={{
                width: "24px",
                height: "24px",
                filter: "brightness(0) saturate(100%) invert(20%) sepia(20%) saturate(1000%) hue-rotate(90deg)", // dark green matching leaf theme
              }}
            />
          ) : (
            <img
              src="/svg/cloud-pattern.svg"
              alt="Akatsuki"
              style={{
                width: "34px",
                height: "18px",
              }}
            />
          )}
          <span className="logo-text">Afnaan</span>
        </a>

        {/* Desktop nav */}
        <ul className="navbar-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`navbar-link ${activeSection === item.href ? "navbar-link--active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <VillageToggle />
          <button
            className="low-fx-toggle"
            onClick={() => setLowFxMode(!lowFxMode)}
            aria-label={lowFxMode ? "Enable effects" : "Reduce effects"}
            title={lowFxMode ? "Enable FX" : "Low FX Mode"}
          >
            {lowFxMode ? "FX Off" : "FX On"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar-hamburger ${isOpen ? "navbar-hamburger--open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${isOpen ? "navbar-mobile--open" : ""}`}>
        <ul className="navbar-mobile-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`navbar-mobile-link ${activeSection === item.href ? "navbar-mobile-link--active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-mobile-actions">
          <VillageToggle />
          <button
            className="low-fx-toggle"
            onClick={() => { setLowFxMode(!lowFxMode); setIsOpen(false); }}
          >
            {lowFxMode ? "FX Off" : "FX On"}
          </button>
        </div>
      </div>
    </nav>
  );
}
