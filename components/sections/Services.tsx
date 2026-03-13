'use client'

import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AGENTS, TIMING } from '@/lib/constants'

export function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
            Your AI Team
          </p>
          <h2
            className="font-display font-semibold text-navy"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Six agents. One mission.
          </h2>
        </div>

        {/* Card Grid */}
        <ScrollReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={TIMING.staggerGrid}
        >
          {AGENTS.map((agent) => (
            <Card
              key={agent.name}
              icon={agent.icon}
              title={`${agent.name} Agent`}
              description={agent.description}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
