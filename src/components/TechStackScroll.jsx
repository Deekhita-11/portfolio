import React, { useRef } from "react";
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
import { FaDatabase, FaCubes } from "react-icons/fa";

// The 4 Categories with exact matching skills from the user screenshot, using actual brand icons and original brand colors
const TECH_CATEGORIES = [
  {
    num: "01",
    category: "LANGUAGES & SYNTAX",
    badge: "FOUNDATION",
    summary: "High-performance algorithms, system firmware & web logic",
    skills: [
      {
        name: "C++",
        icon: SiCplusplus,
        brandColor: "#00599C", // Official C++ Blue
        brandBg: "rgba(0, 89, 156, 0.14)",
        role: "COMPETITIVE & EMBEDDED",
        desc: "High-performance algorithm solving (187+ LeetCode) & hardware firmware",
      },
      {
        name: "Python",
        icon: SiPython,
        brandColor: "#3776AB", // Official Python Blue
        brandBg: "rgba(55, 118, 171, 0.14)",
        role: "AUTOMATION",
        desc: "Data logic testing, script automation & algorithm prototyping",
      },
      {
        name: "JavaScript (ES6+)",
        icon: SiJavascript,
        brandColor: "#F7DF1E", // Official JavaScript Yellow
        brandBg: "rgba(247, 223, 30, 0.14)",
        role: "WEB LOGIC",
        desc: "Asynchronous event loops, DOM engines & full-stack logic",
      },
    ],
  },
  {
    num: "02",
    category: "FRONTEND ARCHITECTURE",
    badge: "CLIENT RIG",
    summary: "Modern reactive component trees & design token frameworks",
    skills: [
      {
        name: "React 18",
        icon: SiReact,
        brandColor: "#61DAFB", // Official React Cyan
        brandBg: "rgba(97, 218, 251, 0.14)",
        role: "ARCHITECTURE",
        desc: "Component lifecycle, concurrent transitions & state orchestration",
      },
      {
        name: "Vite",
        icon: SiVite,
        brandColor: "#646CFF", // Official Vite Purple
        brandBg: "rgba(100, 108, 255, 0.14)",
        role: "BUILD TOOL",
        desc: "Sub-second dev server HMR & optimized Rollup bundling",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        brandColor: "#06B6D4", // Official Tailwind Cyan
        brandBg: "rgba(6, 182, 212, 0.14)",
        role: "DESIGN SYSTEMS",
        desc: "Design token systems, responsive utility grids & layouts",
      },
    ],
  },
  {
    num: "03",
    category: "CORE ENGINE & MODELS",
    badge: "ALGORITHMS",
    summary: "Problem solving, data structures and relational persistence",
    skills: [
      {
        name: "Data Structures & Algorithms",
        icon: TbBinaryTree,
        brandColor: "var(--color-accent)", // Accent Tree/Algorithm
        brandBg: "rgba(56, 189, 248, 0.14)",
        role: "PROBLEM SOLVING",
        desc: "Trees, Graphs (BFS/DFS), Dynamic Programming (187+ Solved)",
        isTree: true,
      },
      {
        name: "Object-Oriented Programming",
        icon: FaCubes,
        brandColor: "#A855F7", // Purple Architecture
        brandBg: "rgba(168, 85, 247, 0.14)",
        role: "SOFTWARE DESIGN",
        desc: "Encapsulation, modularity, abstraction & design patterns",
      },
      {
        name: "DBMS & Relational Data",
        icon: FaDatabase,
        brandColor: "#4479A1", // Official MySQL Blue
        brandBg: "rgba(68, 121, 161, 0.14)",
        role: "DATABASE",
        desc: "MySQL InnoDB, normalization (3NF), ACID transactions & indexes",
      },
    ],
  },
  {
    num: "04",
    category: "TOOLCHAIN & COLLABORATION",
    badge: "WORKBENCH",
    summary: "Distributed version control, API testing & autonomous robotics",
    skills: [
      {
        name: "Git & GitHub",
        icon: SiGithub,
        brandColor: "var(--color-text)", // Adapts to theme
        brandBg: "rgba(148, 163, 184, 0.14)",
        role: "VERSION CONTROL",
        desc: "Distributed version control, atomic branching & 284+ commits",
      },
      {
        name: "Postman",
        icon: SiPostman,
        brandColor: "#FF6C37", // Official Postman Orange
        brandBg: "rgba(255, 108, 55, 0.14)",
        role: "API TESTING",
        desc: "REST endpoint testing, schema contract validation & mocking",
      },
      {
        name: "Arduino & Sensors",
        icon: SiArduino,
        brandColor: "#00979D", // Official Arduino Teal
        brandBg: "rgba(0, 151, 157, 0.14)",
        role: "ROBOTICS",
        desc: "Differential drive PID control & hardware sensor arrays",
      },
    ],
  },
];

export default function TechStackScroll() {
  const containerRef = useRef(null);

  // Hook scroll: translate tall vertical scroll container into horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Shifts categories across the screen as user scrolls down
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      id="skills"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "320vh" }}
    >
      {/* ── Sticky Viewport ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--color-bg)] border-y border-[var(--color-border)]">
        
        {/* Top Header matching the user screenshot layout with enlarged fonts */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-4 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-border)] gap-4 z-20 bg-[var(--color-bg)]/90 backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
              <span className="font-mono text-xs sm:text-sm text-[var(--color-accent)] font-bold uppercase tracking-widest">
                02 // TECHNICAL ARSENAL
              </span>
            </div>
            <h2 className="font-gaming font-black text-4xl sm:text-5xl text-[var(--color-text)] uppercase tracking-tight">
              SKILLS &amp; CAPABILITIES
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-md hidden sm:block font-sans">
              Structured computer science fundamentals and modern software engineering toolkit with original brand toolchains.
            </p>

            {/* Live Progress Bar */}
            <div className="font-mono text-xs text-right">
              <span className="text-[11px] text-[var(--color-text-light)] block uppercase">HORIZONTAL TRACK</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-28 h-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--color-accent)]"
                    style={{ width: useTransform(progressPercent, (v) => `${v}%`) }}
                  />
                </div>
                <motion.span className="text-xs font-bold text-[var(--color-accent)]">
                  {useTransform(progressPercent, (v) => `${Math.round(v)}%`)}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal Track of Technical Arsenal Panels ── */}
        <div className="w-full flex-1 flex items-center relative overflow-hidden py-4">
          <motion.div
            style={{ x: xTransform }}
            className="flex items-stretch gap-8 px-6 md:px-12 will-change-transform"
          >
            {TECH_CATEGORIES.map((catGroup) => (
              <div
                key={catGroup.num}
                className="w-[380px] sm:w-[480px] md:w-[520px] flex-shrink-0 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                {/* Category Header */}
                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[var(--color-accent)]">
                        // {catGroup.num}
                      </span>
                      <h3 className="font-gaming font-bold text-base sm:text-lg text-[var(--color-text)] uppercase tracking-wider">
                        {catGroup.category}
                      </h3>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] uppercase font-semibold">
                      {catGroup.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-text-light)] mb-6 font-mono">
                    {catGroup.summary}
                  </p>

                  {/* Skills Rows with Official Logos & Exact Brand Colors */}
                  <div className="space-y-4">
                    {catGroup.skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 transition-all flex items-start justify-between gap-4 group"
                        >
                          <div className="flex items-start gap-4">
                            {/* Actual Official Logo Container */}
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 shadow-sm"
                              style={{
                                backgroundColor: skill.brandBg,
                                border: `1px solid ${skill.brandColor}40`,
                              }}
                            >
                              <Icon
                                size={24}
                                style={{ color: skill.brandColor }}
                              />
                            </div>

                            <div>
                              <h4 className="font-gaming font-bold text-base text-[var(--color-text)] flex items-center gap-2">
                                <span>{skill.name}</span>
                                {skill.isTree && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono">
                                    TREE ENGINE
                                  </span>
                                )}
                              </h4>
                              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed mt-1 font-sans">
                                {skill.desc}
                              </p>

                              {/* Interactive Mini Binary Search Tree Visualizer for DSA Skill */}
                              {skill.isTree && (
                                <div className="mt-3 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[11px]">
                                  <div className="text-[10px] text-[var(--color-accent)] uppercase font-bold mb-1">
                                    BINARY SEARCH TREE // O(LOG N) TRAVERSAL
                                  </div>
                                  <div className="flex items-center justify-center py-1">
                                    <svg viewBox="0 0 160 65" className="w-44 h-16">
                                      {/* Tree Connector Lines */}
                                      <line x1="80" y1="14" x2="40" y2="46" stroke="var(--color-border)" strokeWidth="1.5" />
                                      <line x1="80" y1="14" x2="120" y2="46" stroke="var(--color-border)" strokeWidth="1.5" />
                                      {/* Root Node */}
                                      <circle cx="80" cy="14" r="10" fill="var(--color-accent)" />
                                      <text x="80" y="18" textAnchor="middle" fill="#0B0E14" fontSize="9" fontWeight="bold">ROOT</text>
                                      {/* Left Child Node */}
                                      <circle cx="40" cy="46" r="9" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
                                      <text x="40" y="50" textAnchor="middle" fill="var(--color-text)" fontSize="8" fontWeight="bold">LEFT</text>
                                      {/* Right Child Node */}
                                      <circle cx="120" cy="46" r="9" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
                                      <text x="120" y="50" textAnchor="middle" fill="var(--color-text)" fontSize="8" fontWeight="bold">RIGHT</text>
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Role Tag */}
                          <span className="text-xs font-mono text-[var(--color-text-light)] uppercase shrink-0 pt-1 tracking-wider hidden sm:inline">
                            {skill.role}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Indicator */}
                <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-light)]">
                  <span>STATUS: VERIFIED</span>
                  <span className="text-[var(--color-accent)] font-semibold">3 SUBSYSTEMS LOADED</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Navigation Hint Bar */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-text-muted)] z-20 bg-[var(--color-bg)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-accent)] animate-bounce font-bold">↓</span>
            <span>SCROLL DOWN TO TRAVERSE ACROSS ALL 4 CATEGORIES</span>
          </div>
          <span className="text-xs text-[var(--color-text-light)] hidden sm:inline">
            12 PRODUCTION TECHNOLOGIES WITH BRAND LOGOS
          </span>
        </div>

      </div>
    </div>
  );
}