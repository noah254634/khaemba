import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Noah redefined our payment processing layer. His double-entry ledger implementation eliminated reconciliation discrepancies entirely across 14 currencies.',
    name: 'Dr. Kevin Omondi',
    role: 'Chief Technology Officer',
    company: 'FinPulse Africa',
    avatar: '/persona_kevin.png',
    monogram: 'KO',
    domain: 'FINTECH & PAYMENTS',
    rating: 5,
  },
  {
    quote:
      'The dataset orchestration platform Noah built for VeraLabel scaled our ML annotation throughput by 400%. His focus on data validation is world class.',
    name: 'Sarah Jenkins',
    role: 'Head of Machine Learning',
    company: 'DataScale Labs',
    avatar: '',
    monogram: 'SJ',
    domain: 'AI PLATFORMS',
    rating: 5,
  },
  {
    quote:
      'HaptiCare was a daunting hardware-software challenge. Noah successfully deployed a TensorFlow Lite INT8 model onto the ESP32-S3 within sub-12ms inference budgets.',
    name: 'Prof. Amara Diallo',
    role: 'Director of BioEngineering',
    company: 'Afrisense Health',
    avatar: '',
    monogram: 'AD',
    domain: 'EDGE AI & IOT',
    rating: 5,
  },
  {
    quote:
      'Engineered our Kafka/Flink streaming topology to process over 2M events/sec under sub-100ms P99 SLAs. Flawless execution and zero downtime.',
    name: 'Marcus Vance',
    role: 'VP of Infrastructure',
    company: 'DataStream Global',
    avatar: '',
    monogram: 'MV',
    domain: 'DISTRIBUTED SYSTEMS',
    rating: 5,
  },
];

// Duplicate the list so the strip loops seamlessly
const doubledTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ t }) {
  return (
    <div
      className="
        w-[320px] sm:w-[360px] lg:w-[380px] shrink-0
        glass-card p-6 flex flex-col justify-between space-y-5
        hover:border-[var(--accent-gold)] transition-colors duration-300
        cursor-default select-none
      "
    >
      {/* Persona row */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {t.avatar ? (
            <img
              src={t.avatar}
              alt={t.name}
              className="w-10 h-10 rounded-full object-cover border border-[var(--accent-gold)]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--accent-dark)] text-[var(--bg-primary)] font-mono-code font-bold text-sm flex items-center justify-center border border-[var(--accent-gold)]">
              {t.monogram}
            </div>
          )}
          <div>
            <h4 className="font-sans-title text-[0.9rem] font-bold text-[var(--text-primary)] leading-tight">
              {t.name}
            </h4>
            <p className="font-mono-code text-[10px] text-[var(--text-muted)]">
              {t.role},{' '}
              <span className="text-[var(--text-secondary)]">{t.company}</span>
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed italic">
          "{t.quote}"
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
        <span className="font-mono-code text-[10px] text-[var(--accent-gold)] uppercase tracking-wider font-bold">
          {t.domain}
        </span>
        <Quote className="w-4 h-4 text-[var(--text-muted)] opacity-30" />
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="badge-glass mb-3 inline-block">
              // 04 ENDORSEMENTS
            </span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">
              Client & Peer Endorsements
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] font-normal max-w-xs text-sm leading-relaxed shrink-0">
            Hover the strip to pause.
          </p>
        </div>
      </div>

      {/* ── Edge-fade vignettes so cards dissolve at both sides ── */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)',
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)',
          }}
        />

        {/* Marquee strip */}
        <div className="flex overflow-hidden">
          <div className="marquee-track flex gap-6 w-max">
            {doubledTestimonials.map((t, idx) => (
              <TestimonialCard key={idx} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
