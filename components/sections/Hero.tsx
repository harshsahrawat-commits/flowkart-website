"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextScramble from "@/components/ui/TextScramble";
import useIOSSafari from "@/hooks/useIOSSafari";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isIOS = useIOSSafari();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });

      tl.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.6 })
        .from(
          line1Ref.current,
          { yPercent: 100, opacity: 0, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        )
        .from(
          line2Ref.current,
          { yPercent: 100, opacity: 0, duration: 0.8, ease: "power4.out" },
          "-=0.5"
        )
        .from(
          subtitleRef.current,
          { opacity: 0, y: 20, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          { opacity: 0, scale: 0.9, duration: 0.5 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const lenis = (
      window as unknown as Record<string, { scrollTo: (target: HTMLElement, opts: { offset: number }) => void }>
    ).__lenis;
    const target = document.getElementById("problem");
    if (lenis && target) lenis.scrollTo(target, { offset: -80 });
    else if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* FIX 1: Radial Glow + Gradient Mesh Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Radial glow — centered behind headline */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 ${isIOS ? "blur-[60px]" : "blur-[150px]"}`}
          style={{ background: "var(--color-accent, #00f0ff)" }}
        />

        {/* Mesh gradient — multiple layered radials for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 600px 600px at 30% 40%, rgba(0, 240, 255, 0.08) 0%, transparent 70%),
              radial-gradient(ellipse 400px 400px at 70% 60%, rgba(99, 102, 241, 0.06) 0%, transparent 70%),
              radial-gradient(ellipse 800px 400px at 50% 80%, rgba(0, 240, 255, 0.04) 0%, transparent 70%)
            `,
          }}
        />

        {/* Animated floating orb for movement — static on iOS */}
        <div
          className={`absolute left-1/2 top-1/3 -translate-x-1/2 h-[400px] w-[400px] rounded-full ${isIOS ? "blur-[50px]" : "blur-[120px] animate-pulse"}`}
          style={{
            background: "rgba(0, 240, 255, 0.12)",
            ...(!isIOS && { animationDuration: "4s" }),
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
        {/* Eyebrow */}
        <p ref={badgeRef} className="eyebrow mb-6">
          AI-Native Engineering Agency
        </p>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl" style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block">
              Stop decorating with AI.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block">
              Start{" "}
              <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                <TextScramble
                  text="building with it."
                  delay={2600}
                  speed={30}
                />
              </span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted"
        >
          While the market settles for no-code templates and brittle
          &quot;wrappers,&quot; we architect production-grade agentic workflows.
          We build the autonomous infrastructure required for your business to
          lead, not follow.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://cal.com/harshsahrawat/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-void transition-transform hover:scale-105"
            data-cursor
          >
            Book a Technical Strategy Call
          </a>
          <button
            onClick={handleScrollDown}
            className="rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            data-cursor
          >
            See the Infrastructure ↓
          </button>
        </div>
      </div>
    </section>
  );
}
