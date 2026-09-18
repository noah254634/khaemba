import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';
import { ArrowUpRight } from 'lucide-react';

const topologyMap = {
  verapay: '/assets/verapay-topology.svg',
  veralabel: '/assets/veralabel-topology.svg',
  hapticare: '/assets/hapticare-topology.svg',
  'distributed-event-stream': '/assets/event-stream-topology.svg',
};

export default function ProjectGrid({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'payments', label: 'Payments & Ledger' },
    { id: 'data', label: 'Data Engineering' },
    { id: 'infra', label: 'Infrastructure & K8s' },
    { id: 'ml', label: 'Edge AI & Embedded' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="badge-glass mb-3 inline-block">
              // 01 WORK ARCHIVE
            </span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">
              Selected Engineering Work
            </h2>
          </div>
          
          <p className="text-[var(--text-secondary)] font-normal max-w-md text-sm leading-relaxed">
            Production-grade distributed systems, payment gateways, and data infrastructure projects built with explicit SLA performance metrics.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-[var(--border-color)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 font-mono-code text-xs uppercase tracking-wider rounded-full transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-[var(--accent-dark)] text-[var(--bg-primary)] border-[var(--accent-dark)] font-bold shadow-md'
                  : 'bg-[var(--badge-bg)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards (Exact Andrew Wanjala Lookbook Format) */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-96 rounded-[28px] glass-card animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 xl:gap-10">
            {filteredProjects.map((project) => {
              const svgPath = topologyMap[project.slug] || '/assets/event-stream-topology.svg';
              const previewSrc = project.heroImage || svgPath;

              return (
                <Link
                  key={project._id || project.slug}
                  to={`/projects/${project.slug}`}
                  className="group rounded-[28px] glass-card p-3 overflow-hidden flex flex-col justify-between cursor-pointer border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-all duration-300 hover:-translate-y-1 block"
                >
                  
                  {/* Top 4:3 Framed Preview Media with Top-Left Badge Overlay */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0B0C10] flex items-center justify-center">
                    <img
                      src={previewSrc}
                      alt={`${project.title} architecture`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 max-h-[320px]"
                    />
                    
                    {/* Top-Left Category Badge Overlay */}
                    <span className="absolute top-4 left-4 bg-white/95 dark:bg-black/90 text-neutral-900 dark:text-neutral-100 px-3.5 py-1.5 rounded-full font-mono-code text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm">
                      {project.category || 'INFRA'}
                    </span>

                    {/* Top-Right Status Badge Overlay */}
                    {(() => {
                      const s = project.status;
                      const isLive = s === 'LIVE';
                      const isBuilding = s === 'BUILDING';
                      const isTesting = s === 'TESTING';
                      const isProto = s === 'PROTOTYPE';

                      const badgeClasses = isLive
                        ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                        : isBuilding
                        ? 'bg-amber-500/90 text-black border-amber-400/30'
                        : isTesting
                        ? 'bg-sky-500/90 text-white border-sky-400/30'
                        : isProto
                        ? 'bg-purple-500/90 text-white border-purple-400/30'
                        : 'bg-slate-500/90 text-white border-slate-400/30';

                      const dotColor = isLive || isBuilding || isTesting ? 'bg-white animate-pulse' : 'bg-slate-300';

                      return (
                        <span className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-code text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border shadow-sm ${badgeClasses}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                          {s || 'LIVE'}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Bottom Details Area */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    
                    {/* Tracked-Out Monospace Metadata Header: COMMISSION ... 2026 */}
                    <div className="flex items-center justify-between font-mono-code text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold">
                      <span>COMMISSION / {project.category}</span>
                      <span>2026</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-sans-title text-2xl sm:text-3xl xl:text-3xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle / Short Description */}
                    <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Bottom Row: Stack Pills & Case Link */}
                    <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5 font-mono-code text-[11px]">
                        {project.stack?.slice(0, 3).map((tech, idx) => {
                          const name = typeof tech === 'object' ? tech.name : tech;
                          return (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                            >
                              {name}
                            </span>
                          );
                        })}
                      </div>

                      <div className="text-xs font-mono-code font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] inline-flex items-center gap-1 transition-colors shrink-0">
                        <span>View Project Case</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>

                </Link>
              );
            })}
          </div>
        )}

        {/* Full Archive Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            onClick={() => setActiveCategory('all')}
            className="btn-agency-secondary inline-flex items-center gap-2"
          >
            <span>EXPLORE FULL ARCHIVE ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--accent-gold)]" />
          </button>
        </div>

      </div>
    </section>
  );
}
