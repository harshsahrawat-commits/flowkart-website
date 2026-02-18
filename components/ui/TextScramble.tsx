"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;

    const timeout = setTimeout(() => {
      startedRef.current = true;
      let iteration = 0;

      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration += 1 / 3;
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed);

      frameRef.current = interval as unknown as number;
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, delay, speed]);

  return <span className={className}>{display}</span>;
}
