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
  SiLinux,
  SiHtml5,
} from "react-icons/si";
import { TbBinaryTree, TbApi } from "react-icons/tb";
import { FaDatabase, FaCubes, FaJava } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";

// The 3 Consolidated Categories with modern software engineering skills and brand icons
const TECH_CATEGORIES = [
  {
    num: "01",
    category: "LANGUAGES & FOUNDATION",
    badge: "COMPUTATIONAL",
    summary: "High-performance algorithms, system logic & object-oriented programming",
    skills: [
      {
        name: "C++",
        icon: SiCplusplus,
        brandColor: "#00599C", // Official C++ Blue
        brandBg: "rgba(0, 89, 156, 0.14)",
        role: "COMPETITIVE & SYSTEMS",
        desc: "High-performance algorithm solving (70+ LeetCode) & memory-efficient logic",
      },
      {
        name: "Java",
        icon: FaJava,
        brandColor: "#EA2D2E", // Official Java Red
        brandBg: "rgba(234, 45, 46, 0.14)",
        role: "OOP & ENTERPRISE",
        desc: "Object-oriented software systems, JVM architecture & algorithmic problem solving",
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
        desc: "Asynchronous event loops, DOM engines & modern full-stack logic",
      },
    ],
  },
  {
    num: "02",
    category: "FRONTEND ARCHITECTURE",
    badge: "CLIENT RIG",
    summary: "Modern reactive component trees, responsive tokens & styling frameworks",
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
      {
        name: "HTML5 & Modern CSS",
        icon: SiHtml5,
        brandColor: "#E34F26", // Official HTML5 Orange
        brandBg: "rgba(227, 79, 38, 0.14)",
        role: "STANDARDS & DOM",
        desc: "Semantic document layouts, accessible typography & modern styling",
      },
    ],
  },
  {
    num: "03",
    category: "BACKEND, DATA & TOOLCHAIN",
    badge: "CORE & CLOUD",
    summary: "Data structures, relational persistence, REST endpoints & git pipelines",
    skills: [
      {
        name: "Data Structures & Algorithms",
        icon: TbBinaryTree,
        brandColor: "var(--color-accent)", // Accent Tree/Algorithm
        brandBg: "rgba(56, 189, 248, 0.14)",
        role: "PROBLEM SOLVING",
        desc: "Trees, Graphs (BFS/DFS), Dynamic Programming (70+ Solved)",
        isTree: true,
      },
      {
        name: "DBMS & Relational Data",
        icon: FaDatabase,
        brandColor: "#4479A1", // Official MySQL Blue
        brandBg: "rgba(68, 121, 161, 0.14)",
        role: "DATABASE",
        desc: "MySQL InnoDB, normalization (3NF), ACID transactions & indexes",
      },
      {
        name: "REST APIs",
        icon: TbApi,
        brandColor: "#10B981", // Emerald Green
        brandBg: "rgba(16, 185, 129, 0.14)",
        role: "NETWORK ARCHITECTURE",
        desc: "Stateless JSON endpoints, schema contracts, HTTP lifecycle & CORS",
      },
      {
        name: "Git & GitHub",
        icon: SiGithub,
        brandColor: "var(--color-text)", // Adapts to theme
        brandBg: "rgba(148, 163, 184, 0.14)",
        role: "VERSION CONTROL",
        desc: "Distributed version control, atomic branching & production pipelines",
      },
      {
        name: "Linux / Bash & VS Code",
        icon: SiLinux,
        brandColor: "#FCC624", // Linux Gold
        brandBg: "rgba(252, 198, 36, 0.14)",
        role: "DEV ENVIRONMENT",
        desc: "Shell scripting, command line utilities & modern debugger workspace",
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

  // Shifts 3 categories across the screen as user scrolls down
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      id="skills"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "240vh" }}
    >
      {/* ── Sticky Viewport ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--color-bg)] border-y border-[var(--color-border)]">
        
        {/* Top Header - Sized & Fixed as Clean Top Child */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-5 pb-3 flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-border)] gap-3 shrink-0 z-10 bg-[var(--color-bg)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
              <span className="font-mono text-xs sm:text-sm text-[var(--color-accent)] font-bold uppercase tracking-widest">
                02 // TECHNICAL ARSENAL
              </span>
            </div>
            <h2 className="font-gaming font-black text-3xl sm:text-4xl text-[var(--color-text)] uppercase tracking-tight">
              SKILLS &amp; CAPABILITIES
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-md hidden md:block font-sans">
              Structured computer science fundamentals and modern software engineering toolkit with original brand toolchains.
            </p>

            {/* Live Progress Bar */}
            <div className="font-mono text-xs text-right shrink-0">
              <span className="text-[10px] text-[var(--color-text-light)] block uppercase">HORIZONTAL TRACK</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 sm:w-28 h-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
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

        {/* ── Horizontal Track of Technical Arsenal Panels (Constrained to Available Height) ── */}
        <div className="w-full flex-1 min-h-0 flex items-center relative overflow-hidden py-3 px-6 md:px-12">
          <motion.div
            style={{ x: xTransform }}
            className="flex items-stretch gap-6 sm:gap-8 will-change-transform max-h-full"
          >
            {TECH_CATEGORIES.map((catGroup) => (
              <div
                key={catGroup.num}
                className="w-[310px] sm:w-[410px] md:w-[460px] flex-shrink-0 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl max-h-[calc(100vh-175px)]"
              >
                {/* Category Header */}
                <div className="shrink-0 pb-2.5 mb-2.5 border-b border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-accent)]">
                      // {catGroup.num}
                    </span>
                    <h3 className="font-gaming font-bold text-sm sm:text-base md:text-lg text-[var(--color-text)] uppercase tracking-wider">
                      {catGroup.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] uppercase font-semibold">
                    {catGroup.badge}
                  </span>
                </div>

                <p className="shrink-0 text-xs text-[var(--color-text-light)] mb-2.5 font-mono leading-relaxed">
                  {catGroup.summary}
                </p>

                {/* Skills Rows with Official Logos & Exact Brand Colors */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none space-y-2 pr-1">
                  {catGroup.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="p-2.5 sm:p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          {/* Actual Official Logo Container */}
                          <div
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 shadow-sm"
                            style={{
                              backgroundColor: skill.brandBg,
                              border: `1px solid ${skill.brandColor}40`,
                            }}
                          >
                            <Icon
                              size={20}
                              style={{ color: skill.brandColor }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-gaming font-bold text-xs sm:text-sm text-[var(--color-text)] flex items-center gap-2">
                              <span className="truncate">{skill.name}</span>
                              {skill.isTree && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono shrink-0">
                                  TREE ENGINE
                                </span>
                              )}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-[var(--color-text-muted)] leading-relaxed mt-0.5 font-sans line-clamp-2">
                              {skill.desc}
                            </p>

                            {/* Interactive Mini Binary Search Tree Visualizer for DSA Skill */}
                            {skill.isTree && (
                              <div className="mt-2 p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[10px]">
                                <div className="text-[9px] text-[var(--color-accent)] uppercase font-bold mb-1">
                                  BST // O(LOG N) TRAVERSAL
                                </div>
                                <div className="flex items-center justify-center py-0.5">
                                  <svg viewBox="0 0 160 52" className="w-36 h-12">
                                    {/* Tree Connector Lines */}
                                    <line x1="80" y1="11" x2="42" y2="39" stroke="var(--color-border)" strokeWidth="1.5" />
                                    <line x1="80" y1="11" x2="118" y2="39" stroke="var(--color-border)" strokeWidth="1.5" />
                                    {/* Root Node */}
                                    <circle cx="80" cy="11" r="8" fill="var(--color-accent)" />
                                    <text x="80" y="14" textAnchor="middle" fill="#0B0E14" fontSize="7" fontWeight="bold">ROOT</text>
                                    {/* Left Child Node */}
                                    <circle cx="42" cy="39" r="7.5" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
                                    <text x="42" y="42" textAnchor="middle" fill="var(--color-text)" fontSize="7" fontWeight="bold">LEFT</text>
                                    {/* Right Child Node */}
                                    <circle cx="118" cy="39" r="7.5" fill="var(--color-bg)" stroke="var(--color-accent)" strokeWidth="1.5" />
                                    <text x="118" y="42" textAnchor="middle" fill="var(--color-text)" fontSize="7" fontWeight="bold">RIGHT</text>
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Role Tag */}
                        <span className="text-[10px] font-mono text-[var(--color-text-light)] uppercase shrink-0 pt-0.5 tracking-wider hidden sm:inline">
                          {skill.role}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Card Footer Indicator */}
                <div className="shrink-0 pt-2.5 mt-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-light)]">
                  <span>STATUS: VERIFIED</span>
                  <span className="text-[var(--color-accent)] font-semibold">PANEL // ACTIVE</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Navigation Hint Bar */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-text-muted)] shrink-0 z-10 bg-[var(--color-bg)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-accent)] animate-bounce font-bold">↓</span>
            <span>SCROLL DOWN TO TRAVERSE ACROSS ALL 3 CATEGORIES</span>
          </div>
          <span className="text-xs text-[var(--color-text-light)] hidden sm:inline">
            13 PRODUCTION TECHNOLOGIES WITH BRAND LOGOS
          </span>
        </div>

      </div>
    </div>
  );
}