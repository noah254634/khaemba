import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.floor((width * height) / 25000);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle radial gradient glow top-center
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        10,
        width * 0.5,
        height * 0.2,
        width * 0.45
      );
      if (isDark) {
        glowGrad.addColorStop(0, 'rgba(229, 197, 158, 0.04)');
        glowGrad.addColorStop(1, 'rgba(10, 11, 14, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(156, 120, 74, 0.03)');
        glowGrad.addColorStop(1, 'rgba(250, 249, 245, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Render particles
      const particleColor = isDark ? '244, 244, 246' : '18, 19, 22';

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
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500"
    />
  );
}
