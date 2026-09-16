import React, { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const PANELS = [
  {
    num: "01",
    title: "SOFTWARE",
    items: [
      "Web applications with normalized relational databases",
      "Interactive interfaces with smooth, high-fidelity UI states",
      "Full-stack integration, parameterized APIs & secure storage",
    ],
    tech: "React · Vite · Tailwind · PHP · MySQL",
  },
  {
    num: "02",
    title: "PROBLEM SOLVING",
    items: [
      "Data Structures and Algorithms analysis & pattern recognition",
      "Time and space complexity optimizations (187+ LeetCode Solved)",
      "Mathematical modeling, rolling averages & dynamic state machines",
    ],
    tech: "C++ · Python · DSA · Relational Algebra",
  },
  {
    num: "03",
    title: "DEVELOPMENT",
    items: [
      "Building from the ground up with defensive, clean code",
      "Prototyping, unit verification & stress testing edge constraints",
      "Constantly improving code structure, modularity & performance",
    ],
    tech: "Git · GitHub · OOP · Clean Code",
  },
];

export default function Systems() {
  const ref = useScrollReveal();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="systems"
      className="py-24 border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-accent)] font-semibold uppercase tracking-[0.2em] mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" />
                <span>02 / WHAT I BUILD</span>
              </div>
              <h2
                className="font-heading font-black tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
              >
                Disciplines &amp; Approach
              </h2>
            </div>
            <p className="text-base text-[var(--color-text-muted)] max-w-md font-sans leading-relaxed">
              Three core engineering pillars centered around rigorous logic, structured software, and continuous improvement.
            </p>
          </div>

          {/* 3 Modern Engineering Cards */}
          <div className="space-y-6">
            {PANELS.map((panel, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={panel.num}
                  data-cursor="explore"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`eng-card p-6 md:p-8 transition-all duration-300 ${
                    isHovered
                      ? "border-[var(--color-accent)] bg-[var(--color-surface-hover)] shadow-lg"
                      : "border-[var(--color-border)] bg-[var(--color-surface)]"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    {/* Left: Number + Title */}
                    <div className="flex items-start gap-4 md:w-1/3">
                      <span className="font-mono text-lg font-bold text-[var(--color-accent)] shrink-0">
                        {panel.num}
                      </span>
                      <div>
                        <h3 className="font-heading font-black text-xl md:text-2xl text-[var(--color-text)]">
                          {panel.title}
                        </h3>
                        <p className="font-mono text-xs text-[var(--color-accent)] mt-1.5 font-semibold">
                          {panel.tech}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Bullet points */}
                    <div className="md:w-7/12">
                      <ul className="space-y-2.5">
                        {panel.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm md:text-base text-[var(--color-text-muted)] flex items-start gap-3 font-sans"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
