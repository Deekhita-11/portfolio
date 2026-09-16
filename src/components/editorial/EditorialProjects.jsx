import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import ProjectInspectionModal from '../projects/ProjectInspectionModal';

export default function EditorialProjects() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenInspection = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="work" className="py-20 hairline-b">
      {/* Inspection Modal */}
      <ProjectInspectionModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-16 hairline-b gap-4">
          <div>
            <span className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest block mb-2">
              01 // INDEXED WORK
            </span>
            <h2 className="font-swiss font-black text-4xl sm:text-5xl text-[var(--color-text)] uppercase tracking-tight">
              Selected Projects
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm font-sans">
            Production web interfaces, relational systems, algorithmic engines, and autonomous hardware.
          </p>
        </div>

        {/* ── Magazine Spread Projects List ── */}
        <div className="space-y-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const mainImage = project.screens?.[0]?.src || '/images/projects/period-tracker-real.png';

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                
                {/* Visual Magazine Plate (7 cols) */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() => handleOpenInspection(project)}
                    className="group relative rounded-none hairline-border bg-[var(--color-surface)] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Editorial Plate Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 hairline-b bg-[var(--color-surface)] font-mono text-[11px] text-[var(--color-text-muted)]">
                      <span className="uppercase font-semibold">FIG. 0{project.id} — SYSTEM INTERFACE</span>
                      <span className="text-[var(--color-accent)] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <FiMaximize2 size={11} />
                        <span>EXPAND VIEW</span>
                      </span>
                    </div>

                    {/* Screenshot Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 flex items-center justify-center">
                      <img
                        src={mainImage}
                        alt={project.title}
                        className="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>

                {/* Editorial Text & Spec Column (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    {/* Index Stamp & Status */}
                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-muted)] mb-3">
                      <span className="text-[var(--color-accent)] font-bold text-sm">
                        {project.num}
                      </span>
                      <span>/</span>
                      <span className="uppercase tracking-wider">{project.category[0]}</span>
                      <span>/</span>
                      <span className={project.status.includes('CURRENTLY') ? 'text-[var(--color-accent)] font-bold' : ''}>
                        {project.status}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      onClick={() => handleOpenInspection(project)}
                      className="font-swiss font-black text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text)] uppercase tracking-tight hover:text-[var(--color-accent)] transition-colors cursor-pointer mb-3 leading-tight"
                    >
                      {project.title}
                    </h3>

                    {/* Project Summary */}
                    <p className="text-base text-[var(--color-text-muted)] leading-relaxed font-sans mb-6">
                      {project.summary}
                    </p>

                    {/* Problem & Approach Specs */}
                    <div className="p-4 hairline-border bg-[var(--color-surface)] space-y-3 mb-6 text-xs font-sans">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-[var(--color-text)] uppercase block mb-1">
                          Problem Constraint
                        </span>
                        <p className="text-[var(--color-text-muted)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="pt-2 hairline-t">
                        <span className="font-mono text-[11px] font-bold text-[var(--color-accent)] uppercase block mb-1">
                          Engineered Solution
                        </span>
                        <p className="text-[var(--color-text-muted)] leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Technology Ledger Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono hairline-border bg-[var(--color-surface)] text-[var(--color-text)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="flex items-center gap-4 pt-4 hairline-t">
                    <button
                      onClick={() => handleOpenInspection(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-text)] text-[var(--color-bg)] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
                    >
                      <span>Explore Project</span>
                      <FiArrowUpRight size={14} />
                    </button>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 hairline-border bg-[var(--color-surface)] text-[var(--color-text)] font-sans font-bold text-xs uppercase tracking-wider hover:border-[var(--color-text)] transition-colors"
                      >
                        <FaGithub size={13} />
                        <span>Source</span>
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
