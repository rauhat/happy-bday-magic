import { useCallback, useState } from "react";
import Confetti from "@/components/Confetti";
import FloatingEmoji from "@/components/FloatingEmoji";
import CakeAnimation from "@/components/CakeAnimation";

const Index = () => {
  const [showText, setShowText] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCakeComplete = useCallback(() => {
    setShowText(true);
    // Small delay before confetti burst
    setTimeout(() => setShowConfetti(true), 400);
  }, []);

  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background: "linear-gradient(135deg, hsl(30,50%,95%) 0%, hsl(340,40%,93%) 40%, hsl(260,35%,93%) 70%, hsl(200,40%,93%) 100%)",
      }}
    >
      {showConfetti && <Confetti />}
      <FloatingEmoji />

      {/* Cake */}
      <div className="mb-8">
        <CakeAnimation onComplete={handleCakeComplete} />
      </div>

      {/* Main heading */}
      <h1
        className="font-display text-center text-primary transition-all duration-700"
        style={{
          fontSize: "clamp(2.2rem, 8vw, 5rem)",
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        }}
      >
        Happy Birthday Boss!
      </h1>

      {/* Subtitle in Kazakh */}
      <p
        className="mt-4 text-center text-lg text-muted-foreground sm:text-xl md:text-2xl transition-all duration-700"
        style={{
          opacity: showText ? 1 : 0,
          transform: showText ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "400ms",
        }}
      >
        🎉 Әрдайым осындай сұлу болып жүре бер! 🎉
      </p>

      {/* Decorative dots */}
      <div
        className="mt-8 flex gap-3 transition-all duration-500"
        style={{
          opacity: showText ? 1 : 0,
          transitionDelay: "800ms",
        }}
      >
        {["bg-primary", "bg-accent", "bg-[hsl(var(--confetti-blue))]", "bg-[hsl(var(--confetti-green))]"].map(
          (color, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${color} animate-pulse`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Index;
