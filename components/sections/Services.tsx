"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Agentic Workflow Architecture",
    description:
      "Multi-step AI systems that don't just follow scripts — they make decisions, handle edge cases, and execute complex tasks. Built with custom orchestration.",
    span: "col-span-1 md:col-span-2 md:row-span-2",
  },
  {
    title: "Enterprise RAG Systems",
    description:
      "Transform siloed documents into an actionable intelligence layer. Searchable, queryable, and production-ready retrieval systems.",
    span: "col-span-1",
  },
  {
    title: "Intelligence Refactoring",
    description:
      "We don't just build and vanish. We continuously refactor your systems as models evolve, ensuring you are always running on the most efficient tech.",
    span: "col-span-1",
  },
  {
    title: "Custom AI Integration",
    description:
      "Direct API and database integrations. No \"wrappers.\" We plug intelligence into your existing CRM, ERP, or internal toolsets.",
    span: "col-span-1 md:col-span-2",
  },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="relative bg-void py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="eyebrow mb-4">What We Do</p>
        <h2 className="mb-4 max-w-3xl">
          AI systems that work like your best employee — but never sleep.
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-text-muted leading-relaxed">
          We don&apos;t plug in off-the-shelf tools and call it automation. Every
          system is architected from scratch around your business logic, built
          with production-grade models, and designed to evolve with you.
        </p>

        <div
          ref={gridRef}
          className="services-grid grid grid-cols-1 gap-4 md:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <div key={service.title} className={`service-card ${service.span}`}>
              <GlassCard className="h-full p-8">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
