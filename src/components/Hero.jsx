import React from 'react';
import { Download, ArrowUpRight, Layers } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export default function Hero() {
  const { profile, loading, error, retry } = useProfile();

  if (loading) {
    return <section className="relative pt-24 sm:pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24 lg:pb-32 border-b border-[var(--border-color)]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-pulse"><div className="lg:col-span-7 space-y-6"><div className="h-6 w-40 rounded-full bg-[var(--badge-bg)]" /><div className="h-24 max-w-2xl rounded-xl bg-[var(--badge-bg)]" /><div className="h-16 max-w-xl rounded-xl bg-[var(--badge-bg)]" /><div className="h-12 w-44 rounded-full bg-[var(--badge-bg)]" /></div><div className="lg:col-span-5 aspect-[4/5] rounded-2xl bg-[var(--badge-bg)]" /></div></div></section>;
  }

  if (error || !profile) {
    return <section className="relative pt-32 pb-24 border-b border-[var(--border-color)]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-xl space-y-4"><p className="font-mono-code text-xs uppercase tracking-widest text-[var(--text-muted)]">Profile unavailable</p><h1 className="font-sans-title text-3xl sm:text-5xl text-[var(--text-primary)]">The profile could not be loaded.</h1><button type="button" onClick={retry} className="btn-agency-secondary">Try again</button></div></div></section>;
  }

  const { fullName, title, headline, bio, availability, techStackTag, avatarUrl, cvUrl } = profile;

  // Parse tech stack tag string (e.g. "Go / Kafka / C++ / Rust") into list of clean pills
  const techList = techStackTag
    ? techStackTag
        .split(/[\/,|]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="relative pt-24 sm:pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24 lg:pb-32 overflow-hidden border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-column split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left Column: Metadata, Headline, Subtext, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-7">
            
            {/* Single Line Availability & Location Pill */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-code border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium break-words">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                {availability}
              </span>
            </div>

            {/* Authoritative Sans-Serif Headline */}
            <h1 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-[var(--text-primary)] break-words">
              {headline}
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] font-medium max-w-xl leading-relaxed break-words">
              {bio}
            </p>

            {/* Streamlined CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-agency-primary flex items-center justify-center gap-2.5 w-full sm:w-auto"
              >
                <span>DOWNLOAD CV</span>
                <Download className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn-agency-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--accent-gold)]" />
              </a>
            </div>

          </div>

          {/* Right Column: Framed Editorial Hero Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-2xl overflow-hidden glass-card p-3 shadow-2xl transition-all duration-500 group">
              
              {/* Image Container with Top Positioning to Prevent Head Cropping */}
              <div className="relative aspect-[4/5] sm:aspect-[4/5] max-h-[520px] w-full rounded-xl overflow-hidden bg-[var(--bg-card-hover)] flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt={`${fullName} — ${title}`}
                  className="w-full h-full object-cover object-top grayscale contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
                
              </div>

              {/* Bottom Caption Metadata (Responsive Layout for Multiple Languages & Small Devices) */}
              <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="block font-mono-code text-xs font-bold text-[var(--text-primary)] truncate">
                    {fullName}
                  </span>
                  <span className="block font-mono-code text-[11px] text-[var(--text-muted)] truncate">
                    {title}
                  </span>
                </div>
                
                {/* Tech Stack Pills list */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="flex items-center gap-1 mr-1 text-[11px] font-mono-code text-[var(--accent-gold)] font-bold">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  {techList.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 text-[11px] font-mono-code text-[var(--accent-gold)] font-medium whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


