'use client'

import { useRef, useCallback } from 'react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { EASING } from '@/lib/constants'

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
  href?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    },
    [reducedMotion, strength],
  )

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !ref.current) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: EASING.elastic,
    })
  }, [reducedMotion])

  const Tag = href ? 'a' : 'div'

  return (
    <Tag
      ref={ref as any}
      href={href}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Tag>
  )
}
