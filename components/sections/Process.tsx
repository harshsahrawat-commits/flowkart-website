"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    description:
      "We get on a call. You tell us what's broken, what's slow, and where you want to be. We listen, ask hard questions, and map out the highest-impact opportunities for AI in your business.",
  },
  {
    num: "02",
    title: "Architecture",
    description:
      "We design the system blueprint — what gets built, how it integrates with your existing tools, and what the outcomes look like. You approve the plan before a single line of code is written.",
  },
  {
    num: "03",
    title: "Build & Approve",
    description:
      "We build, you review. Iterative cycles — not a black box. You see progress, test the system, and give feedback at every stage.",
  },
  {
    num: "04",
    title: "Deploy + Evolve",
    description:
      "We launch, monitor, and optimize. Then we keep going — continuous improvements, monthly training, weekly briefings, and 24/7 support. The system gets smarter. So does your team.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger steps — trigger when the timeline row is in view
      gsap.from(".process-step", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 65%",
        },
      });

      // Progress line fill — scrubs as you scroll through
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative rounded-t-3xl -mt-16 bg-void-card py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="eyebrow mb-4">How It Works</p>
        <h2 className="mb-16 max-w-3xl">
          From first call to deployed system in weeks, not months.
        </h2>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:block" ref={timelineRef}>
          {/* Circle row with connecting line */}
          <div className="relative mb-10">
            {/* Connecting line (background) — centered on circles */}
            <div className="absolute left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] top-1/2 -translate-y-1/2 h-[2px] bg-white/5" />
            {/* Connecting line (fill) — draws on scroll */}
            <div
              ref={lineRef}
              className="absolute left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] top-1/2 -translate-y-1/2 h-[2px] origin-left bg-accent/50"
            />

            <div className="grid grid-cols-4">
              {STEPS.map((step) => (
                <div key={step.num} className="process-step flex justify-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-void-card">
                    <span className="font-mono text-sm font-bold text-accent">
                      {step.num}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text content row */}
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="process-step">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="space-y-8 md:hidden">
          {STEPS.map((step) => (
            <div key={step.num} className="process-step flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-void-card">
                  <span className="font-mono text-xs font-bold text-accent">
                    {step.num}
                  </span>
                </div>
                <div className="mt-2 w-[1px] flex-1 bg-white/10" />
              </div>
              <div className="pb-8">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
