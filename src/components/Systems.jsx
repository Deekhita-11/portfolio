import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const techData = {
  "WEB & DISTRIBUTED": [
    "React", "Vite", "Tailwind CSS", "JavaScript", "PHP", "MySQL"
  ],
  "ROBOTICS & EMBEDDED": [
    "Arduino", "C/C++", "ESP32", "IR Sensors", "L298N", "Differential Kinematics"
  ]
};

const projectMapping = {
  "React": ["Blood Management System"],
  "Vite": ["Blood Management System"],
  "Tailwind CSS": ["Blood Management System"],
  "JavaScript": ["Blood Management System", "Gadget Genie", "Periods Tracker"],
  "PHP": ["Gadget Genie", "Periods Tracker", "Book Management System"],
  "MySQL": ["Blood Management System", "Gadget Genie", "Periods Tracker", "Book Management System"],
  "Arduino": ["Line Follower Bot"],
  "C/C++": ["Line Follower Bot"],
  "IR Sensors": ["Line Follower Bot"],
  "L298N": ["Line Follower Bot"],
  "ESP32": ["UPCOMING"],
  "Differential Kinematics": ["Line Follower Bot"]
};

export default function Systems() {
  const revealRef = useScrollReveal();
  const [activeTech, setActiveTech] = useState(null);

  return (
    <section id="systems" className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={revealRef} className="reveal mb-16">
          <div className="font-mono text-sm tracking-wider text-[var(--color-text-muted)] mb-4">
            // TECHNOLOGY MATRIX // 02
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)]">
            SYSTEMS & STACK
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {Object.entries(techData).map(([domain, techs]) => (
            <div key={domain} className="p-8 border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-6">
              <h3 className="font-mono text-lg text-[var(--color-text)] border-b border-[var(--color-border)] pb-4">
                {domain}
              </h3>
              <div className="flex flex-wrap gap-3">
                {techs.map(tech => (
                  <button
                    key={tech}
                    onMouseEnter={() => setActiveTech(tech)}
                    onClick={() => setActiveTech(tech)}
                    className={`font-mono text-sm px-4 py-2 border transition-colors duration-200 ${
                      activeTech === tech
                        ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-subtle)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-auto min-h-[12rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 relative overflow-hidden flex flex-col">
          <div className="font-mono text-sm text-[var(--color-text-muted)] mb-6">
            // USED IN
          </div>
          <div className="flex-1 relative min-h-[4rem]">
            <AnimatePresence mode="wait">
              {activeTech ? (
                <motion.div
                  key={activeTech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <div className="flex flex-wrap gap-4 items-center h-full pb-6">
                    <span className="font-heading text-2xl text-[var(--color-accent)]">
                      {activeTech}
                    </span>
                    <span className="text-[var(--color-text-muted)]">{'->'}</span>
                    <div className="flex flex-wrap gap-3">
                      {projectMapping[activeTech]?.map(project => (
                        <span
                          key={project}
                          className={`font-mono text-sm px-4 py-2 border ${
                            project === 'UPCOMING'
                              ? 'border-dashed border-[var(--color-text-muted)] text-[var(--color-text-muted)]'
                              : 'border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-text)]'
                          }`}
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pb-6"
                >
                  <span className="font-mono text-[var(--color-text-muted)]">
                    Hover over a technology to see its applications.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
