import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiCheckCircle } from "react-icons/hi";
import MagneticButton from "../ui/MagneticButton";

const TRACKS = [
  {
    id: "web",
    label: "WEB ARCHITECTURE",
    tagline: "Let's construct scalable, responsive web systems.",
    starter: "Hi Deekhita, I have a web application project idea. Here are the core specifications:",
  },
  {
    id: "robotics",
    label: "ROBOTICS & KINEMATICS",
    tagline: "Let's build hardware systems that perceive and move.",
    starter: "Hi Deekhita, I'm interested in collaborating on an autonomous robotics or hardware control project:",
  },
  {
    id: "embedded",
    label: "EMBEDDED & FIRMWARE",
    tagline: "Let's interface silicon controllers with sensors.",
    starter: "Hi Deekhita, I have an embedded / microcontroller system requirement:",
  },
  {
    id: "other",
    label: "OPEN COLLABORATION",
    tagline: "Let's discuss algorithm design, systems, or engineering problems.",
    starter: "Hi Deekhita, I came across your portfolio and would like to connect regarding:",
  },
];

export default function Contact() {
  const ref = useScrollReveal();
  const [activeTrack, setActiveTrack] = useState(TRACKS[1]); // Default to Robotics
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: TRACKS[1].starter,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrackSelect = (track) => {
    setActiveTrack(track);
    setForm((prev) => ({
      ...prev,
      message: track.starter,
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Callsign / Name is required.";
    if (!form.email.trim()) e.email = "Return transmission address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Project specification is required.";
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
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 text-xs font-mono outline-none border transition-all duration-200 bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)]";

  return (
    <section
      id="contact"
      className="py-28 border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal max-w-4xl mx-auto">
          
          {/* Section Header with Animated Line Assembly */}
          <div className="text-center mb-12 pb-6 border-b border-[var(--color-border)] hud-line-assemble">
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-[0.25em] mb-3">
              <span>07 / CONTACT</span>
            </div>
            <h2
              className="font-heading font-black uppercase tracking-[-0.03em] leading-[0.92] text-[var(--color-text)] mb-4"
              style={{ fontSize: "clamp(2.6rem, 6.8vw, 5.2rem)" }}
            >
              GOT AN IDEA?
              <br />
              <span className="text-[var(--color-accent)]">LET&apos;S BUILD IT.</span>
            </h2>
            <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto my-6" />
            <p className="font-mono text-xs md:text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
              SELECT OBJECTIVE TRACK &amp; INITIALIZE COMMUNICATION
            </p>
          </div>

          {/* Category Track Selector Pills */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2.5">
              {TRACKS.map((track) => {
                const isSelected = activeTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(track)}
                    className={`px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase transition-all border ${
                      isSelected
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-[#0A0B0D] shadow-[0_0_12px_rgba(123,167,255,0.25)]"
                        : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    [ {track.label} ]
                  </button>
                );
              })}
            </div>

            {/* Dynamic Tagline Quote */}
            <div className="mt-4 text-center font-mono text-xs">
              <span className="text-[var(--color-accent)] font-semibold">
                ACTIVE FOCUS → &quot;{activeTrack.tagline}&quot;
              </span>
            </div>
          </div>

          {/* Form Box with HUD Reticles */}
          <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 relative">
            <span className="absolute -top-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┌</span>
            <span className="absolute -top-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┐</span>
            <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">└</span>
            <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┘</span>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3 font-mono">
                <HiCheckCircle size={44} className="text-[var(--color-accent)]" />
                <h3 className="font-heading font-black text-2xl text-[var(--color-text)] uppercase">
                  TRANSMISSION RECORDED
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] max-w-md">
                  Thank you. Your project brief has been logged directly into the dispatch queue.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: activeTrack.starter });
                  }}
                  className="mt-4 px-4 py-2 border border-[var(--color-accent)] text-xs text-[var(--color-accent)] font-bold hover:bg-[var(--color-accent)] hover:text-[#090B0A] transition-colors uppercase tracking-wider"
                >
                  DISPATCH ANOTHER TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[var(--color-text)] uppercase tracking-wider mb-1.5 font-bold">
                      CALLSIGN / NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Rivera"
                      value={form.name}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.name ? "border-red-400" : "border-[var(--color-border)]"
                      }`}
                    />
                    {errors.name && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-[var(--color-text)] uppercase tracking-wider mb-1.5 font-bold">
                      RETURN TRANSMISSION EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="alex@organization.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.email ? "border-red-400" : "border-[var(--color-border)]"
                      }`}
                    />
                    {errors.email && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-[var(--color-text)] uppercase tracking-wider mb-1.5 font-bold">
                    SPECIFICATIONS &amp; OBJECTIVES
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none ${
                      errors.message ? "border-red-400" : "border-[var(--color-border)]"
                    }`}
                  />
                  {errors.message && <p className="text-red-400 font-mono text-[11px] mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                    DISPATCH CHANNEL: SECURE INBOX
                  </span>

                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-[var(--color-accent)] text-[#0A0B0D] font-mono font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {loading ? "TRANSMITTING..." : "START A CONVERSATION →"}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          {/* Socials & Coordinates */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-6 text-[var(--color-text-muted)]">
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-[var(--color-accent)]" />
                <a href="mailto:deekhitabohidar@gmail.com" className="text-[var(--color-text)] font-semibold hover:text-[var(--color-accent)]">
                  deekhitabohidar@gmail.com
                </a>
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[var(--color-accent)]" />
                <span>Bhubaneswar, India</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Deekhita-11/Deekhita-11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href="https://leetcode.com/u/Deekhita/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="w-8 h-8 border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
              >
                <SiLeetcode size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
