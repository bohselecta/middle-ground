export const brand = {
  name: 'Tablature',
  tagline: 'Clarity at work — made simple, safe, and shared.',
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
    frictionLogged: 'Thanks — this helps us improve how things run.',
    reflectionSaved: 'Insight saved — helps refine our flow.',
    consensus: 'Aligned. Let\'s see how this works together.',
    emptyState: 'No notes yet — clarity starts here.',
    
    // Context-specific messaging
    conflict: 'Let\'s pause and clarify where expectations diverged.',
    quit: 'Sometimes paths diverge. Let\'s close things clearly and respectfully.',
    fire: 'This change supports both growth and clarity moving forward.',
    
    // System states
    success: 'All clear.',
    progress: 'In review.',
    warning: 'Needs clarification.',
    error: 'Out of alignment.',
    
    // Tooltips & microtext
    managerTooltip: 'Patterns tell truths — use them with care.',
    privacyNote: 'Reflections stay private unless you choose to share.',
    safetyNote: 'Log what\'s unclear — not who\'s at fault.',
    requestNote: 'Requests are how alignment begins.',
    
    // Culture & celebration
    cultureCelebration: 'Clear communication worth celebrating.',
  },
} as const;
