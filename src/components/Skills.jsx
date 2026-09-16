import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FaCode } from "react-icons/fa";
import { skillCategories } from "../data/skills";

export default function Skills() {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useScrollReveal();

  return (
    <section
      id="skills"
      className="py-24 border-t border-[var(--color-border)]"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-[var(--color-border)]">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)] mb-2 uppercase">
                TECHNICAL CAPABILITIES // SPEC 02
              </p>
              <h2
                className="font-heading font-black uppercase tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                TOOLCHAIN &amp; STACK
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--color-text-muted)]">
              INDEX: 4 SUBSYSTEMS // VERIFIED
            </div>
          </div>

          {/* Accordion Specification Ledger */}
          <div className="space-y-0 border-t border-[var(--color-border)]">
            {skillCategories.map((cat, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={cat.label}
                  className="border-b border-[var(--color-border)] transition-colors"
                  style={{ background: isOpen ? "var(--color-bg)" : "transparent" }}
                >
                  <button
                    className="w-full flex items-center gap-6 py-6 px-4 md:px-6 text-left group transition-colors"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className="font-mono text-xs font-bold tracking-widest text-[var(--color-accent)] w-10 flex-shrink-0">
                      // {cat.number}
                    </span>

                    <span
                      className={`font-heading font-bold uppercase text-lg md:text-2xl tracking-tight transition-colors flex-1 text-left ${
                        isOpen
                          ? "text-[var(--color-text)]"
                          : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"
                      }`}
                    >
                      {cat.label}
                    </span>

                    <AnimatePresence>
                      {!isOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hidden md:block font-mono text-xs text-[var(--color-text-muted)] tracking-wider"
                        >
                          {cat.summary}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <motion.span
                      className="font-mono text-sm font-bold flex-shrink-0 ml-4 px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text)]"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-2 px-6 md:px-16 flex flex-wrap gap-3">
                          {cat.skills.map(({ name, icon: Icon }) => (
                            <div
                              key={name}
                              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all font-mono text-xs"
                            >
                              {Icon ? (
                                <Icon size={14} className="text-[var(--color-accent)]" />
                              ) : (
                                <FaCode size={12} className="text-[var(--color-accent)]" />
                              )}
                              <span className="font-semibold">{name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
