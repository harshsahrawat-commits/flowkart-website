'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { SCENARIO_STEPS, EASING } from '@/lib/constants'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Flatten SCENARIO_STEPS into a deterministic list for rendering + animation.
// Computed once at module scope (data is static).
// ---------------------------------------------------------------------------

type FlatItem =
  | { type: 'command'; text: string }
  | { type: 'agent-header'; agent: string }
  | { type: 'substep'; text: string; isLast: boolean }
  | { type: 'result'; text: string }

const FLAT_ITEMS: FlatItem[] = []

for (const step of SCENARIO_STEPS) {
  if (step.type === 'command') {
    FLAT_ITEMS.push({ type: 'command', text: step.text })
  } else if (step.type === 'result') {
    FLAT_ITEMS.push({ type: 'result', text: step.text })
  } else {
    FLAT_ITEMS.push({ type: 'agent-header', agent: step.agent })
    step.substeps.forEach((sub, j) => {
      FLAT_ITEMS.push({
        type: 'substep',
        text: sub,
        isLast: j === step.substeps.length - 1,
      })
    })
  }
}

/** Seconds to hold the completed state before restarting */
const LOOP_HOLD = 3

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const steps = stepRefs.current
      const dots = dotRefs.current

      if (reducedMotion) {
        steps.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1 })
        })
        return
      }

      // Initial hidden state
      steps.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 0, y: 8 })
      })

      // ---------------------------------------------------------------
      // Build a looping, time-based timeline (paused until in view).
      // Uses fromTo() so start values are baked in and replay correctly.
      // ---------------------------------------------------------------
      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: LOOP_HOLD,
      })

      const FROM = { autoAlpha: 0, y: 8 }
      let dotIdx = 0
      let t = 0

      FLAT_ITEMS.forEach((item, i) => {
        const el = steps[i]
        if (!el) return

        switch (item.type) {
          case 'command':
            tl.fromTo(el, { ...FROM }, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASING.entrance }, t)
            t += 0.5
            break

          case 'agent-header': {
            tl.fromTo(el, { ...FROM }, { autoAlpha: 1, y: 0, duration: 0.25, ease: EASING.entrance }, t)
            // Start dot pulsing
            const dot = dots[dotIdx]
            if (dot) {
              tl.call(() => { dot.classList.add('dot-pulse') }, [], t + 0.15)
            }
            t += 0.25
            break
          }

          case 'substep':
            tl.fromTo(el, { ...FROM }, { autoAlpha: 1, y: 0, duration: 0.2, ease: EASING.entrance }, t)
            // On last substep, stop dot pulse and solidify
            if (item.isLast) {
              const dot = dots[dotIdx]
              if (dot) {
                tl.call(() => { dot.classList.remove('dot-pulse') }, [], t + 0.15)
              }
              dotIdx++
              t += 0.3
            } else {
              t += 0.12
            }
            break

          case 'result':
            tl.fromTo(el, { ...FROM }, { autoAlpha: 1, y: 0, duration: 0.4, ease: EASING.entrance }, t)
            break
        }
      })

      // Clean up dot-pulse classes at the very start of each cycle
      tl.call(() => {
        dots.forEach((el) => { if (el) el.classList.remove('dot-pulse') })
      }, [], 0)

      // ---------------------------------------------------------------
      // ScrollTrigger: play when visible, pause when off-screen,
      // restart fresh each time the section scrolls into view.
      // ---------------------------------------------------------------
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 10%',
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  // Track dot ref index during render
  let dotIdx = 0

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-cream-light overflow-hidden"
    >
      {/* Ambient texture overlay (matches Hero) */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <Image src="/images/hero-texture.webp" alt="" fill className="object-cover" loading="lazy" />
      </div>

      {/* Section Header */}
      <div className="relative pt-24 pb-16 px-6 text-center">
        <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
          See It In Action
        </p>
        <h2
          className="font-display font-semibold text-navy"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Watch your AI team work
        </h2>
      </div>

      {/* Terminal Panel */}
      <div className="relative max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-navy rounded-xl shadow-2xl overflow-hidden">
          {/* Window Chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-teal/10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
            <span className="ml-2 font-mono text-[10px] text-cream/30">
              agent-workflow
            </span>
          </div>

          {/* Terminal Content */}
          <div className="px-5 py-5 md:px-6 md:py-6 font-mono text-[12.5px] md:text-[13.5px] leading-relaxed">
            {FLAT_ITEMS.map((item, i) => {
              const setRef = (el: HTMLDivElement | null) => {
                stepRefs.current[i] = el
              }

              switch (item.type) {
                case 'command':
                  return (
                    <div key={i} ref={setRef} className="mb-5">
                      <span className="text-cream/35">$ </span>
                      <span className="text-orange">{item.text}</span>
                    </div>
                  )

                case 'agent-header': {
                  const di = dotIdx++
                  return (
                    <div
                      key={i}
                      ref={setRef}
                      className="flex items-center gap-2 mt-4 first:mt-0"
                    >
                      <span
                        ref={(el) => { dotRefs.current[di] = el }}
                        className="text-teal text-[10px]"
                      >
                        ●
                      </span>
                      <span className="text-cream font-semibold tracking-wide">
                        {item.agent}
                      </span>
                    </div>
                  )
                }

                case 'substep':
                  return (
                    <div
                      key={i}
                      ref={setRef}
                      className={`flex items-start gap-2 pl-[18px] ${item.isLast ? 'mb-1' : ''}`}
                    >
                      <span className="text-cream/15 select-none leading-relaxed">
                        ⎿
                      </span>
                      <span className="text-cream/50">{item.text}</span>
                    </div>
                  )

                case 'result':
                  return (
                    <div
                      key={i}
                      ref={setRef}
                      className="mt-5 pt-3 border-t border-cream/8"
                    >
                      <span className="text-orange font-medium">
                        ✓ {item.text}
                      </span>
                    </div>
                  )

                default:
                  return null
              }
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
