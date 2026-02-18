"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const THEM = [
  "Drag-and-drop tools",
  "Brittle templates",
  "Generic chatbots",
  "\"Build and vanish\" model",
];

const US = [
  "Production-grade code",
  "Custom architecture",
  "Agentic logic for edge cases",
  "Obsessive continuous iteration",
];

export default function Differentiator() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".diff-headline", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".them-item", {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".diff-grid",
          start: "top 75%",
        },
      });

      gsap.from(".us-item", {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".diff-grid",
          start: "top 75%",
        },
      });

      gsap.from(".diff-closing", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".diff-closing",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="differentiator"
      ref={sectionRef}
      className="relative bg-void py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 className="diff-headline mb-16 max-w-3xl">
          There&apos;s a difference between automation and intelligence.
        </h2>

        <div className="diff-grid grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left — Them */}
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-6">
              The Market
            </p>
            {THEM.map((item, i) => (
              <div key={i} className="them-item flex items-start gap-3">
                <span className="mt-1 text-red-400 shrink-0">✕</span>
                <p className="text-text-muted line-through decoration-white/10">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Right — Us */}
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-6">
              What Flowkart builds
            </p>
            {US.map((item, i) => (
              <div key={i} className="us-item flex items-start gap-3">
                <span className="mt-1 text-success shrink-0">✓</span>
                <p className="text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="diff-closing mt-16 max-w-2xl text-lg text-text-muted leading-relaxed">
          No-code tools have their place. But when your business depends on it,
          you need systems that are engineered — not assembled.
        </p>
      </div>
    </section>
  );
}
