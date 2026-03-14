'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/components/animations/gsap-register'
import { CODE_RAIN_LINES } from '@/lib/constants'

type CodeRainProps = {
  activeIndex: number
  reducedMotion: boolean
}

export function CodeRain({ activeIndex, reducedMotion }: CodeRainProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Initialize continuous upward scroll
  useEffect(() => {
    if (!containerRef.current || reducedMotion) return

    const lineHeight = 28 // px per line
    const totalHeight = CODE_RAIN_LINES.length * lineHeight

    // Position lines in a column
    linesRef.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, { y: i * lineHeight })
      }
    })

    // Continuous scroll animation
    const tween = gsap.to(linesRef.current, {
      y: `-=${lineHeight}`,
      duration: 2,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y: number) => {
          // Wrap around: when a line goes above the container, send it to bottom
          const val = parseFloat(String(y)) % totalHeight
          return val < -lineHeight ? val + totalHeight : val
        }),
      },
    })

    tweenRef.current = tween

    return () => {
      tween.kill()
    }
  }, [reducedMotion])

  // Adjust opacity based on active benefit index
  useEffect(() => {
    if (reducedMotion) return
    const brightness = 0.4 + activeIndex * 0.1 // 0.4 → 0.5 → 0.6 → 0.7
    linesRef.current.forEach((el) => {
      if (el) gsap.to(el, { opacity: brightness, duration: 0.4 })
    })
  }, [activeIndex, reducedMotion])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden mask-fade-y"
      aria-hidden="true"
    >
      {CODE_RAIN_LINES.map((line, i) => (
        <div
          key={i}
          ref={(el) => { linesRef.current[i] = el }}
          className="absolute left-0 right-0 font-mono text-xs text-teal/40 whitespace-nowrap px-4"
          style={{ opacity: reducedMotion ? 0.5 : 0.4 }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}
