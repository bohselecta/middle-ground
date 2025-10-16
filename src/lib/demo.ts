export const DEMO_TEAM = {
  intent: 'Clarify sprint goals',
  method: 'Reduce meeting load',
  alignment: 0.78,
  moods: { high: 12, neutral: 6, low: 3 },
  frictions: { 
    meetings: 7, 
    unclear: 4, 
    tools: 2, 
    context: 1, 
    fatigue: 2 
  },
}

export function isDemoMode(search: URLSearchParams) {
  return search.get('demo') === '1'
}

export const DEMO_REFLECTIONS = [
  { mood: 'high', note: 'Great focus session this morning', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  { mood: 'neutral', note: 'Productive day overall', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { mood: 'high', note: 'Team aligned on priorities', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
]

export const DEMO_FRICTIONS = [
  { tag: 'meetings', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  { tag: 'unclear', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { tag: 'meetings', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
]

export const DEMO_EXPERIMENTS = [
  { 
    title: 'Focus mornings', 
    rationale: 'Reduce meeting load before 11am', 
    status: 'running',
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  { 
    title: 'Async standup', 
    rationale: 'Try Slack thread instead of meeting', 
    status: 'proposed' 
  },
]
