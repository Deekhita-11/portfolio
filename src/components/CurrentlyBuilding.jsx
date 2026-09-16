import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STACK = ["React 18", "Vite", "Tailwind CSS", "MySQL", "REST API"];
const PROGRESS = 75;

const BUILD_LOG = [
  "$ npm run dev",
  "✓  local build server initialized [port 5174]",
  "$ git status",
  "  modified: server/blood_inventory.sql",
  "  modified: src/components/DonorRegistry.jsx",
  "$ npm run test:unit",
  "✓  14 unit specs passing (0 errors)",
  `■  BUILD PROGRESS: ${PROGRESS}% COMPLETED`,
];

function BuildTerminal() {
  const [lines, setLines] = useState([]);
  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setIdx((i) => {
        const next = (i + 1) % BUILD_LOG.length;
        setLines((prev) => {
          const updated = [...prev, BUILD_LOG[i]];
          return updated.length > 5 ? updated.slice(-5) : updated;
        });
        return next;
      });
    }, 900);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="rounded-lg border border-[var(--color-border)] overflow-hidden"
      style={{ background: "#202020", minHeight: "140px" }}
    >
      <div
        className="flex items-center justify-between px-3.5 py-2 border-b border-[#383838]"
        style={{ background: "#181818" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
          <span className="font-mono text-[10px] text-[#A0A098]">
            COMPILER STREAM // blood_mgmt_core
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#A0A098]">PID 4108</span>
      </div>
      <div className="p-4 space-y-1 font-mono text-xs">
        {lines.map((line, i) => (
          <motion.p
            key={`${i}-${line}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className={`leading-relaxed ${
              line.startsWith("$")
                ? "text-[var(--color-accent)] font-bold"
                : line.startsWith("✓")
                ? "text-[#657153] font-semibold"
                : line.startsWith("■")
                ? "text-[var(--color-accent)] font-bold"
                : "text-[#C9C5BA] pl-2"
            }`}
          >
            {line}
          </motion.p>
        ))}
        <span className="inline-block w-1.5 h-3.5 bg-[var(--color-accent)] animate-pulse mt-1" />
      </div>
    </div>
  );
}

function ProgressBar({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const blocks = 20;
  const filled = Math.round((value / 100) * blocks);

  return (
    <div ref={ref} className="space-y-2 font-mono">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--color-text-muted)] uppercase">MILESTONE COMPLETION</span>
        <span className="font-bold text-[var(--color-accent)]">{value}% [STAGE 3 OF 4]</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-2 rounded-sm"
            style={{
              background: i < filled ? "var(--color-accent)" : "var(--color-border)",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: inView ? i * 0.03 : 0, duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CurrentlyBuilding() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] font-semibold uppercase">
              ACTIVE BENCH // SPEC 07
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="technical-border rounded-xl p-6 md:p-8"
            style={{ background: "var(--color-surface)" }}
          >
            {/* Header Stamp */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]" />
                </span>
                <span className="font-mono text-xs font-bold tracking-widest text-[var(--color-accent)] uppercase">
                  ACTIVE ON BENCH
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                TARGET RELEASE: Q4 2024
              </span>
            </div>

            {/* Project Title & Description */}
            <div className="mb-6">
              <h3 className="font-heading font-black uppercase text-2xl md:text-3xl text-[var(--color-text)] mb-3">
                BLOOD MANAGEMENT SYSTEM
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5">
                Full-stack donor registry and real-time blood bank inventory management platform. Built to streamline hospital dispatch logistics, inventory forecasting, and critical emergency matching.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs px-3 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="mb-6">
              <ProgressBar value={PROGRESS} />
            </div>

            {/* Terminal Compiler Stream */}
            <div className="mb-6">
              <BuildTerminal />
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] text-xs font-mono">
              <span className="text-[var(--color-text-muted)]">CURRENT TASK: REFACTORING SQL DISPATCH LOGIC</span>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1.5"
              >
                <span>VIEW PROGRESS REPO</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
