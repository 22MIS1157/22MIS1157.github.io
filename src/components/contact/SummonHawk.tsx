"use client";

import { useRef, useEffect, useState } from "react";
import { resumeData } from "@/lib/resumeData";

export default function SummonHawk() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".contact-animate") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );
    };
    init();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto as fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:${resumeData.personal.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} id="summon-hawk" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">八</span>
        <h2 className="section-title">Summon a Hawk</h2>
        <p className="section-subtitle">Get In Touch</p>
      </div>

      <div className="contact-layout">
        {/* Contact info */}
        <div className="contact-info contact-animate">
          <div className="contact-hawk-container mb-6" style={{ display: "flex", justifyContent: "flex-start", opacity: 0.85, marginBottom: "20px" }}>
            <img
              src="/svg/hawk.svg"
              alt="Messenger Hawk"
              style={{
                width: "80px",
                height: "80px",
                filter: "drop-shadow(0 0 10px var(--theme-accent, #C81E1E))",
              }}
            />
          </div>
          <div className="contact-card">
            <span className="contact-icon">📧</span>
            <a href={`mailto:${resumeData.personal.email}`} className="contact-link">
              {resumeData.personal.email}
            </a>
          </div>
          <div className="contact-card">
            <span className="contact-icon">📱</span>
            <a href={`tel:${resumeData.personal.phone}`} className="contact-link">
              {resumeData.personal.phone}
            </a>
          </div>
          <div className="contact-card">
            <span className="contact-icon">📍</span>
            <span className="contact-text">{resumeData.personal.location}</span>
          </div>

          <div className="contact-socials">
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--linkedin"
            >
              LinkedIn
            </a>
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--github"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="contact-form contact-animate">
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="form-input"
              placeholder="Your name"
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="form-input"
              placeholder="your@email.com"
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              className="form-input form-textarea"
              placeholder="Your message..."
            />
          </div>
          <button type="submit" className="form-submit" disabled={submitted}>
            {submitted ? "✓ Hawk Dispatched!" : "Send Message"}
            <span className="chidori-border" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
