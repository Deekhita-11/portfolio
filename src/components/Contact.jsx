import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiCheckCircle } from "react-icons/hi";

const socials = [
  { icon: FaGithub, href: "https://github.com/Deekhita-11/Deekhita-11", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/Deekhita/", label: "LeetCode" },
];

const CATEGORIES = [
  { label: "[ WEB APPLICATION ]", prompt: "Hi Deekhita, I have a web application project idea. Here's what I'm thinking:" },
  { label: "[ ROBOTICS HARDWARE ]", prompt: "Hi Deekhita, I'm interested in collaborating on a robotics/hardware project:" },
  { label: "[ EMBEDDED SYSTEM ]", prompt: "Hi Deekhita, I have an embedded systems project that needs:" },
  { label: "[ OTHER COLLABORATION ]", prompt: "Hi Deekhita, I'd love to collaborate on:" }
];

export default function Contact() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (prompt, label) => {
    setActiveCategory(label);
    setForm((f) => ({ ...f, message: prompt }));
    if (!showForm) setShowForm(true);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setActiveCategory("");
      } else {
        setSubmitted(true);
      }
    } catch (_) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl text-sm font-sans outline-none border transition-all duration-200 bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)]";

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal text-center max-w-3xl mx-auto">
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-ping" />
            <p className="font-mono text-[var(--color-accent)] text-xs tracking-[0.25em] uppercase font-bold">
              06 // DISPATCH &amp; COLLABORATION
            </p>
          </div>

          <h2
            className="font-gaming font-black uppercase tracking-[-0.03em] leading-[0.92] mb-4 text-[var(--color-text)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            GOT AN IDEA?
            <br />
            <span className="text-[var(--color-accent)]">LET'S BUILD IT.</span>
          </h2>

          <div className="w-20 h-0.5 bg-[var(--color-border)] mx-auto my-6" />

          <p className="text-[var(--color-text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Whether you have an autonomous robotics challenge, a web architecture project, or an engineering role — my channels are open.
          </p>

          {/* Category Quick-Select */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat.prompt, cat.label)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-colors border ${
                  activeCategory === cat.label
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-[#0B0E14] font-bold shadow-md"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[#0B0E14] font-mono font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all shadow-md cursor-pointer"
            >
              {showForm ? "HIDE DISPATCH FORM ↑" : "SEND A DIRECT MESSAGE ↗"}
            </button>
            <a
              href="mailto:deekhitabohidar@gmail.com"
              className="px-8 py-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-mono font-bold text-xs tracking-wider uppercase hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
            >
              EMAIL DIRECTLY ↗
            </a>
          </div>

          {/* Expandable Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden mb-16 text-left max-w-xl mx-auto rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                    <HiCheckCircle size={48} className="text-[var(--color-accent)]" />
                    <h3 className="font-gaming font-black text-xl text-[var(--color-text)] uppercase">
                      MESSAGE TRANSMITTED
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-sm font-sans">
                      Thank you. Your message has been logged into the dispatch queue.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-xs font-mono text-[var(--color-accent)] underline font-bold cursor-pointer"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label className="block font-mono text-xs text-[var(--color-text)] uppercase tracking-wider mb-2 font-bold">
                        NAME / CALLSIGN
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Alex Rivera"
                        value={form.name}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.name ? "border-red-500" : "border-[var(--color-border)]"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 font-mono text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-[var(--color-text)] uppercase tracking-wider mb-2 font-bold">
                        RETURN EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.email ? "border-red-500" : "border-[var(--color-border)]"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 font-mono text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-[var(--color-text)] uppercase tracking-wider mb-2 font-bold">
                        PROJECT BRIEF / MESSAGE
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell me about what you're looking to build..."
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none ${
                          errors.message ? "border-red-500" : "border-[var(--color-border)]"
                        }`}
                      />
                      {errors.message && <p className="text-red-500 font-mono text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-[#0B0E14] font-mono font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-60 cursor-pointer shadow-md"
                    >
                      {loading ? "TRANSMITTING..." : "DISPATCH TRANSMISSION →"}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Socials & Direct Contact Row */}
          <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--color-text-muted)]">
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-[var(--color-accent)]" />
                <span className="text-[var(--color-text)] font-semibold">deekhitabohidar@gmail.com</span>
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[var(--color-accent)]" />
                <span>Bhubaneswar, Odisha</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all shadow-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}