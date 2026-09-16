import React from 'react';
import { ThemeProvider } from './context/ThemeContext';

// Retro Gaming & Interactive Core Components
import CustomCursor from './components/cursor/CustomCursor';
import RetroNavbar from './components/retro/RetroNavbar';
import RetroHero from './components/retro/RetroHero';
import ScrollRobotTrack from './components/ScrollRobotTrack';
import TechStackScroll from './components/TechStackScroll';
import RetroProjects from './components/retro/RetroProjects';
import DeveloperActivity from './components/DeveloperActivity';
import About from './components/About';
import Contact from './components/Contact';
import RetroFooter from './components/retro/RetroFooter';

export default function App() {
  return (
    <ThemeProvider>
      {/* Precision Retro Arcade Reticle Cursor */}
      <CustomCursor />

      {/* Autonomous Line Follower Robot Side Navigation (2XL Screen Line Follower) */}
      <ScrollRobotTrack />

      {/* Main Canvas */}
      <div
        id="top"
        className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-[#0B0E14] relative font-mono transition-colors duration-200 bg-[var(--color-bg)] text-[var(--color-text)]"
      >
        {/* Retro Header / Status Bar */}
        <RetroNavbar />

        {/* Arcade Stage Sequence */}
        <main className="flex-1">
          {/* Stage 01: Hero Intro */}
          <RetroHero />

          {/* Stage 02: Tech Stack Horizontal Scroll as User Moves Down */}
          <TechStackScroll />

          {/* Stage 03: Projects (All Builds with Real Screenshots) */}
          <RetroProjects />

          {/* Stage 04: LeetCode & GitHub Section (Real API Stats, Heatmap, Counters) */}
          <DeveloperActivity />

          {/* Stage 05: About & Academic History */}
          <About />

          {/* Stage 06: Transmission Dispatch / Contact */}
          <Contact />
        </main>

        {/* Retro Arcade Colophon */}
        <RetroFooter />
      </div>
    </ThemeProvider>
  );
}