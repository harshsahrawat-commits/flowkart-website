"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".problem-headline", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".problem-paragraph", {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".problem-body",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative bg-void-subtle py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — Headline */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">The Problem</p>
            <h2 className="problem-headline">
              AI advice is everywhere.
              <br />
              Clarity is nowhere.
            </h2>
          </div>

          {/* Right — Body */}
          <div className="problem-body space-y-6 text-lg leading-relaxed text-text-muted lg:col-span-6 lg:col-start-7">
            <p className="problem-paragraph">
              Every platform is flooded with recycled takes. &quot;Automate with
              Zapier.&quot; &quot;Use this prompt.&quot; &quot;AI will replace your job.&quot;
            </p>
            <p className="problem-paragraph font-medium text-white">
              Here is what most business owners realize too late:
            </p>
            <ol className="problem-paragraph space-y-3 list-decimal list-inside">
              <li>
                <span className="text-white font-medium">The tools everyone promotes are built for demos, not for production.</span>
              </li>
              <li>
                <span className="text-white font-medium">The workflows that go viral are designed to impress, not to last.</span>
              </li>
              <li>
                <span className="text-white font-medium">The &quot;AI strategies&quot; dominating your feed are copy-pasted from the same three sources.</span>
              </li>
            </ol>
            <p className="problem-paragraph">
              Your business — with its specific processes, edge cases, and real
              stakes — doesn&apos;t fit inside a template. You don&apos;t need another AI
              tutorial. You need infrastructure engineered for how{" "}
              <span className="font-semibold text-white">YOUR</span> business
              actually works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
