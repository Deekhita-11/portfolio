import React from 'react';
import { FiGrid } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function ChromeNavbar({ onNavigate }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 font-sans text-sm z-20 select-none">
      {/* Left: Fake browser URL */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('')}
          className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer"
        >
          chrome://portfolio
        </button>
      </div>

      {/* Right: Chrome-like navigation: About Projects Skills Contact ⠿ D */}
      <nav className="flex items-center gap-5 sm:gap-6 text-sm text-[var(--color-text)]">
        <button
          onClick={() => onNavigate('about')}
          className="hover:underline text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className="hover:underline text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => onNavigate('skills')}
          className="hover:underline text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer"
        >
          Skills
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="hover:underline text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer"
        >
          Contact
        </button>

        {/* Chrome 9-dots Apps Icon ⠿ */}
        <span
          title="Google Apps"
          onClick={() => onNavigate('skills')}
          className="text-lg text-[var(--color-text-muted)] hover:text-white cursor-pointer px-1 transition-colors leading-none"
        >
          ⠿
        </span>

        {/* Profile Avatar D */}
        <div
          onClick={() => onNavigate('about')}
          title="Deekhita Bohidar"
          className="w-8 h-8 rounded-full bg-[#EA4335] text-white flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer hover:ring-2 hover:ring-white/50 transition-all select-none"
        >
          D
        </div>
      </nav>
    </header>
  );
}
