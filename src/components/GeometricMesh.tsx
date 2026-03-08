import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  phase: number;
}

const GeometricMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CONNECTION_DIST = 150;
    const POINT_COUNT = 80;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPoints();
    };

    const initPoints = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      pointsRef.current = Array.from({ length: POINT_COUNT }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x, y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const t = time * 0.001;
      const scrollOffset = scrollRef.current * 0.15;
      const pulse = Math.sin(t * 0.5) * 0.5 + 0.5;

      // Update points
      const points = pointsRef.current;
      for (const p of points) {
        p.x = p.originX + Math.sin(t * 0.4 + p.phase) * 25 + Math.cos(t * 0.3 + p.phase * 1.5) * 15;
        p.y = p.originY + Math.cos(t * 0.35 + p.phase) * 20 + scrollOffset * 0.1;
      }

      // Find connections and draw triangles
      const orange = "255, 102, 0";

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.18;

            // Draw line
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(${orange}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Look for triangle with a third point
            for (let k = j + 1; k < points.length; k++) {
              const dk1 = Math.sqrt(
                (points[i].x - points[k].x) ** 2 + (points[i].y - points[k].y) ** 2
              );
              const dk2 = Math.sqrt(
                (points[j].x - points[k].x) ** 2 + (points[j].y - points[k].y) ** 2
              );
              if (dk1 < CONNECTION_DIST && dk2 < CONNECTION_DIST) {
                const triOpacity = (1 - Math.max(dist, dk1, dk2) / CONNECTION_DIST) * 0.04 * (0.6 + pulse * 0.4);
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.lineTo(points[k].x, points[k].y);
                ctx.closePath();
                ctx.fillStyle = `rgba(${orange}, ${triOpacity})`;
                ctx.fill();
              }
            }
          }
        }
      }

      // Draw vertices
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orange}, ${0.25 + pulse * 0.15})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default GeometricMesh;
