import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CosmicBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || theme !== "dark") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-star-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Light rays from right to left */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute h-full w-1 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-light-ray"
            style={{
              right: `-10%`,
              top: `${i * 20}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i}s`,
              transform: `rotate(-15deg)`,
            }}
          />
        ))}
      </div>

      {/* Cosmic glow orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}
