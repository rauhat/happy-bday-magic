import { useEffect, useState } from "react";

const CakeAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLayers, setVisibleLayers] = useState(0);
  const [showCandle, setShowCandle] = useState(false);
  const [showDrips, setShowDrips] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Show layers one by one (bottom to top)
    for (let i = 0; i < 3; i++) {
      timers.push(setTimeout(() => setVisibleLayers(i + 1), 600 + i * 700));
    }

    // Dripping cream after layers
    timers.push(setTimeout(() => setShowDrips(true), 600 + 3 * 700 + 300));

    // Candle
    timers.push(setTimeout(() => setShowCandle(true), 600 + 3 * 700 + 900));

    // Done
    timers.push(setTimeout(() => onComplete(), 600 + 3 * 700 + 1600));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const layers = [
    { color: "#8B5E3C", width: "w-36 sm:w-44 md:w-52", height: "h-10 sm:h-12" },
    { color: "#D4749A", width: "w-28 sm:w-36 md:w-44", height: "h-10 sm:h-12" },
    { color: "#F9A8C9", width: "w-20 sm:w-28 md:w-36", height: "h-9 sm:h-11" },
  ];

  const dripHeights = [18, 28, 14, 22, 16, 26, 12, 20, 24, 15];

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
        <div className="text-2xl sm:text-3xl mb-[-6px]" style={{ animation: "pulse 1.5s ease-in-out infinite" }}>🔥</div>
        <div
          className="rounded-full"
          style={{
            width: 6,
            height: 28,
            background: "linear-gradient(to bottom, #FDE68A, #F59E0B)",
          }}
        />
      </div>

      {/* Cake layers top to bottom */}
      <div className="flex flex-col items-center">
        {[...layers].reverse().map((layer, reversedIdx) => {
          const origIdx = layers.length - 1 - reversedIdx;
          const isVisible = visibleLayers > origIdx;

          return (
            <div
              key={origIdx}
              className="relative flex flex-col items-center transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.7)",
              }}
            >
              {/* Cream/frosting top */}
              <div
                className={`${layer.width} relative`}
                style={{ height: 6, marginBottom: -2, zIndex: 3 }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(to bottom, #FFF5E6, #FFE4B5)",
                  }}
                />
                {/* Dripping cream */}
                {showDrips &&
                  dripHeights.map((h, di) => (
                    <div
                      key={di}
                      className="absolute rounded-b-full"
                      style={{
                        left: `${8 + di * 9}%`,
                        top: 4,
                        width: 5,
                        height: 0,
                        background: "linear-gradient(to bottom, #FFE4B5, #FFD89B)",
                        animation: `drip-down 0.8s ease-out ${di * 0.08}s forwards`,
                        // target height encoded as CSS variable
                        // @ts-ignore
                        "--drip-h": `${h}px`,
                      }}
                    />
                  ))}
              </div>

              {/* Layer body */}
              <div
                className={`${layer.width} ${layer.height} rounded-lg relative overflow-hidden`}
                style={{
                  background: `linear-gradient(to bottom, ${layer.color}, ${layer.color}dd)`,
                  zIndex: 2,
                }}
              >
                {/* Subtle stripe decoration */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 5px)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Plate */}
      <div
        className="mt-1 rounded-full transition-opacity duration-300"
        style={{
          width: "clamp(10rem, 20vw, 16rem)",
          height: 6,
          background: "linear-gradient(to bottom, #E5E7EB, #D1D5DB)",
          opacity: visibleLayers > 0 ? 1 : 0,
        }}
      />

      {/* Drip keyframes injected via style tag */}
      <style>{`
        @keyframes drip-down {
          0% { height: 0; opacity: 0.5; }
          100% { height: var(--drip-h, 20px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CakeAnimation;
