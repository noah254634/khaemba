import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { fetchTestimonials } from '../services/api';
import OptimizedImage from './OptimizedImage';

function initials(name) {
  if (!name) return 'NK';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);

  const loadTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTestimonials();
      setTestimonials(data || []);
    } catch (requestError) {
      console.error('Error fetching testimonials:', requestError);
      setError('Testimonials could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Extract unique categories/domains
  const categories = useMemo(() => {
    if (!testimonials.length) return ['ALL'];
    const domains = testimonials
      .map((t) => t.domain)
      .filter(Boolean)
      .map((d) => d.toUpperCase());
    return ['ALL', ...Array.from(new Set(domains))];
  }, [testimonials]);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'ALL') return testimonials;
    return testimonials.filter(
      (t) => t.domain && t.domain.toUpperCase() === activeCategory
    );
  }, [testimonials, activeCategory]);

  // Reset slider index when category changes
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  const handleScrollTo = (index) => {
    if (!scrollRef.current) return;
    const clampedIndex = Math.max(0, Math.min(index, filteredTestimonials.length - 1));
    setCurrentIndex(clampedIndex);

    const card = scrollRef.current.children[clampedIndex];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleNext = () => {
    handleScrollTo(currentIndex + 1 >= filteredTestimonials.length ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    handleScrollTo(currentIndex - 1 < 0 ? filteredTestimonials.length - 1 : currentIndex - 1);
  };

  if (loading || error || !testimonials.length) {
    return (
      <section className="py-20 sm:py-28 lg:py-32 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {loading ? (
            <div className="h-44 max-w-4xl mx-auto rounded-3xl bg-[var(--badge-bg)] animate-pulse" />
          ) : (
            <>
              <p className="text-sm text-[var(--text-secondary)]">
                {error || 'No endorsements available yet.'}
              </p>
              {error && (
                <button
                  type="button"
                  onClick={loadTestimonials}
                  className="btn-agency-secondary mt-5"
                >
                  Try Again
                </button>
              )}
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28 lg:py-32 border-b border-[var(--border-color)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="badge-glass inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                VERIFIED ENDORSEMENTS
              </span>
            </div>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)]">
              Peer &amp; Leadership Endorsements
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-[var(--bg-card)] p-1.5 rounded-full border border-[var(--border-color)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-mono-code text-[11px] font-bold uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[var(--accent-dark)] text-[var(--bg-primary)] shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--badge-bg)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Slider Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] transition-all"
                aria-label="Previous Endorsement"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-card-hover)] flex items-center justify-center text-[var(--text-primary)] transition-all"
                aria-label="Next Endorsement"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* High-End Testimonials Touch-Swipe Stage */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-1 -mx-1"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y',
            }}
          >
            {filteredTestimonials.map((testimonial, idx) => {
              const isSelected = currentIndex === idx;

              return (
                <div
                  key={testimonial._id || idx}
                  onClick={() => handleScrollTo(idx)}
                  className={`snap-center w-[300px] sm:w-[380px] lg:w-[420px] shrink-0 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'border-[var(--accent-gold)] shadow-xl scale-[1.01]'
                      : 'border-[var(--border-color)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {/* Top Rating & Domain Tag */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 text-[10px] font-mono-code font-bold uppercase text-[var(--accent-gold)] tracking-wider">
                      {testimonial.domain || 'ENGINEERING'}
                    </span>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, rIdx) => (
                        <Star
                          key={rIdx}
                          className="w-3.5 h-3.5 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative space-y-3">
                    <Quote className="w-7 h-7 text-[var(--accent-gold)] opacity-30 absolute -top-2 -left-1" />
                    <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed pl-5 italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>

                  {/* Footer Author Lockup */}
                  <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {testimonial.avatarUrl ? (
                        <OptimizedImage
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          className="w-11 h-11 rounded-full border border-[var(--accent-gold)] shrink-0"
                          objectFit="object-cover"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[var(--accent-dark)] text-[var(--bg-primary)] font-mono-code font-bold text-xs flex items-center justify-center border border-[var(--accent-gold)] shrink-0 shadow-sm">
                          {initials(testimonial.name)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="font-sans-title text-sm font-bold text-[var(--text-primary)] truncate">
                          {testimonial.name}
                        </h4>
                        <p className="font-mono-code text-[11px] text-[var(--text-muted)] truncate">
                          {testimonial.role},{' '}
                          <span className="text-[var(--text-secondary)] font-semibold">
                            {testimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>

                    <Sparkles className="w-4 h-4 text-[var(--accent-gold)] opacity-50 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Counter & Progress Indicator */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono-code text-xs font-bold text-[var(--text-primary)]">
              0{currentIndex + 1}
            </span>
            <span className="font-mono-code text-xs text-[var(--text-muted)]">
              / 0{filteredTestimonials.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {filteredTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-[var(--accent-gold)]'
                    : 'w-2 bg-[var(--border-color)] hover:bg-[var(--text-muted)]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
