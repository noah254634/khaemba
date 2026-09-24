import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { fetchTestimonials } from '../services/api';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="w-[320px] sm:w-[360px] lg:w-[380px] shrink-0 glass-card p-6 flex flex-col justify-between space-y-5 hover:border-[var(--accent-gold)] transition-colors duration-300 cursor-default select-none">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {testimonial.avatarUrl ? (
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border border-[var(--accent-gold)]" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--accent-dark)] text-[var(--bg-primary)] font-mono-code font-bold text-sm flex items-center justify-center border border-[var(--accent-gold)]">
              {initials(testimonial.name)}
            </div>
          )}
          <div>
            <h4 className="font-sans-title text-[0.9rem] font-bold text-[var(--text-primary)] leading-tight">{testimonial.name}</h4>
            <p className="font-mono-code text-[10px] text-[var(--text-muted)]">
              {testimonial.role}, <span className="text-[var(--text-secondary)]">{testimonial.company}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} className="w-3.5 h-3.5 fill-[var(--accent-gold)] text-[var(--accent-gold)]" />
          ))}
        </div>

        <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>
      </div>

      <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
        <span className="font-mono-code text-[10px] text-[var(--accent-gold)] uppercase tracking-wider font-bold">{testimonial.domain}</span>
        <Quote className="w-4 h-4 text-[var(--text-muted)] opacity-30" />
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      setTestimonials(await fetchTestimonials());
    } catch (requestError) {
      console.error('Error fetching testimonials:', requestError);
      setError('Testimonials could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTestimonials(); }, []);

  if (loading || error || !testimonials.length) {
    return <section className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">{loading ? <div className="h-24 rounded-2xl bg-[var(--badge-bg)] animate-pulse" /> : <><p className="text-sm text-[var(--text-secondary)]">{error || 'No testimonials are available yet.'}</p>{error && <button type="button" onClick={loadTestimonials} className="btn-agency-secondary mt-5">Try Again</button>}</>}</div></section>;
  }

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="badge-glass mb-3 inline-block">// ENDORSEMENTS</span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">Client &amp; Peer Endorsements</h2>
          </div>
          <p className="text-[var(--text-secondary)] font-normal max-w-xs text-sm leading-relaxed shrink-0">Hover the strip to pause.</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)' }} />
        <div className="flex overflow-hidden">
          <div className="marquee-track flex gap-6 w-max">
            {doubledTestimonials.map((testimonial, index) => <TestimonialCard key={`${testimonial._id}-${index}`} testimonial={testimonial} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
