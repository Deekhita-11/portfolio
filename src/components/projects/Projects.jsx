import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/projects";
import { FaGithub, FaExternalLinkAlt, FaSearchPlus, FaLayerGroup, FaArrowRight } from "react-icons/fa";
import MagneticButton from "../ui/MagneticButton";
import ProjectInspectionModal from "./ProjectInspectionModal";

export default function Projects() {
  const ref = useScrollReveal();
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const openInspection = (project) => {
    setSelectedProject(project);
    setInspectModalOpen(true);
  };

  return (
    <section
      id="projects"
      className="py-28 border-t border-[var(--color-border)] relative"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Detail Inspection Modal */}
      <ProjectInspectionModal
        project={selectedProject}
        isOpen={inspectModalOpen}
        onClose={() => setInspectModalOpen(false)}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-accent)] font-semibold uppercase tracking-[0.2em] mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" />
                <span>03 / SELECTED PROJECTS</span>
              </div>
              <h2
                className="font-heading font-black tracking-tight text-[var(--color-text)]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
              >
                Featured Engineering Work
              </h2>
            </div>
            <p className="text-base text-[var(--color-text-muted)] max-w-md font-sans leading-relaxed">
              Production web applications, relational schemas, algorithmic models, and autonomous hardware built with high standards of reliability.
            </p>
          </div>

          {/* ── ALL PROJECTS SHOWCASE (Cards Displayed Simultaneously) ── */}
          <div className="space-y-16">
            {projects.map((proj, idx) => {
              const isEven = idx % 2 === 0;
              const mainScreen = proj.screens?.[0] || {
                src: "/images/projects/period-tracker.png",
                label: "SYSTEM INTERFACE",
                caption: proj.summary,
              };

              return (
                <div
                  key={proj.id}
                  className="eng-card overflow-hidden p-6 md:p-10 transition-all"
                  style={{
                    backgroundColor: "var(--color-surface)",
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left/Right Media Showcase Container (7 cols) */}
                    <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <div
                        onClick={() => openInspection(proj)}
                        data-cursor="inspect"
                        className="group relative rounded-lg overflow-hidden border border-[var(--color-border)] bg-[#0B0F17] cursor-pointer shadow-lg hover:border-[var(--color-accent)] transition-all duration-300"
                      >
                        {/* Clean Technical Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-surface)] border-b border-[var(--color-border)] font-mono text-xs text-[var(--color-text-muted)]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                            <span className="font-semibold text-[var(--color-text)] uppercase">{proj.num} // {mainScreen.label}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-[var(--color-accent)] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              <FaSearchPlus size={11} />
                              <span>INSPECT SYSTEM</span>
                            </span>
                          </div>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40 flex items-center justify-center">
                          <img
                            src={mainScreen.src}
                            alt={proj.title}
                            className="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          />

                          {/* Inspect Overlay Prompt */}
                          <div className="absolute inset-0 bg-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-4 py-2 rounded-full bg-[var(--color-surface)]/95 border border-[var(--color-accent)] text-[var(--color-accent)] font-mono text-xs font-semibold shadow-xl backdrop-blur-sm">
                              Click to Inspect Architecture &amp; Code ↗
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Left/Right Text Specs & Architecture Container (5 cols) */}
                    <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"} flex flex-col justify-between space-y-6`}>
                      <div>
                        {/* Meta Badge Row */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                            {proj.category[0]}
                          </span>
                          <span className={`text-xs font-mono font-semibold ${proj.status.includes("CURRENTLY") ? "text-[var(--color-warm)] animate-pulse" : "text-[var(--color-text-muted)]"}`}>
                            ● {proj.status}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="font-heading font-black text-2xl sm:text-3xl text-[var(--color-text)] tracking-tight mb-3">
                          {proj.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-base text-[var(--color-text-muted)] leading-relaxed font-sans mb-6">
                          {proj.summary}
                        </p>

                        {/* Key Problem & Engineered Solution */}
                        <div className="space-y-3 mb-6 p-4 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]">
                          <div>
                            <span className="text-xs font-mono font-bold text-[var(--color-accent)] uppercase block mb-1">
                              Constraint &amp; Need:
                            </span>
                            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-sans">
                              {proj.problem}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-[var(--color-border)]">
                            <span className="text-xs font-mono font-bold text-[var(--color-accent-bright)] uppercase block mb-1">
                              Engineered Solution:
                            </span>
                            <p className="text-xs text-[var(--color-text)] leading-relaxed font-sans font-medium">
                              {proj.solution}
                            </p>
                          </div>
                        </div>

                        {/* Architecture Pipeline Flow */}
                        <div className="mb-6">
                          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
                            <FaLayerGroup size={11} className="text-[var(--color-accent)]" />
                            <span>Architecture Pipeline</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {proj.architecture.slice(0, 4).map((node, nIdx) => (
                              <div
                                key={nIdx}
                                className="p-2 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-xs"
                              >
                                <span className="text-[10px] font-mono text-[var(--color-accent)] font-semibold block">
                                  {node.step.split("/")[0]}
                                </span>
                                <span className="font-medium text-[var(--color-text)] block truncate text-[11px]">
                                  {node.component}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {proj.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                        <MagneticButton>
                          <button
                            onClick={() => openInspection(proj)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[var(--color-accent)] text-white font-mono font-semibold text-xs tracking-wider uppercase hover:bg-[var(--color-accent-bright)] transition-colors cursor-pointer shadow-sm"
                          >
                            <span>DETAILS &amp; CODE</span>
                            <FaArrowRight size={10} />
                          </button>
                        </MagneticButton>

                        {proj.github && (
                          <MagneticButton>
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-mono font-semibold text-xs tracking-wider uppercase hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                            >
                              <FaGithub size={14} />
                              <span>GITHUB</span>
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
