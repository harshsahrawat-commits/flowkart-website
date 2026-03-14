'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { PROCESS_STEPS, EASING } from '@/lib/constants'

const NUMBER_COLORS: Record<string, string> = {
  teal: 'text-teal',
  orange: 'text-orange',
  cream: 'text-cream',
}

const UNDERLINE_COLORS: Record<string, string> = {
  teal: 'from-teal',
  orange: 'from-orange',
  cream: 'from-cream',
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const underlineRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        numberRefs.current.forEach((el) => {
          if (el) gsap.set(el, { scale: 1, opacity: 1 })
        })
        underlineRefs.current.forEach((el) => {
          if (el) gsap.set(el, { width: 48 })
        })
        textRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1, y: 0 })
        })
        return
      }

      // Initial hidden state
      numberRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { scale: 0.85, opacity: 0 })
          el.textContent = '00'
        }
      })
      underlineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { width: 0 })
      })
      textRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 15 })
      })

      // Scroll-synced animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 0.6,
        },
      })

      PROCESS_STEPS.forEach((step, i) => {
        const seg = i / PROCESS_STEPS.length
        const segLen = 1 / PROCESS_STEPS.length

        // Counter animation: 00 → target number
        const target = parseInt(step.number)
        const numberEl = numberRefs.current[i]
        if (numberEl) {
          tl.to(
            { val: 0 },
            {
              val: target,
              duration: segLen * 0.6,
              ease: EASING.entrance,
              snap: { val: 1 },
              onUpdate: function () {
                const current = Math.round(this.targets()[0].val)
                numberEl.textContent = current.toString().padStart(2, '0')
              },
            },
            seg,
          )

          // Scale in
          tl.to(
            numberEl,
            { scale: 1, opacity: 1, duration: segLen * 0.5, ease: EASING.entrance },
            seg,
          )
        }

        // Underline draw-in
        const underlineEl = underlineRefs.current[i]
        if (underlineEl) {
          tl.to(
            underlineEl,
            { width: 48, duration: segLen * 0.4, ease: EASING.entrance },
            seg + segLen * 0.35,
          )
        }

        // Text fade up
        const textEl = textRefs.current[i]
        if (textEl) {
          tl.to(
            textEl,
            { opacity: 1, y: 0, duration: segLen * 0.4, ease: EASING.entrance },
            seg + segLen * 0.45,
          )
        }
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-32 px-6 bg-navy"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-orange text-[1rem] uppercase tracking-[0.12em] mb-4">
            How It Works
          </p>
          <h2
            className="font-display font-semibold text-cream"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Three steps to your AI team
          </h2>
        </div>

        {/* Step Grid — width tuned so columns align with background orb centers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 max-w-[1016px] mx-auto">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.number} className="text-center">
              {/* Number — centered in a fixed-height area to align with orbs */}
              <div className="flex items-center justify-center h-[100px] md:h-[120px]">
                <span
                  ref={(el) => { numberRefs.current[i] = el }}
                  className={`font-display font-bold ${NUMBER_COLORS[step.color]} block`}
                  style={{
                    fontSize: 'clamp(3.5rem, 2.5rem + 4vw, 5.5rem)',
                    lineHeight: 1,
                  }}
                  aria-label={`Step ${step.number}`}
                >
                  {step.number}
                </span>
              </div>

              {/* Gradient Underline */}
              <div
                ref={(el) => { underlineRefs.current[i] = el }}
                className={`h-0.5 bg-gradient-to-r ${UNDERLINE_COLORS[step.color]} to-transparent mx-auto mt-2`}
                style={{ width: 48 }}
              />

              {/* Text */}
              <div ref={(el) => { textRefs.current[i] = el }}>
                <p className="font-body font-semibold text-cream text-base mt-3">
                  {step.verb}
                </p>
                <p className="font-body text-cream/70 text-sm mt-2 leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
