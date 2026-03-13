'use client'

import { useRef, useEffect, useState, forwardRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import { AGENTS, TIMING, EASING } from '@/lib/constants'

/* ---- Agent Ticker Sub-Component ---- */

const AgentTicker = forwardRef<HTMLDivElement, { reducedMotion: boolean }>(
  function AgentTicker({ reducedMotion }, ref) {
    const [activeIndex, setActiveIndex] = useState(0)

    // Ticker cycles regardless of reduced motion — it uses state, not GSAP.
    // Reduced motion only disables the CSS transition on the opacity change.
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % AGENTS.length)
      }, 2000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div
        ref={ref}
        className="mt-12 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 font-mono text-sm"
        style={{ visibility: 'hidden' }}
        aria-label={`Active agents: ${AGENTS.map((a) => a.name).join(', ')}`}
      >
        <span className="text-teal mr-1">▸</span>
        {AGENTS.map((agent, i) => (
          <span key={agent.name} className="flex items-center">
            <span
              className={`${reducedMotion ? '' : 'transition-all duration-500'} ${
                i === activeIndex
                  ? 'opacity-100 text-teal font-medium'
                  : 'opacity-40 text-teal/60'
              }`}
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              {agent.name}
            </span>
            {i < AGENTS.length - 1 && (
              <span className="mx-1.5 opacity-30 text-teal">→</span>
            )}
          </span>
        ))}
        {/* ARIA live region announces active agent to screen readers */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Active agent: {AGENTS[activeIndex].name}
        </span>
      </div>
    )
  },
)

/* ---- Hero Section ---- */

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const overlineRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current) return

      const allRefs = [
        overlineRef.current,
        headlineRef.current,
        bodyRef.current,
        ctaRef.current,
        tickerRef.current,
      ]

      // Reduced motion: show everything immediately
      if (reducedMotion) {
        gsap.set(allRefs, { autoAlpha: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: EASING.entrance } })

      // 0.2s — Overline fades in
      tl.fromTo(
        overlineRef.current,
        { opacity: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4 },
        0.2,
      )

      // 0.5s — Headline SplitText character reveal
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: 'chars,words',
        })
        gsap.set(headlineRef.current, { autoAlpha: 1 })
        gsap.set(split.chars, { opacity: 0, y: 40 })

        tl.to(
          split.chars,
          {
            opacity: 1,
            y: 0,
            duration: TIMING.reveal,
            stagger: TIMING.staggerChar,
          },
          0.5,
        )

        // 1.1s — "business." scale punch
        const businessWord = split.words.find((w) =>
          w.textContent?.trim().startsWith('business'),
        )
        if (businessWord) {
          tl.fromTo(
            businessWord,
            { scale: 1 },
            {
              scale: 1.02,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            },
            '>-0.2',
          )
        }
      }

      // 1.4s — Body text fades in
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        1.4,
      )

      // 1.6s — CTA buttons slide up
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
          1.6,
        )
      }

      // 1.8s — Ticker appears
      tl.fromTo(
        tickerRef.current,
        { opacity: 0 },
        { autoAlpha: 1, duration: 0.4 },
        1.8,
      )
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-16 bg-cream"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-6"
          style={{ visibility: 'hidden' }}
        >
          AI Native Agency
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-semibold text-navy leading-none mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 5.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            visibility: 'hidden',
          }}
        >
          We build AI teams <br className="hidden sm:block" />
          that run your <span className="text-teal">business.</span>
        </h1>

        {/* Body */}
        <p
          ref={bodyRef}
          className="font-body text-sienna max-w-xl mx-auto mb-10"
          style={{
            fontSize: 'clamp(1.125rem, 1rem + 0.4vw, 1.375rem)',
            lineHeight: 1.6,
            visibility: 'hidden',
          }}
        >
          Custom multi-agent orchestration with LangChain &amp; LangGraph. Six
          specialized agents working as one team.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ visibility: 'hidden' }}
        >
          <MagneticButton>
            <Button variant="primary" size="lg" href="#contact">
              Book a Discovery Call
            </Button>
          </MagneticButton>
          <Button variant="outline" size="lg" href="#workflow">
            See How It Works
          </Button>
        </div>

        {/* Agent Ticker */}
        <AgentTicker ref={tickerRef} reducedMotion={reducedMotion} />
      </div>
    </section>
  )
}
