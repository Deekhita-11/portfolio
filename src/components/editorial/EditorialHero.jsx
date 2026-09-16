import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FiArrowDownRight, FiFileText } from 'react-icons/fi';

export default function EditorialHero() {
  return (
    <section className="pt-16 md:pt-24 pb-16 hairline-b">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Top Folio Line */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest pb-4 mb-10 hairline-b">
          <span>DEEKHITA BOHIDAR</span>
          <span>FRONTEND DEVELOPER &amp; BUILDER</span>
          <span className="text-[var(--color-accent)] font-bold">01 / 04</span>
        </div>

        {/* Main Swiss Editorial Statement */}
        <div className="mb-14">
          <h1
            className="font-swiss font-black text-[var(--color-text)] uppercase leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.8rem)' }}
          >
            I BUILD DIGITAL
            <br />
            SYSTEMS THAT FEEL
            <br />
            <span className="text-[var(--color-accent)]">SIMPLE.</span>
          </h1>
        </div>

        {/* Editorial 3-Column Ledger Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 hairline-t items-start">
          
          {/* Column 1: Core Bio Focus (5 cols) */}
          <div className="md:col-span-5">
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] font-sans leading-relaxed">
              Third-year Computer Science undergraduate at XIM University, Bhubaneswar. Passionate about deconstructing complex algorithms, architecting modular web applications, and building autonomous systems from the ground up.
            </p>
          </div>

          {/* Column 2: Specific Roles & Accolades (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center justify-between hairline-b pb-2">
              <span className="uppercase text-[var(--color-text-light)]">STATUS</span>
              <span className="font-semibold text-[var(--color-text)]">3rd Year B.Tech CSE (8.68 CGPA)</span>
            </div>
            <div className="flex items-center justify-between hairline-b pb-2">
              <span className="uppercase text-[var(--color-text-light)]">LEADERSHIP</span>
              <span className="font-semibold text-[var(--color-text)]">Coordinator · RobogeniX Club</span>
            </div>
            <div className="flex items-center justify-between hairline-b pb-2">
              <span className="uppercase text-[var(--color-text-light)]">DRDO AWARD</span>
              <span className="font-semibold text-[var(--color-accent)]">2nd Prize · ICORT 2025</span>
            </div>
            <div className="flex items-center justify-between pb-1">
              <span className="uppercase text-[var(--color-text-light)]">DSA LOG</span>
              <span className="font-semibold text-[var(--color-text)]">187+ LeetCode Solved</span>
            </div>
          </div>

          {/* Column 3: Direct Actions & Socials (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-between px-5 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
            >
              <span>Selected Work</span>
              <FiArrowDownRight size={16} />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-5 py-3.5 hairline-border bg-[var(--color-surface)] text-[var(--color-text)] font-sans font-bold text-xs uppercase tracking-wider hover:border-[var(--color-text)] transition-colors"
            >
              <span>View Spec Sheet / CV</span>
              <FiFileText size={14} />
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2 text-[var(--color-text-muted)]">
              <a
                href="https://github.com/Deekhita-11/Deekhita-11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 hairline-border hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://leetcode.com/u/Deekhita/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="p-2 hairline-border hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              >
                <SiLeetcode size={14} />
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 hairline-border hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              >
                <FaLinkedin size={14} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
