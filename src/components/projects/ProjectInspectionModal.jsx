import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTimes, FaCode, FaProjectDiagram, FaInfoCircle, FaCheck, FaCopy } from "react-icons/fa";

export default function ProjectInspectionModal({ project, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview | architecture | implementation
  const [copied, setCopied] = useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const currentScreen = project.screens?.[activeScreenIndex] || project.screens?.[0] || {
    src: "/images/projects/period-tracker-real.png",
    label: "MAIN SCREEN",
    caption: project.summary,
  };

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 font-mono">
          {/* Backdrop with soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded border border-[var(--color-accent)] text-[var(--color-accent)] text-[10px] font-bold">
                  PROJECT {project.num}
                </span>
                <h3 className="font-gaming font-black text-sm uppercase text-[var(--color-text)] tracking-wider">
                  {project.title}
                </h3>
                <span className="text-[11px] text-[var(--color-text-muted)] hidden sm:inline">
                  // {project.stackLabel}
                </span>
              </div>

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] text-xs transition-colors cursor-pointer"
              >
                <span>CLOSE</span>
                <FaTimes size={12} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* ── High-Res Screenshot Frame with Clean Theme ── */}
              <div className="relative border border-[var(--color-border)] bg-[var(--color-bg)] rounded-xl overflow-hidden group shadow-lg">
                {/* Frame Meta Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-xs text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                    <span className="text-[var(--color-accent)] font-bold">{currentScreen.label}</span>
                  </div>
                  <span className="text-[11px]">STATUS: ONLINE ● 1920×1080 VIEWPORT</span>
                </div>

                {/* Screenshot Display - Fixed height & clean object containment */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 flex items-center justify-center p-2">
                  <img
                    src={currentScreen.src}
                    alt={project.title}
                    className="w-full h-full object-contain object-top rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                    style={{
                      filter: "contrast(1.04) brightness(1.02)",
                    }}
                  />

                  {/* Architecture-to-Screenshot Target Highlight Overlay */}
                  {hoveredNode !== null && project.architecture[hoveredNode] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[var(--color-accent)]/15 border-2 border-[var(--color-accent)] pointer-events-none flex items-center justify-center rounded-lg"
                    >
                      <div className="px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-accent)] text-[var(--color-accent)] text-xs font-bold shadow-xl">
                        TARGET HIGHLIGHT: {project.architecture[hoveredNode].highlightTarget}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Screen Caption & Thumbnail Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] text-xs">
                  <p className="text-[var(--color-text-muted)] text-xs max-w-lg">
                    {currentScreen.caption}
                  </p>

                  {project.screens && project.screens.length > 1 && (
                    <div className="flex items-center gap-2 shrink-0">
                      {project.screens.map((screen, idx) => (
                        <button
                          key={screen.id}
                          onClick={() => setActiveScreenIndex(idx)}
                          className={`px-3 py-1 text-xs font-bold rounded-md border transition-colors cursor-pointer ${
                            activeScreenIndex === idx
                              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#0B0E14]"
                              : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                          }`}
                        >
                          [{screen.id}] {screen.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── 3 Inspection Tabs ── */}
              <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-xl overflow-hidden shadow-sm">
                <div className="flex border-b border-[var(--color-border)] text-xs font-bold">
                  {[
                    { id: "overview", label: "OVERVIEW", icon: FaInfoCircle },
                    { id: "architecture", label: "ARCHITECTURE FLOW", icon: FaProjectDiagram },
                    { id: "implementation", label: "IMPLEMENTATION CODE", icon: FaCode },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${
                          isActive
                            ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-surface-elevated)]"
                            : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        }`}
                      >
                        <Icon size={13} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 bg-[var(--color-surface)] text-xs">
                  {/* TAB 1: OVERVIEW */}
                  {activeTab === "overview" && (
                    <div className="space-y-4 font-sans">
                      <p className="text-base text-[var(--color-text)] leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 pt-2 font-mono">
                        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]">
                          <span className="text-xs text-[var(--color-accent)] font-bold block mb-1 uppercase">
                            // PROBLEM CONSTRAINT
                          </span>
                          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
                            {project.problem}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]">
                          <span className="text-xs text-[var(--color-accent)] font-bold block mb-1 uppercase">
                            // TECHNICAL SOLUTION
                          </span>
                          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs text-[var(--color-text-muted)] uppercase block mb-2 font-bold font-mono">
                          DEPLOYED TECHNOLOGIES:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[var(--color-text)] font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ARCHITECTURE */}
                  {activeTab === "architecture" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pb-2 border-b border-[var(--color-border)] font-mono">
                        <span>HOVER ANY NODE TO HIGHLIGHT INTERFACE TARGET</span>
                        <span className="text-[var(--color-accent)] font-bold">4-STAGE PIPELINE</span>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {project.architecture.map((node, i) => (
                          <div
                            key={i}
                            onMouseEnter={() => setHoveredNode(i)}
                            onMouseLeave={() => setHoveredNode(null)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer ${
                              hoveredNode === i
                                ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)] shadow-md"
                                : "border-[var(--color-border)] bg-[var(--color-bg)]"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs mb-1 font-mono">
                              <span className="text-[var(--color-accent)] font-bold">{node.step}</span>
                              <span className="text-[10px] text-[var(--color-text-muted)]">{node.tech}</span>
                            </div>
                            <h5 className="font-gaming font-bold text-sm text-[var(--color-text)] uppercase mb-1">
                              {node.component}
                            </h5>
                            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-2 font-sans">
                              {node.desc}
                            </p>
                            <div className="text-[10px] text-[var(--color-accent)] italic font-mono">
                              Target: {node.highlightTarget}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: IMPLEMENTATION */}
                  {activeTab === "implementation" && project.codeSnippet && (
                    <div className="space-y-3 font-mono">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
                        <span className="text-[var(--color-accent)] font-bold text-xs">
                          {project.codeSnippet.filename}
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] text-xs transition-colors cursor-pointer"
                        >
                          {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                          <span>{copied ? "COPIED" : "COPY CODE"}</span>
                        </button>
                      </div>

                      <div className="p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] overflow-x-auto text-xs leading-relaxed text-[var(--color-text)]">
                        <pre className="text-xs">
                          <code>{project.codeSnippet.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-xs font-mono">
              <span className="text-xs text-[var(--color-text-muted)]">
                PRESS ESC OR CLICK OUTSIDE TO RETURN
              </span>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-[#0B0E14] font-bold text-xs hover:opacity-90 transition-opacity uppercase tracking-wider shadow-md"
                  >
                    <FaGithub size={14} />
                    <span>VIEW SOURCE REPOSITORY ↗</span>
                  </a>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}