'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true when the user prefers reduced motion.
 * All animation components must check this and skip to end state.
 * Reference: CREATIVE-BRIEF.md Section 5.8
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
