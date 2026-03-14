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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const underlineRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        // Show everything at final state
        stepRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1 })
        })
        return
      }

      // Initial hidden state
      stepRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 1 }) // Container visible
      })
      numberRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { scale: 0.85, opacity: 0 })
          el.textContent = '00' // Start at 00
        }
      })
      underlineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { width: 0 })
      })
      textRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 15 })
      })

      // Scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      PROCESS_STEPS.forEach((step, i) => {
        const delay = i * 0.2

        // Counter animation: 00 → target number
        const target = parseInt(step.number)
        const numberEl = numberRefs.current[i]
        if (numberEl) {
          tl.to(
            { val: 0 },
            {
              val: target,
              duration: 0.8,
              ease: EASING.entrance,
              snap: { val: 1 },
              onUpdate: function () {
                const current = Math.round(this.targets()[0].val)
                numberEl.textContent = current.toString().padStart(2, '0')
              },
            },
            delay,
          )

          // Scale in
          tl.to(
            numberEl,
            { scale: 1, opacity: 1, duration: 0.6, ease: EASING.entrance },
            delay,
          )
        }

        // Underline draw-in
        const underlineEl = underlineRefs.current[i]
        if (underlineEl) {
          tl.to(
            underlineEl,
            { width: 48, duration: 0.5, ease: EASING.entrance },
            delay + 0.3,
          )
        }

        // Text fade up
        const textEl = textRefs.current[i]
        if (textEl) {
          tl.to(
            textEl,
            { opacity: 1, y: 0, duration: 0.5, ease: EASING.entrance },
            delay + 0.4,
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
      className="relative py-32 px-6 bg-navy overflow-hidden"
    >
      {/* Optional: OpenArt background glow */}
      {/* Uncomment when process-glow.webp is available:
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <Image src="/images/process-glow.webp" alt="" fill className="object-cover" loading="lazy" />
      </div>
      */}

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
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

        {/* Counter Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-16 md:gap-12 lg:gap-20">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el }}
              className="text-center max-w-[180px]"
            >
              {/* Large Number */}
              <span
                ref={(el) => { numberRefs.current[i] = el }}
                className={`font-display font-bold ${NUMBER_COLORS[step.color]} block`}
                style={{
                  fontSize: 'clamp(3rem, 2rem + 4vw, 5rem)',
                  lineHeight: 1,
                }}
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </span>

              {/* Gradient Underline */}
              <div
                ref={(el) => { underlineRefs.current[i] = el }}
                className={`h-0.5 bg-gradient-to-r ${UNDERLINE_COLORS[step.color]} to-transparent mx-auto mt-3`}
                style={{ width: 48 }}
              />

              {/* Text */}
              <div ref={(el) => { textRefs.current[i] = el }}>
                <p className="font-body font-semibold text-cream text-base mt-3">
                  {step.verb}
                </p>
                <p className="font-body text-cream/50 text-sm mt-2 leading-relaxed">
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
