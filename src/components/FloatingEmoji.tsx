import { useEffect, useState } from "react";

const EMOJIS = ["🎈", "🎉", "🎊", "🎁", "🎂", "⭐", "💫", "✨"];

interface Balloon {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingEmoji = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const items: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 4,
      size: 1.2 + Math.random() * 1.5,
    }));
    setBalloons(items);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${b.left}%`,
            fontSize: `${b.size}rem`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          {b.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
