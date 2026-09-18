import React from 'react';
import { Terminal, Cpu, Database, Server, ArrowUpRight } from 'lucide-react';

export default function ServicesIndex() {
  const capabilities = [
    {
      number: '01',
      title: 'Multi-Rail Payment Architecture',
      description:
        'Building idempotent payment routers with double-entry accounting ledgers. Abstracting M-Pesa, bank wires, and stablecoin settlement with zero reconciliation drift.',
      tags: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC'],
      icon: Server,
    },
    {
      number: '02',
      title: 'Distributed Event Streaming',
      description:
        'Architecting event-driven topologies with Kafka and Flink. Developing custom Kubernetes operators and Etcd-backed config engines for sub-100ms SLAs.',
      tags: ['Kubernetes', 'Docker', 'Apache Flink', 'Etcd', 'Prometheus'],
      icon: Cpu,
    },
    {
      number: '03',
      title: 'Schema-Aware Data Lakes',
      description:
        'Constructing real-time CDC ingestion pipelines. Extracting raw data into partitioned Parquet format on AWS S3 and Glue Catalog with Airflow orchestration.',
      tags: ['Python', 'FastAPI', 'Apache Airflow', 'Debezium', 'AWS S3'],
      icon: Database,
    },
    {
      number: '04',
      title: 'Edge AI & Embedded Inference',
      description:
        'Quantising neural networks for microcontrollers (ESP32-S3). Deploying INT8 TFLite models for offline-first vital sign and sensor analytics in low-bandwidth settings.',
      tags: ['C++', 'TensorFlow Lite', 'ONNX', 'BLE', 'Embedded C'],
      icon: Terminal,
    },
  ];

  return (
    <section id="capabilities" className="py-20 sm:py-28 lg:py-36 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="badge-glass mb-3 inline-block">
              // 02 CORE CAPABILITIES
            </span>
            <h2 className="font-sans-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-primary)]">
              Engineering Capabilities
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] font-normal max-w-md text-sm leading-relaxed">
            Technical domain expertise honed through building high-scale production systems for financial, data, and edge intelligence applications.
          </p>
        </div>

        {/* 2x2 Responsive Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div
                key={index}
                className="group glass-card p-6 sm:p-8 xl:p-10 flex flex-col justify-between hover:border-[var(--accent-gold)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Numeral Index & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-2xl font-bold text-[var(--accent-gold)]">
                      {cap.number}
                    </span>
                    <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--badge-bg)] group-hover:border-[var(--accent-gold)] transition-colors">
                      <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                    </div>
                  </div>

                  {/* Title & Concise Breakdown */}
                  <h3 className="font-sans-title text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-sm lg:text-[0.9rem] text-[var(--text-secondary)] font-normal leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Inline Tech Pills */}
                <div className="pt-6 border-t border-[var(--border-color)] mt-6 flex flex-wrap gap-2">
                  {cap.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono-code text-[11px] px-2.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)]"
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
