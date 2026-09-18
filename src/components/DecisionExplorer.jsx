import React, { useState } from 'react';
import { Cpu, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function DecisionExplorer() {
  const featuredDecisions = [
    {
      project: 'VeraPay — Multi-rail Payment Gateway',
      question: 'Why maintain an internal ledger instead of relying on payment provider records?',
      decision: 'Double-entry accounting ledger committed in PostgreSQL before calling payment rails',
      reasoning:
        'Payment providers drop webhooks, deliver duplicate callbacks, or fail during provider outages. An internal ledger guarantees mathematical audit balance (debits == credits) and acts as the single source of truth for reconciliation without depending on third-party provider availability.',
      tradeoffs: [
        'Adds ~4ms write latency per payment transaction',
        'Requires idempotency key verification in Redis',
        'Complex schema migrations across multi-currency models',
      ],
    },
    {
      project: 'HaptiCare — Edge Health Wearable',
      question: 'Why run inference on-device instead of sending raw sensor data to the cloud?',
      decision: 'Edge inference with INT8 TensorFlow Lite on ESP32-S3 microcontroller',
      reasoning:
        'Rural East African clinical settings frequently lack stable cellular data. On-device inference guarantees <12ms latency, continuous operation during complete network blackout, and 72-hour battery life on a 400mAh battery.',
      tradeoffs: [
        'Model constrained to 84KB memory footprint',
        '1.3% precision drop from INT8 post-training quantisation',
        'Firmware updates require OTA distribution',
      ],
    },
    {
      project: 'Distributed Event Stream Processor',
      question: 'Why select Apache Flink over Apache Spark Streaming for stateful processing?',
      decision: 'Apache Flink with native exactly-once checkpointing to RocksDB/S3',
      reasoning:
        'Spark Streaming relies on micro-batching which introduces batch interval latency floor. Flink is a true event-driven streaming runtime processing events individually as they arrive, yielding sub-100ms P99 latency for financial telemetry pipelines.',
      tradeoffs: [
        'Steeper operational learning curve than Spark',
        'RocksDB state backend requires dedicated memory tuning',
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = featuredDecisions[activeIndex];

  return (
    <section id="decisions" className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono-code uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
              03 — ARCHITECTURAL RATIONALE
            </span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">
              Engineering Decision Records
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] font-normal max-w-md text-sm leading-relaxed">
            Great software engineering is about making explicit, defensible trade-offs. Here is how I evaluate complex architectural choices.
          </p>
        </div>

        {/* Interactive Explorer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Decision Selector Tabs */}
          <div className="lg:col-span-5 space-y-3 xl:space-y-4">
            {featuredDecisions.map((dec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl glass-card transition-all duration-300 flex flex-col justify-between ${
                  activeIndex === idx
                    ? 'border-[var(--accent-gold)] shadow-lg'
                    : 'border-[var(--border-color)] opacity-70 hover:opacity-100'
                }`}
              >
                <span className="font-mono-code text-[10px] font-bold text-[var(--accent-gold)] uppercase mb-2">
                  {dec.project}
                </span>
                <h3 className="font-sans-title text-lg font-bold text-[var(--text-primary)] line-clamp-2">
                  {dec.question}
                </h3>
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Decision Card */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 xl:p-10 rounded-2xl space-y-6">
            
            <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
              <Cpu className="w-6 h-6 text-[var(--accent-gold)] shrink-0" />
              <div>
                <span className="font-mono-code text-xs font-bold text-[var(--accent-gold)] uppercase block">
                  RFC MODULE: {active.project}
                </span>
                <h3 className="font-sans-title text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {active.question}
                </h3>
              </div>
            </div>

            {/* Decision Taken */}
            <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono-code text-xs font-bold uppercase mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>DECISION ADOPTED</span>
              </div>
              <p className="font-sans-title text-lg font-bold text-[var(--text-primary)]">
                {active.decision}
              </p>
            </div>

            {/* Reasoning */}
            <div>
              <span className="font-mono-code text-xs font-bold text-[var(--accent-gold)] uppercase block mb-2">
                ARCHITECTURAL JUSTIFICATION:
              </span>
              <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                {active.reasoning}
              </p>
            </div>

            {/* Tradeoffs */}
            <div>
              <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-mono-code text-xs font-bold uppercase mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>TRADEOFFS & CONSTRAINTS CONSIDERED</span>
              </div>
              <ul className="space-y-2">
                {active.tradeoffs.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-mono-code text-[var(--text-primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)] mt-1.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
