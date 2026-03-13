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
