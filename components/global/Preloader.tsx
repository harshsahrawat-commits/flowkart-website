"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;
    const bar = barRef.current;
    if (!container || !counter || !bar) return;

    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.to(counter, {
      textContent: 100,
      duration: 1.2,
      snap: { textContent: 1 },
      ease: "power2.inOut",
    })
      .to(bar, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0)
      .to(container, {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut",
        delay: 0.1,
      });

    // Safety timeout (FIX 2): remove preloader after 3s no matter what
    const safety = setTimeout(() => {
      document.body.style.overflow = "";
      setDone(true);
    }, 3000);

    return () => {
      clearTimeout(safety);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
    >
      <span className="font-mono text-sm tracking-wider text-text-muted mb-4">
        FLOWKART
      </span>
      <div className="flex items-baseline gap-1">
        <span
          ref={counterRef}
          className="font-mono text-5xl font-bold tabular-nums text-white"
        >
          0
        </span>
        <span className="font-mono text-lg text-text-muted">%</span>
      </div>
      <div className="mt-6 h-[2px] w-48 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-accent"
        />
      </div>
    </div>
  );
}
