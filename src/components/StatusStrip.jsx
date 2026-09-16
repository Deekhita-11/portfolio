import React from "react";
import { motion } from "framer-motion";

const STATUS_ITEMS = [
  { dot: true, label: "BENCH STATUS: ONLINE" },
  { dot: false, label: "·" },
  { dot: false, label: "ROBOTICS LAB: ROBOGENIX" },
  { dot: false, label: "·" },
  { dot: false, label: "SOFTWARE: FULL-STACK & SYSTEMS" },
  { dot: false, label: "·" },
  { dot: false, label: "HARDWARE: ATMEGA328P / ARDUINO" },
  { dot: false, label: "·" },
  { dot: false, label: "OPEN TO COLLABORATION" },
];

export default function StatusStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="w-full border-y border-[var(--color-border)] overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center gap-6 overflow-x-auto scrollbar-none">
        {STATUS_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            {item.dot && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
              </span>
            )}
            <span
              className={`font-mono text-[11px] tracking-[0.16em] ${
                item.dot
                  ? "text-[var(--color-accent)] font-bold"
                  : item.label === "·"
                  ? "text-[var(--color-border)]"
                  : "text-[var(--color-text-muted)] font-medium"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
