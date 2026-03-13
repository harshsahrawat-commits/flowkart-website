'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { TIMING, EASING } from '@/lib/constants'

type Direction = 'up' | 'down' | 'left' | 'right'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  stagger?: number
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = TIMING.reveal,
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current) return

      if (reducedMotion) {
        gsap.set(ref.current, { autoAlpha: 1 })
        return
      }

      const { x, y } = offsets[direction]
      const targets =
        ref.current.children.length > 1 ? ref.current.children : ref.current

      gsap.set(ref.current, { autoAlpha: 1 })
      gsap.from(targets, {
        opacity: 0,
        x,
        y,
        duration,
        stagger,
        delay,
        ease: EASING.entrance,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: ref, dependencies: [reducedMotion] },
  )

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}
