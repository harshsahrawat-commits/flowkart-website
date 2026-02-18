"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Make cursor visible
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    const moveDot = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1 });
      gsap.to(ring, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
    };

    const grow = () =>
      gsap.to(ring, { scale: 2.5, borderColor: "rgba(255,255,255,0.3)", duration: 0.3 });
    const shrink = () =>
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.5)", duration: 0.3 });

    window.addEventListener("mousemove", moveDot);

    const interactiveSelector = "a, button, [data-cursor]";
    const observe = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    };

    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveDot);
      document.body.style.cursor = "";
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-white opacity-0"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-white/50 opacity-0"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
