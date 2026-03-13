'use client'

import { useRef, useState, useCallback, useEffect, forwardRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { TERMINAL_COMMANDS } from '@/lib/constants'

type LiveTerminalProps = {
  reducedMotion: boolean
}

const AGENT_COLORS = {
  active: { dot: 'text-green-400', name: 'text-cream', status: 'text-teal' },
  waiting: { dot: 'text-orange', name: 'text-cream/50', status: 'text-orange' },
  queued: { dot: 'text-sienna/40', name: 'text-cream/30', status: 'text-sienna/40' },
} as const

type AgentStatus = 'queued' | 'waiting' | 'active'

const STATUS_SYMBOLS: Record<AgentStatus, string> = {
  queued: '○',
  waiting: '◐',
  active: '●',
}

export const LiveTerminal = forwardRef<HTMLDivElement, LiveTerminalProps>(
  function LiveTerminal({ reducedMotion }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const commandRef = useRef<HTMLSpanElement>(null)
    const agentRefs = useRef<(HTMLDivElement | null)[]>([])
    const [commandIndex, setCommandIndex] = useState(0)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    const currentCommand = TERMINAL_COMMANDS[commandIndex]

    const advanceCommand = useCallback(() => {
      setCommandIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length)
    }, [])

    // Agent status state for each agent row
    const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>(
      () => currentCommand.agents.map(() => 'queued'),
    )

    // Reset statuses when command changes
    useEffect(() => {
      setAgentStatuses(currentCommand.agents.map(() => 'queued'))
    }, [commandIndex, currentCommand.agents])

    useGSAP(
      () => {
        if (!containerRef.current || !commandRef.current) return

        // Reduced motion: show everything immediately
        if (reducedMotion) {
          if (commandRef.current) {
            commandRef.current.textContent = `$ ${currentCommand.command}`
          }
          setAgentStatuses(currentCommand.agents.map(() => 'active'))
          return
        }

        // Kill previous timeline
        if (timelineRef.current) {
          timelineRef.current.kill()
        }

        const tl = gsap.timeline({
          onComplete: () => {
            // Wait 2s then advance to next command
            gsap.delayedCall(2, advanceCommand)
          },
        })

        timelineRef.current = tl

        // Reset command text
        if (commandRef.current) {
          commandRef.current.textContent = '$ '
        }

        // Reset agent rows to invisible
        agentRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 0 })
        })

        // Typewriter for the command line
        const fullCommand = `$ ${currentCommand.command}`
        const chars = fullCommand.split('')
        chars.forEach((char, i) => {
          tl.call(
            () => {
              if (commandRef.current) {
                commandRef.current.textContent = chars.slice(0, i + 1).join('')
              }
            },
            [],
            0.1 + i * 0.025,
          )
        })

        // Reveal agents one by one
        const commandDuration = 0.1 + chars.length * 0.025
        currentCommand.agents.forEach((_, i) => {
          const agentStart = commandDuration + 0.3 + i * 0.6

          // Fade in agent row
          tl.call(
            () => {
              const el = agentRefs.current[i]
              if (el) gsap.to(el, { autoAlpha: 1, duration: 0.2 })
            },
            [],
            agentStart,
          )

          // Set to waiting (if not first)
          if (i > 0) {
            tl.call(
              () => {
                setAgentStatuses((prev) => {
                  const next = [...prev]
                  next[i] = 'waiting'
                  return next
                })
              },
              [],
              agentStart,
            )
          }

          // Set to active
          tl.call(
            () => {
              setAgentStatuses((prev) => {
                const next = [...prev]
                next[i] = 'active'
                // Set next agent to waiting
                if (i + 1 < currentCommand.agents.length) {
                  next[i + 1] = 'waiting'
                }
                return next
              })
            },
            [],
            agentStart + 0.4,
          )
        })
      },
      { scope: containerRef, dependencies: [commandIndex, reducedMotion] },
    )

    return (
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        className="mt-10 max-w-md mx-auto bg-navy rounded-xl shadow-2xl overflow-hidden"
        style={{ visibility: 'hidden' }}
        aria-label="AI agents processing a task — Research, Marketing, Copywriter, and Outreach agents collaborating"
      >
        {/* Window Chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-teal/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
          <span className="ml-2 font-mono text-[10px] text-cream/30">
            flowkart-agent-system
          </span>
        </div>

        {/* Terminal Body */}
        <div className="px-4 py-3 font-mono text-xs">
          {/* Command Line */}
          <div className="text-cream/40 mb-3">
            <span ref={commandRef}>$ </span>
            <span className="animate-pulse" aria-hidden="true">▊</span>
          </div>

          {/* Agent Rows */}
          <div className="flex flex-col gap-1.5">
            {currentCommand.agents.map((agent, i) => {
              const status = agentStatuses[i] || 'queued'
              const colors = AGENT_COLORS[status]
              return (
                <div
                  key={`${commandIndex}-${agent.name}`}
                  ref={(el) => { agentRefs.current[i] = el }}
                  className="flex items-center gap-2"
                >
                  <span className={`${colors.dot} text-sm leading-none`}>
                    {STATUS_SYMBOLS[status]}
                  </span>
                  <span className={`${colors.name} text-xs`}>
                    {agent.name} Agent
                  </span>
                  <span className={`${colors.status} text-[10px] ml-auto`}>
                    {status === 'active'
                      ? agent.status
                      : status === 'waiting'
                        ? `waiting for ${currentCommand.agents[i - 1]?.name.toLowerCase() || 'input'}`
                        : 'queued'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Screen reader text */}
        <span className="sr-only">
          AI agents processing a marketing task — {currentCommand.agents.map((a) => a.name).join(', ')} agents collaborating.
        </span>
      </div>
    )
  },
)
