import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCheckCircle, HiServer, HiChip } from "react-icons/hi";

export default function SystemDiagnosticsModal({ isOpen, onClose }) {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [viewport, setViewport] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden font-mono text-xs z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span className="font-bold tracking-widest text-[var(--color-text)] uppercase text-sm">
                  SYSTEM DIAGNOSTICS // HUD
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                aria-label="Close Diagnostics"
              >
                <HiX size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <span className="text-[10px] text-[var(--color-text-muted)] block uppercase mb-1">
                    ENGINE STATE
                  </span>
                  <span className="font-bold text-[var(--color-accent)] flex items-center gap-1.5">
                    <HiCheckCircle size={14} /> ONLINE
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <span className="text-[10px] text-[var(--color-text-muted)] block uppercase mb-1">
                    CLOCK [UTC+05:30]
                  </span>
                  <span className="font-bold text-[var(--color-text)]">
                    {clock}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <span className="text-[10px] text-[var(--color-text-muted)] block uppercase mb-1">
                    VIEWPORT MATRIX
                  </span>
                  <span className="font-bold text-[var(--color-text)]">
                    {viewport.w} × {viewport.h}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <span className="text-[10px] text-[var(--color-text-muted)] block uppercase mb-1">
                    BUILD SPEC
                  </span>
                  <span className="font-bold text-[var(--color-accent)]">
                    2026.09 // PROD
                  </span>
                </div>
              </div>

              {/* Subsystems Breakdown */}
              <div className="space-y-2">
                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold">
                  // SUBSYSTEM CONNECTIVITY & PIPELINE
                </p>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <span className="text-[var(--color-text)] flex items-center gap-2">
                      <HiServer className="text-[var(--color-accent)]" /> GITHUB API SERVICE
                    </span>
                    <span className="text-[var(--color-accent)] font-bold">[200 OK · 30M CACHED]</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <span className="text-[var(--color-text)] flex items-center gap-2">
                      <HiServer className="text-[var(--color-accent)]" /> LEETCODE STATS BRIDGE
                    </span>
                    <span className="text-[var(--color-accent)] font-bold">[200 OK · CONNECTED]</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <span className="text-[var(--color-text)] flex items-center gap-2">
                      <HiChip className="text-[var(--color-accent)]" /> MOTION ENGINE
                    </span>
                    <span className="text-[var(--color-accent)] font-bold">[FRAMER MOTION 11 · GPU ACCEL]</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <span className="text-[var(--color-text)] flex items-center gap-2">
                      <HiChip className="text-[var(--color-accent)]" /> PRECISION RETICLE
                    </span>
                    <span className="text-[var(--color-accent)] font-bold">[SPRING 450N/m · SUB-PIXEL]</span>
                  </div>
                </div>
              </div>

              {/* Engineering Manifesto excerpt */}
              <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-[11px] leading-relaxed">
                <span className="text-[var(--color-accent)] font-bold block mb-1">
                  // DESIGN SYSTEM DIRECTIVE
                </span>
                "Software and physical systems treated as one continuum — zero neon distractions, engineered utility, real telemetry, and purposeful feedback."
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <span className="text-[10px] text-[var(--color-text-muted)]">
                SHORTCUT: ESC TO EXIT
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[var(--color-accent)] text-[#0B0D0C] font-bold text-xs hover:opacity-90 transition-opacity uppercase"
              >
                EXIT SYSTEM MODE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
