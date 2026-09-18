import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ServicesIndex from './components/ServicesIndex';
import DecisionExplorer from './components/DecisionExplorer';
import TechnicalBenchmarks from './components/TechnicalBenchmarks';
import EstimatorWidget from './components/EstimatorWidget';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProjectDetail from './pages/ProjectDetail';

function HomePage({ isDark, setIsDark }) {
  // Scroll-reveal: animate sections in as they enter the viewport
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sections.forEach((el) => el.classList.add('section-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <ParticleCanvas isDark={isDark} />

      <div className="relative z-10">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        
        <main>
          <Hero />
          <ProjectGrid />
          <ServicesIndex />
          <DecisionExplorer />
          <TechnicalBenchmarks />
          <Testimonials />
          <EstimatorWidget />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
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

  return (
    <Routes>
      <Route path="/" element={<HomePage isDark={isDark} setIsDark={setIsDark} />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<HomePage isDark={isDark} setIsDark={setIsDark} />} />
    </Routes>
  );
}
