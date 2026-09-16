import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiArrowDown, FiFileText, FiTerminal } from "react-icons/fi";

const DISCIPLINES = ["WEB SYSTEMS", "AUTONOMOUS ROBOTICS", "ALGORITHMS & DSA"];

// Interactive Bio Terminal Lines
const TERMINAL_LINES = [
  { cmd: "whoami", out: "deekhita_bohidar // 3rd_year_b.tech_cse @ xim_university" },
  { cmd: "cat current_focus.log", out: "building blood management system & real-world relational apps" },
  { cmd: "cat leadership.md", out: "coordinator @ robogenix (robotics & iot club) · treasurer @ ieee" },
  { cmd: "echo $INTERESTS", out: "solving dsa (187+ leetcode), full-stack web architectures, hardware kinematics" },
  { cmd: "status", out: "READY_TO_BUILD // OPEN FOR INTERNSHIPS & COLLABORATION", accent: true },
];

export default function RetroHero() {
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [terminalLineIndex, setTerminalLineIndex] = useState(0);

  // 3D Perspective Tilt Refs & State
  const containerRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex((prev) => (prev + 1) % DISCIPLINES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalLineIndex((prev) => (prev < TERMINAL_LINES.length ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  // 3D Mouse Parallax Movement
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setRotateX(-y * 4); // Subtle 4 degree tilt
    setRotateY(x * 4);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[92vh] flex flex-col items-center justify-center relative overflow-hidden pt-20 pb-16 px-6 lg:px-12"
    >
      <div
        ref={containerRef}
        style={{ perspective: 1200 }}
        className="w-full max-w-[1400px] mx-auto z-10"
      >
        {/* 3D Motion Container */}
        <motion.div
          animate={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="w-full will-change-transform"
        >
          {/* Top Folio Status Bar */}
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-muted)] mb-8 shadow-sm w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
            <span className="text-[var(--color-accent)] font-bold">ACTIVE</span>
            <span className="text-[var(--color-border)]">/</span>
            <span>3RD YEAR B.TECH CSE @ XIM UNIVERSITY</span>
            <span className="text-[var(--color-border)] hidden sm:inline">/</span>
            <span className="text-[var(--color-warm)] font-semibold hidden sm:inline">8.68 CGPA</span>
          </div>

          {/* ── 2-Column Side-By-Side Layout (Left: Name & Bio, Right: Interactive Terminal) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 text-left">
            
            {/* Left Column: Stacked Name, Headline, and Bio (6 cols on lg) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Stacked Name Headline */}
              <h1 className="font-gaming font-black text-5xl sm:text-6xl md:text-7xl xl:text-8xl uppercase tracking-tighter text-[var(--color-text)] leading-[0.9] drop-shadow-sm">
                <span className="block">DEEKHITA</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] via-[#38BDF8] to-[var(--color-warm)]">
                  BOHIDAR
                </span>
              </h1>

              {/* Dynamic Discipline Transition */}
              <div className="font-mono text-lg sm:text-xl text-[var(--color-text-muted)] flex items-center gap-2">
                <span className="text-[var(--color-accent)] font-semibold">I BUILD:</span>
                <div className="relative flex min-w-[220px] font-bold text-[var(--color-text)]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={disciplineIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-[var(--color-accent)] uppercase tracking-wider"
                    >
                      [{DISCIPLINES[disciplineIndex]}]
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Enlarged Bio Paragraph */}
              <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-sans leading-relaxed">
                Third-year Computer Science undergraduate at XIM University, Bhubaneswar. Coordinator at RobogeniX Club, working on full-stack systems to solve real-world problems with high-performance algorithms.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#skills"
                  data-cursor="explore"
                  className="px-6 py-3.5 rounded-xl bg-[var(--color-accent)] text-[#0B0E14] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md flex items-center gap-2"
                >
                  <span>Explore Tech Stack</span>
                  <FiArrowDown />
                </a>

                <a
                  href="#projects"
                  data-cursor="explore"
                  className="px-6 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <span className="text-[var(--color-accent)]">→</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <span>Resume.pdf</span>
                  <FiFileText size={15} />
                </a>
              </div>

              {/* Social Badges */}
              <div className="flex items-center gap-3 pt-2 text-[var(--color-text-muted)]">
                <a
                  href="https://github.com/Deekhita-11/Deekhita-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://leetcode.com/u/Deekhita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-warm)] hover:text-[var(--color-warm)] transition-all shadow-sm"
                >
                  <SiLeetcode size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Terminal (6 cols on lg) - SIDE BY SIDE */}
            <div className="lg:col-span-6 w-full">
              <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl text-left">
                {/* Terminal Window Top Bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] font-mono text-xs text-[var(--color-text-light)]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 font-semibold text-[var(--color-text)] text-xs">
                      deekhita@workstation: ~/bio
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-light)]">
                    <FiTerminal size={13} />
                    <span>BASH 5.2</span>
                  </span>
                </div>

                {/* Terminal Body with Real Biographical Background */}
                <div className="p-6 font-mono text-xs sm:text-sm space-y-3 min-h-[280px]">
                  {TERMINAL_LINES.slice(0, terminalLineIndex).map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-[var(--color-accent)] font-semibold">
                        <span>$</span>
                        <span className="text-[var(--color-text)]">{item.cmd}</span>
                      </div>
                      <div
                        className={`pl-4 leading-relaxed ${
                          item.accent
                            ? "text-[var(--color-accent)] font-bold tracking-wider"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        → {item.out}
                      </div>
                    </div>
                  ))}
                  <div className="inline-block w-2.5 h-4 bg-[var(--color-accent)] animate-pulse" />
                </div>

                {/* Terminal Bottom Status Bar */}
                <div className="px-5 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-light)]">
                  <span>UTF-8 // UNIX</span>
                  <span className="text-[var(--color-accent)]">● BENCH_ONLINE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Key Metric Chips Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">ACADEMICS</span>
              <span className="font-bold text-base text-[var(--color-text)]">8.68 CGPA</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">ROBOGENIX</span>
              <span className="font-bold text-base text-[var(--color-accent)]">COORDINATOR</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">DRDO ICORT</span>
              <span className="font-bold text-base text-[var(--color-warm)]">2ND PRIZE 2025</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center shadow-sm">
              <span className="text-xs text-[var(--color-text-light)] block mb-1 uppercase font-bold">LEETCODE</span>
              <span className="font-bold text-base text-[var(--color-accent)]">187+ SOLVED</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}