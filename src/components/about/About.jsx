import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FaFilePdf, FaAward, FaGraduationCap, FaUsers } from "react-icons/fa";
import MagneticButton from "../ui/MagneticButton";

const EDUCATION = [
  {
    institution: "XIM University, Bhubaneswar",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2024 — 2028",
    score: "CGPA: 8.68 / 10.0",
    active: true,
  },
  {
    institution: "Delhi Public School, Damanjodi",
    degree: "Senior Secondary (Class XII) · CBSE",
    period: "2022 — 2024",
    score: "88.2%",
    active: false,
  },
  {
    institution: "Delhi Public School, Damanjodi",
    degree: "Secondary School (Class X) · CBSE",
    period: "2020 — 2022",
    score: "94.0%",
    active: false,
  },
];

const ACHIEVEMENTS = [
  {
    title: "ICORT 2025 — ITR-DRDO Chandipur",
    desc: "2nd Position at Student Project Exhibition, 4th International Conference on Range Technology for Autonomous Line Follower Robot.",
    badge: "DRDO EXHIBITION 2ND",
  },
  {
    title: "RobogeniX Club — Coordinator",
    desc: "Secretary / Coordinator driving hardware workshops, autonomous robotics track design, and microcontroller bootcamps.",
    badge: "CLUB LEADERSHIP",
  },
  {
    title: "IEEE Student Branch — Treasurer",
    desc: "Managing finances, event allocations, and student symposiums across IEEE WIE and IEEE Computer Society chapters.",
    badge: "IEEE EXECUTIVE",
  },
  {
    title: "IIT Bhubaneswar Inter-College",
    desc: "2nd Position in Basketball Tournament (2024), demonstrating team coordination and competitive athletic discipline.",
    badge: "ATHLETICS 2ND",
  },
];

const METHODOLOGY_STEPS = [
  { step: "01", name: "THINK", detail: "Deconstruct constraints, examine edge bounds, and analyze time/space bottlenecks." },
  { step: "02", name: "SOLVE", detail: "Formulate algorithmic logic, select optimal data structures, and eliminate redundancy." },
  { step: "03", name: "BUILD", detail: "Write clean, modular code with robust architectures and physical hardware integration." },
  { step: "04", name: "IMPROVE", detail: "Benchmark execution, refactor bottlenecks, and iterate continuously." },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      className="py-24 border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Section Header with Animated Line Assembly */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-[var(--color-border)] hud-line-assemble">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-[0.25em] mb-2">
                <span>06 / ABOUT</span>
              </div>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)] max-w-2xl leading-none"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
              >
                I LIKE SOLVING HARD PROBLEMS.
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--color-text-muted)]">
              PROFILE SPECIFICATION // DEEKHITA BOHIDAR
            </div>
          </div>

          {/* ── Main 12-Column Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* Left 7 cols: Bio & Methodology */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Tactical Status Tags */}
              <div className="flex flex-wrap gap-2 font-mono text-xs text-[var(--color-accent)] font-bold">
                <span className="px-2.5 py-1 border border-[var(--color-border)] bg-[var(--color-surface)]">
                  PROBLEM SOLVER
                </span>
                <span className="px-2.5 py-1 border border-[var(--color-border)] bg-[var(--color-surface)]">
                  DSA SPECIALIST
                </span>
                <span className="px-2.5 py-1 border border-[var(--color-border)] bg-[var(--color-surface)]">
                  SOFTWARE &amp; EMBEDDED
                </span>
              </div>

              {/* Exact Bio Text */}
              <div className="space-y-4 text-[var(--color-text)] text-sm md:text-base leading-relaxed">
                <p>
                  I’m a developer who genuinely enjoys <strong className="text-[var(--color-accent)] font-bold">solving problems and understanding the logic behind them</strong>.
                </p>
                <p className="text-[var(--color-text-muted)]">
                  A big part of what I enjoy is <strong className="text-[var(--color-text)]">Data Structures and Algorithms</strong> — breaking a complex problem down, finding patterns, thinking about different approaches, and figuring out how to make a solution more efficient. For me, coding is not just about making something work; it’s about understanding <em>why</em> it works and how it can work better.
                </p>
                <p className="text-[var(--color-text-muted)]">
                  I also enjoy turning those ideas into real applications, particularly through web development and software projects. I like building things from the ground up, experimenting with different approaches, and constantly improving the way I write and structure my code.
                </p>
                <p className="text-[var(--color-text-muted)]">
                  I’m always learning, solving, building, and looking for the next problem worth figuring out.
                </p>
              </div>

              {/* 4-Step Methodology Pipeline: THINK -> SOLVE -> BUILD -> IMPROVE */}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <span className="font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-widest block mb-4">
                  // OPERATIONAL DOCTRINE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  {METHODOLOGY_STEPS.map((m) => (
                    <div
                      key={m.step}
                      className="p-3.5 border border-[var(--color-border)] bg-[var(--color-surface)]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[var(--color-accent)] text-xs font-bold">{m.step}</span>
                        <span className="text-[var(--color-text)] text-xs font-black tracking-wider">{m.name}</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-normal">
                        {m.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CV Action Link */}
              <div className="pt-2">
                <MagneticButton>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)] font-mono text-xs font-bold hover:bg-[var(--color-accent)] hover:text-[#0A0B0D] transition-colors uppercase tracking-wider"
                  >
                    <FaFilePdf size={14} />
                    <span>DOWNLOAD CURRICULUM VITAE (PDF) ↗</span>
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Right 5 cols: Credentials & Education Ledger */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Education Ledger */}
              <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 relative">
                <span className="absolute -top-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┌</span>
                <span className="absolute -top-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┐</span>
                <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">└</span>
                <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┘</span>

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider pb-3 mb-4 border-b border-[var(--color-border)]">
                  <FaGraduationCap size={15} />
                  <span>ACADEMIC FOUNDATION</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {EDUCATION.map((edu, i) => (
                    <div
                      key={i}
                      className={`pb-3 ${i !== EDUCATION.length - 1 ? "border-b border-[var(--color-border)]/50" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--color-text)]">
                          {edu.institution}
                        </span>
                        <span className="text-[10px] text-[var(--color-accent)] font-bold">
                          {edu.score}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
                        <span>{edu.degree}</span>
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors, Awards & Leadership */}
              <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 relative">
                <span className="absolute -top-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┌</span>
                <span className="absolute -top-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┐</span>
                <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">└</span>
                <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-[var(--color-accent)] leading-none select-none">┘</span>

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider pb-3 mb-4 border-b border-[var(--color-border)]">
                  <FaAward size={14} />
                  <span>HONORS &amp; RESPONSIBILITIES</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {ACHIEVEMENTS.map((ach, i) => (
                    <div
                      key={i}
                      className={`pb-3 ${i !== ACHIEVEMENTS.length - 1 ? "border-b border-[var(--color-border)]/50" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[var(--color-text)] text-xs">
                          {ach.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-accent)] font-semibold shrink-0">
                          {ach.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
