import React from 'react';
import { Activity, Cpu, Zap } from 'lucide-react';

export default function TechnicalBenchmarks() {
  const benchmarks = [
    {
      metric: '142ms P99 SLA',
      title: 'VeraPay Multi-Rail Ledger',
      description:
        'Idempotent double-entry accounting ledger committed to PostgreSQL before triggering external payment rails across 14 currencies.',
      tags: ['Go', 'Kafka', 'PostgreSQL', 'Redis'],
      icon: Zap,
    },
    {
      metric: '11.8ms Inference',
      title: 'HaptiCare Edge Wearable',
      description:
        'Quantised INT8 TensorFlow Lite model running on ESP32-S3 microcontroller vector processing unit for offline-first vital sign analysis.',
      tags: ['C++', 'TFLite INT8', 'ESP32-S3', 'BLE'],
      icon: Cpu,
    },
    {
      metric: '2M+ Evts/Sec',
      title: 'Distributed Event Stream',
      description:
        'Stateful stream processing engine built on Kafka and Apache Flink with native exactly-once RocksDB state checkpointing to S3.',
      tags: ['Java', 'Apache Flink', 'Kafka', 'Prometheus'],
      icon: Activity,
    },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benchmarks.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 sm:p-8 xl:p-10 flex flex-col justify-between space-y-6 hover:border-[var(--accent-gold)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon & Metric */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-2xl font-bold text-[var(--accent-gold)]">
                      {b.metric}
                    </span>
                    <div className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)]">
                      <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-sans-title text-xl font-bold text-[var(--text-primary)]">
                    {b.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
                    {b.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-1.5 font-mono-code text-[11px]">
                  {b.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


