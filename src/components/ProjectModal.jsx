import React, { useEffect, useState } from 'react';
import { X, ExternalLink, GitBranch, Cpu, Image as ImageIcon, Eye, Tag } from 'lucide-react';
import { fetchProjectDecisions, fetchProjectImages } from '../services/api';

export default function ProjectModal({ project, onClose }) {
  const [decisions, setDecisions] = useState([]);
  const [images, setImages] = useState([]);
  const [loadingDecisions, setLoadingDecisions] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!project) return;
    async function loadData() {
      setLoadingDecisions(true);
      setLoadingImages(true);

      const [decisionsData, imagesData] = await Promise.all([
        fetchProjectDecisions(project.slug),
        fetchProjectImages(project.slug),
      ]);

      setDecisions(decisionsData);
      setImages(imagesData);
      if (imagesData && imagesData.length > 0) {
        setSelectedPhoto(imagesData[0]);
      }
      setLoadingDecisions(false);
      setLoadingImages(false);
    }
    loadData();
  }, [project]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl glass-card rounded-3xl overflow-hidden max-h-[92vh] flex flex-col my-auto shadow-2xl border border-[var(--border-strong)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[var(--border-color)] flex items-start justify-between bg-[var(--bg-card)] sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="badge-glass">
                {project.category}
              </span>
              {(() => {
                const isLive = project.status === 'LIVE';
                const isBuilding = project.status === 'BUILDING';
                const colorClasses = isLive
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : isBuilding
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-slate-400 bg-slate-500/10 border-slate-500/20';
                const dotColor = isLive ? 'bg-emerald-500 animate-pulse' : isBuilding ? 'bg-amber-500 animate-pulse' : 'bg-slate-400';
                
                return (
                  <span className={`font-mono-code text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-full border ${colorClasses}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                    STATUS: {project.status}
                  </span>
                );
              })()}
            </div>
            <h2 className="font-sans-title text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-[var(--border-color)]">
          
          {/* Overview & Quick Links */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-light">
              {project.description}
            </p>

            {/* Links & Stack */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-code text-xs text-[var(--text-muted)] uppercase">STACK:</span>
                {project.stack?.map((tech, idx) => {
                  const name = typeof tech === 'object' ? tech.name : tech;
                  return (
                    <span
                      key={idx}
                      className="font-mono-code text-xs px-3 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                    >
                      {name}
                    </span>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-agency-secondary py-2 px-4 text-xs flex items-center gap-2"
                  >
                    <GitBranch className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>GITHUB REPO</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-agency-primary py-2 px-4 text-xs flex items-center gap-2"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>
          </div>

          {/* ── PHOTO CATALOGUE (CLOUDFLARE R2) ── */}
          {images && images.length > 0 && (
            <div className="pt-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  // PHOTO CATALOGUE (CLOUDFLARE R2)
                </h3>
                <span className="font-mono-code text-[10px] text-[var(--text-muted)] uppercase">
                  {images.length} High-Res Photo{images.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Main Active Photo Viewer Stage */}
              {selectedPhoto && (
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-lg space-y-4">
                  <div className="relative bg-black/60 aspect-video max-h-[420px] flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.description}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="badge-glass bg-black/60 backdrop-blur-md text-white border-white/20">
                        <Tag className="w-3 h-3 inline mr-1 text-[var(--accent-gold)]" />
                        {selectedPhoto.role || 'screenshot'}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 space-y-2">
                    <span className="font-mono-code text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                      // PHOTO DESCRIPTION
                    </span>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Photo Catalogue Selector Strip */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((img) => (
                    <button
                      key={img._id}
                      onClick={() => setSelectedPhoto(img)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all group ${
                        selectedPhoto?._id === img._id
                          ? 'border-[var(--accent-gold)] scale-[1.02] shadow-md'
                          : 'border-[var(--border-color)] opacity-70 hover:opacity-100 hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.description}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Metrics Section */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                  // {project.status === 'LIVE' ? 'PRODUCTION PERFORMANCE TELEMETRY' : 'PERFORMANCE BENCHMARKS & ARCHITECTURAL LIMITS'}
                </h3>
                {project.status === 'LIVE' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                    PRODUCTION TELEMETRY
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider border border-amber-500/30 bg-amber-500/10 text-amber-500">
                    STRESS-TEST BENCHMARK
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--badge-bg)]">
                    <span className="block font-mono-code text-[10px] text-[var(--text-muted)] uppercase mb-1">
                      {m.label}
                    </span>
                    <span className="font-sans-title text-2xl font-bold text-[var(--text-primary)]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structured Sections */}
          {project.sections && project.sections.length > 0 && (
            <div className="pt-6 space-y-6">
              <h3 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                // ARCHITECTURAL BLUEPRINT
              </h3>
              {project.sections.map((sec, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--badge-bg)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono-code text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--accent-gold)] text-[var(--bg-primary)] uppercase">
                      {sec.type}
                    </span>
                    {sec.title && (
                      <h4 className="font-serif-agency text-2xl font-normal text-[var(--text-primary)]">
                        {sec.title}
                      </h4>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Engineering Decisions linked from backend */}
          <div className="pt-6">
            <h3 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)] mb-4">
              // ARCHITECTURAL TRADE-OFF DECISIONS
            </h3>

            {loadingDecisions ? (
              <div className="p-4 text-center font-mono-code text-xs text-[var(--text-muted)]">
                Loading decisions...
              </div>
            ) : decisions.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] italic font-mono-code">
                No architectural decision records cataloged for this module.
              </p>
            ) : (
              <div className="space-y-4">
                {decisions.map((d, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] space-y-3">
                    <div className="flex items-start gap-2">
                      <Cpu className="w-5 h-5 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono-code text-xs font-bold text-[var(--text-muted)] uppercase block">
                          QUESTION:
                        </span>
                        <h4 className="font-serif-agency text-2xl font-normal text-[var(--text-primary)]">
                          {d.question}
                        </h4>
                      </div>
                    </div>

                    <div className="bg-[var(--badge-bg)] p-4 rounded-xl border border-[var(--border-color)]">
                      <span className="font-mono-code text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase block mb-1">
                        DECISION TAKEN:
                      </span>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {d.decision}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono-code text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">
                        REASONING:
                      </span>
                      <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                        {d.reasoning}
                      </p>
                    </div>

                    {d.tradeoffs && d.tradeoffs.length > 0 && (
                      <div>
                        <span className="font-mono-code text-xs font-bold text-[var(--accent-gold)] uppercase block mb-1">
                          TRADEOFFS CONSIDERED:
                        </span>
                        <ul className="list-disc list-inside text-xs font-mono-code text-[var(--text-secondary)] space-y-1">
                          {d.tradeoffs.map((t, tidx) => (
                            <li key={tidx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
