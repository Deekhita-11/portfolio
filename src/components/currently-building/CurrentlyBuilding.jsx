import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const BUILDS = [
  {
    title: "BLOOD MANAGEMENT SYSTEM",
    stack: "React 18 · Vite · Tailwind · MySQL",
    status: "ACTIVE DEV // STAGE 3 OF 4",
    progress: 75,
    note: "Finalizing atomic dispatch locks and real-time inventory thresholds.",
  },
  {
    title: "ROBOTICS HARDWARE BENCH",
    stack: "Embedded C++ · ATmega328P · Optical Sensors",
    status: "CALIBRATION PHASE",
    progress: 60,
    note: "Tuning differential steering algorithm for 90-degree curve recovery.",
  },
  {
    title: "PORTFOLIO SYSTEM ARCHITECTURE",
    stack: "Framer Motion · Precision Cursor · Telemetry",
    status: "LIVE PRODUCTION",
    progress: 95,
    note: "Integrating system diagnostics and interactive lab simulators.",
  },
];

export default function CurrentlyBuilding() {
  const ref = useScrollReveal();

  return (
    <section className="py-20 border-t border-[var(--color-border)]" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
            </span>
            <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] font-semibold uppercase">
              ACTIVE WORKBENCH // SPEC 06
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUILDS.map((b) => (
              <div
                key={b.title}
                className="technical-card rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--color-accent)] font-bold mb-3">
                    <span>{b.status}</span>
                    <span>{b.progress}%</span>
                  </div>

                  <h4 className="font-heading font-black text-lg text-[var(--color-text)] uppercase tracking-tight mb-2">
                    {b.title}
                  </h4>

                  <p className="font-mono text-xs text-[var(--color-text-muted)] mb-4">
                    {b.stack}
                  </p>

                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                    {b.note}
                  </p>
                </div>

                {/* Segmented Progress Bar */}
                <div className="space-y-2 pt-4 border-t border-[var(--color-border)]">
                  <div className="w-full bg-[var(--color-bg)] h-1.5 rounded overflow-hidden border border-[var(--color-border)]">
                    <div
                      className="h-full bg-[var(--color-accent)] transition-all duration-500"
                      style={{ width: `${b.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
