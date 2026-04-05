"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const timeout = setTimeout(
      () => {
        setCurrentIndex((prev) => prev + 1);
      },
      currentIndex === 0 ? delay : speed,
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, speed]);

  const displayText = useMemo(() => {
    return text.slice(0, currentIndex);
  }, [text, currentIndex]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
}
