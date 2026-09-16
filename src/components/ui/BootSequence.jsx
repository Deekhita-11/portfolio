import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  { label: "IDENTITY", delay: 150 },
  { label: "PROJECTS", delay: 350 },
  { label: "SYSTEMS", delay: 550 },
  { label: "CODE", delay: 750 },
];

export default function BootSequence({ onComplete }) {
  const [completedLogs, setCompletedLogs] = useState([]);
  const [showName, setShowName] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LOGS.forEach(({ label, delay }) => {
      setTimeout(() => {
        setCompletedLogs((prev) => [...prev, label]);
      }, delay);
    });

    const nameTimer = setTimeout(() => {
      setShowName(true);
    }, 850);

    const finishTimer = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 300);
    }, 1150);

    const handleSkip = () => {
      setDone(true);
      onComplete();
    };

    window.addEventListener("keydown", handleSkip);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(finishTimer);
      window.removeEventListener("keydown", handleSkip);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#0B0D0C] flex flex-col items-center justify-center p-6 select-none font-mono text-xs cursor-pointer"
          onClick={() => {
            setDone(true);
            onComplete();
          }}
        >
          <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] pb-2 border-b border-[var(--color-border)]">
              <span>INITIALIZING...</span>
              <span className="text-[10px] text-[var(--color-accent)] animate-pulse">● BOOT</span>
            </div>

            <div className="space-y-1.5 min-h-[90px]">
              {BOOT_LOGS.map((item) => {
                const isReady = completedLogs.includes(item.label);
                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between transition-opacity duration-150 ${
                      isReady ? "opacity-100 text-[var(--color-text)]" : "opacity-0"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[var(--color-accent)] font-bold">✓</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--color-border)] text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={showName ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-heading font-black text-sm uppercase tracking-widest text-[var(--color-text)]"
              >
                DEEKHITA BOHIDAR
              </motion.div>
            </div>
          </div>

          <span className="absolute bottom-6 text-[10px] text-[var(--color-text-muted)] opacity-50 font-mono">
            PRESS ANY KEY TO SKIP [ESC]
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
