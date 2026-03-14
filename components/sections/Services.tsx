'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { SCENARIO_MESSAGES, AGENTS } from '@/lib/constants'

const AGENT_LETTER: Record<string, string> = {
  You: 'You',
  Research: 'R',
  Marketing: 'M',
  Copywriter: 'C',
  Outreach: 'O',
  Finance: 'F',
  Development: 'D',
  Results: '✓',
}

const MSG_BG: Record<string, string> = {
  orange: 'bg-orange/10 border-orange/20',
  teal: 'bg-teal/10 border-teal/20',
}

const ICON_BG: Record<string, string> = {
  orange: 'bg-orange',
  teal: 'bg-teal',
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])
  const clipRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cursorRefs = useRef<(HTMLSpanElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        // Show everything immediately
        messageRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1 })
        })
        clipRefs.current.forEach((el) => {
          if (el) gsap.set(el, { clipPath: 'inset(0 0% 0 0)' })
        })
        cursorRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0 })
        })
        return
      }

      const mm = gsap.matchMedia()

      // --- DESKTOP: Pinned scroll with typewriter ---
      mm.add('(min-width: 768px)', () => {
        // Hide all messages initially
        messageRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0 })
        })
        clipRefs.current.forEach((el) => {
          if (el) gsap.set(el, { clipPath: 'inset(0 100% 0 0)' })
        })
        cursorRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0 })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Define scroll segments for each message
        const segments = [
          { start: 0, end: 0.1 },      // You
          { start: 0.1, end: 0.3 },     // Research
          { start: 0.3, end: 0.5 },     // Marketing
          { start: 0.5, end: 0.7 },     // Copywriter
          { start: 0.7, end: 0.85 },    // Outreach
          { start: 0.85, end: 1.0 },    // Results
        ]

        SCENARIO_MESSAGES.forEach((msg, i) => {
          const seg = segments[i]
          const msgEl = messageRefs.current[i]
          const clipEl = clipRefs.current[i]
          const cursorEl = cursorRefs.current[i]

          if (!msgEl || !clipEl) return

          // Show message container
          tl.to(msgEl, { autoAlpha: 1, duration: 0.01 }, seg.start)

          // Show cursor
          if (cursorEl) {
            tl.to(cursorEl, { autoAlpha: 1, duration: 0.01 }, seg.start)
          }

          // Typewriter reveal via clip-path
          tl.to(
            clipEl,
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: seg.end - seg.start - 0.02,
              ease: 'none',
            },
            seg.start + 0.01,
          )

          // Hide cursor after reveal
          if (cursorEl) {
            tl.to(cursorEl, { autoAlpha: 0, duration: 0.01 }, seg.end - 0.01)
          }

          // Highlight agent in strip (skip "You" and "Results" — they're not in the strip)
          const agentName = msg.agent
          if (agentName !== 'You' && agentName !== 'Results') {
            const stripEls = sectionRef.current?.querySelectorAll('.agent-strip-icon')
            if (stripEls) {
              stripEls.forEach((el) => {
                const name = el.getAttribute('data-agent')
                if (name === agentName) {
                  tl.to(el, { opacity: 1, boxShadow: '0 0 16px rgba(21,97,109,0.4)', duration: 0.05 }, seg.start)
                  tl.to(el, { boxShadow: '0 0 0px transparent', duration: 0.05 }, seg.end)
                }
              })
            }
          }
        })
      })

      // --- MOBILE: Simple scroll reveals ---
      mm.add('(max-width: 767px)', () => {
        messageRefs.current.forEach((el) => {
          if (!el) return
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: { trigger: el, start: 'top 85%' },
            },
          )
        })
        // Show all text immediately on mobile (no typewriter)
        clipRefs.current.forEach((el) => {
          if (el) gsap.set(el, { clipPath: 'inset(0 0% 0 0)' })
        })
        cursorRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0 })
        })
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-cream-light overflow-hidden"
    >
      {/* Section Header */}
      <div className="pt-24 pb-16 px-6 text-center">
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
      <div className="max-w-2xl mx-auto px-6 pb-12">
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

          {/* Messages */}
          <div className="px-4 py-4 flex flex-col gap-3 min-h-[300px]">
            {SCENARIO_MESSAGES.map((msg, i) => (
              <div
                key={i}
                ref={(el) => { messageRefs.current[i] = el }}
                className="flex items-start gap-2"
              >
                {/* Agent Icon */}
                <div
                  className={`w-7 h-7 rounded-lg ${ICON_BG[msg.color]} flex items-center justify-center shrink-0`}
                >
                  <span className="text-white text-[9px] font-bold font-mono">
                    {AGENT_LETTER[msg.agent]}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`${MSG_BG[msg.color]} border rounded-[0_10px_10px_10px] px-3 py-2 relative flex-1`}
                >
                  <span
                    ref={(el) => { clipRefs.current[i] = el }}
                    className="font-mono text-[11px] text-cream leading-relaxed block"
                    style={{ clipPath: 'inset(0 100% 0 0)' }}
                  >
                    {msg.text}
                  </span>
                  <span
                    ref={(el) => { cursorRefs.current[i] = el }}
                    className="text-teal text-xs absolute"
                    style={{ visibility: 'hidden' }}
                    aria-hidden="true"
                  >
                    ▊
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Strip */}
      <div className="flex flex-wrap justify-center gap-3 px-6 pb-24">
        {AGENTS.map((agent) => (
          <div
            key={agent.name}
            data-agent={agent.name}
            className="agent-strip-icon flex flex-col items-center gap-1 opacity-30 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">
                {agent.name.charAt(0)}
              </span>
            </div>
            <span className="font-body text-[10px] text-navy">
              {agent.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
