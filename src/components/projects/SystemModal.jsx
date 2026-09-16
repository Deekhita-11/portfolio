import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCode, HiExternalLink, HiCheck, HiClipboard } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";

export default function SystemModal({ project, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("architecture");

  if (!project) return null;

  const handleCopyCode = () => {
    if (!project.codeSnippet?.code) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden font-mono flex flex-col z-10 my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span className="font-bold tracking-widest text-[var(--color-text)] uppercase text-sm">
                  {project.title} // SYSTEM SCHEMATIC
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab selector inside modal */}
                <div className="flex items-center rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-bg)] text-xs mr-2">
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === "architecture"
                        ? "bg-[var(--color-surface)] text-[var(--color-accent)] font-bold"
                        : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    SCHEMATIC
                  </button>
                  {project.codeSnippet && (
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`px-3 py-1 rounded transition-colors ${
                        activeTab === "code"
                          ? "bg-[var(--color-surface)] text-[var(--color-accent)] font-bold"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      SOURCE
                    </button>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Close Modal"
                >
                  <HiX size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs leading-relaxed">
              {activeTab === "architecture" ? (
                <>
                  {/* System Architecture Node Sequence */}
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-border)]">
                      <span className="font-bold text-[var(--color-accent)] uppercase tracking-wider">
                        // SIGNAL & DATA FLOW PIPELINE
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        {project.architecture?.length || 4} NODES
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {project.architecture?.map((stage, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors relative"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-[var(--color-accent)]">
                              {stage.step}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                              {stage.tech}
                            </span>
                          </div>
                          <h5 className="font-bold text-sm text-[var(--color-text)] mb-1">
                            {stage.component}
                          </h5>
                          <p className="text-[11px] text-[var(--color-text-muted)] mb-3 leading-relaxed">
                            {stage.desc}
                          </p>
                          <div className="pt-2 border-t border-[var(--color-border)]/60 text-[10px] text-[var(--color-accent)] italic">
                            {stage.annotation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Problem & Solution Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <span className="text-[10px] text-[var(--color-accent)] uppercase font-bold tracking-wider block mb-1">
                        // THE PROBLEM CONSTRAINT
                      </span>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <span className="text-[10px] text-[var(--color-accent)] uppercase font-bold tracking-wider block mb-1">
                        // THE ENGINEERED APPROACH
                      </span>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-wider block mb-2">
                      // VERIFIED TECHNOLOGIES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] font-semibold text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Source Code Tab */
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[var(--color-accent)] font-bold">
                      {project.codeSnippet?.filename}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {copied ? <HiCheck className="text-[var(--color-accent)]" /> : <HiClipboard />}
                      <span>{copied ? "COPIED" : "COPY CODE"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-[#0E100F] border border-[var(--color-border)] overflow-x-auto text-[11px] leading-relaxed text-[var(--color-text)] font-mono">
                    <code>{project.codeSnippet?.code}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] flex-shrink-0 text-xs">
              <span className="text-[10px] text-[var(--color-text-muted)]">
                ENGINEERING SPEC // VERIFIED RUNTIME
              </span>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] font-bold hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
                  >
                    <FaGithub size={13} /> REPOSITORY ↗
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#0B0D0C] font-bold hover:opacity-90 transition-opacity"
                >
                  CLOSE INSPECTION
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
