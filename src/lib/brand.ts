export const brand = {
  name: 'Tablature',
  tagline: 'Work in sync. With clarity.',
  colors: {
    ink: '#0F172A',
    mint: '#CFF3E6',
    amber: '#FFD8A8',
    coral: '#FFB3AB',
    royal: '#4D6BFE',
  },
  motion: { 
    spring: { stiffness: 120, damping: 18 }, 
    shimmerMs: 900 
  },
  radii: { card: '1.5rem' },
  tone: {
    // Core messaging
    frictionLogged: 'Thanks. This helps us fix how work happens.',
    reflectionSaved: 'Saved. Your insight improves your flow.',
    consensus: 'We\'re aligned. Let\'s try it.',
    emptyState: 'No notes yet. Start here.',
    
    // Context-specific messaging
    conflict: 'Let\'s clarify what didn\'t match.',
    quit: 'Let\'s close this well and clearly.',
    fire: 'This change aims for clarity and growth.',
    
    // System states
    success: 'All clear.',
    progress: 'In review.',
    warning: 'Needs clarity.',
    error: 'Out of alignment.',
    
    // Tooltips & microtext
    managerTooltip: 'Look for patterns. Use them kindly.',
    privacyNote: 'Reflections are private unless you share them.',
    safetyNote: 'Log what\'s unclear—not who\'s at fault.',
    requestNote: 'Requests begin alignment.',
    
    // Culture & celebration
    cultureCelebration: 'Clear communication is worth celebrating.',
  },
} as const;
