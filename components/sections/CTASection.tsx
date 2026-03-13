'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion) return

      // Background color transition on scroll entry
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: '#FFECD1' },
        {
          backgroundColor: '#15616D',
          duration: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )

      // Text color transitions in parallel so text stays readable during bg transition
      gsap.fromTo(
        headingRef.current,
        { color: '#001524' },
        {
          color: '#FFECD1',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        bodyRef.current,
        { color: '#78290F' },
        {
          color: 'rgba(255,236,209,0.8)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6"
      style={{
        backgroundColor: reducedMotion ? '#15616D' : '#FFECD1',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-display font-semibold mb-6"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: reducedMotion ? '#FFECD1' : '#001524',
          }}
        >
          Ready to build your AI team?
        </h2>
        <p
          ref={bodyRef}
          className="font-body text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: reducedMotion ? 'rgba(255,236,209,0.8)' : '#78290F' }}
        >
          Book a discovery call and we&apos;ll design a custom multi-agent
          system for your business in 30 minutes.
        </p>
        <MagneticButton>
          <Button
            variant="primary"
            size="lg"
            href="mailto:hello@flowkart.ai"
            className="bg-orange text-white hover:bg-orange/90"
          >
            Book a Discovery Call
          </Button>
        </MagneticButton>
      </div>
    </section>
  )
}
