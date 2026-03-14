'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { COMPARISON_ROWS, EASING } from '@/lib/constants'

// Geometric SVG icons — clean, premium feel
const ROW_ICONS: Record<string, React.ReactNode> = {
  quality: (
    <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9" stroke="#15616D" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="5" stroke="#FF7D00" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="1.5" fill="#FF7D00" />
    </svg>
  ),
  scale: (
    <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 19L19 3" stroke="#15616D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 3H19V9" stroke="#FF7D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 19H3V13" stroke="#15616D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  ),
  adaptability: (
    <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6C16 6 18 8.5 18 11C18 14.866 14.866 18 11 18" stroke="#15616D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 16C6 16 4 13.5 4 11C4 7.134 7.134 4 11 4" stroke="#FF7D00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 4L11 4L11 6" stroke="#FF7D00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18L11 18L11 16" stroke="#15616D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export function AgentWorkflow() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const strikeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const arrowRefs = useRef<(HTMLSpanElement | null)[]>([])
  const newTextRefs = useRef<(HTMLSpanElement | null)[]>([])
  const closingRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        // Show everything at final state
        rowRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1 })
        })
        strikeRefs.current.forEach((el) => {
          if (el) gsap.set(el, { scaleX: 1 })
        })
        if (closingRef.current) gsap.set(closingRef.current, { autoAlpha: 1 })
        return
      }

      // Initial hidden state
      rowRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 0, y: 20 })
      })
      strikeRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scaleX: 0 })
      })
      arrowRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 0 })
      })
      newTextRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 0, x: -8 })
      })
      if (closingRef.current) gsap.set(closingRef.current, { autoAlpha: 0 })

      // Scroll-triggered staggered entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      COMPARISON_ROWS.forEach((_, i) => {
        const delay = i * 0.25

        // Fade up row
        tl.to(
          rowRefs.current[i],
          { autoAlpha: 1, y: 0, duration: 0.5, ease: EASING.entrance },
          delay,
        )

        // Draw strike-through across old text
        tl.to(
          strikeRefs.current[i],
          { scaleX: 1, duration: 0.4, ease: EASING.entrance },
          delay + 0.3,
        )

        // Fade in arrow
        tl.to(
          arrowRefs.current[i],
          { autoAlpha: 1, duration: 0.2 },
          delay + 0.5,
        )

        // Fade in new text
        tl.to(
          newTextRefs.current[i],
          { autoAlpha: 1, x: 0, duration: 0.4, ease: EASING.entrance },
          delay + 0.55,
        )
      })

      // Closing line
      tl.to(
        closingRef.current,
        { autoAlpha: 1, duration: 0.5, ease: EASING.entrance },
        COMPARISON_ROWS.length * 0.25 + 0.6,
      )
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="bg-navy py-24 md:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-mono text-orange text-[0.875rem] uppercase tracking-[0.12em] mb-4">
            Why an AI Team?
          </p>
          <h2
            className="font-display font-semibold text-cream"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            They coordinate like humans.
            <br />
            They execute like{' '}
            <span className="text-orange">machines.</span>
          </h2>
        </div>

        {/* Comparison Rows */}
        <div className="flex flex-col gap-9 md:gap-10">
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.id}
              ref={(el) => { rowRefs.current[i] = el }}
              className="flex items-start gap-4 md:gap-5"
            >
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                {ROW_ICONS[row.id]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm uppercase tracking-[0.12em] text-orange font-medium mb-2">
                  {row.label}
                </p>
                <div className="flex flex-col gap-1.5">
                  {/* Old way with animated strike-through + arrow */}
                  <div className="flex items-center gap-3">
                    <span className="relative text-base md:text-lg text-cream/35">
                      {row.oldWay}
                      <span
                        ref={(el) => { strikeRefs.current[i] = el }}
                        className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-cream/25 origin-left"
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      ref={(el) => { arrowRefs.current[i] = el }}
                      className="text-teal text-xl font-bold shrink-0"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>

                  {/* New way */}
                  <span
                    ref={(el) => { newTextRefs.current[i] = el }}
                    className="text-base md:text-lg text-cream font-semibold"
                  >
                    {row.newWay}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div ref={closingRef} className="mt-14 md:mt-16 text-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-teal to-transparent mx-auto mb-6" />
          <p className="font-body text-base text-cream/70 italic">
            Not just smarter tools — a team that thinks together.
          </p>
        </div>
      </div>
    </section>
  )
}
