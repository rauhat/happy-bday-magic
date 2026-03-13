import { useEffect, useState } from "react";

const CAKE_LAYERS = [
  { emoji: "🟫", label: "base", width: "w-32 sm:w-40 md:w-48", height: "h-8 sm:h-10" },
  { emoji: "🟪", label: "middle", width: "w-24 sm:w-32 md:w-40", height: "h-8 sm:h-10" },
  { emoji: "🩷", label: "top", width: "w-16 sm:w-24 md:w-32", height: "h-8 sm:h-10" },
];

const CakeAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLayers, setVisibleLayers] = useState(0);
  const [showCandle, setShowCandle] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Show layers one by one
    CAKE_LAYERS.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLayers(i + 1), 600 + i * 700)
      );
    });

    // Show candle after all layers
    timers.push(
      setTimeout(() => setShowCandle(true), 600 + CAKE_LAYERS.length * 700 + 400)
    );

    // Signal completion
    timers.push(
      setTimeout(() => onComplete(), 600 + CAKE_LAYERS.length * 700 + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const colors = [
    "bg-[hsl(25,60%,45%)]",   // brown base
    "bg-[hsl(330,60%,65%)]",   // pink middle  
    "bg-[hsl(350,80%,70%)]",   // light pink top
  ];

  const frostings = [
    "bg-[hsl(45,90%,75%)]",    // golden frosting
    "bg-[hsl(330,70%,75%)]",   // pink frosting
    "bg-[hsl(0,80%,80%)]",     // light red frosting
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Candle */}
      <div
        className="flex flex-col items-center transition-all duration-500"
        style={{
          opacity: showCandle ? 1 : 0,
          transform: showCandle ? "translateY(0) scale(1)" : "translateY(20px) scale(0.5)",
        }}
      >
        <div className="text-2xl sm:text-3xl animate-pulse mb-[-4px]">🔥</div>
        <div className="w-1.5 h-6 sm:h-8 bg-[hsl(45,90%,75%)] rounded-full" />
      </div>

      {/* Cake layers - rendered top to bottom */}
      <div className="flex flex-col items-center">
        {[...CAKE_LAYERS].reverse().map((layer, reversedIndex) => {
          const originalIndex = CAKE_LAYERS.length - 1 - reversedIndex;
          const isVisible = visibleLayers > originalIndex;

          return (
            <div
              key={layer.label}
              className="flex flex-col items-center transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.7)",
                transitionDelay: "0ms",
              }}
            >
              {/* Frosting drip */}
              <div
                className={`${frostings[originalIndex]} rounded-full ${layer.width} h-2 sm:h-3`}
                style={{ marginBottom: "-4px", zIndex: 2 }}
              />
              {/* Layer body */}
              <div
                className={`${colors[originalIndex]} ${layer.width} ${layer.height} rounded-lg relative`}
                style={{ zIndex: 1 }}
              >
                {/* Decorations */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  {originalIndex === 0 && "🍫🍫🍫"}
                  {originalIndex === 1 && "🍓🍓🍓"}
                  {originalIndex === 2 && "💖💖💖"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plate */}
      <div
        className="w-40 sm:w-48 md:w-56 h-2 bg-muted rounded-full mt-1 transition-opacity duration-300"
        style={{ opacity: visibleLayers > 0 ? 1 : 0 }}
      />
    </div>
  );
};

export default CakeAnimation;
