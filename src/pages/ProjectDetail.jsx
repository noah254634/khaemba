import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleCanvas from '../components/ParticleCanvas';
import Seo from '../components/Seo';
import { fetchProjectBySlug, fetchProjectDecisions, fetchProjectImages, fetchProjects } from '../services/api';
import {
  ArrowLeft, ExternalLink, GitBranch, Cpu,
  Image as ImageIcon, Tag, CheckCircle2, ChevronRight, ChevronLeft
} from 'lucide-react';

const topologyMap = {
  verapay: '/assets/verapay-topology.svg',
  veralabel: '/assets/veralabel-topology.svg',
  hapticare: '/assets/hapticare-topology.svg',
  'distributed-event-stream': '/assets/event-stream-topology.svg',
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [decisions, setDecisions] = useState([]);
  const [images, setImages] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadProjectData() {
      setLoading(true);
      try {
        const [proj, decs, imgs, allProjs] = await Promise.all([
          fetchProjectBySlug(slug),
          fetchProjectDecisions(slug),
          fetchProjectImages(slug),
          fetchProjects(),
        ]);

        setProject(proj);
        setDecisions(decs || []);
        setImages(imgs || []);
        setAllProjects(allProjs || []);

        if (imgs && imgs.length > 0) {
          const defaultHeroPhoto = imgs.find(img => img.role === 'hero') || imgs[0];
          setSelectedPhoto(defaultHeroPhoto);
        } else {
          setSelectedPhoto(null);
        }
      } catch (err) {
        console.error('Error loading project details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjectData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[var(--border-strong)] border-t-[var(--accent-gold)] rounded-full animate-spin mx-auto" />
          <p className="font-mono-code text-xs text-[var(--text-muted)] uppercase tracking-widest">
            Loading Architectural Blueprint…
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="font-sans-title text-3xl font-bold">Project Not Found</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            The requested project blueprint could not be located in the architecture registry.
          </p>
          <Link to="/" className="btn-agency-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Work Archive
          </Link>
        </div>
      </div>
    );
  }

  // Find next and previous projects for bottom navigation
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const svgPath = topologyMap[project.slug] || '/assets/event-stream-topology.svg';

  return (
    <div className="min-h-screen relative bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <Seo
        title={project.title}
        description={project.description}
        type="article"
        image={project.heroImage || svgPath}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: project.title,
          description: project.description,
          url: window.location.href,
          image: project.heroImage || svgPath,
          author: {
            '@type': 'Person',
            name: 'Noah Khaemba',
          },
        }}
      />
      <ParticleCanvas isDark={isDark} />

      <div className="relative z-10">
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 space-y-16">
          
          {/* Top Bar: Back Link & Breadcrumbs */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[var(--accent-gold)]" />
              <span>Back to Work Archive</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="badge-glass">
                {project.category}
              </span>
              {(() => {
                const s = project.status;
                const isLive = s === 'LIVE';
                const isBuilding = s === 'BUILDING';
                const isTesting = s === 'TESTING';
                const isProto = s === 'PROTOTYPE';

                const colorClasses = isLive
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : isBuilding
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : isTesting
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20'
                  : isProto
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20'
                  : 'text-slate-400 bg-slate-500/10 border-slate-500/20';

                const dotColor = isLive
                  ? 'bg-emerald-500 animate-pulse'
                  : isBuilding
                  ? 'bg-amber-500 animate-pulse'
                  : isTesting
                  ? 'bg-sky-500 animate-pulse'
                  : isProto
                  ? 'bg-purple-500'
                  : 'bg-slate-400';
                
                return (
                  <span className={`font-mono-code text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-full border ${colorClasses}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                    STATUS: {s}
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Hero Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="badge-glass">// CASE STUDY ARCHITECTURE</span>
              <h1 className="font-sans-title text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.08]">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                {project.description}
              </p>

              {/* Stack Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono-code text-xs text-[var(--text-muted)] uppercase mr-1">STACK:</span>
                {project.stack?.map((tech, idx) => {
                  const name = typeof tech === 'object' ? tech.name : tech;
                  return (
                    <span
                      key={idx}
                      className="font-mono-code text-xs px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                    >
                      {name}
                    </span>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-agency-secondary flex items-center gap-2 text-xs"
                  >
                    <GitBranch className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>GITHUB REPOSITORY</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-agency-primary flex items-center gap-2 text-xs"
                  >
                    <span>LIVE DEMO ENVIRONMENT</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Topology / Architecture Blueprint Graphic */}
            <div className="lg:col-span-5">
              <div className="glass-card p-4 rounded-3xl overflow-hidden border border-[var(--border-strong)] bg-[#0B0C10] shadow-2xl">
                <div className="aspect-[4/3] w-full flex items-center justify-center p-4 overflow-hidden rounded-2xl">
                  <img
                    src={project.heroImage || svgPath}
                    alt={`${project.title} architecture diagram`}
                    className="w-full h-full object-cover max-h-[360px] rounded-xl"
                  />
                </div>
                <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex items-center justify-between">
                  <span className="font-mono-code text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                    SYSTEM TOPOLOGY SCHEMATIC
                  </span>
                  <span className="font-mono-code text-[10px] text-[var(--accent-gold)] font-bold">
                    VERIFIED SPEC
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics Section */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                  // {project.status === 'LIVE' ? 'PRODUCTION PERFORMANCE TELEMETRY' : 'ARCHITECTURAL BENCHMARKS & VERIFIED LIMITS'}
                </h2>
                {project.status === 'LIVE' ? (
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-widest border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
                    PRODUCTION TELEMETRY
                  </span>
                ) : project.status === 'PROTOTYPE' ? (
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-widest border border-purple-500/30 bg-purple-500/10 text-purple-400">
                    ALPHA SANDBOX / PROTOTYPE
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 text-amber-500">
                    STRESS-TEST BENCHMARK / SIMULATED SPEC
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl border border-[var(--border-color)] flex flex-col justify-between space-y-2">
                    <span className="block font-mono-code text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                      {m.label}
                    </span>
                    <span className="font-sans-title text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Catalogue Gallery (Cloudflare R2) */}
          {images && images.length > 0 && (
            <div className="space-y-6 pt-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--border-color)] pb-4">
                <div>
                  <span className="badge-glass mb-2 inline-block">// CLOUDFLARE R2 ASSETS</span>
                  <h2 className="font-mono-code text-sm font-bold uppercase tracking-widest text-[var(--accent-gold)] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    PHOTO CATALOGUE & SYSTEM SCHEMATICS ({images.length})
                  </h2>
                </div>
                <p className="font-mono-code text-[11px] text-[var(--text-muted)]">
                  Click any photo below to inspect full resolution and architectural specifications
                </p>
              </div>

              {/* Main Active Photo Viewer Stage */}
              {selectedPhoto && (
                <div className="glass-card rounded-3xl overflow-hidden border border-[var(--border-strong)] shadow-2xl space-y-4">
                  <div className="relative bg-black/80 aspect-video max-h-[520px] flex items-center justify-center p-4">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.description}
                      className="max-h-[480px] w-full object-contain rounded-xl"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="badge-glass bg-black/70 backdrop-blur-md text-white border-white/20">
                        <Tag className="w-3 h-3 inline mr-1 text-[var(--accent-gold)]" />
                        {selectedPhoto.role || 'screenshot'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-card)] border-t border-[var(--border-color)] space-y-2">
                    <span className="font-mono-code text-[10px] font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                      // PHOTO DESCRIPTION & ARCHITECTURAL ANNOTATION
                    </span>
                    <p className="text-base text-[var(--text-primary)] leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Thumbnails Gallery Strip */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <button
                      key={img._id}
                      onClick={() => setSelectedPhoto(img)}
                      className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition-all group ${
                        selectedPhoto?._id === img._id
                          ? 'border-[var(--accent-gold)] scale-[1.02] shadow-xl'
                          : 'border-[var(--border-color)] opacity-70 hover:opacity-100 hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.description}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Structured Architectural Sections */}
          {project.sections && project.sections.filter((section) => section.type !== 'OVERVIEW').length > 0 && (
            <div className="space-y-8 pt-8">
              <h2 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
                // ARCHITECTURAL BLUEPRINT SPECIFICATION
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {project.sections.filter((section) => section.type !== 'OVERVIEW').map((sec, idx) => (
                  <div key={idx} className="glass-card p-8 rounded-3xl border border-[var(--border-color)] space-y-4">
                    {sec.title && (
                      <h3 className="font-sans-title text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                        {sec.title}
                      </h3>
                    )}
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architectural Decision Records (ADRs) */}
          <div className="space-y-8 pt-8">
            <h2 className="font-mono-code text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
              // ARCHITECTURAL TRADE-OFF DECISIONS (ADRs)
            </h2>

            {decisions.length === 0 ? (
              <div className="glass-card p-8 rounded-2xl text-center">
                <p className="text-sm font-mono-code text-[var(--text-muted)] italic">
                  No architectural decision records cataloged for this module.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {decisions.map((d, idx) => (
                  <div key={idx} className="glass-card p-8 rounded-3xl border border-[var(--border-strong)] space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center shrink-0 mt-1">
                        <Cpu className="w-5 h-5 text-[var(--accent-gold)]" />
                      </div>
                      <div>
                        <span className="font-mono-code text-xs font-bold text-[var(--text-muted)] uppercase block">
                          QUESTION / PROBLEM STATEMENT:
                        </span>
                        <h3 className="font-sans-title text-2xl font-bold text-[var(--text-primary)]">
                          {d.question}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-[var(--badge-bg)] p-5 rounded-2xl border border-[var(--border-color)] space-y-1">
                      <span className="font-mono-code text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase block">
                        DECISION TAKEN:
                      </span>
                      <p className="text-base font-semibold text-[var(--text-primary)]">
                        {d.decision}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono-code text-xs font-bold text-[var(--text-muted)] uppercase block">
                        TECHNICAL REASONING:
                      </span>
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                        {d.reasoning}
                      </p>
                    </div>

                    {d.tradeoffs && d.tradeoffs.length > 0 && (
                      <div className="pt-2">
                        <span className="font-mono-code text-xs font-bold text-[var(--accent-gold)] uppercase block mb-2">
                          TRADEOFFS CONSIDERED:
                        </span>
                        <ul className="space-y-2">
                          {d.tradeoffs.map((t, tidx) => (
                            <li key={tidx} className="flex items-start gap-2 text-sm font-mono-code text-[var(--text-secondary)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-2 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Next/Previous Project Navigation Cards */}
          <div className="pt-12 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="glass-card p-6 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-colors group flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--accent-dark)] group-hover:text-[var(--bg-primary)] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono-code text-[10px] uppercase text-[var(--text-muted)] block">PREVIOUS PROJECT</span>
                  <span className="font-sans-title text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="glass-card p-6 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-colors group flex items-center justify-end text-right gap-4"
              >
                <div>
                  <span className="font-mono-code text-[10px] uppercase text-[var(--text-muted)] block">NEXT PROJECT</span>
                  <span className="font-sans-title text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--accent-dark)] group-hover:text-[var(--bg-primary)] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ) : <div />}
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}
