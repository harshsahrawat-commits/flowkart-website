# Flowkart Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign 5 sections of the Flowkart marketing website — navbar sizing, hero terminal ticker, agent workflow with OpenArt/code rain, scenario replay terminal, and process counter row.

**Architecture:** Each section is an independent React component consuming data from `lib/constants.ts`. All animations use GSAP 3.14 with ScrollTrigger for scroll-linked effects. OpenArt images are static WebP backgrounds loaded via `next/image`. Two sections use pinned scroll (Workflow, Services); the rest use standard scroll-enter triggers.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, GSAP 3.14 (ScrollTrigger, SplitText), `next/image` for OpenArt assets.

**Spec:** `docs/superpowers/specs/2026-03-14-flowkart-section-redesign-design.md`

**Note on testing:** This project is entirely visual — GSAP animation components, scroll-linked effects, and responsive layouts. Traditional unit tests do not apply. Verification is done by running the dev server (`npm run dev` on port 3000) and visually inspecting each section in the browser. Each task includes specific visual checkpoints.

**Prerequisites:** The user must place OpenArt-generated WebP images in `public/images/` before Tasks 4 and 6 can be fully verified:
- `workflow-bg.webp` (REQUIRED for Task 4)
- `hero-texture.webp` (optional)
- `process-glow.webp` (optional for Task 6)
- `cta-accent.webp` (optional, not part of this plan)

---

## File Map

### Files to Modify
| File | Responsibility | Tasks |
|------|---------------|-------|
| `components/layout/Header.tsx` | Navbar component | Task 1 |
| `components/sections/Hero.tsx` | Hero section + terminal ticker | Task 3 |
| `lib/constants.ts` | All data constants | Task 2 |
| `app/globals.css` | Design tokens (if needed for new utilities) | Task 4 |

### Files to Rewrite (complete replacement)
| File | Responsibility | Tasks |
|------|---------------|-------|
| `components/sections/AgentWorkflow.tsx` | Benefits + OpenArt/Code Rain section | Task 4 |
| `components/sections/Services.tsx` | Scenario Replay terminal section | Task 5 |
| `components/sections/Process.tsx` | Bold Counter Row section | Task 6 |

### New Files
| File | Responsibility | Tasks |
|------|---------------|-------|
| `components/sections/LiveTerminal.tsx` | Reusable terminal animation sub-component | Task 3 |
| `components/sections/CodeRain.tsx` | Code rain overlay sub-component | Task 4 |

---

## Chunk 1: Navbar + Constants Foundation

### Task 1: Navbar Font Size Increase

**Files:**
- Modify: `components/layout/Header.tsx`

This is the simplest change — just updating Tailwind class strings.

- [ ] **Step 1: Update logo font size**

In `components/layout/Header.tsx`, change the logo `<a>` tag:

```tsx
// BEFORE (line ~77):
className="font-display font-semibold text-lg text-navy tracking-[0.04em]"

// AFTER:
className="font-display font-semibold text-xl text-navy tracking-[0.04em]"
```

- [ ] **Step 2: Update nav container height and link gap**

Change the `<nav>` element:

```tsx
// BEFORE (line ~73):
className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"

// AFTER:
className="max-w-7xl mx-auto px-6 h-[4.5rem] flex items-center justify-between"
```

Change the desktop nav container:

```tsx
// BEFORE (line ~83):
className="hidden md:flex items-center gap-8"

// AFTER:
className="hidden md:flex items-center gap-10"
```

- [ ] **Step 3: Update nav link font sizes**

Change each nav link:

```tsx
// BEFORE (line ~88):
className="font-body font-medium text-sm text-navy hover:text-teal link-underline transition-colors duration-300"

// AFTER:
className="font-body font-medium text-base text-navy hover:text-teal link-underline transition-colors duration-300"
```

- [ ] **Step 4: Update CTA button font size and padding**

```tsx
// BEFORE (line ~95):
className="px-5 py-2.5 bg-orange text-white font-body font-bold text-sm rounded-lg hover:bg-orange/90 transition-colors duration-300"

// AFTER:
className="px-6 py-3 bg-orange text-white font-body font-bold text-base rounded-lg hover:bg-orange/90 transition-colors duration-300"
```

- [ ] **Step 5: Update hero section top padding**

In `components/sections/Hero.tsx`, the hero has `pt-16` to account for the fixed navbar. With the taller navbar, bump this:

```tsx
// BEFORE (line ~172):
className="relative min-h-screen flex items-center justify-center px-6 pt-16 bg-cream"

// AFTER:
className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-cream"
```

- [ ] **Step 6: Visual verification**

Run: `npm run dev`
Check:
- [ ] Logo text is visibly larger
- [ ] Nav links are larger and readable
- [ ] CTA button has more padding, text is larger
- [ ] Navbar doesn't feel cramped — sufficient vertical breathing room
- [ ] Scroll state (backdrop blur) still works after scrolling
- [ ] Mobile hamburger menu is unaffected
- [ ] Hero content doesn't hide behind the taller navbar

- [ ] **Step 7: Commit**

```bash
git add components/layout/Header.tsx components/sections/Hero.tsx
git commit -m "style: increase navbar font sizes and height

Logo text-lg→xl, nav links text-sm→base, CTA text-sm→base with
larger padding. Navbar height h-16→h-[4.5rem]. Hero pt adjusted."
```

---

### Task 2: Update Constants Data

**Files:**
- Modify: `lib/constants.ts`

Add all new data constants needed by Tasks 3-6. Doing this first so subsequent tasks can import immediately.

- [ ] **Step 1: Add terminal command data**

Add after the existing `WORKFLOW_NODES` array in `lib/constants.ts`.

> **Note:** The spec defines `TERMINAL_COMMANDS` with flat string arrays for agents and a separate `AGENT_STATUSES` map. This plan intentionally co-locates `{ name, status }` on each agent entry instead — it keeps the data self-contained and avoids a second lookup. `AGENT_STATUSES` from the spec is therefore not needed.

```typescript
// ============================================
// Hero Terminal Data
// Reference: Design Spec Section 2
// Note: agents use { name, status } objects (richer than spec's flat strings)
// ============================================

export const TERMINAL_COMMANDS = [
  {
    command: 'flowkart deploy --team marketing',
    agents: [
      { name: 'Research', status: 'analyzing market data...' },
      { name: 'Marketing', status: 'building campaign strategy...' },
      { name: 'Copywriter', status: 'drafting landing page copy...' },
      { name: 'Outreach', status: 'scheduling email sequences...' },
    ],
  },
  {
    command: 'flowkart deploy --team sales',
    agents: [
      { name: 'Research', status: 'scanning prospect data...' },
      { name: 'Finance', status: 'modeling deal projections...' },
      { name: 'Outreach', status: 'personalizing outreach...' },
      { name: 'Copywriter', status: 'writing follow-up emails...' },
    ],
  },
  {
    command: 'flowkart deploy --team content',
    agents: [
      { name: 'Research', status: 'identifying trending topics...' },
      { name: 'Copywriter', status: 'drafting blog series...' },
      { name: 'Marketing', status: 'optimizing for distribution...' },
      { name: 'Development', status: 'deploying CMS updates...' },
    ],
  },
] as const
```

- [ ] **Step 2: Add workflow benefits data**

Add the following new constants (do NOT delete `WORKFLOW_NODES` yet — that happens in Step 5):

```typescript
// ============================================
// Agent Workflow Benefits
// Reference: Design Spec Section 3
// ============================================

export const WORKFLOW_BENEFITS = [
  {
    id: 'reasoning',
    category: 'Reasoning',
    headline: 'They break problems down',
    description: "LangGraph's stateful architecture lets agents decompose complex goals into sub-tasks — evaluating options the way a senior strategist would.",
    borderColor: 'teal', // #15616D
  },
  {
    id: 'communication',
    category: 'Communication',
    headline: 'They share what they learn',
    description: 'Real-time message passing means zero information silos. Every agent sees what others discover — decisions are made with full context.',
    borderColor: 'orange', // #FF7D00
  },
  {
    id: 'adaptation',
    category: 'Adaptation',
    headline: 'They evolve with your business',
    description: 'Graph-based orchestration means adding, removing, or re-routing agents as your needs change. Your AI team scales with your business.',
    borderColor: 'cream', // #FFECD1
  },
  {
    id: 'custom',
    category: 'Custom Teams',
    headline: 'Built around your workflows',
    description: 'Not a template — a bespoke agent system designed around your specific business processes and workflows.',
    borderColor: 'teal', // #15616D
  },
] as const

export const CODE_RAIN_LINES = [
  'agent.research() → insights[3]',
  'pipe(insights) → marketing',
  'agent.strategize(gaps)',
  'emit("draft_ready")',
  'agent.distribute()',
  'graph.route(node_5, node_2)',
  'agent.analyze(competitors)',
  'state.update("strategy_v2")',
  'agent.copywrite(brief)',
  'pipe(content) → outreach',
] as const
```

- [ ] **Step 3: Add scenario replay data**

```typescript
// ============================================
// Services Scenario Replay
// Reference: Design Spec Section 4
// ============================================

export const SCENARIO_MESSAGES = [
  {
    agent: 'You',
    color: 'orange' as const,
    text: '"Launch a product campaign for our new SaaS tool"',
  },
  {
    agent: 'Research',
    color: 'teal' as const,
    text: 'Analyzed 12 competitors in the productivity space. Found 3 positioning gaps. Strongest opportunity: "automation for solo founders" ✓',
  },
  {
    agent: 'Marketing',
    color: 'teal' as const,
    text: 'Targeting gap #2. Audience: founders with <5 employees. Channel mix: LinkedIn ads + 5-part email sequence. Projected reach: 12,000 qualified leads →',
  },
  {
    agent: 'Copywriter',
    color: 'teal' as const,
    text: 'Drafting landing page headline + hero copy. 3 email variants for A/B testing. Tone: confident, concise, founder-friendly ✓',
  },
  {
    agent: 'Outreach',
    color: 'teal' as const,
    text: 'LinkedIn campaign live — 3 ad variants. Email sequence scheduled — sends over 14 days. Tracking: UTM tags + conversion pixels active ✓',
  },
  {
    agent: 'Results',
    color: 'orange' as const,
    text: 'Campaign launched in 4 minutes. 5 agents. Zero handoff delays.',
  },
] as const
```

- [ ] **Step 4: Update process steps data**

Update the existing `PROCESS_STEPS` array to include short verb labels:

```typescript
export const PROCESS_STEPS = [
  {
    number: '01',
    verb: 'Discover',
    title: 'Discovery Call',
    description: 'We learn your business, workflows, and where AI can help most.',
    color: 'teal', // #15616D
  },
  {
    number: '02',
    verb: 'Design',
    title: 'Team Design',
    description: 'We architect your custom multi-agent system around your specific needs.',
    color: 'orange', // #FF7D00
  },
  {
    number: '03',
    verb: 'Deploy',
    title: 'Deploy & Optimize',
    description: 'Your AI team goes live. We monitor, tune, and scale as you grow.',
    color: 'cream', // #FFECD1
  },
] as const
```

- [ ] **Step 5: Remove old WORKFLOW_NODES and rename Copywriting agent**

Delete the `WORKFLOW_NODES` array entirely. It's replaced by `WORKFLOW_BENEFITS`.

Also rename the `"Copywriting"` agent to `"Copywriter"` in the `AGENTS` array (to match how it's referenced in `TERMINAL_COMMANDS` and `SCENARIO_MESSAGES`):

```typescript
// BEFORE:
{ name: 'Copywriting', description: '...', icon: 'pen' },
// AFTER:
{ name: 'Copywriter', description: 'Creates on-brand content aligned with strategy — from blogs to ad copy.', icon: 'pen' },
```

- [ ] **Step 6: Verify TypeScript compilation**

Run: `npx tsc --noEmit`

**Expected:** `AgentWorkflow.tsx` will fail because `WORKFLOW_NODES` no longer exists — this is expected and acceptable since it gets completely rewritten in Task 4. To unblock the check, temporarily comment out the `WORKFLOW_NODES` import in `AgentWorkflow.tsx`:

```tsx
// import { WORKFLOW_NODES } from '@/lib/constants'  // Removed in Task 4
```

After commenting out that import, re-run `npx tsc --noEmit`. All other files should compile cleanly.

- [ ] **Step 7: Commit**

```bash
git add lib/constants.ts
git commit -m "data: add constants for terminal, workflow benefits, scenario replay

Add TERMINAL_COMMANDS, WORKFLOW_BENEFITS, CODE_RAIN_LINES,
SCENARIO_MESSAGES. Update PROCESS_STEPS with verb/color labels.
Remove old WORKFLOW_NODES (replaced by WORKFLOW_BENEFITS).
Rename Copywriting → Copywriter in AGENTS for consistency."
```

---

## Chunk 2: Hero Live Terminal

### Task 3: Hero Live Terminal Component

**Files:**
- Create: `components/sections/LiveTerminal.tsx`
- Modify: `components/sections/Hero.tsx`

Build the terminal as a separate sub-component, then integrate it into the hero section replacing `AgentTicker`.

- [ ] **Step 1: Create LiveTerminal sub-component**

Create `components/sections/LiveTerminal.tsx`:

```tsx
'use client'

import { useRef, useState, useCallback, forwardRef } from 'react'
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

    useGSAP(
      () => {
        if (!containerRef.current || !commandRef.current) return

        // Reset statuses when command changes (inside useGSAP to avoid lint: set-state-in-effect)
        setAgentStatuses(currentCommand.agents.map(() => 'queued'))

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

          // Set to waiting
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

          // Set to active
          tl.call(
            () => {
              setAgentStatuses((prev) => {
                const next = [...prev]
                next[i] = 'active'
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
```

- [ ] **Step 2: Replace AgentTicker in Hero.tsx**

In `components/sections/Hero.tsx`:

1. Remove the entire `AgentTicker` sub-component (lines ~12-58)
2. Remove the `AGENTS` import from `@/lib/constants` (keep `TIMING`, `EASING`)
3. Add import for `LiveTerminal`:

```tsx
import { LiveTerminal } from '@/components/sections/LiveTerminal'
```

4. In the JSX, replace:
```tsx
<AgentTicker ref={tickerRef} reducedMotion={reducedMotion} />
```
with:
```tsx
<LiveTerminal ref={tickerRef} reducedMotion={reducedMotion} />
```

Everything else in Hero.tsx stays the same — the `tickerRef`, the hero timeline timing at `1.8s`, the `fromTo` that fades in the ticker.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`
Check:
- [ ] Dark terminal panel appears below CTAs in the hero
- [ ] Window chrome (3 colored dots + title) renders correctly
- [ ] Command types out character by character
- [ ] Agents appear one by one with status transitions (queued → waiting → active)
- [ ] After all agents activate, terminal resets and loops with a different command
- [ ] Terminal is centered and doesn't break the hero layout on mobile
- [ ] With `prefers-reduced-motion: reduce` enabled in browser, terminal shows all agents immediately

- [ ] **Step 4: Commit**

```bash
git add components/sections/LiveTerminal.tsx components/sections/Hero.tsx
git commit -m "feat: replace AgentTicker with LiveTerminal in hero section

Dark mini-terminal with typewriter command, agent status transitions
(queued → waiting → active), and 3-command loop cycle via GSAP
onComplete. Includes reduced motion support and ARIA labels."
```

---

## Chunk 3: Agent Workflow Section

### Task 4: Agent Workflow — Benefits + OpenArt + Code Rain

**Files:**
- Create: `components/sections/CodeRain.tsx`
- Rewrite: `components/sections/AgentWorkflow.tsx`
- Modify: `app/globals.css` (gradient mask utility)

This is the most complex task — a pinned scroll section with synchronized benefit highlighting and an animated code rain overlay on top of an OpenArt background.

**Prerequisite:** `public/images/workflow-bg.webp` must exist. If not available yet, use a solid navy placeholder — the component will work without the image.

- [ ] **Step 1: Add gradient mask CSS utility**

In `app/globals.css`, add before the reduced motion section:

```css
/* --- Code Rain Gradient Mask --- */
.mask-fade-y {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
}
```

- [ ] **Step 2: Create CodeRain sub-component**

> **Intentional simplification:** The spec describes per-stage code rain behaviors (speed increase at 25-50%, line rearrangement at 50-75%, brightening at 75-100%). This implementation uses only brightness/opacity changes tied to `activeIndex`. The speed and rearrangement effects are deferred — they add complexity for minimal visual payoff given the code rain is a subtle background element behind the OpenArt image. They can be added iteratively if needed after the initial build.

Create `components/sections/CodeRain.tsx`:

```tsx
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

    const container = containerRef.current
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
```

- [ ] **Step 3: Rewrite AgentWorkflow.tsx**

Replace the entire contents of `components/sections/AgentWorkflow.tsx`:

```tsx
'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { WORKFLOW_BENEFITS } from '@/lib/constants'
import { CodeRain } from '@/components/sections/CodeRain'
import Image from 'next/image'

const BORDER_COLORS: Record<string, string> = {
  teal: 'border-l-teal',
  orange: 'border-l-orange',
  cream: 'border-l-cream',
}

const LABEL_COLORS: Record<string, string> = {
  teal: 'text-teal',
  orange: 'text-orange',
  cream: 'text-cream',
}

export function AgentWorkflow() {
  const sectionRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        // Show all benefits at full opacity
        benefitsRef.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1 })
        })
        return
      }

      const mm = gsap.matchMedia()

      // --- DESKTOP: Pinned scroll with benefit highlighting ---
      mm.add('(min-width: 768px)', () => {
        // Set initial state: first benefit visible, rest dimmed
        benefitsRef.current.forEach((el, i) => {
          if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0.3 })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Animate through 4 benefits
        WORKFLOW_BENEFITS.forEach((_, i) => {
          if (i === 0) return // First is already visible

          const t = i / (WORKFLOW_BENEFITS.length - 1)

          // Dim previous benefit
          tl.to(
            benefitsRef.current[i - 1],
            { opacity: 0.3, duration: 0.1 },
            t - 0.05,
          )

          // Highlight current benefit
          tl.to(
            benefitsRef.current[i],
            { opacity: 1, duration: 0.1 },
            t,
          )

          // Update active index for CodeRain
          tl.call(() => setActiveIndex(i), [], t)
        })
      })

      // --- MOBILE: Standard scroll reveals ---
      mm.add('(max-width: 767px)', () => {
        benefitsRef.current.forEach((el, i) => {
          if (!el) return
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
              },
            },
          )
        })
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative bg-navy overflow-hidden"
    >
      {/* Section Header */}
      <div className="pt-24 pb-16 px-6 text-center">
        <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
          Powered by LangChain &amp; LangGraph
        </p>
        <h2
          className="font-display font-semibold text-cream"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Agents that think, communicate,
          <br className="hidden sm:block" />
          and adapt
        </h2>
      </div>

      {/* Split Layout */}
      <div className="max-w-6xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 md:gap-8 min-h-[60vh] items-center">
        {/* Left: Benefits Stack (60%) */}
        <div className="w-full md:w-[60%] flex flex-col gap-8">
          {WORKFLOW_BENEFITS.map((benefit, i) => (
            <div
              key={benefit.id}
              ref={(el) => { benefitsRef.current[i] = el }}
              className={`border-l-[3px] ${BORDER_COLORS[benefit.borderColor]} pl-4 transition-opacity`}
            >
              <p className={`font-mono text-[0.6875rem] uppercase tracking-[0.1em] mb-1 ${LABEL_COLORS[benefit.borderColor]}`}>
                {benefit.category}
              </p>
              <h3 className="font-display font-semibold text-cream text-lg mb-1">
                {benefit.headline}
              </h3>
              <p className="font-body text-cream/60 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right: OpenArt Background + Code Rain (40%) */}
        <div className="w-full md:w-[40%] relative h-[200px] md:h-[400px] rounded-xl overflow-hidden">
          {/* OpenArt Background */}
          <div className="absolute inset-0 opacity-50">
            <Image
              src="/images/workflow-bg.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              aria-hidden="true"
              loading="lazy"
            />
          </div>

          {/* Code Rain Overlay */}
          <CodeRain activeIndex={activeIndex} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Visual verification**

Run: `npm run dev`
Check:
- [ ] Section has dark navy background
- [ ] Header text ("Agents that think, communicate, and adapt") is cream/light colored
- [ ] Benefits stack shows on the left with colored left borders
- [ ] On desktop: scrolling pins the section and highlights benefits one at a time
- [ ] Other benefits dim to ~30% opacity when not active
- [ ] Right side shows OpenArt background (or navy placeholder if image not yet added)
- [ ] Code rain text scrolls upward continuously with gradient fade masks
- [ ] Code rain brightness increases as you scroll through benefits
- [ ] On mobile: benefits stack vertically with standard scroll reveals, no pinning
- [ ] Section unpins cleanly after the last benefit

- [ ] **Step 5: Commit**

```bash
git add components/sections/CodeRain.tsx components/sections/AgentWorkflow.tsx app/globals.css
git commit -m "feat: rewrite AgentWorkflow with benefits stack + OpenArt/code rain

Pinned scroll section with 4 LangChain/LangGraph benefits on the left,
OpenArt background + animated code rain on the right. Benefits highlight
sequentially on scroll scrub. Mobile falls back to vertical stack with
standard reveals. Includes gradient mask CSS utility."
```

---

## Chunk 4: Services Scenario Replay

### Task 5: Services — Full Scenario Replay Terminal

**Files:**
- Rewrite: `components/sections/Services.tsx`

A pinned scroll section with a terminal panel that types out a simulated agent workflow conversation.

- [ ] **Step 1: Rewrite Services.tsx**

Replace the entire contents of `components/sections/Services.tsx`:

```tsx
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
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`
Check:
- [ ] Section has cream-light background with "Watch your AI team work" heading
- [ ] Dark terminal panel is centered with window chrome
- [ ] On desktop: scrolling pins the section and types out messages one by one
- [ ] Typewriter reveal is smooth (clip-path based, not jumpy)
- [ ] Cursor character appears during typing and disappears after
- [ ] Agent strip below terminal shows which agent is active (glow effect)
- [ ] On mobile: no pinning, messages appear one at a time with fade-up
- [ ] Section unpins cleanly after the last message (Results)
- [ ] Accessibility: all message text is in the DOM and readable by screen readers (clip-path hides visually but keeps content accessible)
- [ ] Cursor characters (`▊`) have `aria-hidden="true"` and are not announced by screen readers

- [ ] **Step 3: Commit**

```bash
git add components/sections/Services.tsx
git commit -m "feat: rewrite Services as scenario replay terminal

Pinned scroll section with typewriter clip-path reveal for each
agent message. User prompt triggers sequential Research → Marketing →
Copywriter → Outreach responses. Agent strip highlights active agent.
Mobile: standard scroll reveals, no typewriter."
```

---

## Chunk 5: Process Counter Row

### Task 6: Process — Bold Counter Row

**Files:**
- Rewrite: `components/sections/Process.tsx`

The simplest visual rewrite — a dark section with oversized counter-animated numbers.

> **Dependency:** This task requires the `verb` and `color` fields on `PROCESS_STEPS` added in Task 2, Step 4 (Chunk 1). If Task 2 has not been completed yet, this component will fail at runtime.

- [ ] **Step 1: Rewrite Process.tsx**

Replace the entire contents of `components/sections/Process.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { PROCESS_STEPS, EASING } from '@/lib/constants'

const NUMBER_COLORS: Record<string, string> = {
  teal: 'text-teal',
  orange: 'text-orange',
  cream: 'text-cream',
}

const UNDERLINE_COLORS: Record<string, string> = {
  teal: 'from-teal',
  orange: 'from-orange',
  cream: 'from-cream',
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const underlineRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current) return

      if (reducedMotion) {
        // Show everything at final state
        stepRefs.current.forEach((el) => {
          if (el) gsap.set(el, { autoAlpha: 1 })
        })
        return
      }

      // Initial hidden state
      stepRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 1 }) // Container visible
      })
      numberRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { scale: 0.85, opacity: 0 })
          el.textContent = '00' // Start at 00
        }
      })
      underlineRefs.current.forEach((el) => {
        if (el) gsap.set(el, { width: 0 })
      })
      textRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 15 })
      })

      // Scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      PROCESS_STEPS.forEach((step, i) => {
        const delay = i * 0.2

        // Counter animation: 00 → target number
        const target = parseInt(step.number)
        const numberEl = numberRefs.current[i]
        if (numberEl) {
          tl.to(
            { val: 0 },
            {
              val: target,
              duration: 0.8,
              ease: EASING.entrance,
              snap: { val: 1 },
              onUpdate: function () {
                const current = Math.round(this.targets()[0].val)
                numberEl.textContent = current.toString().padStart(2, '0')
              },
            },
            delay,
          )

          // Scale in
          tl.to(
            numberEl,
            { scale: 1, opacity: 1, duration: 0.6, ease: EASING.entrance },
            delay,
          )
        }

        // Underline draw-in
        const underlineEl = underlineRefs.current[i]
        if (underlineEl) {
          tl.to(
            underlineEl,
            { width: 48, duration: 0.5, ease: EASING.entrance },
            delay + 0.3,
          )
        }

        // Text fade up
        const textEl = textRefs.current[i]
        if (textEl) {
          tl.to(
            textEl,
            { opacity: 1, y: 0, duration: 0.5, ease: EASING.entrance },
            delay + 0.4,
          )
        }
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 px-6 bg-navy overflow-hidden"
    >
      {/* Optional: OpenArt background glow */}
      {/* Uncomment when process-glow.webp is available:
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <Image src="/images/process-glow.webp" alt="" fill className="object-cover" loading="lazy" />
      </div>
      */}

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
            How It Works
          </p>
          <h2
            className="font-display font-semibold text-cream"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Three steps to your AI team
          </h2>
        </div>

        {/* Counter Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-16 md:gap-12 lg:gap-20">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el }}
              className="text-center max-w-[180px]"
            >
              {/* Large Number */}
              <span
                ref={(el) => { numberRefs.current[i] = el }}
                className={`font-display font-bold ${NUMBER_COLORS[step.color]} block`}
                style={{
                  fontSize: 'clamp(3rem, 2rem + 4vw, 5rem)',
                  lineHeight: 1,
                }}
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </span>

              {/* Gradient Underline */}
              <div
                ref={(el) => { underlineRefs.current[i] = el }}
                className={`h-0.5 bg-gradient-to-r ${UNDERLINE_COLORS[step.color]} to-transparent mx-auto mt-3`}
                style={{ width: 48 }}
              />

              {/* Text */}
              <div ref={(el) => { textRefs.current[i] = el }}>
                <p className="font-body font-semibold text-cream text-base mt-3">
                  {step.verb}
                </p>
                <p className="font-body text-cream/50 text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`
Check:
- [ ] Section has dark navy background — stands out from the cream section above
- [ ] "Three steps to your AI team" heading is cream-colored
- [ ] Three large numbers (01, 02, 03) are displayed horizontally on desktop
- [ ] Numbers have correct colors: 01=teal, 02=orange, 03=cream
- [ ] On first scroll-enter, numbers animate from 00 → target with scale effect
- [ ] Gradient underlines draw in from left
- [ ] Step verbs and descriptions fade up
- [ ] On mobile: stacks vertically with centered alignment
- [ ] Animation only fires once (doesn't re-trigger on scroll back up)

- [ ] **Step 3: Commit**

```bash
git add components/sections/Process.tsx
git commit -m "feat: rewrite Process as bold counter row on dark background

Dark navy section with oversized counter-animated numbers (00→01, 00→02,
00→03). Gradient underlines and text fade up on scroll-enter.
Mobile: vertical stack. Not pinned — fires once."
```

---

## Chunk 6: Final Verification & Cleanup

### Task 7: Full Page Scroll Test & Cleanup

**Files:**
- Possibly modify: any file with issues found during verification

- [ ] **Step 1: Full-page scroll test**

Run: `npm run dev` and scroll through the entire page top to bottom.

Check the complete scroll rhythm:
- [ ] **Navbar**: Logo is visibly larger (`text-xl`), nav links are `text-base`, CTA button has increased padding, nav height is taller
- [ ] **Hero** (Cream): Headline animates, terminal appears at bottom with typing effect
- [ ] **Workflow** (Navy, PINNED): Benefits highlight on scroll, code rain moves on the right
- [ ] **Services** (Cream, PINNED): Terminal types out scenario messages as you scroll
- [ ] **Process** (Navy): Counter numbers animate from 00 on scroll-enter
- [ ] **CTA** (Cream→Teal): Unchanged, still works correctly
- [ ] **Footer** (Navy): Unchanged, still works correctly

- [ ] **Step 2: Check section transitions**

- [ ] Workflow section pins and unpins cleanly (no jump/flash)
- [ ] Services section pins and unpins cleanly after Workflow
- [ ] Two consecutive pinned sections scroll smoothly without conflicts
- [ ] Lenis smooth scroll still works across all sections

- [ ] **Step 3: Responsive check**

Resize browser to mobile width (~375px):
- [ ] Navbar hamburger menu still works
- [ ] Hero terminal is readable on small screens
- [ ] Workflow: benefits stack vertically, code rain has fixed height
- [ ] Services: messages appear without typewriter, simple fade-up
- [ ] Process: counter row stacks vertically

- [ ] **Step 4: Reduced motion check**

Enable `prefers-reduced-motion: reduce` in browser devtools:
- [ ] All animations skip to end state
- [ ] Terminal shows all agents immediately
- [ ] Benefits all visible at full opacity
- [ ] Scenario messages all visible, no typewriter
- [ ] Counter numbers show final values

- [ ] **Step 5: TypeScript check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 6: Lint check**

Run: `npm run lint`
Expected: No lint errors (catches unused imports, style violations that `tsc` misses)

- [ ] **Step 7: Build check**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 8: Final commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix: address issues found during full-page scroll test"
```

- [ ] **Step 9: Summary commit message (if no fixes needed)**

If no fixes were needed in Steps 1-7, skip this step. All changes are already committed in Tasks 1-6.
