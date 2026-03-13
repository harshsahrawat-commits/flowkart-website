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
