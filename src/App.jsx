import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import DecisionExplorer from './components/DecisionExplorer';
import TechnicalBenchmarks from './components/TechnicalBenchmarks';
import Testimonials from './components/Testimonials';
import EstimatorWidget from './components/EstimatorWidget';
import Footer from './components/Footer';
import ProjectDetail from './pages/ProjectDetail';
import { ProfileProvider } from './context/ProfileContext';
import Seo, { DEFAULT_DESCRIPTION } from './components/Seo';
import { useProfile } from './context/ProfileContext';

function HomePage({ isDark, setIsDark }) {
  const { profile } = useProfile();

  // Scroll-reveal: animate sections in as they enter the viewport
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    sections.forEach((el) => el.classList.add('section-reveal'));

    if (!('IntersectionObserver' in window)) {
      sections.forEach((el) => el.classList.add('visible'));
      return () => {};
    }

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
      <Seo
        title={profile?.title || 'Systems Engineer'}
        description={profile?.bio || DEFAULT_DESCRIPTION}
        image={profile?.avatarUrl}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile?.fullName || 'Noah Khaemba',
          jobTitle: profile?.title || 'Systems Engineer',
          description: profile?.bio || DEFAULT_DESCRIPTION,
          url: window.location.origin,
          image: profile?.avatarUrl,
        }}
      />
      <ParticleCanvas isDark={isDark} />

      <div className="relative z-10">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        
        <main>
          <Hero />
          <ProjectGrid />
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
    <ProfileProvider>
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<HomePage isDark={isDark} setIsDark={setIsDark} />} />
      </Routes>
    </ProfileProvider>
  );
}
