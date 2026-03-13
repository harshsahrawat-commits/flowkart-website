'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { TIMING, EASING } from '@/lib/constants'

type SplitTextRevealProps = {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  splitType?: 'chars' | 'words' | 'lines'
  trigger?: 'load' | 'scroll'
}

export function SplitTextReveal({
  children,
  as: Tag = 'h1',
  className = '',
  delay = 0,
  splitType = 'chars',
  trigger = 'load',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current) return

      // Reduced motion: show text immediately
      if (reducedMotion) {
        gsap.set(ref.current, { autoAlpha: 1 })
        return
      }

      const split = new SplitText(ref.current, { type: splitType })
      const targets =
        splitType === 'chars'
          ? split.chars
          : splitType === 'words'
            ? split.words
            : split.lines

      // Make container visible, hide individual elements
      gsap.set(ref.current, { autoAlpha: 1 })
      gsap.set(targets, { opacity: 0, y: 40 })

      const tweenVars: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        duration: TIMING.reveal,
        stagger:
          splitType === 'chars' ? TIMING.staggerChar : TIMING.staggerGrid,
        ease: EASING.entrance,
        delay,
      }

      if (trigger === 'scroll') {
        tweenVars.scrollTrigger = {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }

      gsap.to(targets, tweenVars)

      return () => {
        split.revert()
      }
    },
    { scope: ref, dependencies: [reducedMotion] },
  )

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ visibility: 'hidden' }}
    >
      {children}
    </Tag>
  )
}
