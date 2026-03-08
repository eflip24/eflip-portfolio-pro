import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PARTICLE_COUNT = 160;
    const CONNECTION_DIST = 120;
    const MOUSE_RADIUS = 180;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const initParticles = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Top radial glow
      const grd = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, w * 0.6);
      grd.addColorStop(0, "rgba(255, 102, 0, 0.06)");
      grd.addColorStop(1, "rgba(255, 102, 0, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      const t = time * 0.001;
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      for (const p of particles) {
        // Mouse repulsion
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < MOUSE_RADIUS && mouseDist > 0) {
          const force = (1 - mouseDist / MOUSE_RADIUS) * 2;
          p.vx += (dmx / mouseDist) * force * 0.15;
          p.vy += (dmy / mouseDist) * force * 0.15;
        }

        // Gentle drift oscillation
        p.vx += Math.sin(t + p.phase) * 0.003;
        p.vy += Math.cos(t * 0.8 + p.phase) * 0.003;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 102, 0, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      for (const p of particles) {
        const pulse = Math.sin(t * 1.5 + p.phase) * 0.15 + 0.85;
        const alpha = p.opacity * pulse;

        // Glow
        const glowSize = p.size * 4;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        glow.addColorStop(0, `rgba(255, 102, 0, ${alpha * 0.4})`);
        glow.addColorStop(1, "rgba(255, 102, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - glowSize, p.y - glowSize, glowSize * 2, glowSize * 2);

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 102, 0, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    animRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleField;
