import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function RetroNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] font-mono text-xs transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        
        {/* Left: Brand Monogram & Name */}
        <a href="#hero" className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
          <span className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-[#0B0E14] font-mono text-xs font-black flex items-center justify-center shadow-sm">
            DB
          </span>
          <span className="font-gaming font-bold text-sm tracking-tight text-[var(--color-text)]">
            DEEKHITA BOHIDAR
          </span>
        </a>

        {/* Center: Stage Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-[var(--color-text-muted)] font-mono text-xs">
          <a href="#hero" className="hover:text-[var(--color-text)] transition-colors">
            01 Intro
          </a>
          <a href="#skills" className="hover:text-[var(--color-text)] transition-colors">
            02 Tech Stack
          </a>
          <a href="#projects" className="hover:text-[var(--color-text)] transition-colors">
            03 Projects
          </a>
          <a href="#activity" className="hover:text-[var(--color-text)] transition-colors">
            04 LeetCode &amp; GitHub
          </a>
          <a href="#about" className="hover:text-[var(--color-text)] transition-colors">
            05 About
          </a>
          <a href="#contact" className="hover:text-[var(--color-text)] transition-colors">
            06 Contact
          </a>
        </nav>

        {/* Right: Theme Toggle Button + Resume */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all cursor-pointer shadow-sm"
          >
            {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#0B0E14] font-mono font-bold text-xs hover:opacity-90 transition-all shadow-sm"
          >
            Resume ↗
          </a>
        </div>

      </div>
    </header>
  );
}