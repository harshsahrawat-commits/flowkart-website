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
    name: 'Copywriter',
    description: 'Creates on-brand content aligned with strategy — from blogs to ad copy.',
    icon: 'pen',
  },
] as const

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

// ============================================
// Agent Workflow Comparison Rows
// Reference: Design Spec — AgentWorkflow Redesign
// ============================================

export const COMPARISON_ROWS = [
  {
    id: 'quality',
    label: 'Quality',
    icon: '🎯',
    oldWay: 'Generic, one-size-fits-all outputs',
    newWay: 'Research-backed content tailored to your market',
  },
  {
    id: 'scale',
    label: 'Scale',
    icon: '⚡',
    oldWay: 'One task, one tool, one output',
    newWay: 'Entire workflows running in parallel',
  },
  {
    id: 'adaptability',
    label: 'Adaptability',
    icon: '🔄',
    oldWay: 'Breaks when things change',
    newWay: 'Agents learn, adjust, and re-route in real time',
  },
] as const

// ============================================
// Services — Claude Code-style Terminal Scenario
// Reference: Design Spec Section 4
// ============================================

export const SCENARIO_STEPS = [
  {
    type: 'command' as const,
    text: 'flowkart deploy --team marketing',
  },
  {
    type: 'agent' as const,
    agent: 'Research',
    substeps: [
      'Scanning 12 competitors in productivity space…',
      'Positioning gap: "automation for solo founders"',
      'Market brief generated ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: 'Finance',
    substeps: [
      'Modeling campaign budget at $2,400/mo…',
      'Projected CAC: $18 · break-even at 134 signups',
      'Budget approved ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: 'Marketing',
    substeps: [
      'Reading Research brief…',
      'Strategy: LinkedIn ads + 5-part email drip',
      'Target locked: solo founders, <5 employees ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: 'Copywriter',
    substeps: [
      'Drafting landing page from strategy…',
      '3 email variants queued for A/B test',
      'Copy finalized ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: 'Development',
    substeps: [
      'Deploying landing page to /launch…',
      'Analytics + conversion pixels configured',
      'Live at flowkart.com/launch ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: 'Outreach',
    substeps: [
      'Launching 3 LinkedIn ad variants…',
      'Email sequence scheduled — sends over 14 days',
      'All channels active ✓',
    ],
  },
  {
    type: 'result' as const,
    text: 'Campaign deployed · 6 agents · 4 min · 0 handoffs',
  },
] as const
