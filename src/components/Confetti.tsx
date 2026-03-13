import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#F59E0B", "#EF4444", "#3B82F6", "#22C55E", "#A855F7", "#EC4899"];

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, { resize: true, useWorker: true });

    // Initial burst
    const burst = () => {
      myConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: COLORS });
      setTimeout(() => {
        myConfetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: COLORS });
        myConfetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: COLORS });
      }, 250);
    };

    burst();

    // Continuous gentle confetti
    const interval = setInterval(() => {
      myConfetti({
        particleCount: 3,
        angle: 60 + Math.random() * 60,
        spread: 45,
        origin: { x: Math.random(), y: -0.1 },
        colors: COLORS,
        gravity: 0.6,
        drift: Math.random() - 0.5,
        ticks: 300,
      });
    }, 200);

    return () => {
      clearInterval(interval);
      myConfetti.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Confetti;
