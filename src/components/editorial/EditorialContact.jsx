import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';

export default function EditorialContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-16 hairline-b gap-4">
          <div>
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block mb-2">
              04 // DISPATCH &amp; INQUIRY
            </span>
            <h2 className="font-swiss font-black text-4xl sm:text-5xl text-[var(--color-text)] uppercase tracking-tight">
              Get in Touch
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm font-sans">
            Open to software engineering internships, open-source collaboration, and algorithmic research.
          </p>
        </div>

        {/* 2-Column Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-8 font-sans">
            <div>
              <h3 className="font-swiss font-black text-2xl text-[var(--color-text)] uppercase mb-3">
                Direct Communication
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Whether you have a product challenge, technical project, or questions regarding my algorithms or robotics work, my channels are open.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <FaEnvelope className="text-[var(--color-accent)]" />
                <a
                  href="mailto:deekhitabohidar@gmail.com"
                  className="font-mono text-xs text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  deekhitabohidar@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <FaMapMarkerAlt className="text-[var(--color-accent)]" />
                <span className="font-mono text-xs text-[var(--color-text)]">
                  Bhubaneswar, Odisha, India
                </span>
              </div>
            </div>

            {/* Profiles Ledger */}
            <div className="pt-6 hairline-t space-y-3 font-mono text-xs">
              <span className="uppercase text-[var(--color-text-light)] block mb-2">
                Public Repositories &amp; Profiles
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/Deekhita-11/Deekhita-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 hairline-border bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FaGithub size={14} />
                    <span>GitHub: @Deekhita-11</span>
                  </span>
                  <FiArrowUpRight size={14} />
                </a>

                <a
                  href="https://leetcode.com/u/Deekhita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 hairline-border bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <SiLeetcode size={14} />
                    <span>LeetCode: @Deekhita (187+ Solved)</span>
                  </span>
                  <FiArrowUpRight size={14} />
                </a>

                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 hairline-border bg-[var(--color-surface)] hover:border-[var(--color-text)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FaLinkedin size={14} />
                    <span>LinkedIn Profile</span>
                  </span>
                  <FiArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Form (7 cols) */}
          <div className="lg:col-span-7 p-8 hairline-border bg-[var(--color-surface)]">
            {submitted ? (
              <div className="py-12 text-center space-y-3 font-sans">
                <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-4">
                  <FiCheck size={24} />
                </div>
                <h3 className="font-swiss font-bold text-2xl text-[var(--color-text)]">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
                  Thank you for reaching out. I will respond to your transmission shortly at {formData.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-muted)] mb-2 font-semibold">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe / Company"
                    className="w-full px-4 py-3 text-sm hairline-border bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-muted)] mb-2 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 text-sm hairline-border bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-muted)] mb-2 font-semibold">
                    Inquiry / Project Scope
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Deekhita, I'd like to collaborate on..."
                    className="w-full px-4 py-3 text-sm hairline-border bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--color-text)] text-[var(--color-bg)] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
                >
                  Send Inquiry Message →
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
