import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function EditorialHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur-md hairline-b font-sans transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between text-xs tracking-wider uppercase font-semibold">
        
        {/* Left: Masthead Logotype */}
        <a href="#" className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
          <span className="font-swiss font-black text-sm tracking-normal">DEEKHITA BOHIDAR</span>
          <span className="text-[var(--color-text-light)] hidden sm:inline">/</span>
          <span className="text-[var(--color-text-muted)] text-[11px] hidden sm:inline">ENGINEERING PORTFOLIO</span>
        </a>

        {/* Center: Running Year Stamp */}
        <div className="hidden lg:block text-[11px] text-[var(--color-text-muted)] font-mono">
          ISSUE 2026 // VOL. 01
        </div>

        {/* Right: Section Index Navigation + Theme Switch */}
        <nav className="flex items-center gap-6 text-[var(--color-text-muted)]">
          <a href="#work" className="hover:text-[var(--color-text)] transition-colors">
            01 Work
          </a>
          <a href="#skills" className="hover:text-[var(--color-text)] transition-colors">
            02 Skills
          </a>
          <a href="#about" className="hover:text-[var(--color-text)] transition-colors">
            03 About
          </a>
          <a href="#contact" className="hover:text-[var(--color-text)] transition-colors">
            04 Contact
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="w-7 h-7 rounded-full hairline-border flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors cursor-pointer ml-2"
          >
            {theme === 'dark' ? <FiSun size={13} /> : <FiMoon size={13} />}
          </button>
        </nav>

      </div>
    </header>
  );
}
