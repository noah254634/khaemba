import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { fetchProjects } from '../services/api';

export default function TechnicalBenchmarks() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBenchmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data.filter((project) => project.metrics?.length));
    } catch (requestError) {
      console.error('Error fetching benchmarks:', requestError);
      setError('Benchmark data could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBenchmarks(); }, []);

  return (
    <section className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-mono-code uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
              04 — SYSTEM BENCHMARKS
            </span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">
              Performance Telemetry
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] font-normal max-w-md text-sm leading-relaxed">
            Empirical benchmarks and latency SLAs measured across deployed microservices and edge hardware platforms.
          </p>
        </div>

        {/* Benchmarks Grid */}
        {loading ? <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">{[1, 2, 3].map((item) => <div key={item} className="h-64 rounded-2xl bg-[var(--badge-bg)] animate-pulse" />)}</div> : error ? <div className="glass-card p-10 text-center"><p className="text-sm text-[var(--text-secondary)]">{error}</p><button type="button" onClick={loadBenchmarks} className="btn-agency-secondary mt-5">Try Again</button></div> : projects.length === 0 ? <div className="glass-card p-10 text-center"><p className="text-sm text-[var(--text-secondary)]">No benchmark data is available yet.</p></div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => {
            const metric = project.metrics[0];
            return (
              <div
                key={project._id || project.slug}
                className="glass-card p-6 sm:p-8 xl:p-10 flex flex-col justify-between space-y-6 hover:border-[var(--accent-gold)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon & Metric */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-2xl font-bold text-[var(--accent-gold)]">
                      {metric.value} {metric.label}
                    </span>
                    <div className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)]">
                      <Activity className="w-5 h-5 text-[var(--accent-gold)]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans-title text-xl font-bold text-[var(--text-primary)]">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-1.5 font-mono-code text-[11px]">
                  {project.stack?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                    >
                        {typeof tag === 'object' ? tag.name : tag}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>}

      </div>
    </section>
  );
}


