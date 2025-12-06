"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TypewriterText({
  text,
  className = "",
  delay = 0,
  speed = 100,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }
      },
      currentIndex === 0 ? delay : speed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}
