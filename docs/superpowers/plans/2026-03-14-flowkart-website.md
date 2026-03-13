# Flowkart Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an award-caliber single-page marketing website for Flowkart AI agency with kinetic typography, scroll-driven agent workflow storytelling, and a warm cream design system — targeting Awwwards/CSSDA submission quality.

**Architecture:** Next.js 15 App Router with React Server Components for the page shell and client component islands for GSAP-powered animations. Lenis provides smooth scrolling synced with GSAP ScrollTrigger. All content is hardcoded (no CMS for V1). Progressive enhancement: server-render the content shell, hydrate animations client-side.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, GSAP 3.14 (ScrollTrigger + SplitText + Flip), @gsap/react 2.1, Lenis 1.3, Vercel deployment

**Spec:** `CREATIVE-BRIEF.md` — the complete design specification with colors, typography, animation timelines, page structure, and performance targets.

---

## File Structure

```
/Users/harshsahrawat/website/
├── app/
│   ├── fonts/
│   │   ├── ClashDisplay-Variable.woff2
│   │   └── Satoshi-Variable.woff2
│   ├── fonts.ts               # next/font configuration
│   ├── globals.css            # Tailwind 4 @theme tokens + base styles
│   ├── layout.tsx             # Root layout (fonts, metadata, providers)
│   └── page.tsx               # Home page (assembles all sections)
├── components/
│   ├── animations/
│   │   ├── gsap-register.ts   # GSAP plugin registration (client-only)
│   │   └── useReducedMotion.ts # Accessibility motion preference hook
│   ├── layout/
│   │   ├── Header.tsx         # Fixed nav, scroll-aware bg, mobile menu
│   │   ├── Footer.tsx         # Dark navy footer with 4-column grid
│   │   └── LenisProvider.tsx  # Smooth scroll + GSAP sync
│   ├── sections/
│   │   ├── Hero.tsx           # Kinetic typography + agent ticker
│   │   ├── AgentWorkflow.tsx  # Scroll-pinned horizontal workflow
│   │   ├── Services.tsx       # 6-agent card grid
│   │   ├── Process.tsx        # 3-step "How It Works"
│   │   └── CTASection.tsx     # Full-width teal CTA
│   └── ui/
│       ├── Button.tsx         # Primary/secondary/outline variants
│       ├── Card.tsx           # Service/agent card
│       ├── MagneticButton.tsx # Cursor-tracking CTA
│       ├── SplitTextReveal.tsx # GSAP SplitText wrapper
│       └── ScrollReveal.tsx   # GSAP ScrollTrigger entrance wrapper
├── lib/
│   └── constants.ts           # Design tokens, animation timing, content data
├── CREATIVE-BRIEF.md          # Design specification (existing)
├── docs/superpowers/plans/    # This plan
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

Each file has one responsibility. `sections/` = page-level compositions. `ui/` = reusable primitives. `animations/` = hooks and setup.

---

## Chunk 1: Project Foundation

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `.eslintrc.json`
- Create: `.prettierrc`

- [ ] **Step 1: Initialize package.json and install all dependencies**

```bash
cd /Users/harshsahrawat/website
npm init -y

# Core framework
npm install next@15 react@19 react-dom@19

# Dev tooling
npm install -D typescript @types/react @types/react-dom @types/node

# Tailwind CSS 4 (PostCSS-based)
npm install -D tailwindcss@4 @tailwindcss/postcss postcss

# Animation stack
npm install gsap @gsap/react lenis

# Linting
npm install -D eslint eslint-config-next prettier eslint-config-prettier
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
```

- [ ] **Step 4: Create postcss.config.mjs**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
```

- [ ] **Step 5: Create .gitignore**

```
node_modules/
.next/
out/
*.log
.DS_Store
.env
.env.local
.superpowers/brainstorm/**/.server.*
.superpowers/brainstorm/**/.server-stopped
```

- [ ] **Step 6: Create .eslintrc.json**

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

- [ ] **Step 7: Create .prettierrc**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

- [ ] **Step 8: Add scripts to package.json**

Update the `scripts` field in package.json:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- [ ] **Step 9: Initialize git and commit**

```bash
git init
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs .gitignore .eslintrc.json .prettierrc CREATIVE-BRIEF.md
git commit -m "chore: scaffold Next.js 15 + Tailwind 4 + TypeScript project"
```

---

### Task 2: Design System Tokens

**Files:**
- Create: `app/globals.css`
- Create: `lib/constants.ts`

**Reference:** CREATIVE-BRIEF.md Section 3 (Color System), Section 4 (Typography), Section 5.3 (Animation Timing)

- [ ] **Step 1: Create app/globals.css with Tailwind 4 @theme tokens**

```css
@import "tailwindcss";

/* ============================================
   Flowkart Design System Tokens
   Reference: CREATIVE-BRIEF.md Sections 3-5
   ============================================ */

@theme {
  /* --- Colors (Section 3.1) --- */
  --color-cream: #FFECD1;
  --color-cream-light: #FFF5E6;
  --color-navy: #001524;
  --color-sienna: #78290F;
  --color-teal: #15616D;
  --color-orange: #FF7D00;
  --color-tan: #E8DCC8;

  /* --- Font Families (Section 4.1) --- */
  /* CSS variables injected by next/font — referenced here for Tailwind utilities */
  --font-display: var(--font-clash-display), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-satoshi), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* --- Animation Timing (Section 5.3) --- */
  --ease-default: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-micro: 0.3s;
  --duration-reveal: 0.6s;
  --duration-section: 1.0s;
}

/* --- Base Styles --- */
body {
  font-family: var(--font-body);
  color: var(--color-sienna);
  background-color: var(--color-cream);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  color: var(--color-navy);
  font-weight: 600;
}

::selection {
  background-color: var(--color-teal);
  color: var(--color-cream);
}

:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 3px;
  border-radius: 2px;
}

/* --- Skip Navigation (a11y) --- */
.skip-nav {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: 1rem;
  background: var(--color-navy);
  color: var(--color-cream);
}
.skip-nav:focus {
  top: 0;
}

/* --- Link Hover Underline (Section 5.7) --- */
.link-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 1.5px;
  transition: background-size var(--duration-micro) var(--ease-default);
  padding-bottom: 2px;
}
.link-underline:hover {
  background-size: 100% 1.5px;
}

/* --- Reduced Motion Global Override --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Create lib/constants.ts**

```typescript
// ============================================
// Animation timing tokens
// Reference: CREATIVE-BRIEF.md Section 5.3
// ============================================

export const TIMING = {
  micro: 0.3,
  reveal: 0.6,
  section: 1.0,
  staggerChar: 0.03,
  staggerGrid: 0.08,
} as const

export const EASING = {
  default: 'power2.out',
  entrance: 'power3.out',
  elastic: 'elastic.out(1, 0.5)',
} as const

// ============================================
// Breakpoints
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const

// ============================================
// Page content data
// Reference: CREATIVE-BRIEF.md Section 6
// ============================================

export const AGENTS = [
  {
    name: 'Research',
    description: 'Analyzes market data, competitors, and trends to give your team an information edge.',
    icon: 'search',
  },
  {
    name: 'Marketing',
    description: 'Builds data-driven strategies and campaigns from research insights.',
    icon: 'megaphone',
  },
  {
    name: 'Finance',
    description: 'Forecasts revenue, tracks budgets, and surfaces financial insights automatically.',
    icon: 'chart',
  },
  {
    name: 'Outreach',
    description: 'Executes multi-channel distribution — email, social, partnerships — at scale.',
    icon: 'send',
  },
  {
    name: 'Development',
    description: 'Writes, reviews, and deploys code. Maintains your technical infrastructure.',
    icon: 'code',
  },
  {
    name: 'Copywriting',
    description: 'Creates on-brand content aligned with strategy — from blogs to ad copy.',
    icon: 'pen',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We learn your business, workflows, and pain points. You tell us where AI could help — we tell you where it will.',
  },
  {
    number: '02',
    title: 'Team Design',
    description: 'We architect your custom multi-agent system. Which agents you need, how they collaborate, and what results to expect.',
  },
  {
    number: '03',
    title: 'Deploy & Optimize',
    description: 'Your AI team goes live. We monitor performance, tune agent behavior, and scale as your needs evolve.',
  },
] as const

export const WORKFLOW_NODES = [
  { id: 'problem', label: 'Business Problem', color: 'navy' as const, tooltip: '' },
  { id: 'research', label: 'Research Agent', color: 'teal' as const, tooltip: 'Analyzes market data, competitors, trends' },
  { id: 'marketing', label: 'Marketing Agent', color: 'teal' as const, tooltip: 'Builds strategy from research insights' },
  { id: 'copywriter', label: 'Copywriter Agent', color: 'teal' as const, tooltip: 'Creates content aligned with strategy' },
  { id: 'outreach', label: 'Outreach Agent', color: 'teal' as const, tooltip: 'Executes multi-channel distribution' },
  { id: 'results', label: 'Results', color: 'orange' as const, tooltip: '' },
] as const
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css lib/constants.ts
git commit -m "feat: add design system tokens and content constants"
```

---

### Task 3: Font Loading

**Files:**
- Create: `app/fonts/ClashDisplay-Variable.woff2` (download)
- Create: `app/fonts/Satoshi-Variable.woff2` (download)
- Create: `app/fonts.ts`

**Reference:** CREATIVE-BRIEF.md Section 4.4 (Font Loading Strategy)

- [ ] **Step 1: Download font files from Fontshare**

```bash
mkdir -p app/fonts

# Download Clash Display variable font
curl -L "https://api.fontshare.com/v2/fonts/download/clash-display" -o /tmp/clash-display.zip
unzip -o /tmp/clash-display.zip -d /tmp/clash-display
# Find the variable WOFF2 file (structure varies — look in Fonts/WEB/variable/)
find /tmp/clash-display -iname "*variable*" -iname "*.woff2" | head -1 | xargs -I{} cp {} app/fonts/ClashDisplay-Variable.woff2

# Download Satoshi variable font
curl -L "https://api.fontshare.com/v2/fonts/download/satoshi" -o /tmp/satoshi.zip
unzip -o /tmp/satoshi.zip -d /tmp/satoshi
find /tmp/satoshi -iname "*variable*" -iname "*.woff2" | head -1 | xargs -I{} cp {} app/fonts/Satoshi-Variable.woff2

# Clean up
rm -rf /tmp/clash-display /tmp/satoshi /tmp/clash-display.zip /tmp/satoshi.zip

# Verify files exist and are reasonable size (should be 30-60KB each)
ls -la app/fonts/
```

If the Fontshare API download fails, download manually from:
- https://www.fontshare.com/fonts/clash-display (click Download)
- https://www.fontshare.com/fonts/satoshi (click Download)
Extract the WOFF2 variable font files from the zip.

- [ ] **Step 2: Create app/fonts.ts**

```typescript
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// Priority 1: Preload — hero headline font (above fold)
// font-display: block — brief invisible period acceptable for hero
export const clashDisplay = localFont({
  src: './fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash-display',
  display: 'block',
  weight: '200 700',
})

// Priority 2: Swap — body text (appears everywhere)
// font-display: swap — content readable immediately with fallback
export const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '300 900',
})

// Priority 3: Optional — accent mono font (non-critical)
// font-display: optional — use only if already cached
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'optional',
})
```

- [ ] **Step 3: Commit**

```bash
git add app/fonts/ app/fonts.ts
git commit -m "feat: add self-hosted fonts (Clash Display, Satoshi, JetBrains Mono)"
```

---

### Task 4: Root Layout + Placeholder Page

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { clashDisplay, satoshi, jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flowkart — AI Native Agency',
  description:
    'Custom multi-agent orchestration with LangChain & LangGraph. We build AI teams that run your business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create app/page.tsx (placeholder)**

```tsx
export default function Home() {
  return (
    <main id="main-content">
      <section className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center px-6">
          <p className="font-mono text-teal text-sm uppercase tracking-[0.12em] mb-4">
            AI Native Agency
          </p>
          <h1 className="font-display text-navy text-5xl font-semibold tracking-tight leading-none mb-6">
            We build AI teams
            <br />
            that run your <span className="text-teal">business</span>.
          </h1>
          <p className="font-body text-sienna text-lg max-w-xl mx-auto">
            Custom multi-agent orchestration with LangChain &amp; LangGraph.
          </p>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Verify dev server runs**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Warm cream background (#FFECD1)
- Headline renders in Clash Display (geometric, bold)
- Body text renders in Satoshi (warm, rounded)
- Overline renders in JetBrains Mono (monospace)
- Colors match: navy heading, teal accent, sienna body
- No console errors

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: add root layout with fonts and placeholder home page"
```

---

## Chunk 2: Animation Infrastructure & Layout Shell

### Task 5: GSAP Registration

**Files:**
- Create: `components/animations/gsap-register.ts`

- [ ] **Step 1: Create GSAP plugin registration module**

This module registers all GSAP plugins once and re-exports them. Every client component that needs GSAP imports from here instead of directly from `gsap`.

```typescript
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

// Register plugins (safe to call multiple times)
gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

export { gsap, ScrollTrigger, SplitText, Flip }
```

- [ ] **Step 2: Commit**

```bash
git add components/animations/gsap-register.ts
git commit -m "feat: add GSAP plugin registration module"
```

---

### Task 6: Reduced Motion Hook

**Files:**
- Create: `components/animations/useReducedMotion.ts`

- [ ] **Step 1: Create useReducedMotion hook**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/animations/useReducedMotion.ts
git commit -m "feat: add useReducedMotion accessibility hook"
```

---

### Task 7: Lenis Smooth Scroll Provider

**Files:**
- Create: `components/layout/LenisProvider.tsx`
- Modify: `app/layout.tsx` (wrap body content)

**Reference:** Lenis + GSAP ScrollTrigger synchronization pattern

- [ ] **Step 1: Create LenisProvider**

```tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    // Sync Lenis with GSAP's ticker so ScrollTrigger stays in sync
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [reducedMotion])

  // If reduced motion, render children without smooth scroll
  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        autoRaf: false, // GSAP ticker drives Lenis — prevents desync
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

- [ ] **Step 2: Update app/layout.tsx to wrap with LenisProvider**

Add the import and wrap `{children}`:

```tsx
import type { Metadata } from 'next'
import { clashDisplay, satoshi, jetbrainsMono } from './fonts'
import { LenisProvider } from '@/components/layout/LenisProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flowkart — AI Native Agency',
  description:
    'Custom multi-agent orchestration with LangChain & LangGraph. We build AI teams that run your business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify smooth scroll works**

```bash
npm run dev
```

Add enough content to the placeholder page to make it scrollable. Scroll — should feel smooth with inertia. Toggle `prefers-reduced-motion` in browser DevTools → smooth scroll should disable. No console errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/LenisProvider.tsx app/layout.tsx
git commit -m "feat: add Lenis smooth scroll provider synced with GSAP"
```

---

### Task 8: Header Component

**Files:**
- Create: `components/layout/Header.tsx`
- Modify: `app/layout.tsx` (add Header)

**Reference:** CREATIVE-BRIEF.md Section 6.3 (Navigation)

- [ ] **Step 1: Create Header**

```tsx
'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'About', href: '#about' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape + focus trap when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }

      // Focus trap: keep Tab cycling within the mobile overlay
      if (e.key === 'Tab') {
        const overlay = document.querySelector('[role="dialog"]')
        if (!overlay) return
        const focusable = overlay.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md border-b border-tan'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-semibold text-lg text-navy tracking-[0.04em]"
          >
            FLOWKART
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body font-medium text-sm text-navy hover:text-teal link-underline transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-orange text-white font-body font-bold text-sm rounded-lg hover:bg-orange/90 transition-colors duration-300"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`absolute h-0.5 w-5 bg-navy transition-all duration-300 ${
                mobileOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-navy transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-navy transition-all duration-300 ${
                mobileOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-3xl font-semibold text-navy hover:text-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 px-8 py-3 bg-orange text-white font-body font-bold text-base rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Add Header to layout.tsx**

Inside the `<LenisProvider>` wrapper, before `{children}`:

```tsx
import { Header } from '@/components/layout/Header'

// Inside body:
<LenisProvider>
  <Header />
  {children}
</LenisProvider>
```

- [ ] **Step 3: Verify**

Open http://localhost:3000. Check:
- Logo "FLOWKART" in Clash Display, top-left
- Desktop: nav links + orange "Book a Call" button visible
- Scroll down → header gets blur background + bottom border
- Resize to mobile → hamburger icon appears
- Click hamburger → full-screen overlay with links
- Press Escape → overlay closes
- Tab through → focus indicators visible

- [ ] **Step 4: Commit**

```bash
git add components/layout/Header.tsx app/layout.tsx
git commit -m "feat: add scroll-aware Header with mobile menu"
```

---

### Task 9: Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`
- Modify: `app/page.tsx` (add Footer)

**Reference:** CREATIVE-BRIEF.md Section 6.2 — Section 7 (Footer)

- [ ] **Step 1: Create Footer**

```tsx
const FOOTER_LINKS = {
  agents: [
    'Research Agent',
    'Marketing Agent',
    'Finance Agent',
    'Outreach Agent',
    'Dev Agent',
    'Copywriting Agent',
  ],
  company: ['About', 'How It Works', 'Contact'],
}

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <span className="font-display font-semibold text-lg tracking-[0.04em]">
              FLOWKART
            </span>
            <p className="mt-3 text-tan text-sm leading-relaxed">
              AI Native Agency. Custom multi-agent teams that run your
              business.
            </p>
          </div>

          {/* Agents */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              Agents
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.agents.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-tan text-sm hover:text-cream transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-tan text-sm hover:text-cream transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@flowkart.ai"
              className="text-tan text-sm hover:text-cream transition-colors duration-300"
            >
              hello@flowkart.ai
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Flowkart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-cream/40 text-xs hover:text-cream/60 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-cream/40 text-xs hover:text-cream/60 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Footer to page.tsx**

```tsx
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main id="main-content">
        {/* Placeholder sections — will be replaced in Tasks 14-18 */}
        <section className="min-h-screen flex items-center justify-center bg-cream">
          <h1 className="font-display text-navy text-5xl font-semibold">
            Flowkart
          </h1>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx app/page.tsx
git commit -m "feat: add Footer with 4-column grid layout"
```

---

## Chunk 3: UI Components & Hero Section

### Task 10: Button Component

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create Button with primary/secondary/outline variants**

```tsx
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

type ButtonBaseProps = {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

type AsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
  }

type AsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = AsButton | AsLink

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-orange/90',
  secondary: 'bg-teal text-white hover:bg-teal/90',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-cream',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-[0.9375rem]',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center',
    'font-body font-bold rounded-lg',
    'transition-colors duration-300',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  if ('href' in props && props.href) {
    const { href, ...rest } = props as AsLink
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as AsButton)}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add Button component with primary/secondary/outline variants"
```

---

### Task 11: MagneticButton Component

**Files:**
- Create: `components/ui/MagneticButton.tsx`

**Reference:** CREATIVE-BRIEF.md Section 5.7 — Magnetic cursor on CTAs (desktop only, 80px radius)

- [ ] **Step 1: Create MagneticButton**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/MagneticButton.tsx
git commit -m "feat: add MagneticButton with cursor-following effect"
```

---

### Task 12: SplitTextReveal Component

**Files:**
- Create: `components/ui/SplitTextReveal.tsx`

**Reference:** CREATIVE-BRIEF.md Section 5.4 — SplitText character/word reveals

- [ ] **Step 1: Create SplitTextReveal**

Uses GSAP SplitText to animate characters/words/lines into view. Supports both page-load and scroll-triggered reveals. Respects reduced motion by showing text immediately.

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/SplitTextReveal.tsx
git commit -m "feat: add SplitTextReveal component with GSAP SplitText"
```

---

### Task 13: ScrollReveal Component

**Files:**
- Create: `components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create ScrollReveal**

Generic wrapper that fades + slides children into view on scroll. Configurable direction, duration, and stagger for multiple children.

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal component with configurable direction"
```

---

### Task 14: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx` (replace placeholder with Hero)

**Reference:** CREATIVE-BRIEF.md Section 5.4 (Hero Animation Sequence) and Section 6.2 (Hero)

This is the centerpiece of the site. The animation timeline:
- 0.2s: Overline "AI NATIVE AGENCY" fades in
- 0.5s: H1 characters stagger in via SplitText
- 1.1s: "business." gets teal color + scale punch
- 1.4s: Body text fades in
- 1.6s: CTA buttons slide up with stagger
- 1.8s: Agent name ticker starts cycling

- [ ] **Step 1: Create Hero section**

```tsx
'use client'

import { useRef, useEffect, useState, forwardRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import { AGENTS, TIMING, EASING } from '@/lib/constants'

/* ---- Agent Ticker Sub-Component ---- */

const AgentTicker = forwardRef<HTMLDivElement, { reducedMotion: boolean }>(
  function AgentTicker({ reducedMotion }, ref) {
    const [activeIndex, setActiveIndex] = useState(0)

    // Ticker cycles regardless of reduced motion — it uses state, not GSAP.
    // Reduced motion only disables the CSS transition on the opacity change.
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % AGENTS.length)
      }, 2000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div
        ref={ref}
        className="mt-12 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 font-mono text-sm"
        style={{ visibility: 'hidden' }}
        aria-label={`Active agents: ${AGENTS.map((a) => a.name).join(', ')}`}
      >
        <span className="text-teal mr-1">▸</span>
        {AGENTS.map((agent, i) => (
          <span key={agent.name} className="flex items-center">
            <span
              className={`${reducedMotion ? '' : 'transition-all duration-500'} ${
                i === activeIndex
                  ? 'opacity-100 text-teal font-medium'
                  : 'opacity-40 text-teal/60'
              }`}
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              {agent.name}
            </span>
            {i < AGENTS.length - 1 && (
              <span className="mx-1.5 opacity-30 text-teal">→</span>
            )}
          </span>
        ))}
        {/* ARIA live region announces active agent to screen readers */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Active agent: {AGENTS[activeIndex].name}
        </span>
      </div>
    )
  },
)

/* ---- Hero Section ---- */

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const overlineRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current) return

      const allRefs = [
        overlineRef.current,
        headlineRef.current,
        bodyRef.current,
        ctaRef.current,
        tickerRef.current,
      ]

      // Reduced motion: show everything immediately
      if (reducedMotion) {
        gsap.set(allRefs, { autoAlpha: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: EASING.entrance } })

      // 0.2s — Overline fades in
      tl.fromTo(
        overlineRef.current,
        { opacity: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4 },
        0.2,
      )

      // 0.5s — Headline SplitText character reveal
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: 'chars,words',
        })
        gsap.set(headlineRef.current, { autoAlpha: 1 })
        gsap.set(split.chars, { opacity: 0, y: 40 })

        tl.to(
          split.chars,
          {
            opacity: 1,
            y: 0,
            duration: TIMING.reveal,
            stagger: TIMING.staggerChar,
          },
          0.5,
        )

        // 1.1s — "business." scale punch
        const businessWord = split.words.find((w) =>
          w.textContent?.trim().startsWith('business'),
        )
        if (businessWord) {
          tl.fromTo(
            businessWord,
            { scale: 1 },
            {
              scale: 1.02,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            },
            '>-0.2',
          )
        }
      }

      // 1.4s — Body text fades in
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        1.4,
      )

      // 1.6s — CTA buttons slide up
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
          1.6,
        )
      }

      // 1.8s — Ticker appears
      tl.fromTo(
        tickerRef.current,
        { opacity: 0 },
        { autoAlpha: 1, duration: 0.4 },
        1.8,
      )
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-16 bg-cream"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Overline */}
        <p
          ref={overlineRef}
          className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-6"
          style={{ visibility: 'hidden' }}
        >
          AI Native Agency
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-semibold text-navy leading-none mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 5.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            visibility: 'hidden',
          }}
        >
          We build AI teams <br className="hidden sm:block" />
          that run your <span className="text-teal">business.</span>
        </h1>

        {/* Body */}
        <p
          ref={bodyRef}
          className="font-body text-sienna max-w-xl mx-auto mb-10"
          style={{
            fontSize: 'clamp(1.125rem, 1rem + 0.4vw, 1.375rem)',
            lineHeight: 1.6,
            visibility: 'hidden',
          }}
        >
          Custom multi-agent orchestration with LangChain &amp; LangGraph. Six
          specialized agents working as one team.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ visibility: 'hidden' }}
        >
          <MagneticButton>
            <Button variant="primary" size="lg" href="#contact">
              Book a Discovery Call
            </Button>
          </MagneticButton>
          <Button variant="outline" size="lg" href="#workflow">
            See How It Works
          </Button>
        </div>

        {/* Agent Ticker */}
        <AgentTicker ref={tickerRef} reducedMotion={reducedMotion} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update app/page.tsx to use Hero**

```tsx
import { Hero } from '@/components/sections/Hero'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify hero animation**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Overline "AI NATIVE AGENCY" fades in first
- Headline characters stagger in from below (smooth, cinematic)
- "business." word gets a subtle scale punch
- Body text fades in
- CTA buttons slide up
- Agent ticker starts cycling through names
- Hover over "Book a Discovery Call" → button follows cursor (magnetic effect)
- Toggle reduced motion in DevTools → all animations skip, text shows instantly

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with kinetic typography and agent ticker"
```

---

## Chunk 4: Content Sections

### Task 15: Agent Workflow Section

**Files:**
- Create: `components/sections/AgentWorkflow.tsx`
- Modify: `app/page.tsx` (add section)

**Reference:** CREATIVE-BRIEF.md Section 5.5 (Scroll Workflow Animation) and Section 6.2 (Agent Workflow)

The "one memorable thing" — scroll-pinned horizontal workflow showing how agents hand off work. Desktop: pinned with scrub. Mobile: vertical stack with scroll-triggered reveals.

- [ ] **Step 1: Create AgentWorkflow section**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { WORKFLOW_NODES, EASING } from '@/lib/constants'

const NODE_COLORS = {
  navy: 'bg-navy text-cream',
  teal: 'bg-teal text-white',
  orange: 'bg-orange text-white',
} as const

export function AgentWorkflow() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return

      const nodes = trackRef.current.querySelectorAll('.wf-node')
      const lines = trackRef.current.querySelectorAll('.wf-line')

      // Reduced motion or mobile: show everything
      if (reducedMotion) {
        gsap.set(nodes, { autoAlpha: 1 })
        gsap.set(lines, { scaleX: 1 })
        return
      }

      const mm = gsap.matchMedia()

      // --- DESKTOP: Pinned horizontal scroll ---
      mm.add('(min-width: 768px)', () => {
        gsap.set(nodes, { autoAlpha: 0, scale: 0.8 })
        gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' })

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

        // Reveal nodes and lines sequentially
        nodes.forEach((node, i) => {
          const t = i / (nodes.length - 1)

          tl.to(
            node,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.12,
              ease: EASING.entrance,
            },
            t * 0.85,
          )

          if (i < lines.length) {
            tl.to(
              lines[i],
              { scaleX: 1, duration: 0.08, ease: 'none' },
              t * 0.85 + 0.06,
            )
          }
        })

        // Final glow
        tl.to(
          nodes,
          { boxShadow: '0 0 24px rgba(21,97,109,0.3)', duration: 0.15 },
          0.9,
        )
      })

      // --- MOBILE: Vertical stack with scroll reveals ---
      mm.add('(max-width: 767px)', () => {
        nodes.forEach((node, i) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: EASING.entrance,
              scrollTrigger: {
                trigger: node,
                start: 'top 85%',
              },
            },
          )

          if (i < lines.length) {
            gsap.fromTo(
              lines[i],
              { scaleY: 0, transformOrigin: 'top center' },
              {
                scaleY: 1,
                duration: 0.4,
                scrollTrigger: {
                  trigger: lines[i],
                  start: 'top 85%',
                },
              },
            )
          }
        })
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="relative bg-cream-light overflow-hidden"
    >
      {/* Section Title */}
      <div className="pt-24 pb-16 px-6 text-center">
        <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
          Multi-Agent Orchestration
        </p>
        <h2
          className="font-display font-semibold text-navy"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          See how your AI team works
        </h2>
      </div>

      {/* Workflow Track */}
      <div
        ref={trackRef}
        className="relative max-w-6xl mx-auto px-6 pb-24 min-h-[50vh] flex items-center"
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {WORKFLOW_NODES.map((node, i) => (
            <div key={node.id} className="flex flex-col md:flex-row items-center">
              {/* Node — hover: scale 1.08 + tooltip fade (Section 5.7) */}
              <div
                className="wf-node group flex flex-col items-center gap-3 opacity-0"
              >
                <div
                  className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-[1.08] ${NODE_COLORS[node.color]}`}
                >
                  <span className="font-mono text-xs lg:text-sm font-bold text-center leading-tight px-1">
                    {node.label.split(' ')[0]}
                  </span>
                </div>
                <span className="font-body text-sm font-medium text-navy text-center max-w-[120px]">
                  {node.label}
                </span>
                {node.tooltip && (
                  <span className="font-body text-xs text-sienna/60 text-center max-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {node.tooltip}
                  </span>
                )}
              </div>

              {/* Connection Line (between nodes) */}
              {i < WORKFLOW_NODES.length - 1 && (
                <>
                  {/* Desktop: horizontal line */}
                  <div className="wf-line hidden md:block w-12 lg:w-20 h-0.5 bg-teal/30 mx-2 scale-x-0" />
                  {/* Mobile: vertical line */}
                  <div className="wf-line md:hidden w-0.5 h-8 bg-teal/30 my-1 scale-y-0" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import { Hero } from '@/components/sections/Hero'
import { AgentWorkflow } from '@/components/sections/AgentWorkflow'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <AgentWorkflow />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify**

Open http://localhost:3000. Scroll past the hero. On desktop:
- Section pins to viewport
- Nodes reveal one by one as you scroll
- Connection lines draw between them
- All nodes glow at the end
- Section unpins and scroll continues

On mobile (resize to < 768px):
- No pinning — vertical stack layout
- Nodes fade in as they enter viewport

- [ ] **Step 4: Commit**

```bash
git add components/sections/AgentWorkflow.tsx app/page.tsx
git commit -m "feat: add Agent Workflow section with scroll-pinned horizontal reveal"
```

---

### Task 16: Services Section

**Files:**
- Create: `components/ui/Card.tsx`
- Create: `components/sections/Services.tsx`
- Modify: `app/page.tsx`

**Reference:** CREATIVE-BRIEF.md Section 6.2 — Section 3 (Services Overview)

- [ ] **Step 1: Create Card component**

```tsx
type CardProps = {
  icon: string
  title: string
  description: string
  className?: string
}

const ICONS: Record<string, string> = {
  search: '🔍',
  megaphone: '📢',
  chart: '📊',
  send: '📨',
  code: '💻',
  pen: '✍️',
}

export function Card({ icon, title, description, className = '' }: CardProps) {
  return (
    <div
      className={`group p-6 bg-cream rounded-xl border border-tan hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 text-xl group-hover:bg-teal/20 transition-colors duration-300">
        {ICONS[icon] || '⚡'}
      </div>
      <h3
        className="font-display font-medium text-navy mb-2"
        style={{
          fontSize: 'clamp(1.25rem, 0.9rem + 1.2vw, 2rem)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p className="font-body text-sienna text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Create Services section**

```tsx
'use client'

import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AGENTS, TIMING } from '@/lib/constants'

export function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
            Your AI Team
          </p>
          <h2
            className="font-display font-semibold text-navy"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Six agents. One mission.
          </h2>
        </div>

        {/* Card Grid */}
        <ScrollReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={TIMING.staggerGrid}
        >
          {AGENTS.map((agent) => (
            <Card
              key={agent.name}
              icon={agent.icon}
              title={`${agent.name} Agent`}
              description={agent.description}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx after AgentWorkflow**

```tsx
import { Services } from '@/components/sections/Services'

// Inside <main>:
<Hero />
<AgentWorkflow />
<Services />
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/Card.tsx components/sections/Services.tsx app/page.tsx
git commit -m "feat: add Services section with 6 agent cards in responsive grid"
```

---

### Task 17: Process Section

**Files:**
- Create: `components/sections/Process.tsx`
- Modify: `app/page.tsx`

**Reference:** CREATIVE-BRIEF.md Section 6.2 — Section 4 (How It Works)

- [ ] **Step 1: Create Process section**

```tsx
'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PROCESS_STEPS, TIMING } from '@/lib/constants'

export function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-cream-light">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-teal text-[0.875rem] uppercase tracking-[0.12em] mb-4">
            How It Works
          </p>
          <h2
            className="font-display font-semibold text-navy"
            style={{
              fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Three steps to your AI team
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute left-[2.5rem] top-0 bottom-0 w-px bg-tan" />

          <div className="space-y-16">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal
                key={step.number}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.1}
              >
                <div className="flex gap-8 items-start">
                  {/* Step Number */}
                  <div className="shrink-0 w-20 h-20 rounded-2xl bg-cream border border-tan flex items-center justify-center relative z-10">
                    <span
                      className="font-display font-semibold text-teal"
                      style={{ fontSize: 'clamp(1.5rem, 1rem + 1vw, 2rem)' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3
                      className="font-display font-medium text-navy mb-3"
                      style={{
                        fontSize: 'clamp(1.25rem, 0.9rem + 1.2vw, 2rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-body text-sienna leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```tsx
import { Process } from '@/components/sections/Process'

// Inside <main>:
<Hero />
<AgentWorkflow />
<Services />
<Process />
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Process.tsx app/page.tsx
git commit -m "feat: add Process section with 3-step numbered flow"
```

---

### Task 18: CTA Section

**Files:**
- Create: `components/sections/CTASection.tsx`
- Modify: `app/page.tsx` (final assembly)

**Reference:** CREATIVE-BRIEF.md Section 6.2 — Section 6 (CTA)

- [ ] **Step 1: Create CTASection**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/components/animations/gsap-register'
import { useReducedMotion } from '@/components/animations/useReducedMotion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion) return

      // Background color transition on scroll entry
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: '#FFECD1' },
        {
          backgroundColor: '#15616D',
          duration: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )

      // Text color transitions in parallel so text stays readable during bg transition
      gsap.fromTo(
        headingRef.current,
        { color: '#001524' },
        {
          color: '#FFECD1',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        bodyRef.current,
        { color: '#78290F' },
        {
          color: 'rgba(255,236,209,0.8)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6"
      style={{
        backgroundColor: reducedMotion ? '#15616D' : '#FFECD1',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-display font-semibold mb-6"
          style={{
            fontSize: 'clamp(1.75rem, 1rem + 2.5vw, 3.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: reducedMotion ? '#FFECD1' : '#001524',
          }}
        >
          Ready to build your AI team?
        </h2>
        <p
          ref={bodyRef}
          className="font-body text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: reducedMotion ? 'rgba(255,236,209,0.8)' : '#78290F' }}
        >
          Book a discovery call and we&apos;ll design a custom multi-agent
          system for your business in 30 minutes.
        </p>
        <MagneticButton>
          <Button
            variant="primary"
            size="lg"
            href="mailto:hello@flowkart.ai"
            className="bg-orange text-white hover:bg-orange/90"
          >
            Book a Discovery Call
          </Button>
        </MagneticButton>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Final page.tsx assembly**

```tsx
import { Hero } from '@/components/sections/Hero'
import { AgentWorkflow } from '@/components/sections/AgentWorkflow'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <AgentWorkflow />
        <Services />
        <Process />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify full page flow**

```bash
npm run dev
```

Scroll through the entire page top to bottom. Verify:
- Hero → kinetic typography plays
- Scroll past hero → Agent Workflow section pins and reveals nodes
- Continue scrolling → Services cards stagger in
- Process steps reveal alternating left/right
- CTA section background transitions from cream to teal
- Footer renders with dark navy background
- All sections flow smoothly with Lenis
- No console errors

- [ ] **Step 4: Commit**

```bash
git add components/sections/CTASection.tsx app/page.tsx
git commit -m "feat: add CTA section with scroll-driven background transition"
```

---

## Chunk 5: Responsive, Accessibility, SEO & Deploy

### Task 19: Responsive Optimization

**Files:**
- Modify: Multiple component files for breakpoint fixes

**Reference:** CREATIVE-BRIEF.md Section 10 — Step 10

- [ ] **Step 1: Test at all breakpoints**

Open DevTools and test at these widths:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1440px (design target)
- 2560px (ultrawide)

For each breakpoint, verify:
- Hero headline is readable and doesn't overflow
- Agent Workflow switches to vertical stack below 768px
- Services grid: 1 col (mobile) → 2 col (md) → 3 col (lg)
- Process steps stack vertically on mobile
- CTA section has adequate padding
- Footer columns stack on mobile
- Header hamburger menu appears below md breakpoint
- All touch targets are ≥ 44px
- No horizontal overflow at any breakpoint

- [ ] **Step 2: Fix any layout issues found**

Common fixes:
- Add `overflow-x-hidden` to body or html if horizontal scroll appears
- Adjust clamp() min values if text is too large on 375px
- Add `px-4` instead of `px-6` on very small screens
- Ensure pinned scroll section unpins cleanly on mobile

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive layout optimization across all breakpoints"
```

---

### Task 20: Accessibility Audit

**Files:**
- Modify: Multiple files for a11y fixes

**Reference:** CREATIVE-BRIEF.md Section 9 (Accessibility Requirements)

- [ ] **Step 1: Automated audit**

Run axe DevTools extension in the browser, or:
```bash
npx @axe-core/cli http://localhost:3000
```

Fix all critical and serious violations.

- [ ] **Step 2: Keyboard navigation test**

Tab through entire page with keyboard only:
- [ ] Skip-nav link is first focusable element and works
- [ ] All interactive elements (links, buttons) receive focus
- [ ] Focus indicators are visible (2px outline, teal)
- [ ] Mobile menu: focus trapped when open, Escape closes
- [ ] Scroll-pinned section: can be navigated past with keyboard

- [ ] **Step 3: Reduced motion verification**

In browser DevTools → Rendering → enable "prefers-reduced-motion: reduce":
- [ ] All GSAP animations skip to end state
- [ ] SplitText shows text immediately (no character-by-character)
- [ ] Lenis smooth scroll disabled (native scroll)
- [ ] Agent ticker still cycles (but without transition effects)
- [ ] CTA section shows teal bg immediately (no scroll transition)

- [ ] **Step 4: Semantic HTML check**

Verify the DOM has:
- `<nav>` for navigation
- `<main>` wrapping page content
- `<section>` for each content block
- `<footer>` for the footer
- Proper heading hierarchy (h1 → h2 → h3, no skips)
- `aria-label` on the mobile menu dialog
- `aria-expanded` on hamburger button

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: accessibility improvements from audit"
```

---

### Task 21: SEO Implementation

**Files:**
- Modify: `app/layout.tsx` (metadata)
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Reference:** CREATIVE-BRIEF.md Section 10 — Step 13

- [ ] **Step 1: Add comprehensive metadata to layout.tsx**

```tsx
export const metadata: Metadata = {
  title: 'Flowkart — AI Native Agency | Custom Multi-Agent Teams',
  description:
    'Flowkart builds custom multi-agent AI teams using LangChain & LangGraph. Six specialized agents — Research, Marketing, Finance, Outreach, Development, Copywriting — working as one team for your business.',
  keywords: [
    'AI agency',
    'multi-agent systems',
    'LangChain',
    'LangGraph',
    'AI automation',
    'custom AI teams',
  ],
  authors: [{ name: 'Flowkart' }],
  openGraph: {
    title: 'Flowkart — AI Native Agency',
    description:
      'Custom multi-agent orchestration with LangChain & LangGraph. We build AI teams that run your business.',
    url: 'https://flowkart.ai',
    siteName: 'Flowkart',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowkart — AI Native Agency',
    description:
      'Custom multi-agent orchestration with LangChain & LangGraph.',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

- [ ] **Step 2: Add structured data (JSON-LD) to layout.tsx**

Add a `<script>` tag with Organization and WebSite structured data inside the `<head>` via Next.js metadata API:

```tsx
// Add to layout.tsx after the metadata export:

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Flowkart',
        url: 'https://flowkart.ai',
        description:
          'AI Native Agency building custom multi-agent teams using LangChain & LangGraph.',
        email: 'hello@flowkart.ai',
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        name: 'Flowkart',
        url: 'https://flowkart.ai',
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create app/sitemap.ts**

```typescript
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://flowkart.ai',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

- [ ] **Step 4: Create app/robots.ts**

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://flowkart.ai/sitemap.xml',
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: add SEO metadata, structured data, sitemap, and robots.txt"
```

---

### Task 22: Performance Audit & Deploy Prep

**Files:**
- Possibly modify various files based on audit results

**Reference:** CREATIVE-BRIEF.md Section 8 (Performance Strategy) and Section 11 (Quality Benchmarks)

- [ ] **Step 1: Build and check for errors**

```bash
npm run build
```

Fix any TypeScript errors or build warnings.

- [ ] **Step 2: Run Lighthouse audit**

```bash
npm run start
```

Open Chrome DevTools → Lighthouse → Run audit (Performance, Accessibility, Best Practices, SEO).

Target scores:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 90

- [ ] **Step 3: Check bundle size**

```bash
npx @next/bundle-analyzer
```

Or check the build output for JS bundle sizes. Target: < 250KB gzipped total.

Key optimizations if bundle is too large:
- Ensure GSAP plugins are tree-shaken (only import what's used)
- Verify Tailwind CSS is purging unused utilities
- Check for accidental large dependencies

- [ ] **Step 4: Verify Core Web Vitals**

Using Chrome DevTools Performance panel:
- LCP < 2.5s (goal: < 1.5s) — hero text should render fast
- INP < 200ms — no blocking JS in event handlers
- CLS < 0.1 — no layout shifts (fonts use `font-display: block/swap`)

- [ ] **Step 5: Deploy preparation**

Ensure the project is ready for Vercel deployment:
- All environment variables documented (none needed for V1)
- Build passes without errors
- No hardcoded localhost URLs

```bash
# Verify clean build
npm run build

# Final commit
git add -A
git commit -m "chore: performance optimizations and deploy prep"
```

- [ ] **Step 6: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect the git repo to Vercel dashboard for automatic deployments.

Verify production site:
- All animations play correctly
- Fonts load without FOUT/FOIT issues
- Smooth scroll works
- Mobile menu functions
- All sections render

---

## Post-Launch Tasks (Future)

These are NOT part of this plan but are documented for future work:

1. **Dark Mode Toggle** — CSS variable inversion (colors mapped in CREATIVE-BRIEF.md Section 3.3)
2. **Payload CMS Integration** — Content management for blog/services pages
3. **Agent Profiles Page** — Deep-dive into each agent's capabilities
4. **Contact Form** — Standalone page with form validation
5. **Blog** — Content marketing pages
6. **Analytics** — Vercel Analytics or Plausible integration
7. **3D Agent Network** — React Three Fiber visualization (optional future enhancement)

---

*Plan created March 2026. Reference: CREATIVE-BRIEF.md for all design decisions, color values, typography specs, and animation timelines.*
