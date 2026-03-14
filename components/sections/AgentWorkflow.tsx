'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { WORKFLOW_BENEFITS } from '@/lib/constants'
import { CodeRain } from '@/components/sections/CodeRain'
import Image from 'next/image'

const BORDER_COLORS: Record<string, string> = {
  teal: 'border-l-teal',
  orange: 'border-l-orange',
  cream: 'border-l-cream',
}

const LABEL_COLORS: Record<string, string> = {
  teal: 'text-teal',
  orange: 'text-orange',
  cream: 'text-cream',
}

export function AgentWorkflow() {
  const sectionRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        // Show all benefits at full opacity
        benefitsRef.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1 })
        })
        return
      }

      const mm = gsap.matchMedia()

      // --- DESKTOP: Pinned scroll with benefit highlighting ---
      mm.add('(min-width: 768px)', () => {
        // Set initial state: first benefit visible, rest dimmed
        benefitsRef.current.forEach((el, i) => {
          if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0.3 })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Animate through 4 benefits
        WORKFLOW_BENEFITS.forEach((_, i) => {
          if (i === 0) return // First is already visible

          const t = i / (WORKFLOW_BENEFITS.length - 1)

          // Dim previous benefit
          tl.to(
            benefitsRef.current[i - 1],
            { opacity: 0.3, duration: 0.1 },
            t - 0.05,
          )

          // Highlight current benefit
          tl.to(
            benefitsRef.current[i],
            { opacity: 1, duration: 0.1 },
            t,
          )

          // Update active index for CodeRain
          tl.call(() => setActiveIndex(i), [], t)
        })
      })

      // --- MOBILE: Standard scroll reveals ---
      mm.add('(max-width: 767px)', () => {
        benefitsRef.current.forEach((el) => {
          if (!el) return
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
              },
            },
          )
        })
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative bg-navy overflow-hidden"
    >
      {/* Section Header */}
      <div className="pt-24 pb-16 px-6 text-center">
        <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
          Powered by LangChain &amp; LangGraph
        </p>
        <h2
          className="font-display font-semibold text-cream"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Agents that think, communicate,
          <br className="hidden sm:block" />
          and adapt
        </h2>
      </div>

      {/* Split Layout */}
      <div className="max-w-6xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 md:gap-8 min-h-[60vh] items-center">
        {/* Left: Benefits Stack (60%) */}
        <div className="w-full md:w-[60%] flex flex-col gap-8">
          {WORKFLOW_BENEFITS.map((benefit, i) => (
            <div
              key={benefit.id}
              ref={(el) => { benefitsRef.current[i] = el }}
              className={`border-l-[3px] ${BORDER_COLORS[benefit.borderColor]} pl-4 transition-opacity`}
            >
              <p className={`font-mono text-[0.6875rem] uppercase tracking-[0.1em] mb-1 ${LABEL_COLORS[benefit.borderColor]}`}>
                {benefit.category}
              </p>
              <h3 className="font-display font-semibold text-cream text-lg mb-1">
                {benefit.headline}
              </h3>
              <p className="font-body text-cream/60 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right: OpenArt Background + Code Rain (40%) */}
        <div className="w-full md:w-[40%] relative h-[200px] md:h-[400px] rounded-xl overflow-hidden">
          {/* OpenArt Background */}
          <div className="absolute inset-0 opacity-50">
            <Image
              src="/images/workflow-bg.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          {/* Code Rain Overlay */}
          <CodeRain activeIndex={activeIndex} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}
