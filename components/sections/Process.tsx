'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PROCESS_STEPS, TIMING } from '@/lib/constants'

export function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-cream-light">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
            How It Works
          </p>
          <h2
            className="font-display font-semibold text-navy"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Three steps to your AI team
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute left-[2.5rem] top-0 bottom-0 w-px bg-tan" />

          <div className="space-y-16">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal
                key={step.number}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.1}
              >
                <div className="flex gap-8 items-start">
                  {/* Step Number */}
                  <div className="shrink-0 w-20 h-20 rounded-2xl bg-cream border border-tan flex items-center justify-center relative z-10">
                    <span
                      className="font-display font-semibold text-teal"
                      style={{ fontSize: 'clamp(1.5rem, 1rem + 1vw, 2rem)' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3
                      className="font-display font-medium text-navy mb-3"
                      style={{
                        fontSize: 'clamp(1.25rem, 0.9rem + 1.2vw, 2rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-body text-sienna leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
