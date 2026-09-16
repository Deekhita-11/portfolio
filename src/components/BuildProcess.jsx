import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const steps = [
  { num: '01', title: 'UNDERSTAND', desc: 'Define the problem. Research constraints. Identify edge cases.' },
  { num: '02', title: 'DESIGN', desc: 'Architecture diagrams. Data flow mapping. Component boundaries.' },
  { num: '03', title: 'BUILD', desc: 'Write clean, modular code. Hardware prototyping. Integration testing.' },
  { num: '04', title: 'TEST', desc: 'Unit validation. Edge case coverage. Real-world simulation.' },
  { num: '05', title: 'BREAK', desc: 'Stress test. Find failure modes. Push beyond specifications.' },
  { num: '06', title: 'IMPROVE', desc: 'Refactor. Optimize. Document. Iterate until production-ready.' }
];

export default function BuildProcess() {
  const revealRef = useScrollReveal();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="process" className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={revealRef} className="reveal mb-16">
          <div className="font-mono text-sm tracking-wider text-[var(--color-text-muted)] mb-4">
            // ENGINEERING METHODOLOGY // 04
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)]">
            HOW I BUILD
          </h2>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-4 relative"
        >
          {steps.map((step, index) => (
            <motion.div key={step.num} variants={itemVariants} className="relative group">
              <div className="h-full p-6 border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col hover:border-[var(--color-accent)] transition-colors duration-300">
                <div className="font-mono text-xl text-[var(--color-accent)] mb-4">
                  {step.num}
                </div>
                <h3 className="font-heading text-lg text-[var(--color-text)] mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[var(--color-text-muted)] leading-relaxed flex-grow">
                  {step.desc}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden xl:flex absolute top-12 -right-3 w-6 items-center justify-center z-10 text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
