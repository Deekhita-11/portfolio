import React from 'react';
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
} from 'react-icons/si';
import { TbBinaryTree } from 'react-icons/tb';
import { FaDatabase, FaCubes } from 'react-icons/fa';

const SKILL_SECTIONS = [
  {
    category: 'LANGUAGES & SYNTAX',
    num: '01',
    skills: [
      { name: 'C++', icon: SiCplusplus, desc: 'High-performance algorithm solving (187+ LeetCode) & hardware firmware', role: 'Competitive & Embedded' },
      { name: 'Python', icon: SiPython, desc: 'Data logic testing, script automation & algorithm prototyping', role: 'Automation' },
      { name: 'JavaScript (ES6+)', icon: SiJavascript, desc: 'Asynchronous event loops, DOM engines & full-stack logic', role: 'Web Logic' },
    ],
  },
  {
    category: 'FRONTEND ARCHITECTURE',
    num: '02',
    skills: [
      { name: 'React 18', icon: SiReact, desc: 'Component lifecycle, concurrent transitions & state orchestration', role: 'Architecture' },
      { name: 'Vite', icon: SiVite, desc: 'Sub-second dev server HMR & optimized Rollup bundling', role: 'Build Tool' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, desc: 'Design token systems, responsive utility grids & layouts', role: 'Design Systems' },
    ],
  },
  {
    category: 'CORE ENGINE & MODELS',
    num: '03',
    skills: [
      { name: 'Data Structures & Algorithms', icon: TbBinaryTree, desc: 'Trees, Graphs (BFS/DFS), Dynamic Programming (187+ Solved)', role: 'Problem Solving' },
      { name: 'Object-Oriented Programming', icon: FaCubes, desc: 'Encapsulation, modularity, abstraction & design patterns', role: 'Software Design' },
      { name: 'DBMS & Relational Data', icon: FaDatabase, desc: 'MySQL InnoDB, normalization (3NF), ACID transactions & indexes', role: 'Database' },
    ],
  },
  {
    category: 'TOOLCHAIN & COLLABORATION',
    num: '04',
    skills: [
      { name: 'Git & GitHub', icon: SiGithub, desc: 'Distributed version control, atomic branching & 284+ commits', role: 'Version Control' },
      { name: 'Postman', icon: SiPostman, desc: 'REST endpoint testing, schema contract validation & mocking', role: 'API Testing' },
      { name: 'Arduino & Sensors', icon: SiArduino, desc: 'Differential drive PID control & hardware sensor arrays', role: 'Robotics' },
    ],
  },
];

export default function EditorialSkills() {
  return (
    <section id="skills" className="py-20 hairline-b">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-16 hairline-b gap-4">
          <div>
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block mb-2">
              02 // TECHNICAL ARSENAL
            </span>
            <h2 className="font-swiss font-black text-4xl sm:text-5xl text-[var(--color-text)] uppercase tracking-tight">
              Skills &amp; Capabilities
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm font-sans">
            Structured computer science fundamentals and modern software engineering toolkit.
          </p>
        </div>

        {/* ── Swiss Editorial Grid Ledger ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {SKILL_SECTIONS.map((section) => (
            <div key={section.num} className="space-y-4">
              {/* Category Subhead */}
              <div className="flex items-center justify-between pb-2 hairline-b font-mono text-xs text-[var(--color-text-muted)]">
                <span className="font-bold text-[var(--color-text)]">{section.category}</span>
                <span className="text-[var(--color-accent)]">{section.num}</span>
              </div>

              {/* Skills Row Items */}
              <div className="divide-y divide-[var(--color-border)]">
                {section.skills.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="py-3.5 flex items-start justify-between gap-4 group hover:bg-[var(--color-surface)] px-2 transition-colors -mx-2"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded hairline-border bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-accent)] shrink-0 mt-0.5">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="font-swiss font-bold text-sm sm:text-base text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                            {s.name}
                          </h4>
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5 font-sans leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--color-text-light)] uppercase shrink-0 pt-1 hidden sm:inline">
                        {s.role}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
