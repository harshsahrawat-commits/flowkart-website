"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const OFFERS = [
  {
    num: "01",
    title: "Custom Agentic Architecture",
    description:
      "We architect end-to-end AI systems designed specifically for your operation. Not a template. Not a \"best practice.\" Your system.",
  },
  {
    num: "02",
    title: "The 7-Day Prototype Sprint",
    description:
      "Speed is a feature. We deliver your first production-ready prototype in one week. While your competitors are in discovery meetings, you have a system in staging.",
  },
  {
    num: "03",
    title: "Total Tech Management",
    description:
      "We manage the APIs, vector databases, and model fine-tuning. You provide the vision; we provide the results. No technical team required on your end.",
  },
  {
    num: "04",
    title: "The Evolution Clause",
    description:
      "AI technology moves weekly. Our partnership includes continuous refactoring. When a superior model or more efficient technique drops, your system gets it first.",
  },
  {
    num: "05",
    title: "The Technical Integrity Guarantee",
    description:
      "If our architecture doesn't hit the pre-agreed performance benchmarks within 30 days, we work for free until it does. We take the technical risk; you take the ROI.",
  },
];

export default function Offer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<SVGLineElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        if (isMobile) {
          gsap.from(".offer-item", {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          });
        } else {
          const items = gsap.utils.toArray(".offer-item") as HTMLElement[];
          const content = contentRef.current;
          if (!content) return;

          // Set initial state — all items except first hidden
          gsap.set(items.slice(1), { opacity: 0, y: 50 });

          const totalDuration = items.length * 1.2;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${items.length * 80}%`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Slide the entire content wrapper upward as items reveal
          // This keeps later items visible in the viewport
          tl.to(
            content,
            {
              y: () => {
                // Calculate how much the content overflows the viewport
                const contentHeight = content.scrollHeight;
                const viewportHeight = window.innerHeight;
                const overflow = contentHeight - viewportHeight;
                return overflow > 0 ? -overflow : 0;
              },
              duration: totalDuration,
              ease: "none",
            },
            0
          );

          // SVG progress line draws alongside items
          if (progressLineRef.current) {
            tl.fromTo(
              progressLineRef.current,
              { strokeDashoffset: 1000 },
              { strokeDashoffset: 0, duration: totalDuration, ease: "none" },
              0
            );
          }

          // Reveal each item sequentially
          items.forEach((item, i) => {
            if (i === 0) return;
            tl.to(
              item,
              { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
              i * 1.2
            );
          });
        }

        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timeout);
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-void-subtle px-[var(--section-padding-x)]"
    >
      {/* Background mesh gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-accent/8 blur-[200px]" />
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-[1280px] pt-20 md:pt-28 pb-20">
        <p className="eyebrow mb-4">The Flowkart Partnership</p>
        <h2 className="mb-4 max-w-3xl">
          Not a project. A partnership that compounds.
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-text-muted leading-relaxed">
          We don&apos;t do one-off builds and vanish. When you work with
          Flowkart, you get a complete AI infrastructure — plus the knowledge
          and support to actually use it.
        </p>

        <div className="relative">
          {/* SVG progress line (desktop) */}
          <svg
            className="absolute left-8 top-0 hidden h-full w-[2px] md:block"
            aria-hidden="true"
          >
            <line
              ref={progressLineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>

          {/* Offer items */}
          <div className="space-y-6 md:pl-20">
            {OFFERS.map((offer) => (
              <div
                key={offer.num}
                className="offer-item glass-card p-6"
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-2xl font-bold text-accent/30 shrink-0">
                    {offer.num}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-lg font-semibold text-white">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-lg text-text-muted">
            Everything you need to make AI a permanent competitive advantage —
            so you can focus on what you do best: running and scaling your
            business.
          </p>
          <button
            onClick={() => {
              const contact = document.getElementById("contact");
              const lenis = (
                window as unknown as Record<string, { scrollTo: (target: HTMLElement, opts: { offset: number }) => void }>
              ).__lenis;
              if (lenis && contact) lenis.scrollTo(contact, { offset: -80 });
              else if (contact) contact.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-void transition-transform hover:scale-105"
            data-cursor
          >
            Book Your Strategy Call
          </button>
        </div>
      </div>
    </section>
  );
}
