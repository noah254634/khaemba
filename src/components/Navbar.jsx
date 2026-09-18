import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#work',         label: 'Selected Work' },
  { href: '#capabilities', label: 'Capabilities'   },
  { href: '#decisions',    label: 'Rationale'      },
  { href: '#contact',      label: 'Contact'        },
];

export default function Navbar({ isDark, setIsDark }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-8">

      {/* Desktop pill nav — full max-w-7xl matches all section containers */}
      <div className="pointer-events-auto max-w-7xl mx-auto bg-[var(--bg-card)]/90 backdrop-blur-xl rounded-full border border-[var(--border-color)] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] h-14 px-5 sm:px-6 flex items-center justify-between transition-colors duration-300">

        {/* Left: Monogram Mark & Tight Identity Lockup */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-dark)] text-[var(--bg-primary)] font-mono-code font-bold text-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            NK
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-[var(--text-primary)]">
              Noah Khaemba
            </span>
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-[var(--text-muted)]">
              SYSTEMS ARCHITECT
            </span>
          </div>
        </a>

        {/* Center: Navigation Links — visible md+ */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap tracking-tight"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: Availability pill + theme toggle + mobile hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">

          {/* Availability Status Pill */}
          <span className="text-[10px] font-mono-code uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">AVAILABLE</span>
          </span>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--badge-bg)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-secondary)]" />
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--badge-bg)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto md:hidden max-w-7xl mx-auto mt-2 bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-2xl border border-[var(--border-color)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] overflow-hidden">
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-5 py-3.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors border-b border-[var(--border-color)] last:border-0"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}

    </header>
  );
}
