import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "UNDERSTAND",
    desc: "Define problem boundaries, physical and software constraints, edge cases, and user workflows.",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Draft architecture schematics, data schemas (3NF), state machines, and hardware component topology.",
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Write clean, modular code. Assemble bench hardware, breadboard circuit logic, and wire APIs.",
  },
  {
    num: "04",
    title: "TEST",
    desc: "Unit validation, hardware signal sampling, timing verification, and optical contrast calibration.",
  },
  {
    num: "05",
    title: "BREAK",
    desc: "Stress-test corner cases, induce boundary failures, force race conditions, and test trajectory loss.",
  },
  {
    num: "06",
    title: "ITERATE",
    desc: "Optimize algorithms, reduce latency, refactor schemas, document, and deploy production-ready systems.",
  },
];

export default function BuildProcess() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const ref = useScrollReveal();

  return (
    <section id="process" className="py-24 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[var(--color-border)]">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase font-bold">
                ENGINEERING METHODOLOGY // 07
              </p>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                HOW I BUILD
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--color-text-muted)] max-w-md">
              A systematic 6-stage engineering loop applied across full-stack applications and autonomous hardware prototypes.
            </p>
          </div>

          <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="technical-card rounded-xl p-5 flex flex-col justify-between relative group hover:border-[var(--color-accent)]"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)] block mb-2">
                    {step.num} //
                  </span>
                  <h4 className="font-heading font-black text-base text-[var(--color-text)] uppercase tracking-tight mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between font-mono text-[10px] text-[var(--color-text-muted)]">
                  <span>STAGE {i + 1}</span>
                  {i < STEPS.length - 1 && <span className="text-[var(--color-accent)] font-bold">→</span>}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
