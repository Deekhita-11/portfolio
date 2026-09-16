import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMic, FiArrowRight } from 'react-icons/fi';
import { searchShortcuts } from '../../data/searchData';

const AUTOCOMPLETE_SUGGESTIONS = [
  'Projects',
  'React',
  'Python',
  'DSA',
  'Blood Management System',
  'Period Tracker',
  'Gadget Genie',
  'Line Follower Bot',
  'About me',
  'Experience',
  'Skills',
  'Contact',
];

export default function ChromeNewTab({ onSearch, onLucky }) {
  const [inputVal, setInputVal] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputVal.trim()) {
      setSuggestions([]);
      return;
    }
    const q = inputVal.toLowerCase();
    const filtered = AUTOCOMPLETE_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q)).slice(0, 5);
    setSuggestions(filtered);
  }, [inputVal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 max-w-3xl mx-auto text-center relative pt-16 md:pt-24 pb-20 select-none font-sans">
      
      {/* ── 01. Small Profile Monogram Circle (36px, like Chrome) ── */}
      <div className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-5 border border-white/20">
        <span className="font-heading font-black text-sm tracking-tight bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent select-none">
          DB
        </span>
      </div>

      {/* ── 02. Central Greeting & Name ── */}
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[var(--color-text)] tracking-tight mb-2">
          DEEKHITA BOHIDAR
        </h1>
        <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide">
          Developer &amp; Builder
        </p>
      </div>

      {/* ── 03. Search Bar (Rounded Pill 56px, White, Clean) ── */}
      <div className="w-full max-w-[600px] relative mb-7">
        <form
          onSubmit={handleSubmit}
          className={`w-full h-14 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.22)] flex items-center px-5 transition-all duration-200 border ${
            isFocused ? 'border-transparent ring-2 ring-[#8AB4F8]' : 'border-[#DADCE0]'
          }`}
        >
          {/* Search Glass Icon */}
          <FiSearch className="text-[#5F6368] text-lg shrink-0 mr-3" />

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search my portfolio..."
            className="w-full bg-transparent text-[#202124] text-base font-sans outline-none placeholder:text-[#5F6368]"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear or Right Action */}
          {inputVal ? (
            <button
              type="button"
              onClick={() => {
                setInputVal('');
                inputRef.current?.focus();
              }}
              className="text-[#70757A] hover:text-[#202124] text-sm cursor-pointer p-1 mr-1"
            >
              ✕
            </button>
          ) : (
            <span title="Search Simulation" className="text-[#4285F4] p-1 cursor-pointer">
              <FiMic size={18} />
            </span>
          )}
        </form>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {isFocused && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute left-0 right-0 top-[60px] bg-white rounded-2xl shadow-xl overflow-hidden z-30 border border-[#DADCE0] text-left py-2"
            >
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onMouseDown={() => {
                    setInputVal(item);
                    onSearch(item);
                  }}
                  className="px-5 py-2.5 flex items-center gap-3 text-[#202124] hover:bg-[#F1F3F4] cursor-pointer text-sm font-sans"
                >
                  <FiSearch className="text-[#70757A] text-sm shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 04. Search & I'm Feeling Lucky Action Buttons ── */}
      <div className="flex items-center gap-3 mb-14">
        <button
          type="button"
          onClick={() => onSearch(inputVal || 'projects')}
          className="px-5 py-2.5 rounded-md bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] shadow-sm hover:shadow transition-all cursor-pointer select-none"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onLucky}
          className="px-5 py-2.5 rounded-md bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] shadow-sm hover:shadow transition-all cursor-pointer select-none"
        >
          I&apos;m Feeling Lucky
        </button>
      </div>

      {/* ── 05. Chrome Circular Shortcuts (48px Circles, Label below) ── */}
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          {searchShortcuts.map((sc) => (
            <div
              key={sc.id}
              onClick={() => {
                if (sc.url) {
                  window.open(sc.url, '_blank');
                } else {
                  onSearch(sc.query);
                }
              }}
              data-cursor="explore"
              className="flex flex-col items-center gap-2 group cursor-pointer w-[80px]"
            >
              {/* 48px Circular Icon */}
              <div
                className="w-12 h-12 rounded-full bg-[var(--color-surface)] group-hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] group-hover:border-white/30 shadow-sm flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-sm"
                  style={{ backgroundColor: sc.iconColor }}
                >
                  {sc.letter}
                </div>
              </div>
              {/* Shortcut Label */}
              <span className="text-xs font-medium text-[var(--color-text)] group-hover:text-white transition-colors truncate">
                {sc.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
