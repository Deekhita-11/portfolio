import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import ProjectInspectionModal from '../projects/ProjectInspectionModal';

export default function RetroProjects() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenInspection = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      {/* Inspection Modal */}
      <ProjectInspectionModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header with Enlarged Subheadings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-16 border-b border-[var(--color-border)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-ping" />
              <span className="font-mono text-xs sm:text-sm text-[var(--color-accent)] font-bold uppercase tracking-widest">
                03 // VERIFIED BUILDS
              </span>
            </div>
            <h2 className="font-gaming font-black text-4xl sm:text-5xl text-[var(--color-text)] uppercase tracking-tight">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans text-[var(--color-text-muted)] max-w-md">
            Production web platforms, algorithmic engines, relational databases, and autonomous hardware systems.
          </p>
        </div>

        {/* ── Magazine Spread Projects List ── */}
        <div className="space-y-24">
          {projects.map((project) => {
            const mainImage = project.screens?.[0]?.src || '/images/projects/period-tracker-real.png';

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Interface Plate (7 cols) - CRYSTAL CLEAR DISPLAY */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => handleOpenInspection(project)}
                    data-cursor="inspect"
                    className="group relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/60 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300"
                  >
                    {/* Header Bar */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] font-mono text-xs text-[var(--color-text-muted)]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                        <span className="font-bold text-[var(--color-text)] uppercase text-xs sm:text-sm">
                          FIG. 0{project.id} — SYSTEM UI
                        </span>
                      </div>
                      <span className="text-[var(--color-accent)] font-semibold flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform text-xs">
                        <FiMaximize2 size={13} />
                        <span>FULLSCREEN VIEW</span>
                      </span>
                    </div>

                    {/* Screenshot Container - Crystal Clear Object Cover / High Fidelity */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20 flex items-center justify-center p-3 sm:p-4">
                      <img
                        src={mainImage}
                        alt={project.title}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-contain object-top rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
                        style={{
                          imageRendering: 'auto',
                          filter: 'contrast(1.05) brightness(1.02)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Dossier Column (5 cols) with Enlarged Text */}
                <div className="lg:col-span-5 space-y-6 font-sans">
                  <div>
                    {/* Index Stamp & Status */}
                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-muted)] mb-3">
                      <span className="font-bold text-sm text-[var(--color-accent)]">
                        {project.num}
                      </span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">{project.category[0]}</span>
                      <span>/</span>
                      <span className="px-2.5 py-0.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-warm)] font-semibold text-xs">
                        {project.status}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      onClick={() => handleOpenInspection(project)}
                      className="font-gaming font-black text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text)] uppercase tracking-tight hover:text-[var(--color-accent)] transition-colors cursor-pointer mb-3 leading-tight"
                    >
                      {project.title}
                    </h3>

                    {/* Project Summary - Larger paragraph */}
                    <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Problem & Approach Specs */}
                    <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 mb-6 text-sm">
                      <div>
                        <span className="font-mono text-xs font-bold text-[var(--color-text)] uppercase block mb-1">
                          Problem Constraint
                        </span>
                        <p className="text-[var(--color-text-muted)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[var(--color-border)]">
                        <span className="font-mono text-xs font-bold text-[var(--color-accent)] uppercase block mb-1">
                          Engineered Solution
                        </span>
                        <p className="text-[var(--color-text-muted)] leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Technology Ledger Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                    <button
                      onClick={() => handleOpenInspection(project)}
                      data-cursor="inspect"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-[#0B0E14] font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                    >
                      <span>Explore Project</span>
                      <FiArrowUpRight size={15} />
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        <FaGithub size={15} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}