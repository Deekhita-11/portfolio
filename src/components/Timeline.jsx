import React from "react";
import { motion } from "framer-motion";
import { journeyItems } from "../data/journey";

const TYPE_COLORS = {
  edu:        "#969891", // Muted slate
  leadership: "#A5B89B", // Muted sage
  project:    "#E8E7E2", // Cream
  current:    "#A5B89B", // Muted sage
};

const TYPE_LABELS = {
  edu:        "ACADEMICS",
  leadership: "APPOINTMENT",
  project:    "ENGINEERING BUILD",
  current:    "ACTIVE BENCH",
};

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 overflow-hidden border-t border-[var(--color-border)]"
      style={{ background: "var(--color-surface)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[var(--color-border)]">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase">
              CHRONOLOGY // SPEC 05
            </p>
            <h2
              className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              ENGINEERING JOURNEY
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--color-text-muted)]">
            TIMELINE // 2021 — PRESENT
          </div>
        </div>

        {/* ── Desktop: Horizontal Track ── */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal Track Line */}
            <motion.div
              className="absolute top-[22px] left-0 right-0 h-[2px]"
              style={{ background: "var(--color-border)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Milestone Nodes */}
            <div className="flex justify-between items-start">
              {journeyItems.map((item, i) => {
                const color = TYPE_COLORS[item.type] || "#E05A33";
                return (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center relative"
                    style={{ flex: 1 }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    {/* Year Stamp */}
                    <span
                      className="font-mono text-[11px] font-bold tracking-widest mb-2 block text-center"
                      style={{ color }}
                    >
                      {item.year}
                    </span>

                    {/* Dot on Line */}
                    <div
                      className="w-4 h-4 rounded-full border-2 z-10 relative"
                      style={{
                        borderColor: color,
                        background: "var(--color-bg)",
                      }}
                    />

                    {/* Card Content */}
                    <div className="mt-4 px-2 text-center" style={{ maxWidth: "150px" }}>
                      <span
                        className="font-mono text-[9px] font-bold px-2 py-0.5 rounded tracking-wider block mb-1.5"
                        style={{ background: `${color}15`, color }}
                      >
                        {TYPE_LABELS[item.type]}
                      </span>
                      <p className="font-bold text-sm text-[var(--color-text)] leading-snug mb-1">
                        {item.event}
                      </p>
                      <p className="font-mono text-xs font-semibold" style={{ color }}>
                        {item.org}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-1 leading-tight">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile: Vertical Timeline ── */}
        <div className="md:hidden relative max-w-sm pl-4">
          <div
            className="absolute left-[22px] top-2 bottom-0 w-[2px]"
            style={{ background: "var(--color-border)" }}
          />

          <div className="space-y-8">
            {journeyItems.map((item, i) => {
              const color = TYPE_COLORS[item.type] || "#E05A33";
              return (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex-shrink-0 w-4 flex flex-col items-center mt-1">
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 z-10"
                      style={{ borderColor: color, background: "var(--color-bg)" }}
                    />
                  </div>

                  <div className="pb-2">
                    <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color }}>
                      {item.year}
                    </span>
                    <p className="font-bold text-sm text-[var(--color-text)] mt-0.5">{item.event}</p>
                    <p className="font-mono text-xs font-semibold mt-0.5" style={{ color }}>{item.org}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
