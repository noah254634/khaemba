import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Copy, Check, Mail, GitBranch, Globe } from 'lucide-react';

export default function EstimatorWidget() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const emailAddress = 'noahkhaemba290@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: `Engineering Inquiry from ${formData.name}`,
        body: formData.body,
      });

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', body: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-mono-code uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
              05 — GET IN TOUCH
            </span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">
              Initiate Technical Discussion
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] font-normal max-w-md text-sm leading-relaxed">
            Have a question about high-throughput payment architectures, edge AI inference, or distributed data infrastructure? Reach out directly.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Email Copy & Network Stack */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 xl:p-10 space-y-6">
            <div>
              <span className="font-mono-code text-xs font-bold text-[var(--text-muted)] uppercase block mb-2">
                DIRECT EMAIL
              </span>
              
              <div className="flex items-center gap-2 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)]">
                <Mail className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span className="font-mono-code text-xs font-semibold text-[var(--text-primary)] truncate">
                  {emailAddress}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-auto p-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-gold)] text-[var(--text-primary)] transition-colors shrink-0"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Direct Social Buttons */}
            <div className="space-y-3 pt-2">
              <span className="font-mono-code text-xs font-bold text-[var(--text-muted)] uppercase block mb-2">
                PROFILES & CODE REPOS
              </span>
              
              <a
                href="https://github.com/noah254634"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)] text-xs font-mono-code font-bold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>GitHub Repositories</span>
                </div>
                <span>→</span>
              </a>

              <a
                href="https://www.linkedin.com/in/noah-khaemba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)] text-xs font-mono-code font-bold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>LinkedIn Profile</span>
                </div>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean 3-Field Message Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 xl:p-10">
            
            {status.success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-sans-title text-2xl font-bold text-[var(--text-primary)]">
                  Message Sent
                </h3>
                <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto font-normal">
                  Thank you! Your inquiry has been sent directly to Noah. Expect a response within 24 hours.
                </p>
                <button
                  onClick={() => setStatus({ loading: false, success: false, error: null })}
                  className="btn-agency-secondary text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] block mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Vance"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--text-primary)] font-sans text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder:text-[var(--text-muted)]"
                    />
                  </div>

                  <div>
                    <label className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] block mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--text-primary)] font-sans text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] block mb-2">
                    SYSTEM REQUIREMENTS / INQUIRY *
                  </label>
                  <textarea
                    name="body"
                    rows={5}
                    required
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Describe your system requirements, architecture questions, or project scope..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)] text-[var(--text-primary)] font-sans text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors placeholder:text-[var(--text-muted)]"
                  />
                </div>

                {/* Error Alert */}
                {status.error && (
                  <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 font-mono-code text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {/* Submit CTA */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="btn-agency-primary flex items-center gap-2 text-xs"
                  >
                    {status.loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
