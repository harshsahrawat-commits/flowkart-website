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

// [TODO] Replace placeholder copy below with TaskOrbit's real content once the
// positioning is finalized. Array lengths / shapes are kept so the existing
// animations keep working — only the human-readable strings are placeholders.

export const AGENTS = [
  { name: '[TODO: item 1]', description: '[TODO: description]', icon: 'search' },
  { name: '[TODO: item 2]', description: '[TODO: description]', icon: 'megaphone' },
  { name: '[TODO: item 3]', description: '[TODO: description]', icon: 'chart' },
  { name: '[TODO: item 4]', description: '[TODO: description]', icon: 'send' },
  { name: '[TODO: item 5]', description: '[TODO: description]', icon: 'code' },
  { name: '[TODO: item 6]', description: '[TODO: description]', icon: 'pen' },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    verb: '[TODO: verb]',
    title: '[TODO: step title]',
    description: '[TODO: step description]',
    color: 'teal', // #15616D
  },
  {
    number: '02',
    verb: '[TODO: verb]',
    title: '[TODO: step title]',
    description: '[TODO: step description]',
    color: 'orange', // #FF7D00
  },
  {
    number: '03',
    verb: '[TODO: verb]',
    title: '[TODO: step title]',
    description: '[TODO: step description]',
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
    command: 'taskorbit deploy --team alpha',
    agents: [
      { name: '[TODO: agent 1]', status: '[TODO: status]' },
      { name: '[TODO: agent 2]', status: '[TODO: status]' },
      { name: '[TODO: agent 3]', status: '[TODO: status]' },
      { name: '[TODO: agent 4]', status: '[TODO: status]' },
    ],
  },
  {
    command: 'taskorbit deploy --team beta',
    agents: [
      { name: '[TODO: agent 1]', status: '[TODO: status]' },
      { name: '[TODO: agent 2]', status: '[TODO: status]' },
      { name: '[TODO: agent 3]', status: '[TODO: status]' },
      { name: '[TODO: agent 4]', status: '[TODO: status]' },
    ],
  },
  {
    command: 'taskorbit deploy --team gamma',
    agents: [
      { name: '[TODO: agent 1]', status: '[TODO: status]' },
      { name: '[TODO: agent 2]', status: '[TODO: status]' },
      { name: '[TODO: agent 3]', status: '[TODO: status]' },
      { name: '[TODO: agent 4]', status: '[TODO: status]' },
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
    label: '[TODO: label]',
    icon: '🎯',
    oldWay: '[TODO: old way]',
    newWay: '[TODO: new way]',
  },
  {
    id: 'scale',
    label: '[TODO: label]',
    icon: '⚡',
    oldWay: '[TODO: old way]',
    newWay: '[TODO: new way]',
  },
  {
    id: 'adaptability',
    label: '[TODO: label]',
    icon: '🔄',
    oldWay: '[TODO: old way]',
    newWay: '[TODO: new way]',
  },
] as const

// ============================================
// Services — Claude Code-style Terminal Scenario
// Reference: Design Spec Section 4
// ============================================

export const SCENARIO_STEPS = [
  {
    type: 'command' as const,
    text: 'taskorbit deploy --team alpha',
  },
  {
    type: 'agent' as const,
    agent: '[TODO: agent 1]',
    substeps: [
      '[TODO: substep]',
      '[TODO: substep]',
      '[TODO: substep] ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: '[TODO: agent 2]',
    substeps: [
      '[TODO: substep]',
      '[TODO: substep]',
      '[TODO: substep] ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: '[TODO: agent 3]',
    substeps: [
      '[TODO: substep]',
      '[TODO: substep]',
      '[TODO: substep] ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: '[TODO: agent 4]',
    substeps: [
      '[TODO: substep]',
      '[TODO: substep]',
      '[TODO: substep] ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: '[TODO: agent 5]',
    substeps: [
      '[TODO: substep]',
      '[TODO: substep]',
      '[TODO: substep] ✓',
    ],
  },
  {
    type: 'agent' as const,
    agent: '[TODO: agent 6]',
    substeps: [
      '[TODO: substep]',
      '[TODO: substep]',
      '[TODO: substep] ✓',
    ],
  },
  {
    type: 'result' as const,
    text: '[TODO: result summary]',
  },
] as const
