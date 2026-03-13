'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { WORKFLOW_NODES, EASING } from '@/lib/constants'

const NODE_COLORS = {
  navy: 'bg-navy text-cream',
  teal: 'bg-teal text-white',
  orange: 'bg-orange text-white',
} as const

export function AgentWorkflow() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return

      const nodes = trackRef.current.querySelectorAll('.wf-node')
      const lines = trackRef.current.querySelectorAll('.wf-line')

      // Reduced motion or mobile: show everything
      if (reducedMotion) {
        gsap.set(nodes, { autoAlpha: 1 })
        gsap.set(lines, { scaleX: 1 })
        return
      }

      const mm = gsap.matchMedia()

      // --- DESKTOP: Pinned horizontal scroll ---
      mm.add('(min-width: 768px)', () => {
        gsap.set(nodes, { autoAlpha: 0, scale: 0.8 })
        gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Reveal nodes and lines sequentially
        nodes.forEach((node, i) => {
          const t = i / (nodes.length - 1)

          tl.to(
            node,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.12,
              ease: EASING.entrance,
            },
            t * 0.85,
          )

          if (i < lines.length) {
            tl.to(
              lines[i],
              { scaleX: 1, duration: 0.08, ease: 'none' },
              t * 0.85 + 0.06,
            )
          }
        })

        // Final glow
        tl.to(
          nodes,
          { boxShadow: '0 0 24px rgba(21,97,109,0.3)', duration: 0.15 },
          0.9,
        )
      })

      // --- MOBILE: Vertical stack with scroll reveals ---
      mm.add('(max-width: 767px)', () => {
        nodes.forEach((node, i) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: EASING.entrance,
              scrollTrigger: {
                trigger: node,
                start: 'top 85%',
              },
            },
          )

          if (i < lines.length) {
            gsap.fromTo(
              lines[i],
              { scaleY: 0, transformOrigin: 'top center' },
              {
                scaleY: 1,
                duration: 0.4,
                scrollTrigger: {
                  trigger: lines[i],
                  start: 'top 85%',
                },
              },
            )
          }
        })
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative bg-cream-light overflow-hidden"
    >
      {/* Section Title */}
      <div className="pt-24 pb-16 px-6 text-center">
        <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
          Multi-Agent Orchestration
        </p>
        <h2
          className="font-display font-semibold text-navy"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          See how your AI team works
        </h2>
      </div>

      {/* Workflow Track */}
      <div
        ref={trackRef}
        className="relative max-w-6xl mx-auto px-6 pb-24 min-h-[50vh] flex items-center"
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {WORKFLOW_NODES.map((node, i) => (
            <div key={node.id} className="flex flex-col md:flex-row items-center">
              {/* Node — hover: scale 1.08 + tooltip fade (Section 5.7) */}
              <div
                className="wf-node group flex flex-col items-center gap-3 opacity-0"
              >
                <div
                  className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-[1.08] ${NODE_COLORS[node.color]}`}
                >
                  <span className="font-mono text-xs lg:text-sm font-bold text-center leading-tight px-1">
                    {node.label.split(' ')[0]}
                  </span>
                </div>
                <span className="font-body text-sm font-medium text-navy text-center max-w-[120px]">
                  {node.label}
                </span>
                {node.tooltip && (
                  <span className="font-body text-xs text-sienna/60 text-center max-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {node.tooltip}
                  </span>
                )}
              </div>

              {/* Connection Line (between nodes) */}
              {i < WORKFLOW_NODES.length - 1 && (
                <>
                  {/* Desktop: horizontal line */}
                  <div className="wf-line hidden md:block w-12 lg:w-20 h-0.5 bg-teal/30 mx-2 scale-x-0" />
                  {/* Mobile: vertical line */}
                  <div className="wf-line md:hidden w-0.5 h-8 bg-teal/30 my-1 scale-y-0" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
