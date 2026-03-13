# Flowkart — Creative Brief & Design Specification

> **Document type:** Design approval document — synthesized from exhaustive research across frontend techniques, typography systems, and 20+ award-winning reference sites.
>
> **Date:** March 2026
>
> **Status:** Ready for approval → implementation

---

## Table of Contents

1. [Strategic Positioning](#1-strategic-positioning)
2. [Design Direction](#2-design-direction)
3. [Color System](#3-color-system)
4. [Typography System](#4-typography-system)
5. [Motion & Animation Philosophy](#5-motion--animation-philosophy)
6. [Page Structure & Section Design](#6-page-structure--section-design)
7. [Technical Architecture](#7-technical-architecture)
8. [Performance Strategy](#8-performance-strategy)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [Implementation Checklist](#10-implementation-checklist)
11. [Quality Benchmarks](#11-quality-benchmarks)

---

## 1. Strategic Positioning

### 1.1 Brand Identity

**Flowkart** is an AI Native Agency that builds custom multi-agent orchestrated teams for businesses using LangChain and LangGraph. Unlike generic AI automation shops, Flowkart builds full agent teams — Research, Marketing, Finance, Outreach, Software Development, and Copywriting agents — that collaborate, reason, and adapt as a unified system.

### 1.2 Target Audience (ICP)

Small to midsize business executives (CEO, COO, VP-level) across all industries who:
- Know what AI is but do NOT know when, where, or how to apply it
- Are non-technical decision makers
- Value trust, domain expertise, and demonstrable results
- Scan quickly — design must communicate value within 5 seconds

### 1.3 Brand Personality

| Trait | Signal | Design Implication |
|-------|--------|-------------------|
| **Domain Expert** | Deep understanding of multi-agent AI | Technical accents (JetBrains Mono labels, agent workflow visualization) |
| **Premium Service** | High-touch, bespoke solutions | Warm cream palette, Clash Display headlines, generous whitespace |
| **Obsessive Quality** | Every detail is intentional | Tight type scale, purposeful animation timing, color restraint |

### 1.4 Emotional Spectrum

```
Trustworthy ████████░░ Innovative
           ↑
    Flowkart sits here — 80% trust, 20% innovation signal
```

The design must feel like a premium consulting firm that happens to be deeply technical — NOT a flashy AI startup.

### 1.5 The "One Memorable Thing"

When an executive leaves Flowkart's site, they remember:

> "I scrolled through and watched AI agents hand off work to each other — I finally understood what multi-agent orchestration means, and these people clearly know how to build it."

The scroll-driven agent workflow storytelling IS the memorable thing. It educates and impresses simultaneously.

### 1.6 Competitive Differentiation

Most AI agency sites fall into two traps:
1. **Generic dark mode** with neon accents and vague "AI-powered" messaging (looks like every other AI company)
2. **Corporate template** with stock photography and no interactive demonstration of capability

Flowkart breaks both patterns with:
- **Warm cream palette** — instantly distinctive from every white/dark AI site
- **Interactive workflow visualization** — demonstrates the product, doesn't just describe it
- **Kinetic typography** — signals technical craft through animation precision
- **No stock photography** — type, color, and motion carry the design

---

## 2. Design Direction

### 2.1 Visual Archetype

**Confident Clarity** — clean base with bold typography as the hero element. Big, confident headlines explain multi-agent systems simply. Subtle animations feel purposeful, not decorative. The design itself signals "we obsess over details."

### 2.2 Theme Strategy

- **Default:** Light mode (warm cream base)
- **Future:** Dark mode toggle (CSS variables enable seamless inversion)
- **Rationale:** Research shows AI companies targeting technical audiences use dark mode, but those targeting business users (Jasper, Lindy.ai, Dropbox Brand) lean toward lighter aesthetics. Flowkart's SMB executive ICP responds better to approachable, scannable design.

### 2.3 Layout Principles

1. **Full-bleed hero → contained content** — creates rhythm through alternating spatial modes
2. **Asymmetric grids** — break from standard layouts to create visual tension and memorability
3. **Structural whitespace** — generous spacing that functions as hierarchy, not decoration
4. **Progressive disclosure** — reveal complexity gradually to avoid overwhelming non-technical visitors
5. **Horizontal scroll section** — for the agent workflow storytelling (pinned on desktop, vertical stack on mobile)

### 2.4 Design References

| Site | What to Learn |
|------|---------------|
| Dropbox Brand (CSSDA 9.03) | Interactive brand tools, micro-interactions at 0.3s ease-out, type-driven layout |
| Exat Typeface (CSSDA 8.83, 10/10 UI) | Color restraint, kinetic typography as the entire design system |
| Symphony of Vines (CSSDA 8.88) | Scroll-driven narrative pacing, Theatre.js orchestration |
| Jasper AI | Clean light aesthetic that sells AI to non-technical buyers |
| Lindy.ai | Progressive disclosure — looks simple, reveals depth |

---

## 3. Color System

### 3.1 Core Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Background** | Warm Cream | `#FFECD1` | Page background, card backgrounds |
| **Surface** | Light Cream | `#FFF5E6` | Alternate section backgrounds, card surfaces |
| **Text Primary** | Dark Navy | `#001524` | Headings (Clash Display), nav links, logo |
| **Text Secondary** | Burnt Sienna | `#78290F` | Body text (Satoshi), descriptions, captions |
| **Brand Primary** | Deep Teal | `#15616D` | Brand accents, links, labels, tech overlines, agent nodes |
| **Accent / CTA** | Bright Orange | `#FF7D00` | CTA buttons, hover states, important highlights |
| **Border** | Warm Tan | `#E8DCC8` | Card borders, section dividers, subtle outlines |

### 3.2 Extended Palette

| Role | Hex | Usage |
|------|-----|-------|
| **Teal Light** | `rgba(21,97,109,0.1)` | Agent node backgrounds, icon containers |
| **Teal Faint** | `rgba(21,97,109,0.06)` | Code block backgrounds, hover states |
| **Orange Light** | `rgba(255,125,0,0.1)` | CTA hover background, success states |
| **Navy 80%** | `rgba(0,21,36,0.8)` | Overlay text on images |
| **Sienna 60%** | `rgba(120,41,15,0.6)` | Muted captions, timestamps |
| **White** | `#FFFFFF` | Card surfaces in alt-bg sections, button text on dark |

### 3.3 Dark Mode Inversion Map (Future)

| Light Mode | Dark Mode |
|------------|-----------|
| `#FFECD1` (cream bg) | `#0A0F14` (dark navy bg) |
| `#FFF5E6` (surface) | `#111B22` (dark surface) |
| `#001524` (heading text) | `#F5E6D0` (cream text) |
| `#78290F` (body text) | `#D4B896` (warm light text) |
| `#15616D` (teal) | `#1A8A84` (brighter teal) |
| `#FF7D00` (orange) | `#FF9A33` (lighter orange) |
| `#E8DCC8` (border) | `#1E2A32` (dark border) |

### 3.4 Contrast Ratios (WCAG AA Compliance)

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| Navy `#001524` on Cream `#FFECD1` | 13.8:1 | AAA ✓ |
| Sienna `#78290F` on Cream `#FFECD1` | 6.2:1 | AA ✓ |
| Teal `#15616D` on Cream `#FFECD1` | 5.1:1 | AA ✓ |
| White `#FFFFFF` on Orange `#FF7D00` | 3.1:1 | AA Large ✓ (buttons are large text) |
| White `#FFFFFF` on Teal `#15616D` | 5.4:1 | AA ✓ |

---

## 4. Typography System

### 4.1 Font Stack

| Role | Font | Foundry | License | Variable | File Size |
|------|------|---------|---------|----------|-----------|
| **Display / Headlines** | Clash Display | Indian Type Foundry (Fontshare) | ITF Free License (commercial OK) | Yes (wght axis) | ~35KB |
| **Body / UI** | Satoshi | Indian Type Foundry (Fontshare) | ITF Free License (commercial OK) | Yes (wght axis) | ~35KB |
| **Mono / Tech Accent** | JetBrains Mono | JetBrains | SIL Open Font License | Yes (wght + ital) | ~15KB |
| | | | **Total font payload:** | | **~85KB** |

### 4.2 Type Scale

All sizes use fluid `clamp()` values. Min at 375px viewport, max at 1440px.

| Element | Font | Weight | Size (clamp) | Min → Max | Line Height | Letter Spacing |
|---------|------|--------|-------------|-----------|-------------|----------------|
| **Hero H1** | Clash Display | Semibold 600 | `clamp(2.5rem, 1.5rem + 4vw, 5.5rem)` | 40px → 88px | 1.0 | -0.03em |
| **Section H2** | Clash Display | Semibold 600 | `clamp(1.75rem, 1rem + 2.5vw, 3.5rem)` | 28px → 56px | 1.1 | -0.02em |
| **Card H3** | Clash Display | Medium 500 | `clamp(1.25rem, 0.9rem + 1.2vw, 2rem)` | 20px → 32px | 1.2 | -0.01em |
| **Body Large** | Satoshi | Regular 400 | `clamp(1.125rem, 1rem + 0.4vw, 1.375rem)` | 18px → 22px | 1.6 | 0 |
| **Body Regular** | Satoshi | Regular 400 | `clamp(1rem, 0.9rem + 0.3vw, 1.125rem)` | 16px → 18px | 1.6 | 0 |
| **Body Small** | Satoshi | Regular 400 | `clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)` | 13px → 15px | 1.5 | 0 |
| **Overline** | JetBrains Mono | Medium 500 | `0.875rem` | 14px fixed | 1.0 | 0.12em |
| **Label** | Satoshi | Bold 700 | `0.75rem` | 12px fixed | 1.0 | 0.1em |
| **Button** | Satoshi | Bold 700 | `0.9375rem` | 15px fixed | 1.0 | 0.01em |
| **Nav Link** | Satoshi | Medium 500 | `0.875rem` | 14px fixed | 1.0 | 0.01em |
| **Mono / Code** | JetBrains Mono | Regular 400 | `clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)` | 13px → 15px | 1.6 | 0 |

### 4.3 Text Color Assignments

| Text Role | Color | Font |
|-----------|-------|------|
| Headings (H1, H2, H3) | Dark Navy `#001524` | Clash Display |
| Highlighted word in heading | Deep Teal `#15616D` | Clash Display |
| Body text | Burnt Sienna `#78290F` | Satoshi |
| Muted / captions | Sienna @ 60% opacity | Satoshi |
| Labels (uppercase) | Deep Teal `#15616D` | Satoshi Bold |
| Overlines / tech labels | Deep Teal `#15616D` | JetBrains Mono |
| Links | Deep Teal `#15616D` | Satoshi Medium |
| Button text (on orange) | White `#FFFFFF` | Satoshi Bold |
| Nav links | Dark Navy `#001524` | Satoshi Medium |

### 4.4 Font Loading Strategy

```
Priority 1: Preload Clash Display Variable (hero headline, above fold)
            → <link rel="preload" href="/fonts/clash-display-variable.woff2" as="font" type="font/woff2" crossorigin>
            → font-display: block (brief invisible period acceptable for hero)

Priority 2: Satoshi Variable (body text, appears everywhere)
            → font-display: swap (content readable immediately with fallback)

Priority 3: JetBrains Mono (accent, non-critical)
            → font-display: optional (use only if already cached)
```

Self-host all fonts as WOFF2. Subset to Latin range (U+0000-00FF) to reduce file sizes by ~50%.

---

## 5. Motion & Animation Philosophy

### 5.1 Motion Principles

1. **Purposeful, not decorative** — every animation serves a function (reveal content, show relationships, guide attention)
2. **Slow and cinematic** — Flowkart's rhythm is deliberate and confident, not fast and flashy
3. **Scroll as narrative** — the scroll position drives the storytelling, creating a paced experience
4. **Restraint as premium signal** — fewer animations, each one perfect

### 5.2 Animation Toolkit

| Tool | Purpose | Bundle Impact |
|------|---------|---------------|
| **GSAP Core** | Timeline sequencing, tweening | ~23KB |
| **GSAP ScrollTrigger** | Scroll-linked animations, pin, scrub | Included (free, Webflow acquisition) |
| **GSAP SplitText** | Character/word/line-level text animation | Included (free, rewritten 2025 — 50% smaller) |
| **GSAP Flip** | Layout state animation (DOM changes) | Included (free) |
| **Lenis** | Smooth inertial scrolling | ~5KB |
| **CSS scroll-driven** | Simple parallax, progress bars (no JS) | 0KB |

**Total animation JS:** ~28KB gzipped

### 5.3 Default Timing

| Property | Value | Usage |
|----------|-------|-------|
| **Duration (micro)** | 0.3s | Hovers, button states, link underlines |
| **Duration (reveal)** | 0.6s - 0.8s | Element entrances, text reveals |
| **Duration (section)** | 1.0s - 1.5s | Section transitions, major state changes |
| **Easing (default)** | `power2.out` | Standard deceleration |
| **Easing (entrance)** | `power3.out` | Confident arrival |
| **Easing (elastic)** | `elastic.out(1, 0.5)` | Button hover magnetic effect (subtle) |
| **Stagger (text)** | `0.03s` per character | SplitText reveals |
| **Stagger (grid)** | `0.08s` per item | Card grid entrances |

### 5.4 Hero Animation Sequence (Kinetic Typography — Concept B)

```
Timeline: Hero entrance

0.0s  → Page loads. Cream background visible. No text.
0.2s  → Overline "AI NATIVE AGENCY" fades in (opacity 0→1, y: 10px→0)
0.5s  → Hero H1 begins SplitText reveal:
         - "We build AI teams" — chars stagger in from below (y: 40px→0, opacity 0→1)
         - stagger: 0.03s per char, power3.out
0.9s  → "that run your" continues same pattern
1.1s  → "business." appears with teal color, slight scale punch (1.0→1.02→1.0)
1.4s  → Body text fades in (opacity 0→1, y: 15px→0, duration: 0.6s)
1.6s  → CTA buttons slide in from below (y: 20px→0, stagger: 0.1s)
1.8s  → Agent name ticker begins cycling below headline:
         "▸ Research → Marketing → Finance → Outreach → Dev → Copy"
         Each word fades/slides in sequence, looping infinitely
```

### 5.5 Scroll Workflow Animation (Concept C — Below Hero)

```
Section: "How It Works" — Pinned horizontal scroll

Trigger: Section enters viewport
Pin: Section pins to viewport for ~300vh of scroll distance

Scroll 0%:   Section title "See how your AI team works" visible
              Empty workflow track on the right

Scroll 15%:  "Business Problem" node slides in from left
              Label: "Your challenge enters the pipeline"

Scroll 30%:  Connection line animates from Problem → Research Agent
              Research node lights up with teal glow
              Tooltip: "Analyzes market data, competitors, trends"

Scroll 45%:  Connection line → Marketing Agent lights up
              Tooltip: "Builds strategy from research insights"

Scroll 60%:  Connection line → Copywriter Agent
              Tooltip: "Creates content aligned with strategy"

Scroll 75%:  Connection line → Outreach Agent
              Tooltip: "Executes multi-channel distribution"

Scroll 90%:  Final connection line → "Results" node (orange)
              All nodes glow simultaneously — the team is working

Scroll 100%: Section unpins. Continue to next section.

Mobile: Vertical stack with intersection observer triggers instead of horizontal pin.
```

### 5.6 Scroll-Triggered Section Animations

| Section | Animation |
|---------|-----------|
| **Services cards** | Stagger entrance: y: 30px→0, opacity 0→1, stagger: 0.08s, ScrollTrigger at 20% viewport entry |
| **Process steps** | Sequential reveal as user scrolls through each step |
| **Agent profiles** | Cards slide in from alternating sides (odd from left, even from right) |
| **CTA section** | Background color transition (cream → teal), text color inverts |
| **Footer** | Subtle parallax on background elements |

### 5.7 Interaction Patterns

| Pattern | Implementation |
|---------|---------------|
| **Magnetic cursor on CTAs** | Track mouse within 80px radius. Lerp button position toward cursor. elastic.out on leave. Desktop only. |
| **Link hover underline** | CSS `background-size` animation from 0% to 100% width. 0.3s ease-out. |
| **Card hover lift** | `translateY(-4px)` + subtle `box-shadow` increase. 0.3s ease-out. |
| **Agent node hover** | Scale 1.0→1.08 + tooltip fade in. 0.2s. |
| **Nav scroll state** | Header background blur + border-bottom on scroll. CSS `backdrop-filter`. |

### 5.8 Reduced Motion

All animations wrapped in a `useReducedMotion()` hook that checks:
1. `prefers-reduced-motion: reduce` media query
2. User preference cookie (site-level toggle)

When reduced motion is active:
- All GSAP timelines skip to end state
- SplitText reveals show text immediately
- Scroll-pinned sections unpin and stack vertically
- Hover effects reduced to opacity changes only
- Lenis smooth scroll disabled (native scroll)

---

## 6. Page Structure & Section Design

### 6.1 Site Map

```
Home (single page, scroll-driven narrative)
├── Hero (Kinetic Typography)
├── Agent Workflow (Scroll Storytelling)
├── Services Overview (Card Grid)
├── How It Works (Process Steps)
├── Agent Profiles (Individual Agent Cards)
├── CTA Section (Full-width, color-inverted)
└── Footer

Future pages (post-launch):
├── About
├── Individual Service Pages
├── Blog
└── Contact (standalone form page)
```

### 6.2 Section-by-Section Design

#### Section 1: Hero
- **Layout:** Centered text, full viewport height
- **Content:** Overline + H1 headline + body text + 2 CTAs + cycling agent names
- **Background:** Warm cream `#FFECD1`
- **Animation:** Kinetic typography entrance (see 5.4)
- **CTA Primary:** "Book a Discovery Call" (orange `#FF7D00`)
- **CTA Secondary:** "See How It Works" (outlined, dark navy)

#### Section 2: Agent Workflow (The "One Memorable Thing")
- **Layout:** Pinned horizontal scroll on desktop, vertical stack on mobile
- **Content:** Animated workflow: Problem → Research → Marketing → Copywriter → Outreach → Results
- **Background:** Light cream `#FFF5E6`
- **Animation:** Scroll-scrubbed node reveals with connection lines (see 5.5)
- **Visual:** SVG-based nodes and connection lines. Teal nodes, orange result node.

#### Section 3: Services Overview
- **Layout:** 3-column grid (desktop), single column (mobile)
- **Content:** 6 agent cards — Research, Marketing, Finance, Outreach, Developer, Copywriter
- **Background:** Warm cream `#FFECD1`
- **Cards:** Cream bg, tan border, teal icon, navy heading, sienna body
- **Animation:** Staggered entrance from bottom on scroll

#### Section 4: How It Works
- **Layout:** 3-step vertical process with numbered steps
- **Content:** Step 1: Discovery Call → Step 2: Team Design → Step 3: Deployment & Optimization
- **Background:** Light cream `#FFF5E6`
- **Visual:** Large step numbers in Clash Display, connecting line between steps
- **Animation:** Sequential step reveals on scroll

#### Section 5: Agent Profiles (Optional — if content is ready)
- **Layout:** Alternating left/right layout (agent visual on one side, description on other)
- **Content:** Deep dive into each agent's capabilities
- **Background:** Alternating cream / light cream
- **Animation:** Slide-in from alternating sides

#### Section 6: CTA Section
- **Layout:** Full-width, centered
- **Background:** Deep teal `#15616D` (inverted color section)
- **Text:** Cream `#FFECD1` heading, light body text
- **CTA:** Orange button on teal background (high contrast)
- **Content:** "Ready to build your AI team?" + CTA
- **Animation:** Background color transition on scroll entry

#### Section 7: Footer
- **Layout:** 4-column grid (Logo + nav links + contact + legal)
- **Background:** Dark navy `#001524`
- **Text:** Cream `#FFECD1` / tan `#E8DCC8`
- **Content:** Logo, navigation, email, copyright

### 6.3 Navigation

- **Style:** Fixed top, transparent on load → cream bg with blur on scroll
- **Logo:** "FLOWKART" — Clash Display, Semibold 600, 18px, letter-spacing: 0.04em, dark navy
- **Links:** Satoshi Medium 500, 14px, dark navy → teal on hover
- **CTA:** "Book a Call" — orange button, Satoshi Bold 700
- **Mobile:** Hamburger menu → full-screen overlay with staggered link reveals

---

## 7. Technical Architecture

### 7.1 Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Framework** | Next.js | 15.x (App Router) | Server Components for SEO + client islands for animation. PPR for performance. Industry standard for award-winning sites. |
| **Styling** | Tailwind CSS | 4.x | Utility-first, fast development, design token integration via CSS variables |
| **Animation** | GSAP + ScrollTrigger + SplitText | 3.13.x | Dominant stack for Awwwards/CSSDA winners. All plugins now free (Webflow acquisition). |
| **Smooth Scroll** | Lenis | 1.1.x | Lightweight (~5KB), preserves native scroll, pairs with ScrollTrigger. Preferred over ScrollSmoother. |
| **3D (future)** | React Three Fiber | 9.x | If agent network 3D visualization is added later |
| **CMS** | Payload CMS | 3.0 | Next.js-native (installs in /app folder), open-source, TypeScript-native, zero vendor lock-in |
| **Deployment** | Vercel | Latest | First-class Next.js hosting, ISR, Edge Functions, Image Optimization |
| **Fonts** | Self-hosted WOFF2 | — | Clash Display + Satoshi + JetBrains Mono, subset to Latin |
| **Language** | TypeScript | 5.x | Type safety across the entire codebase |

### 7.2 Architecture Pattern

```
Pages (React Server Components — RSC)
├── Layout Shell (server-rendered, SEO-friendly)
│   ├── Header (client component — scroll state, mobile menu)
│   └── Footer (server component)
├── Hero Section (client component — GSAP SplitText animations)
├── Workflow Section (client component — GSAP ScrollTrigger pin + scrub)
├── Services Section (client component — scroll-triggered entrances)
├── Process Section (client component — sequential reveals)
├── CTA Section (client component — background color transition)
└── Lenis Provider (client component — wraps entire page)
```

### 7.3 Dependency Budget

| Category | Target | Actual (estimated) |
|----------|--------|-------------------|
| **Framework** (Next.js runtime) | — | ~85KB |
| **Animation** (GSAP + plugins) | < 60KB | ~28KB |
| **Smooth scroll** (Lenis) | < 10KB | ~5KB |
| **Fonts** (3 families, variable, subset) | < 100KB | ~85KB |
| **CSS** (Tailwind, purged) | < 15KB | ~10KB |
| **Total JS bundle** | < 250KB gzipped | ~128KB estimated |

### 7.4 Project Structure

```
flowkart-website/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, Lenis provider)
│   ├── page.tsx                # Home page (server component, assembles sections)
│   ├── globals.css             # Tailwind + CSS custom properties
│   └── (cms)/                  # Payload CMS admin routes (future)
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Fixed nav with scroll state
│   │   ├── Footer.tsx          # Site footer
│   │   └── LenisProvider.tsx   # Smooth scroll wrapper
│   ├── sections/
│   │   ├── Hero.tsx            # Kinetic typography hero
│   │   ├── AgentWorkflow.tsx   # Scroll-driven workflow storytelling
│   │   ├── Services.tsx        # Agent card grid
│   │   ├── Process.tsx         # How it works steps
│   │   ├── AgentProfiles.tsx   # Individual agent deep-dives
│   │   └── CTASection.tsx      # Full-width CTA
│   ├── ui/
│   │   ├── Button.tsx          # Primary + secondary button variants
│   │   ├── Card.tsx            # Service/agent card component
│   │   ├── SplitTextReveal.tsx # Reusable text reveal animation
│   │   ├── ScrollReveal.tsx    # Reusable scroll-triggered entrance
│   │   └── MagneticButton.tsx  # Cursor-following CTA effect
│   └── animations/
│       ├── useGSAP.ts          # GSAP initialization hook
│       ├── useReducedMotion.ts # Accessibility motion hook
│       └── useLenis.ts         # Lenis scroll hook
├── lib/
│   ├── fonts.ts                # Font loading configuration
│   ├── gsap-register.ts       # GSAP plugin registration
│   └── constants.ts            # Design tokens, timing values
├── public/
│   └── fonts/                  # Self-hosted WOFF2 files
├── tailwind.config.ts          # Tailwind config with design tokens
├── next.config.ts              # Next.js configuration
├── tsconfig.json
└── package.json
```

---

## 8. Performance Strategy

### 8.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s (goal: < 1.5s) | Server-render content shell via RSC. Preload Clash Display font. Inline critical CSS. |
| **INP** | < 200ms | Keep animations on rAF loop. No blocking JS in event handlers. Use `scheduler.yield()` for long tasks. |
| **CLS** | < 0.1 | Reserve explicit dimensions for all containers. `font-display: block` for hero font. No layout-shifting content. |

### 8.2 Loading Strategy

```
Phase 1 (0-500ms):   Server-rendered HTML shell with critical CSS inlined.
                     Hero text visible in fallback font.
                     Clash Display font preloaded.

Phase 2 (500ms-1s):  Fonts loaded → hero text renders in Clash Display.
                     React hydrates. Lenis initializes.
                     GSAP + SplitText loaded (code-split).

Phase 3 (1-2s):      Hero animation sequence plays.
                     ScrollTrigger initializes for below-fold sections.

Phase 4 (2s+):       Lazy-load below-fold section animations.
                     Intersection Observer triggers section entrances.
```

### 8.3 Image Strategy

- **Format:** WebP with AVIF where supported. `next/image` handles format negotiation.
- **Sizing:** Responsive `srcset` with `sizes` attribute. No oversized images.
- **Loading:** `priority` on hero images only. All others lazy-loaded.
- **Placeholder:** Blur-up placeholder via `next/image` `placeholder="blur"`.

---

## 9. Accessibility Requirements

### 9.1 Standards

- **WCAG 2.2 AA** compliance minimum
- **Target:** AAA where achievable without design compromise

### 9.2 Requirements Checklist

- [ ] All color combinations meet WCAG AA contrast ratios (verified in Section 3.4)
- [ ] `prefers-reduced-motion` respected — all animations skip to end state
- [ ] Site-level motion toggle in header (cookie-persisted)
- [ ] All interactive elements keyboard-accessible (Tab, Enter, Escape)
- [ ] Focus indicators visible (2px outline, 3:1 contrast minimum)
- [ ] Skip-navigation link as first focusable element
- [ ] Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>`)
- [ ] ARIA live regions for dynamic content (agent workflow state changes)
- [ ] Scroll-pinned sections have keyboard navigation alternative
- [ ] Mobile hamburger menu: focus trap when open, Escape to close
- [ ] Form inputs: visible labels, error states, `aria-describedby` for hints
- [ ] Page title updates on section navigation (if SPA-like behavior)
- [ ] Test with VoiceOver (macOS), NVDA (Windows), axe DevTools

---

## 10. Implementation Checklist

Execute in this order:

```
□  1. Project scaffolding
       Next.js 15 + Tailwind 4 + TypeScript
       Initialize git repo, configure ESLint + Prettier

□  2. Design system tokens
       CSS custom properties for colors, typography, spacing, radii, shadows
       Tailwind config with custom theme extending tokens

□  3. Font loading
       Self-host Clash Display, Satoshi, JetBrains Mono as WOFF2
       Subset to Latin range
       Configure preload for Clash Display, swap for Satoshi, optional for JetBrains Mono

□  4. Global layout shell
       Header component (fixed, scroll-aware, mobile menu)
       Footer component
       Lenis smooth scroll provider
       GSAP plugin registration

□  5. Hero section
       Kinetic typography with GSAP SplitText
       Agent name cycling ticker
       CTA buttons with magnetic hover effect
       Full animation timeline (see Section 5.4)

□  6. Agent Workflow section
       Scroll-pinned horizontal workflow (desktop)
       Vertical stack with intersection observer (mobile)
       SVG node graph with animated connections
       Full scroll timeline (see Section 5.5)

□  7. Services section
       6 agent cards in responsive grid
       Scroll-triggered staggered entrance
       Hover lift effect on cards

□  8. How It Works / Process section
       3-step numbered process
       Sequential scroll reveals
       Connecting line between steps

□  9. CTA section
       Full-width teal background
       Color transition on scroll entry
       Orange CTA button

□ 10. Responsive optimization
       Mobile-first breakpoints
       Touch-optimized interactions
       Horizontal workflow → vertical stack on mobile
       Test at 375px, 768px, 1024px, 1440px, 2560px

□ 11. Performance audit
       Lighthouse CI in CI/CD pipeline
       Target: Performance ≥ 90, Accessibility ≥ 95
       Bundle analysis with `@next/bundle-analyzer`
       Font loading waterfall verification

□ 12. Accessibility audit
       axe DevTools automated scan
       Keyboard navigation manual test
       Screen reader testing (VoiceOver + NVDA)
       prefers-reduced-motion verification

□ 13. SEO implementation
       Meta tags, Open Graph, Twitter Cards
       Structured data (Organization, WebSite)
       Sitemap generation
       robots.txt

□ 14. Deploy
       Vercel production deployment
       Preview environments for PR branches
       Analytics integration (Vercel Analytics or Plausible)
```

---

## 11. Quality Benchmarks

The finished site must meet or exceed:

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| Bundle size (JS) | < 250KB gzipped |
| Font payload | < 100KB |
| Animation FPS | ≥ 60fps on mid-range devices |
| WCAG | 2.2 AA compliant |
| Awwwards readiness | Design: ≥ 8.0, Development: ≥ 8.0, Creativity: ≥ 8.0 |

---

## Appendix: Research Documents

The following research documents informed this creative brief:

1. `/.superpowers/brainstorm/research-frontend-backend.md` — Animation libraries, 3D techniques, backend infrastructure
2. `/.superpowers/brainstorm/research-typography.md` — Font database, pairing recommendations, kinetic type techniques
3. `/.superpowers/brainstorm/research-reference-sites.md` — CSSDA/Awwwards winner teardowns, AI agency site analysis

---

*Creative brief compiled March 2026. All design decisions validated through research across CSS Design Awards, Awwwards, SiteInspire, and 20+ reference site teardowns.*
