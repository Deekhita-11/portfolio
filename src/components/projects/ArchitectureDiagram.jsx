import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ArchitectureDiagram({ stages }) {
  const [activeSignalIndex, setActiveSignalIndex] = useState(null);

  const triggerSignalFlow = (index) => {
    setActiveSignalIndex(index);
    setTimeout(() => {
      setActiveSignalIndex(null);
    }, 1200);
  };

  return (
    <div
      data-cursor="architecture"
      className="w-full py-2"
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="font-mono text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider">
            // INTERACTIVE SIGNAL & PIPELINE ARCHITECTURE
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
          HOVER NODE TO ROUTE SIGNAL
        </span>
      </div>

      {/* Grid of Architecture Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {stages.map((stage, idx) => {
          const isSignaled = activeSignalIndex !== null && activeSignalIndex >= idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => triggerSignalFlow(idx)}
              className="flex flex-col relative group cursor-pointer"
            >
              {/* Card Node */}
              <div
                className={`rounded-lg p-4 flex-1 flex flex-col justify-between border transition-all duration-300 ${
                  isSignaled
                    ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)] shadow-[0_0_12px_var(--color-accent-subtle)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-[var(--color-accent)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-[10px] font-bold tracking-widest transition-colors ${
                        isSignaled ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                      {stage.tech}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-[var(--color-text)] mb-1">
                    {stage.component}
                  </h4>

                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
                    {stage.desc}
                  </p>
                </div>

                {/* Engineering Annotation */}
                <div className="pt-2 border-t border-[var(--color-border)]/60">
                  <span className="font-mono text-[10px] text-[var(--color-accent)] block italic">
                    {stage.annotation}
                  </span>
                </div>
              </div>

              {/* Desktop Connecting Wire & Signal Pulse */}
              {idx < stages.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] items-center justify-center text-[10px] text-[var(--color-accent)] font-mono overflow-hidden">
                  {/* Subtle animated dot traveling right */}
                  <span className="text-[10px] font-bold">→</span>
                  <span className="absolute inset-0 bg-[var(--color-accent)]/20 animate-signal-pulse pointer-events-none" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
