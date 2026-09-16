import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const WORDS = ['WEB SYSTEMS', 'ROBOTICS', 'EMBEDDED SYSTEMS'];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Perspective tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    // Max rotation 3 degrees
    setRotateX(-y * 3);
    setRotateY(x * 3);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center z-10"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Engineering Annotation */}
          <div className="font-mono text-[var(--color-text-muted)] text-sm mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[var(--color-border)] block"></span>
            <span>// SPEC 01 : INIT_SEQUENCE</span>
            <span className="w-8 h-[1px] bg-[var(--color-border)] block"></span>
          </div>

          {/* Stacked Headline */}
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-[var(--color-text)] leading-[0.9] flex flex-col items-center">
            <span>DEEKHITA</span>
            <span>BOHIDAR</span>
          </h1>

          {/* Dynamic Word Transition */}
          <div className="font-mono text-xl md:text-2xl mt-8 flex flex-col md:flex-row items-center gap-2 text-[var(--color-text-muted)]">
            <span>I BUILD</span>
            <span className="text-[var(--color-accent)] font-semibold flex items-center">
              [
              <div className="mx-2 relative flex justify-center min-w-[200px] md:min-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute whitespace-nowrap"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Invisible spacer to maintain layout */}
                <span className="invisible whitespace-nowrap">{WORDS[2]}</span>
              </div>
              ]
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
            <a 
              href="#projects"
              className="px-8 py-3 bg-[var(--color-accent)] text-[#121313] font-mono text-sm font-bold uppercase tracking-wider hover:bg-opacity-90 transition-all border border-[var(--color-accent)]"
            >
              EXPLORE WORK &rarr;
            </a>
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent text-[var(--color-text)] font-mono text-sm font-bold uppercase tracking-wider border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all flex items-center gap-2"
            >
              VIEW SPEC SHEET <span>&#8599;</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-16 text-[var(--color-text-muted)]">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors text-2xl">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors text-2xl">
              <FaLinkedin />
            </a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors text-2xl">
              <SiLeetcode />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid / Background subtle elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
    </section>
  );
};

export default Hero;
