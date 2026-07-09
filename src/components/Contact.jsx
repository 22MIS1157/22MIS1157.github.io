import { useState } from 'react';
import { motion } from 'framer-motion';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 19 1.5s-1.33-.3-4.4 1.7a15.2 15.2 0 0 0-8 0C3.33 1.2 2 1.5 2 1.5a5.07 5.07 0 0 0-.03 3.27A5.44 5.44 0 0 0 0 7.98c0 5.45 3.3 6.65 6.44 7A4.8 4.8 0 0 0 5 18v4"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden" id="contact">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-4xl md:text-5xl font-black text-[var(--fg)] mb-6 leading-tight">Let's Build <br/><span className="text-[var(--accent)]">Together.</span></h3>
          <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex gap-4">
            {[
              { icon: MailIcon, link: "mailto:afnaanahmedp@example.com" },
              { icon: GithubIcon, link: "https://github.com/22MIS1157" },
              { icon: LinkedinIcon, link: "https://www.linkedin.com/in/afnaan22mis1157" },
              { icon: InstagramIcon, link: "https://www.instagram.com/afnaan_k.391/" }
            ].map((social, i) => (
              <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--fg)] hover:text-[var(--bg)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300">
                <social.icon />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            try {
              const res = await fetch("https://formsubmit.co/ajax/afnaanahmed.k391@gmail.com", {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  message: formData.message,
                  _subject: `New Portfolio Message from ${formData.name}`
                })
              });
              if (res.ok) {
                alert("Message sent successfully! (Note: If this is your first time testing, please check your email for an activation link from FormSubmit!)");
                setFormData({ name: '', email: '', message: '' });
              } else {
                alert("Oops! Something went wrong.");
              }
            } catch (err) {
              alert("Network error. Please try again later.");
            }
            btn.textContent = originalText;
            btn.disabled = false;
          }}
        >
          {/* Prevent bot spam */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          <input type="hidden" name="_captcha" value="false" />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors" 
              placeholder="John Doe" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors" 
              placeholder="john@example.com" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Message</label>
            <textarea 
              rows={4} 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors resize-none" 
              placeholder="Hello..." 
            />
          </div>
          <button type="submit" className="mt-2 w-full py-4 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-bold text-lg hover:bg-[var(--accent)] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
            Send Message
          </button>
        </motion.form>

      </div>
    </section>
  );
}
