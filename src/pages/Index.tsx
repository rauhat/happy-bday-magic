import Confetti from "@/components/Confetti";
import FloatingEmoji from "@/components/FloatingEmoji";

const Index = () => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4">
      <Confetti />
      <FloatingEmoji />

      {/* Cake emoji */}
      <div className="animate-bounce-in mb-4 text-6xl sm:text-7xl md:text-8xl">
        🎂
      </div>

      {/* Main heading */}
      <h1
        className="animate-bounce-in animate-pulse-glow font-display text-center text-primary"
        style={{
          fontSize: "clamp(2.2rem, 8vw, 5rem)",
          animationDelay: "0.2s",
          animationFillMode: "both",
        }}
      >
        Happy Birthday!
      </h1>

      {/* Subtitle */}
      <p
        className="animate-slide-up mt-4 text-center text-lg text-muted-foreground sm:text-xl md:text-2xl"
        style={{ animationDelay: "0.6s", animationFillMode: "both" }}
      >
        🎉 Wishing you an amazing day filled with joy! 🎉
      </p>

      {/* Decorative dots */}
      <div
        className="animate-slide-up mt-8 flex gap-3"
        style={{ animationDelay: "1s", animationFillMode: "both" }}
      >
        {["bg-primary", "bg-accent", "bg-[hsl(var(--confetti-blue))]", "bg-[hsl(var(--confetti-green))]"].map(
          (color, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${color}`}
              style={{ animation: `pulse-glow 2s ease-in-out ${i * 0.3}s infinite` }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Index;
