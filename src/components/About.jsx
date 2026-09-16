import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const DOMAIN_CARDS = [
  {
    num: "01",
    title: "WEB ARCHITECTURE",
    desc: "Full-stack interfaces & distributed relational systems",
    tech: ["React 18", "Vite", "Tailwind CSS", "JavaScript ES6+", "PHP", "MySQL"]
  },
  {
    num: "02",
    title: "ROBOTICS & KINEMATICS",
    desc: "Hardware kinematics & autonomous physical prototypes",
    tech: ["Arduino Uno", "Sensor Arrays", "L298N Drivers", "Differential Drive"]
  },
  {
    num: "03",
    title: "EMBEDDED SYSTEMS",
    desc: "Microcontrollers, firmware sensors & control loops",
    tech: ["ATmega328P", "ESP32", "PWM Steering", "Serial Protocols"]
  }
];

const educationItems = [
  {
    institution: "XIM University, Bhubaneswar",
    degree: "B.Tech — Computer Science & Engineering",
    score: "CGPA: 8.68 / 10.0",
    period: "2024 – 2028",
    tag: "UNDERGRADUATE",
    roles: ["Coordinator RobogeniX", "Treasurer IEEE"]
  },
  {
    institution: "Delhi Public School, Damanjodi",
    degree: "Class XII (CBSE Senior School Certificate)",
    score: "88.2%",
    period: "2022 – 2024",
    tag: "SCIENCE STREAM",
  },
  {
    institution: "Delhi Public School, Damanjodi",
    degree: "Class X (CBSE Secondary School)",
    score: "94.0%",
    period: "2020 – 2022",
    tag: "DISTINCTION",
  },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-ping" />
                <p className="font-mono text-xs text-[var(--color-accent)] font-bold tracking-[0.25em] uppercase">
                  05 // PROFILE &amp; ACADEMICS
                </p>
              </div>
              <h2
                className="font-gaming font-black uppercase tracking-tight text-[var(--color-text)] text-4xl sm:text-5xl"
              >
                ABOUT THE BUILDER
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--color-text-muted)]">
              DOSSIER // DEEKHITA BOHIDAR
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Cols: Personal Bio, Domain Specs & Manifesto */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Personal Bio Statement Card */}
              <div className="rounded-2xl p-6 sm:p-8 border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm space-y-4 font-sans">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider">
                  <span>// BUILDER PHILOSOPHY</span>
                </div>

                <h3 className="font-gaming font-bold text-xl sm:text-2xl text-[var(--color-text)] leading-snug">
                  I'm Deekhita — a developer who genuinely enjoys solving problems.
                </h3>

                <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                  I'm a B.Tech CSE student who especially enjoys Data Structures and Algorithms. I like breaking a problem down, finding patterns, and working toward a solution that is both correct and efficient.
                </p>

                <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                  Alongside DSA, I enjoy building web applications and turning those ideas into practical, interactive experiences using technologies like React and JavaScript.
                </p>

                <p className="text-base text-[var(--color-text)] font-medium leading-relaxed pt-2 border-t border-[var(--color-border)] italic">
                  "For me, development is a balance between thinking deeply about the problem and building something people can actually use."
                </p>
              </div>

              <div className="space-y-4">
                {DOMAIN_CARDS.map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl p-6 transition-all duration-200 border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] group shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                        // {card.num}
                      </span>
                      <h3 className="font-gaming text-base font-bold tracking-wider text-[var(--color-text)] uppercase group-hover:text-[var(--color-accent)] transition-colors">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4 font-sans leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {card.tech.map((t, i) => (
                        <span
                          key={i}
                          className="font-mono text-xs px-3 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* ENGINEERING MANIFESTO block */}
              <div
                className="rounded-2xl p-6 border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
              >
                <p className="font-mono text-xs font-bold tracking-widest text-[var(--color-accent)] mb-3 uppercase">
                  ENGINEERING MANIFESTO
                </p>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed italic border-l-2 border-[var(--color-accent)] pl-4 font-sans">
                  "I treat computing as a unified system — frontend code controls backend logic, which communicates through serial protocols to microcontrollers, turning code into motion."
                </p>
              </div>
              
              {/* Ledger Metadata */}
              <div className="rounded-2xl p-6 border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-sm">
                <div>
                  <span className="text-[11px] text-[var(--color-text-light)] block uppercase font-bold">LOCATION</span>
                  <span className="text-[var(--color-text)] font-semibold text-sm">Bhubaneswar, India</span>
                </div>
                <div className="h-8 w-px bg-[var(--color-border)] hidden sm:block" />
                <div>
                  <span className="text-[11px] text-[var(--color-text-light)] block uppercase font-bold">STATUS</span>
                  <span className="text-[var(--color-accent)] font-bold text-sm">● BENCH ACTIVE</span>
                </div>
                <div className="h-8 w-px bg-[var(--color-border)] hidden sm:block" />
                <div>
                  <span className="text-[11px] text-[var(--color-text-light)] block uppercase font-bold">AFFILIATION</span>
                  <span className="text-[var(--color-text)] font-semibold text-sm">IEEE &amp; RobogeniX</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Academic Ledger */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-xs font-bold tracking-widest text-[var(--color-text)] uppercase">
                  ACADEMIC RECORD LEDGER
                </p>
                <span className="font-mono text-xs text-[var(--color-text-light)]">3 ENTRIES</span>
              </div>

              {educationItems.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 relative overflow-hidden transition-all duration-200 border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] font-bold">
                      {edu.tag}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-text-light)] font-medium">
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="font-gaming font-bold text-base text-[var(--color-text)] leading-snug">
                    {edu.institution}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-sans">
                    {edu.degree}
                  </p>
                  
                  {edu.roles && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {edu.roles.map((role, idx) => (
                        <span key={idx} className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold uppercase">
                          {role}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--color-text-light)]">SCORE:</span>
                    <span className="font-mono text-sm font-bold text-[var(--color-accent)]">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}