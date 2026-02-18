"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import useIOSSafari from "@/hooks/useIOSSafari";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isIOS = useIOSSafari();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-line", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".cta-sub", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-void py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      {/* Background glow + morphing blob (FIX 7) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/15 ${isIOS ? "blur-[60px]" : "blur-[150px]"}`} />
        {/* Morphing blob — static on iOS */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] opacity-[0.15] ${isIOS ? "blur-[40px]" : "blur-[60px]"}`}
          style={{
            background: "var(--color-accent, #00f0ff)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            ...(!isIOS && { animation: "morphBlob 8s ease-in-out infinite" }),
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2
          className="mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)" }}
        >
          <span className="cta-line block overflow-hidden">
            <span className="block">The future is being built right now.</span>
          </span>
          <span className="cta-line block overflow-hidden">
            <span className="block">Are you an architect or a spectator?</span>
          </span>
        </h2>

        <div className="cta-sub">
          <p className="mx-auto mb-4 max-w-xl text-lg text-text-muted leading-relaxed">
            Book a 30-minute technical strategy call. No pitch decks. No fluff.
            Just a conversation about engineering dominance in your industry.
          </p>

          <MagneticButton
            as="a"
            href="https://cal.com/harshsahrawat/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-10 py-4 text-lg font-semibold text-void transition-transform hover:scale-105"
          >
            Book Your Strategy Call →
          </MagneticButton>

          <p className="mt-6 text-text-muted">
            or email directly:{" "}
            <a
              href="mailto:harshsahrawat@flowkart.io"
              className="text-white transition-colors hover:text-accent"
            >
              harshsahrawat@flowkart.io
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
