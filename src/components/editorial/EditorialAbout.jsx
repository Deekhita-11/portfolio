import React from 'react';
import { FiAward, FiBookOpen, FiUserCheck } from 'react-icons/fi';

const EDUCATION_LEDGER = [
  {
    institution: 'XIM University, Bhubaneswar',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2024 — 2028',
    score: 'CGPA: 8.68 / 10.0',
    detail: 'Core coursework in Algorithms, Discrete Mathematics, Relational Databases, Computer Organization & OOP.',
  },
  {
    institution: 'Delhi Public School, Damanjodi',
    degree: 'Senior Secondary (Class XII) · CBSE',
    period: '2022 — 2024',
    score: '88.2%',
    detail: 'Focus in Physics, Chemistry, and Mathematics with advanced Computer Science.',
  },
  {
    institution: 'Delhi Public School, Damanjodi',
    degree: 'Secondary School (Class X) · CBSE',
    period: '2020 — 2022',
    score: '94.0%',
    detail: 'Distinction honors across Science and Mathematics curricula.',
  },
];

const RECOGNITION_LEDGER = [
  {
    title: 'ICORT 2025 — ITR-DRDO Chandipur',
    award: '2nd Position Student Exhibition Award',
    desc: 'Awarded 2nd position at 4th International Conference on Range Technology for Autonomous Line Follower Robot differential drive system.',
  },
  {
    title: 'RobogeniX Club (Robotics & IoT)',
    award: 'Coordinator & Secretary',
    desc: 'Driving hardware prototyping workshops, autonomous sensor track designs, and embedded microcontroller bootcamps.',
  },
  {
    title: 'IEEE Student Branch',
    award: 'Treasurer',
    desc: 'Managing financial logistics, event allocations, and technical symposiums across IEEE Computer Society and WIE chapters.',
  },
  {
    title: 'IIT Bhubaneswar Inter-College',
    award: '2nd Position in Basketball',
    desc: 'Tournament runners-up demonstrating competitive athletic endurance, team leadership, and tactical court execution.',
  },
];

export default function EditorialAbout() {
  return (
    <section id="about" className="py-20 hairline-b">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-16 hairline-b gap-4">
          <div>
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block mb-2">
              03 // ACADEMIC &amp; HONORS
            </span>
            <h2 className="font-swiss font-black text-4xl sm:text-5xl text-[var(--color-text)] uppercase tracking-tight">
              Education &amp; Recognition
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm font-sans">
            Rigorous academic foundation paired with competitive exhibition honors and leadership roles.
          </p>
        </div>

        {/* 2-Column Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Education Ledger (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 hairline-b font-mono text-xs uppercase text-[var(--color-text)] font-bold">
              <FiBookOpen size={14} className="text-[var(--color-accent)]" />
              <span>Academic History</span>
            </div>

            <div className="space-y-8">
              {EDUCATION_LEDGER.map((item, idx) => (
                <div key={idx} className="space-y-1 font-sans">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                    <span>{item.period}</span>
                    <span className="text-[var(--color-accent)] font-bold">{item.score}</span>
                  </div>
                  <h3 className="font-swiss font-bold text-lg text-[var(--color-text)]">
                    {item.institution}
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-text-muted)]">
                    {item.degree}
                  </p>
                  <p className="text-xs text-[var(--color-text-light)] leading-relaxed pt-1">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Honors & Leadership (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 hairline-b font-mono text-xs uppercase text-[var(--color-text)] font-bold">
              <FiAward size={14} className="text-[var(--color-accent)]" />
              <span>Honors &amp; Executive Leadership</span>
            </div>

            <div className="space-y-8">
              {RECOGNITION_LEDGER.map((rec, idx) => (
                <div key={idx} className="space-y-1 font-sans">
                  <span className="text-xs font-mono text-[var(--color-accent)] font-bold uppercase block">
                    {rec.award}
                  </span>
                  <h3 className="font-swiss font-bold text-lg text-[var(--color-text)]">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed pt-1">
                    {rec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
