"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "AGENTIC WORKFLOWS",
  "RAG SYSTEMS",
  "CUSTOM ARCHITECTURE",
  "PRODUCTION-GRADE AI",
  "INTELLIGENT INFRASTRUCTURE",
  "CLAUDE OPUS 4.6",
  "MULTI-STEP ORCHESTRATION",
  "CONTINUOUS EVOLUTION",
];

export default function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Base animation
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    // Velocity-reactive: speed up on scroll (FIX 7)
    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speed = Math.max(0.5, Math.min(3, velocity / 500));
        gsap.to(tween, { timeScale: speed, duration: 0.3 });
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  const content = WORDS.map((word) => (
    <span key={word} className="mx-8 whitespace-nowrap">
      {word}
      <span className="mx-8 text-accent/30">///</span>
    </span>
  ));

  return (
    <div
      className="overflow-hidden border-y border-white/5 py-5"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max font-mono text-sm tracking-wider text-white/15">
        {content}
        {content}
      </div>
    </div>
  );
}
