# Flowkart Section Redesign — Design Specification

> **Date:** 2026-03-14
> **Status:** Approved by user — ready for implementation planning
> **Scope:** 5 section-level changes to the existing Flowkart marketing website

---

## Overview

This spec covers redesigning 5 sections of the Flowkart website based on user feedback after initial implementation. The CTA section and Footer remain unchanged. All changes preserve the existing tech stack (Next.js 15, Tailwind CSS 4, GSAP 3.14 with ScrollTrigger, Lenis smooth scroll) and design system (color tokens, typography, animation timing).

### Changes Summary

| # | Section | Change | Complexity |
|---|---------|--------|------------|
| 1 | Navbar | Increase font sizes | Low |
| 2 | Hero Agent Ticker | Replace text cycle with Live Terminal | Medium |
| 3 | Agent Workflow (Page 2) | Benefits + Live Graph with OpenArt + Code Rain | High |
| 4 | Services (Page 3) | Full Scenario Replay terminal | High |
| 5 | Process (Page 4) | Bold Counter Row on dark background | Low-Medium |

### Page Scroll Rhythm (After Redesign)

```
Hero          — Cream (#FFECD1) — timeline animation + Live Terminal ticker
Workflow      — Navy (#001524) — PINNED — Benefits stack + OpenArt/Code Rain (scrub)
Services      — Cream Light (#FFF5E6) — PINNED — Scenario Replay terminal (scrub)
Process       — Navy (#001524) — Counter animation (scroll-enter, NOT pinned)
CTA           — Cream → Teal gradient transition (unchanged)
Footer        — Navy (#001524) (unchanged)
```

The alternating Cream/Navy rhythm creates strong section boundaries. Two consecutive pinned sections is intentional — they are visually distinct (abstract code visualization vs. realistic terminal scenario).

---

## 1. Navbar — Increased Font Sizes

### Current State
- Logo: `text-lg` (1.125rem), `font-semibold`
- Nav links: `text-sm` (0.875rem), `font-medium`
- CTA button: `text-sm`, padding `px-5 py-2.5`
- Navbar height: `h-16`

### New State
- Logo: `text-xl` (1.25rem), `font-semibold`
- Nav links: `text-base` (1rem), `font-medium`
- CTA button: `text-base`, padding `px-6 py-3`, `rounded-lg`
- Navbar height: `h-18` (4.5rem) or `h-20` if needed for breathing room

### Files Changed
- `components/layout/Header.tsx` — update className strings for logo, nav links, CTA button, and nav container height

### Constraints
- Mobile menu sizes remain unchanged (already `text-3xl` for links)
- Scrolled state backdrop blur and border remain the same
- Link gap may need slight increase (`gap-8` → `gap-10`) to accommodate larger text

---

## 2. Hero Agent Ticker → Live Terminal

### Current State
A flat inline text cycle: `Research → Marketing → Finance → Outreach → Development → Copywriting` with opacity-based highlighting that rotates every 2 seconds.

### New Design
A dark mini-terminal panel embedded at the bottom of the hero section. It simulates agents booting up and processing a task.

### Visual Structure
```
┌─────────────────────────────────────────────┐
│ ● ● ●   flowkart-agent-system               │  ← window chrome (macOS dots)
│─────────────────────────────────────────────│
│ $ flowkart deploy --team marketing           │  ← typewriter command
│                                              │
│ ● Research Agent      analyzing market...    │  ← active (green dot, full opacity)
│ ◐ Marketing Agent     waiting for research   │  ← waiting (orange dot, 50% opacity)
│ ○ Copywriter Agent    queued                 │  ← queued (dim dot, 30% opacity)
│ ○ Outreach Agent      queued                 │
└─────────────────────────────────────────────┘
```

### Animation Behavior
1. Terminal panel fades in at `1.8s` in the hero GSAP timeline (same timing as current ticker)
2. Window chrome (three dots + title) appears instantly
3. Command line types out character by character (typewriter effect, ~0.8s total)
4. Agents appear one by one with `0.4s` stagger:
   - Each agent starts as `○ queued` (30% opacity, dim color)
   - Transitions to `◐ waiting` (orange dot, 50% opacity) when the agent before it activates
   - Transitions to `● active` (green dot, full opacity, teal status text) when it's "working"
5. Status text updates dynamically (e.g., "analyzing market data..." → "3 gaps found ✓")
6. After all agents cycle through, the terminal resets and loops with a different command:
   - Cycle 1: `--team marketing`
   - Cycle 2: `--team sales`
   - Cycle 3: `--team content`
7. Full loop duration: ~10 seconds

### Technical Implementation
- Replace `AgentTicker` component entirely (same ref name `tickerRef` for hero timeline integration)
- Use GSAP timeline for the typing + agent status transitions
- Use `setInterval` for the loop cycling (same pattern as current ticker)
- Terminal container: `max-w-md mx-auto`, dark background `bg-navy`, `rounded-xl`, `shadow-2xl`
- Monospace font throughout (`font-mono`)
- Respect `reducedMotion`: show terminal fully populated, no typing animation

### Content Data
Add to `lib/constants.ts`:
```typescript
export const TERMINAL_COMMANDS = [
  { command: 'flowkart deploy --team marketing', agents: ['Research', 'Marketing', 'Copywriter', 'Outreach'] },
  { command: 'flowkart deploy --team sales', agents: ['Research', 'Finance', 'Outreach', 'Copywriter'] },
  { command: 'flowkart deploy --team content', agents: ['Research', 'Copywriter', 'Marketing', 'Development'] },
] as const

export const AGENT_STATUSES = {
  queued: { symbol: '○', color: 'text-sienna/40', label: 'queued' },
  waiting: { symbol: '◐', color: 'text-orange', label: 'waiting' },
  active: { symbol: '●', color: 'text-green-400', label: '' }, // label is dynamic
} as const
```

### Files Changed
- `components/sections/Hero.tsx` — replace `AgentTicker` sub-component
- `lib/constants.ts` — add `TERMINAL_COMMANDS` and `AGENT_STATUSES`

---

## 3. Agent Workflow → Benefits + Live Graph (OpenArt + Code Rain)

### Current State
Horizontal flow of 6 nodes (Business Problem → Research → Marketing → Copywriter → Outreach → Results) with pinned scroll animation revealing nodes sequentially.

### New Design
A dark navy pinned section with a split layout:
- **Left (60%):** Benefits stack — 4 benefit blocks that highlight sequentially on scroll
- **Right (40%):** OpenArt abstract background image with animated code rain overlay

### Section Header
```
Overline:  "POWERED BY LANGCHAIN & LANGGRAPH"
Headline:  "Agents that think, communicate, and adapt"
```

### Benefits Stack (Left Side)
4 benefit blocks, each with:
- Colored left border (3px)
- Monospace uppercase category label
- Bold headline
- Body description (1-2 sentences)

| # | Category | Headline | Border Color |
|---|----------|----------|--------------|
| 1 | Reasoning | They break problems down | Teal (#15616D) |
| 2 | Communication | They share what they learn | Orange (#FF7D00) |
| 3 | Adaptation | They evolve with your business | Cream (#FFECD1) |
| 4 | Custom Teams | Built around your workflows | Teal (#15616D) |

**Benefit copy:**
1. **Reasoning:** "LangGraph's stateful architecture lets agents decompose complex goals into sub-tasks — evaluating options the way a senior strategist would."
2. **Communication:** "Real-time message passing means zero information silos. Every agent sees what others discover — decisions are made with full context."
3. **Adaptation:** "Graph-based orchestration means adding, removing, or re-routing agents as your needs change. Your AI team scales with your business."
4. **Custom Teams:** "Not a template — a bespoke agent system designed around your specific business processes and workflows."

### Right Side: OpenArt Background + Code Rain

**Background layer:**
- OpenArt-generated abstract image (user already generated this — dark navy with flowing teal + orange energy streams, geometric network shapes, bokeh particles)
- Applied as `background-image` on a container div
- `background-size: cover`, `background-position: center`
- `opacity: 0.5` (adjustable during implementation)
- Image file: `public/images/workflow-bg.webp` (user provides from OpenArt export)

**Code rain overlay:**
- Positioned absolutely on top of the OpenArt background
- Monospace text lines scrolling upward continuously
- Lines represent agent function calls:
  ```
  agent.research() → insights[3]
  pipe(insights) → marketing
  agent.strategize(gaps)
  emit("draft_ready")
  agent.distribute()
  graph.route(node_5, node_2)
  agent.analyze(competitors)
  state.update("strategy_v2")
  ```
- Text color: `text-teal/40` base, shifting to `text-teal/70` when corresponding benefit highlights
- GSAP-animated `y` translation for continuous upward scroll
- Gradient mask at top and bottom (fade to transparent) so lines don't appear/disappear abruptly

### Scroll Behavior
- Section pins at viewport top via ScrollTrigger
- Total scrub distance: `+=300%` (3 viewport heights of scroll)
- Scroll progress mapped to 4 stages:
  - **0-25%:** Benefit #1 (Reasoning) at full opacity, others at 30% opacity. Code rain at normal speed.
  - **25-50%:** Benefit #2 (Communication) highlights. Code rain speed increases slightly.
  - **50-75%:** Benefit #3 (Adaptation) highlights. Code rain lines shift/rearrange.
  - **75-100%:** Benefit #4 (Custom Teams) highlights. All code lines brighten.
- Section unpins after 100%

### Mobile Behavior (< 768px)
- Stack vertically: benefits on top, OpenArt + code rain below
- No pinning — standard scroll reveals for each benefit block
- Code rain container has fixed height (~200px) with the same upward animation (time-based, not scroll-based on mobile)

### Files Changed
- `components/sections/AgentWorkflow.tsx` — complete rewrite
- `lib/constants.ts` — replace `WORKFLOW_NODES` with `WORKFLOW_BENEFITS` and `CODE_RAIN_LINES`
- `public/images/workflow-bg.webp` — new asset (user provides)

---

## 4. Services → Full Scenario Replay

### Current State
"Six agents. One mission." heading with a 6-card grid showing each agent's name, icon, and description.

### New Design
A pinned scroll section with a dark terminal panel showing agents collaborating on a real business task. A user prompt triggers sequential agent responses with typewriter effects.

### Section Header
```
Overline:  "SEE IT IN ACTION"
Headline:  "Watch your AI team work"
```

### Terminal Panel
Dark panel centered on cream-light background. macOS-style window chrome at top.

**Scenario script:**
```
[You]       "Launch a product campaign for our new SaaS tool"

[Research]  Analyzed 12 competitors in the productivity space.
            Found 3 positioning gaps.
            Strongest opportunity: "automation for solo founders" ✓

[Marketing] Targeting gap #2. Audience: founders with <5 employees.
            Channel mix: LinkedIn ads + 5-part email sequence.
            Projected reach: 12,000 qualified leads →

[Copywriter] Drafting landing page headline + hero copy.
             3 email variants for A/B testing.
             Tone: confident, concise, founder-friendly ✓

[Outreach]  LinkedIn campaign live — 3 ad variants.
            Email sequence scheduled — sends over 14 days.
            Tracking: UTM tags + conversion pixels active ✓

[Results]   Campaign launched in 4 minutes.
            5 agents. Zero handoff delays.
```

### Agent Strip
Below the terminal, a horizontal row of 6 agent icons (small rounded squares with single-letter labels). The currently "speaking" agent glows with a box-shadow. Completed agents dim to 30% opacity. Upcoming agents use muted tan background.

### Scroll Behavior
- Section pins at viewport top
- Total scrub distance: `+=250%`
- Scroll progress mapped to message reveals:
  - **0-10%:** User prompt types out
  - **10-30%:** Research agent response types out, Research icon glows in agent strip
  - **30-50%:** Marketing agent response types out
  - **50-70%:** Copywriter agent response types out
  - **70-85%:** Outreach agent response types out
  - **85-100%:** Results summary fades in, all icons glow briefly
- Section unpins

### Typewriter Implementation
- Each message is a string split into characters
- GSAP `textContent`-based approach or clip-path reveal
- Scrub-linked: scroll position determines how many characters are visible
- Cursor character (`▊`) follows the typing position

### Mobile Behavior (< 768px)
- No pinning — terminal panel is static
- Messages reveal one at a time on scroll-enter (standard ScrollReveal fade-up)
- No typewriter effect on mobile — messages appear in full
- Agent strip wraps to 2 rows of 3

### Files Changed
- `components/sections/Services.tsx` — complete rewrite
- `lib/constants.ts` — add `SCENARIO_MESSAGES` data array
- Remove dependency on `Card` component (no longer used in this section)

---

## 5. Process → Bold Counter Row

### Current State
Vertical timeline with numbered circles (01, 02, 03), each with a title and description. Alternating left/right scroll reveals.

### New Design
Dark navy section with three oversized numbers in a horizontal row. Counter-animated on scroll-enter. Minimal text.

### Section Header
```
Overline:  "HOW IT WORKS"
Headline:  "Three steps to your AI team"
```
Both in cream/light colors against the dark background.

### Counter Layout
```
         01                    02                    03
    ──────────            ──────────            ──────────
     Discover               Design               Deploy

  We learn your         We architect your      Your AI team goes
  business and          custom multi-agent     live. We monitor,
  where AI helps.       system for you.        tune, and scale.
```

### Visual Details
- Numbers: `clamp(3rem, 2rem + 4vw, 5rem)` — very large, Clash Display font
- Number colors: 01 = Teal (#15616D), 02 = Orange (#FF7D00), 03 = Cream (#FFECD1)
- Gradient underline below each number (color → transparent, `48px` wide, `2px` tall)
- Step verb: `text-base`, `font-semibold`, cream color
- Description: `text-sm`, cream color at 50% opacity, `max-w-[180px]` per column
- Section background: Navy (#001524)
- Section padding: generous (`py-32`) for breathing room

### Optional: OpenArt Background Glow
If the user generates the Process section OpenArt image (three soft glowing orbs), apply it as:
- `background-image` on the section
- `background-size: cover`, `opacity: 0.3-0.5`
- The three orbs roughly align behind the three numbers

### Animation
- On scroll-enter (ScrollTrigger, `start: 'top 80%'`):
  1. Numbers counter-animate from `00` → `01`, `00` → `02`, `00` → `03` using GSAP `snap` tween
  2. Numbers scale from `0.85` → `1.0` simultaneously
  3. Stagger: `0.2s` between each number
  4. Gradient underlines draw in from left (width `0` → `48px`)
  5. Step name and description fade up (`opacity: 0, y: 15` → `opacity: 1, y: 0`)
- NOT pinned — fires once on scroll-enter, standard trigger

### Mobile Behavior (< 768px)
- Stack vertically with each step centered
- Generous spacing between steps (`gap-16`)
- Same counter animation, vertical stagger

### Files Changed
- `components/sections/Process.tsx` — complete rewrite
- `lib/constants.ts` — update `PROCESS_STEPS` to include short verb labels (`Discover`, `Design`, `Deploy`)
- `public/images/process-bg.webp` — optional asset (user provides from OpenArt)

---

## OpenArt Assets

All assets are static images (no video). User generates via OpenArt Advanced plan.

| # | Placement | Status | File Path | Opacity | Notes |
|---|-----------|--------|-----------|---------|-------|
| 1 | Workflow background | Generated ✓ | `public/images/workflow-bg.webp` | 0.4-0.6 | Right side of split layout only |
| 2 | Hero ambient texture | Optional | `public/images/hero-texture.webp` | 0.15-0.25 | Full-bleed behind hero, extremely subtle |
| 3 | Process section glow | Optional | `public/images/process-glow.webp` | 0.3-0.5 | Three orbs behind counter numbers |
| 4 | CTA section accent | Optional | `public/images/cta-accent.webp` | 0.2-0.4 | Teal area, `mix-blend-mode: soft-light` |

### Image Optimization
- Export from OpenArt as PNG, then convert to WebP
- Target file sizes: < 200KB per image after WebP compression
- Use `next/image` with `priority={false}` and `loading="lazy"` for all except hero texture
- Hero texture: `priority={true}` if used (above the fold)

---

## Accessibility Considerations

- **Live Terminal (Hero):** Add `aria-label` describing the terminal animation. Include `sr-only` text equivalent: "AI agents processing a marketing task — Research, Marketing, Copywriter, and Outreach agents collaborating."
- **Code Rain (Workflow):** Mark as `aria-hidden="true"` — purely decorative.
- **Scenario Replay (Services):** Full text content is in the DOM (just visually hidden before scroll reveal). Screen readers get the complete scenario without animation.
- **Counter Animation (Process):** Use `aria-label` on each number showing the final value. Counter tween is visual only.
- **Reduced motion:** All GSAP animations skip to end state. Typewriter effects show full text immediately. Code rain is static. Counter shows final numbers without animation.
- **OpenArt backgrounds:** All decorative, all `aria-hidden="true"`.

---

## Performance Considerations

- Two pinned ScrollTrigger sections (Workflow + Services) — test for smooth scrub on mid-range devices
- Code rain: limit to ~8-10 visible lines at a time, recycle DOM nodes (don't create new ones)
- Typewriter in Services: use GSAP `textContent` approach (no DOM manipulation per character)
- OpenArt images: lazy-load all except hero texture, use WebP format
- Test total page weight — target < 1.5MB first load including all images
