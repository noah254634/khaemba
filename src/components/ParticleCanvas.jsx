import React, { useEffect, useRef } from 'react';

/**
 * Mobile-Optimized ParticleCanvas
 * Automatically disables animation loop on mobile screens (<768px)
 * or reduced motion settings to preserve 60fps scrolling and eliminate battery/GPU lag.
 */
export default function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check mobile or reduced motion preference
    const isMobile = window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile) {
      // On mobile screens, don't spin up requestAnimationFrame loop at all
      return;
    }

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let cachedGlowGrad = null;

    const buildGradient = () => {
      cachedGlowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        10,
        width * 0.5,
        height * 0.2,
        width * 0.45
      );
      if (isDark) {
        cachedGlowGrad.addColorStop(0, 'rgba(229, 197, 158, 0.04)');
        cachedGlowGrad.addColorStop(1, 'rgba(10, 11, 14, 0)');
      } else {
        cachedGlowGrad.addColorStop(0, 'rgba(156, 120, 74, 0.03)');
        cachedGlowGrad.addColorStop(1, 'rgba(250, 249, 245, 0)');
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildGradient();
    };

    window.addEventListener('resize', handleResize);
    buildGradient();

    // Cap particle count for smooth performance
    const particleCount = Math.min(Math.floor((width * height) / 35000), 40);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    const particleColor = isDark ? '244, 244, 246' : '18, 19, 22';

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (cachedGlowGrad) {
        ctx.fillStyle = cachedGlowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500 hidden md:block"
    />
  );
}
