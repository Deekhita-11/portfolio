import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiArrowLeft, FiExternalLink, FiTag, FiAward, FiCheckCircle } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { searchDatabase } from '../../data/searchData';

const TABS = ['All', 'Projects', 'Skills', 'About', 'Experience'];

export default function SearchResults({ query, onBackToHome, onSearchQuery, onOpenProject }) {
  const [activeTab, setActiveTab] = useState('All');
  const [inputVal, setInputVal] = useState(query || '');

  // Perform search query matching against title, tags, snippet, and category
  const filteredResults = useMemo(() => {
    const q = (query || '').toLowerCase().trim();
    return searchDatabase.filter((item) => {
      // Tab filter
      if (activeTab !== 'All' && item.category !== activeTab) {
        return false;
      }
      if (!q) return true;

      const inTitle = item.title.toLowerCase().includes(q);
      const inSnippet = (item.snippet || '').toLowerCase().includes(q);
      const inCategory = item.category.toLowerCase().includes(q);
      const inTags = (item.tags || []).some((t) => t.toLowerCase().includes(q));

      return inTitle || inSnippet || inCategory || inTags;
    });
  }, [query, activeTab]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearchQuery(inputVal.trim());
    }
  };

  return (
    <div className="min-h-screen text-left pb-24">
      {/* ── 01. Google Search Results Header ── */}
      <header className="sticky top-0 z-30 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] pt-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 pb-3">
          
          {/* Logo & Back button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              title="Back to New Tab"
              className="w-10 h-10 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] transition-colors cursor-pointer shrink-0"
            >
              <FiArrowLeft size={18} />
            </button>
            <div
              onClick={onBackToHome}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-heading font-black text-sm text-[#4285F4] shadow-sm">
                DB
              </div>
              <span className="font-heading font-black text-lg text-[var(--color-text)] hidden sm:inline">
                Deekhita
              </span>
            </div>
          </div>

          {/* Sticky Google Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl h-11 rounded-full bg-white shadow-sm flex items-center px-4 border border-transparent focus-within:ring-2 focus-within:ring-[#8AB4F8]"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search portfolio..."
              className="w-full bg-transparent text-[#202124] text-sm font-sans outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={() => {
                  setInputVal('');
                  onSearchQuery('');
                }}
                className="text-[#70757A] hover:text-[#202124] text-xs p-1 mr-2"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="text-[#4285F4] p-1 cursor-pointer hover:opacity-80"
            >
              <FiSearch size={16} />
            </button>
          </form>

        </div>

        {/* ── 02. Filter Category Tabs (All, Projects, Skills, etc.) ── */}
        <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto scrollbar-none text-xs font-medium pt-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[#8AB4F8] text-[#8AB4F8] font-bold'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── 03. Search Results Content Grid ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        
        {/* Result Counter Metainfo */}
        <p className="text-xs text-[var(--color-text-muted)] mb-6 font-sans">
          About {filteredResults.length} results ({((filteredResults.length * 0.04) + 0.12).toFixed(2)} seconds) for &ldquo;<span className="text-[var(--color-text)] font-semibold">{query || 'all'}</span>&rdquo;
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Results Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {filteredResults.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
                <h3 className="font-heading font-black text-lg text-[var(--color-text)] mb-2">
                  No direct results for &ldquo;{query}&rdquo;
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Try searching for <strong>React</strong>, <strong>DSA</strong>, <strong>Blood Management</strong>, <strong>C++</strong>, or <strong>Experience</strong>.
                </p>
                <button
                  onClick={() => {
                    setInputVal('');
                    onSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold cursor-pointer"
                >
                  Clear search &amp; view all
                </button>
              </div>
            ) : (
              filteredResults.map((item) => (
                <article
                  key={item.id}
                  className="space-y-1.5 font-sans group"
                >
                  {/* Google Style URL Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <span className="w-4 h-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[9px] text-[var(--color-accent)] font-bold">
                      {item.category[0]}
                    </span>
                    <span className="text-[11px] truncate">{item.displayUrl}</span>
                  </div>

                  {/* Google Blue Clickable Title */}
                  <h2
                    onClick={() => {
                      if (item.type === 'project' && item.rawProject) {
                        onOpenProject(item.rawProject);
                      }
                    }}
                    className="font-heading font-bold text-lg text-[#8AB4F8] hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.title}</span>
                    {item.type === 'project' && <FiExternalLink size={14} className="opacity-75" />}
                  </h2>

                  {/* Snippet Description */}
                  <p className="text-sm text-[var(--color-text)] leading-relaxed font-sans max-w-2xl">
                    {item.snippet}
                  </p>

                  {/* Project specific Problem / Solution cards */}
                  {item.problem && (
                    <div className="pt-2 pb-1 text-xs text-[var(--color-text-muted)] space-y-1">
                      <p><strong className="text-[var(--color-warm)]">Constraint:</strong> {item.problem}</p>
                      <p><strong className="text-[#34A853]">Solution:</strong> {item.solution}</p>
                    </div>
                  )}

                  {/* Metadata Chips / Action links */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {item.tags?.map((t) => (
                      <span
                        key={t}
                        onClick={() => onSearchQuery(t)}
                        className="px-2.5 py-0.5 rounded-full text-[11px] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                      >
                        {t}
                      </span>
                    ))}

                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 ml-2 text-xs text-[var(--color-accent)] hover:underline font-medium"
                      >
                        <FaGithub size={12} />
                        <span>Source Code ↗</span>
                      </a>
                    )}

                    {item.type === 'project' && item.rawProject && (
                      <button
                        onClick={() => onOpenProject(item.rawProject)}
                        className="text-xs text-[var(--color-accent-bright)] font-semibold hover:underline ml-2 cursor-pointer"
                      >
                        Inspect Architecture &amp; UI ↗
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>

          {/* ── Right Column: Google "Knowledge Panel" (4 cols) ── */}
          <aside className="lg:col-span-4 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] font-sans space-y-5 sticky top-28 shadow-md">
            <div className="flex items-center gap-3.5 pb-4 border-b border-[var(--color-border)]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#4285F4] to-[#EA4335] text-white flex items-center justify-center font-heading font-black text-xl shadow-md">
                DB
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-[var(--color-text)]">
                  Deekhita Bohidar
                </h3>
                <span className="text-xs text-[var(--color-text-muted)] block">
                  Software Developer · CSE Undergrad
                </span>
                <span className="text-[11px] text-[var(--color-accent)] font-semibold">
                  Bhubaneswar, India
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[var(--color-text-muted)] block font-semibold">Education</span>
                <span className="text-[var(--color-text)]">XIM University (B.Tech CSE, CGPA: 8.68)</span>
              </div>

              <div>
                <span className="text-[var(--color-text-muted)] block font-semibold">Leadership &amp; Awards</span>
                <span className="text-[var(--color-text)]">RobogeniX Coordinator · 2nd Prize DRDO ICORT 2025</span>
              </div>

              <div>
                <span className="text-[var(--color-text-muted)] block font-semibold">DSA Competency</span>
                <span className="text-[var(--color-text)]">187+ LeetCode Solved (Trees, Graphs, DP)</span>
              </div>

              <div>
                <span className="text-[var(--color-text-muted)] block font-semibold">Profiles</span>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://github.com/Deekhita-11/Deekhita-11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline flex items-center gap-1 font-medium"
                  >
                    <FaGithub size={12} />
                    <span>GitHub</span>
                  </a>
                  <span>·</span>
                  <a
                    href="https://leetcode.com/u/Deekhita/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline font-medium"
                  >
                    LeetCode
                  </a>
                  <span>·</span>
                  <a
                    href="mailto:deekhitabohidar@gmail.com"
                    className="text-[var(--color-accent)] hover:underline font-medium"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Skills Knowledge Box */}
            <div className="pt-4 border-t border-[var(--color-border)]">
              <span className="text-xs font-mono font-bold uppercase text-[var(--color-text-muted)] block mb-2">
                Core Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['C++', 'Python', 'React 18', 'JavaScript', 'Tailwind', 'DSA', 'MySQL', 'Git', 'Arduino'].map((tech) => (
                  <button
                    key={tech}
                    onClick={() => onSearchQuery(tech)}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}
