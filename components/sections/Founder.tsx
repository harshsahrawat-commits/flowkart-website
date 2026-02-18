"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".founder-para", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative bg-void-subtle py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      {/* Subtle warm tint */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-amber-500/[0.02] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Copy */}
          <div>
            <p className="eyebrow mb-4">The Founder</p>
            <h2 className="founder-para mb-8">
              I didn&apos;t leave a 4.0 engineering track for a &quot;maybe.&quot;
              <br />
              I left it for the inevitable.
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-text-muted">
              <p className="founder-para">
                Flowkart is built on technical obsession.
              </p>
              <p className="founder-para">
                I walked away from a <span className="font-semibold text-white">4.0 Electrical Engineering record in my
                final semester</span> because the speed of innovation was moving
                faster than the speed of the classroom. I saw the world shifting
                toward an AI-native economy, and I realized that &quot;playing it
                safe&quot; was the biggest risk of all.
              </p>
              <p className="founder-para">
                I didn&apos;t drop out because the work was hard. I dropped out
                because the stakes were too high to wait for a degree.
              </p>
              <p className="founder-para">
                Every day since has been spent in the code — building RAG
                systems, orchestrating agentic workflows, and shipping
                production-grade infrastructure. Flowkart exists because I
                believe businesses deserve architecture, not just tools.
              </p>
              <p className="founder-para">
                I am building a legacy that will span decades. Flowkart is the
                first major pillar of that work — and I&apos;m here to ensure
                your business is built on that same foundation.
              </p>
            </div>

            <p className="founder-para mt-8 font-mono text-sm text-text-muted">
              — Harsh Sahrawat, Founder
            </p>

            <p className="founder-para mt-8 text-2xl font-semibold text-accent">
              This isn&apos;t a side project. It is the beginning.
            </p>
          </div>

          {/* Right — Terminal/Code visual (FIX 8) */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 font-mono text-xs text-white/30">flowkart.ai</span>
              </div>

              {/* Stylized code lines */}
              <div className="space-y-2 font-mono text-xs leading-relaxed">
                <p><span className="text-accent/60">const</span> <span className="text-white/70">system</span> <span className="text-white/30">=</span> <span className="text-accent/80">architect</span><span className="text-white/30">{"({"}</span></p>
                <p className="pl-4"><span className="text-white/40">models:</span> <span className="text-green-400/60">&apos;claude-opus&apos;</span><span className="text-white/30">,</span></p>
                <p className="pl-4"><span className="text-white/40">approach:</span> <span className="text-green-400/60">&apos;production-grade&apos;</span><span className="text-white/30">,</span></p>
                <p className="pl-4"><span className="text-white/40">iterate:</span> <span className="text-accent/60">true</span><span className="text-white/30">,</span></p>
                <p className="pl-4"><span className="text-white/40">giveUp:</span> <span className="text-red-400/60">never</span></p>
                <p><span className="text-white/30">{"})"}</span></p>
              </div>

              {/* Subtle glow behind */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/[0.05] blur-[40px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
