import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiArduino,
} from "react-icons/si";
import { TbBinaryTree } from "react-icons/tb";
import { FaDatabase, FaCubes, FaArrowRight, FaCode, FaCheckCircle, FaLaptopCode, FaRocket } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";

export default function TechStack() {
  const containerRef = useRef(null);
  const [activeInfo, setActiveInfo] = useState({
    title: "C++",
    layer: "FOUNDATION",
    desc: "Primary language for high-performance algorithm solving (187+ LeetCode) and microcontroller systems.",
  });

  // Vertical scroll translates into horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move horizontally across 5 panels (0% to -80%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["10%", "100%"]);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative h-[450vh] border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 px-6 md:px-12 z-10">
        
        {/* Top Header & Scroll Prompt */}
        <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-[0.2em] mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span>04 / TECHNICAL ARSENAL</span>
            </div>
            <h2
              className="font-heading font-black tracking-tight text-[var(--color-text)]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
            >
              How I Build &amp; Architect Systems
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono text-[var(--color-accent)] font-semibold block">
                SCROLL DOWN TO EXPLORE →
              </span>
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                HORIZONTAL PIPELINE
              </span>
            </div>
            {/* Visual Scroll Tracker Bar */}
            <div className="w-32 h-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_var(--color-accent)]"
              />
            </div>
          </div>
        </div>

        {/* ── HORIZONTALLY TRANSLATING TRACK ── */}
        <div className="relative flex-1 flex items-center my-auto overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex items-center gap-8 pl-4 pr-32"
          >
            
            {/* ══════════════════════════════════════════════════════════
                PANEL 01: FOUNDATION (LANGUAGE STACK)
            ══════════════════════════════════════════════════════════ */}
            <div className="w-[85vw] max-w-[560px] shrink-0 eng-card p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl flex flex-col justify-between h-[480px]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-xs">
                      01 / FOUNDATION
                    </span>
                    <span className="font-heading font-black text-lg text-[var(--color-text)]">
                      Language Stack
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">CORE SYNTAX</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mb-8 font-sans leading-relaxed">
                  Syntactic mastery that bridges competitive algorithmic performance, backend logic, and hardware control loops.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {/* C++ */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "C++",
                        layer: "FOUNDATION",
                        desc: "High-performance algorithm solving (187+ LeetCode), memory layout, and Arduino hardware controllers.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <SiCplusplus size={24} className="text-[#3B82F6]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">C++</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Problem Solving</span>
                  </div>

                  {/* Python */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "Python",
                        layer: "FOUNDATION",
                        desc: "Rapid algorithmic prototyping, test automation, and numerical problem deconstruction.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <SiPython size={24} className="text-[#3B82F6]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">Python</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Automation</span>
                  </div>

                  {/* JavaScript */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "JavaScript (ES6+)",
                        layer: "FOUNDATION",
                        desc: "Modern asynchronous workflows, promises, DOM engines, and event-driven architectures.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <SiJavascript size={24} className="text-[#E2B366]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">JavaScript</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Web Logic</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>STABILITY: PRODUCTION TESTED</span>
                <span className="text-[var(--color-accent)]">NEXT: FRONTEND →</span>
              </div>
            </div>

            {/* Connector Arrow */}
            <div className="shrink-0 flex items-center justify-center text-[var(--color-accent)] opacity-60">
              <FaArrowRight size={20} />
            </div>

            {/* ══════════════════════════════════════════════════════════
                PANEL 02: FRONTEND LAYER
            ══════════════════════════════════════════════════════════ */}
            <div className="w-[85vw] max-w-[560px] shrink-0 eng-card p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl flex flex-col justify-between h-[480px]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-xs">
                      02 / CLIENT
                    </span>
                    <span className="font-heading font-black text-lg text-[var(--color-text)]">
                      Frontend Layer
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">REACTIVE VIEWPORT</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mb-8 font-sans leading-relaxed">
                  Fast sub-second compilation, component encapsulation, declarative hooks, and modern utility-first CSS systems.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {/* React */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "React 18",
                        layer: "FRONTEND LAYER",
                        desc: "Component lifecycle, concurrent transitions, state orchestration, and custom hook ecosystems.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <SiReact size={24} className="text-[#00D8FF]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">React</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Architecture</span>
                  </div>

                  {/* Vite */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "Vite",
                        layer: "FRONTEND LAYER",
                        desc: "Lightning fast Hot Module Replacement, optimized Rollup bundling, and modern ES module builds.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <SiVite size={24} className="text-[#9333EA]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">Vite</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Dev &amp; Build</span>
                  </div>

                  {/* Tailwind */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "Tailwind CSS",
                        layer: "FRONTEND LAYER",
                        desc: "Utility-first design tokens, responsive breakpoints, and strict theme token customization.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <SiTailwindcss size={24} className="text-[#38BDF8]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">Tailwind</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Design System</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>UI COMPOSITION: MODULAR</span>
                <span className="text-[var(--color-accent)]">NEXT: CORE ENGINE →</span>
              </div>
            </div>

            {/* Connector Arrow */}
            <div className="shrink-0 flex items-center justify-center text-[var(--color-accent)] opacity-60">
              <FaArrowRight size={20} />
            </div>

            {/* ══════════════════════════════════════════════════════════
                PANEL 03: CORE ENGINE (DSA + OOP + DBMS)
            ══════════════════════════════════════════════════════════ */}
            <div className="w-[85vw] max-w-[560px] shrink-0 eng-card p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl flex flex-col justify-between h-[480px]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-xs">
                      03 / CORE ENGINE
                    </span>
                    <span className="font-heading font-black text-lg text-[var(--color-text)]">
                      Algorithmic Engine
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">LOGIC &amp; MODELS</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mb-8 font-sans leading-relaxed">
                  Rigorous computer science fundamentals: asymptotic efficiency, object abstraction, and ACID relational schema guarantees.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {/* DSA */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "DSA (187+ Solved)",
                        layer: "CORE ENGINE",
                        desc: "Trees, Graphs (BFS/DFS), Dynamic Programming, Binary Search, Sliding Window, and Monotonic Stacks.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <TbBinaryTree size={24} className="text-[#3B82F6]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">DSA</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">187+ Solved</span>
                  </div>

                  {/* OOP */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "OOP Design",
                        layer: "CORE ENGINE",
                        desc: "Encapsulation, inheritance, polymorphism, interface segregation, and design patterns.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <FaCubes size={22} className="text-[#60A5FA]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">OOP</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">Architecture</span>
                  </div>

                  {/* DBMS */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "DBMS & Relational Data",
                        layer: "CORE ENGINE",
                        desc: "MySQL InnoDB, 3NF normalization, foreign key constraints, indexes, and transactional consistency.",
                      })
                    }
                    className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-12 h-12 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all">
                      <FaDatabase size={20} className="text-[#00758F]" />
                    </div>
                    <span className="font-heading font-bold text-sm text-[var(--color-text)] block">DBMS</span>
                    <span className="text-[11px] font-mono text-[var(--color-accent)] block mt-1">MySQL / ACID</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>COMPLEXITY: O(N) / OPTIMIZED</span>
                <span className="text-[var(--color-accent)]">NEXT: TOOLCHAIN →</span>
              </div>
            </div>

            {/* Connector Arrow */}
            <div className="shrink-0 flex items-center justify-center text-[var(--color-accent)] opacity-60">
              <FaArrowRight size={20} />
            </div>

            {/* ══════════════════════════════════════════════════════════
                PANEL 04: TOOLCHAIN (DEVELOPMENT LOOP)
            ══════════════════════════════════════════════════════════ */}
            <div className="w-[85vw] max-w-[560px] shrink-0 eng-card p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl flex flex-col justify-between h-[480px]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-xs">
                      04 / TOOLCHAIN
                    </span>
                    <span className="font-heading font-black text-lg text-[var(--color-text)]">
                      Engineering Loop
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">WORKFLOW &amp; CI</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mb-8 font-sans leading-relaxed">
                  Version control hygiene, automated debugging, API contracts, and team collaboration workflows.
                </p>

                <div className="grid grid-cols-4 gap-3">
                  {/* Git */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "Git",
                        layer: "TOOLCHAIN",
                        desc: "Branching strategies, clean commit histories, rebase workflows, and conflict resolution.",
                      })
                    }
                    className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-2 group-hover:scale-110 transition-all">
                      <SiGit size={20} className="text-[#F05032]" />
                    </div>
                    <span className="font-heading font-bold text-xs text-[var(--color-text)] block">Git</span>
                  </div>

                  {/* VS Code */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "VS Code",
                        layer: "TOOLCHAIN",
                        desc: "Integrated terminal, debugging configurations, ESLint, Prettier, and snippet tooling.",
                      })
                    }
                    className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-2 group-hover:scale-110 transition-all">
                      <VscCode size={20} className="text-[#007ACC]" />
                    </div>
                    <span className="font-heading font-bold text-xs text-[var(--color-text)] block">VS Code</span>
                  </div>

                  {/* Postman */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "Postman",
                        layer: "TOOLCHAIN",
                        desc: "REST endpoint verification, payload mock tests, and status code assertion testing.",
                      })
                    }
                    className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-2 group-hover:scale-110 transition-all">
                      <SiPostman size={20} className="text-[#FF6C37]" />
                    </div>
                    <span className="font-heading font-bold text-xs text-[var(--color-text)] block">Postman</span>
                  </div>

                  {/* GitHub */}
                  <div
                    onMouseEnter={() =>
                      setActiveInfo({
                        title: "GitHub",
                        layer: "TOOLCHAIN",
                        desc: "Repository management, open source collaboration, and automated deployments.",
                      })
                    }
                    className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group text-center"
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-2 group-hover:scale-110 transition-all">
                      <SiGithub size={20} className="text-[var(--color-text)]" />
                    </div>
                    <span className="font-heading font-bold text-xs text-[var(--color-text)] block">GitHub</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>COLLABORATION: 284+ COMMITS</span>
                <span className="text-[var(--color-accent)]">NEXT: OUTPUT SYSTEMS →</span>
              </div>
            </div>

            {/* Connector Arrow */}
            <div className="shrink-0 flex items-center justify-center text-[var(--color-accent)] opacity-60">
              <FaArrowRight size={20} />
            </div>

            {/* ══════════════════════════════════════════════════════════
                PANEL 05: DELIVERED SYSTEMS & HARDWARE
            ══════════════════════════════════════════════════════════ */}
            <div className="w-[85vw] max-w-[560px] shrink-0 eng-card p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl flex flex-col justify-between h-[480px]">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-xs">
                      05 / IMPACT
                    </span>
                    <span className="font-heading font-black text-lg text-[var(--color-text)]">
                      Delivered Systems
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">PRODUCTION OUTPUT</span>
                </div>

                <p className="text-sm text-[var(--color-text-muted)] mb-6 font-sans leading-relaxed">
                  Real implementations where algorithms, frontend interfaces, relational storage, and embedded hardware converge.
                </p>

                <div className="space-y-3">
                  <div
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-heading font-bold text-sm text-[var(--color-text)] block">
                        Blood Management System
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] font-mono">
                        React 18 · Vite · Tailwind · REST API
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">VIEW ↗</span>
                  </div>

                  <div
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-heading font-bold text-sm text-[var(--color-text)] block">
                        Period Tracker
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] font-mono">
                        Cycle Estimation Engine · MySQL
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">VIEW ↗</span>
                  </div>

                  <div
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-heading font-bold text-sm text-[var(--color-text)] block">
                        Line Follower Bot (ICORT 2025 DRDO)
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)] font-mono">
                        Arduino C/C++ · PID Controller · Sensors
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">VIEW ↗</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>STATUS: 4 SYSTEMS LIVE</span>
                <span className="text-[var(--color-accent)] font-bold">ALL ARCHITECTURES VERIFIED ✓</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* ── Bottom Interactive Inspection Telemetry ── */}
        <div className="max-w-[1400px] w-full mx-auto p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider">
              INSPECTED NODE:
            </span>
            <span className="font-bold text-[var(--color-text)] text-sm">
              {activeInfo.title}
            </span>
            <span className="text-[var(--color-text-muted)] hidden md:inline">
              — {activeInfo.desc}
            </span>
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] font-semibold shrink-0">
            LAYER: <span className="text-[var(--color-accent)]">{activeInfo.layer}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
