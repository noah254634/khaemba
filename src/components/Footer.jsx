import React, { useEffect, useState } from 'react';
import { fetchHealthStatus } from '../services/api';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [health, setHealth] = useState({ status: 'CHECKING' });

  useEffect(() => {
    async function checkHealth() {
      const res = await fetchHealthStatus();
      setHealth(res);
    }
    checkHealth();
  }, []);

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] pt-16 lg:pt-24 xl:pt-32 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Multi-column Grid (Compact 2-column grid on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-[var(--border-color)]">

          {/* Brand Info (Full width on mobile) */}
          <div className="col-span-2 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-dark)] text-[var(--bg-primary)] flex items-center justify-center font-mono-code font-bold text-xs border border-[var(--border-color)]">
                NK
              </div>
              <span className="font-mono-code text-xs font-bold text-[var(--text-primary)] tracking-widest uppercase">
                NOAH KHAEMBA
              </span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed max-w-sm">
              Principal Systems Architect. Specialising in idempotent payment rails, real-time streaming topologies, and edge AI micro-inference.
            </p>

            {/* Live System Health Indicator */}
            <div className="pt-1 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${health.status === 'OK' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${health.status === 'OK' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className="font-mono-code text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">
                API SYSTEMS {health.status === 'OK' ? 'OPERATIONAL' : 'DEGRADED'}
              </span>
            </div>
          </div>

          {/* Sitemap (Column 1 on mobile) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <span className="font-mono-code text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              SITEMAP
            </span>
            <ul className="space-y-2 font-mono-code text-xs">
              <li>
                <a href="#work" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#capabilities" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#decisions" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Rationale
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* External Links (Column 2 on mobile) */}
          <div className="col-span-1 md:col-span-4 space-y-3">
            <span className="font-mono-code text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              NETWORK
            </span>
            <ul className="space-y-2 font-mono-code text-xs font-semibold">
              <li>
                <a
                  href="https://github.com/noah254634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] flex items-center gap-1 group transition-colors"
                >
                  <span>GitHub Repositories</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/noah-khaemba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] flex items-center gap-1 group transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:noahkhaemba290@gmail.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] flex items-center gap-1 group transition-colors"
                >
                  <span>Direct Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-[var(--text-muted)] gap-3">
          <div>
            © {new Date().getFullYear()} Noah Khaemba. All rights reserved.
          </div>
          <div>
            Nairobi, Kenya • UTC+3
          </div>
        </div>

      </div>
    </footer>
  );
}
