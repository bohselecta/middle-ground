import { Reflection, Friction, User } from '@/lib/types'

// Generate realistic reflection patterns
export function generateReflections(userId: string, days: number = 7): Omit<Reflection, 'id' | 'createdAt' | 'updatedAt'>[] {
  const reflections: Omit<Reflection, 'id' | 'createdAt' | 'updatedAt'>[] = []
  const now = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    
    // Skip weekends occasionally
    if (date.getDay() === 0 || date.getDay() === 6) {
      if (Math.random() < 0.3) continue
    }

    // Generate mood based on day of week and some randomness
    let mood: 'low' | 'neutral' | 'high'
    const dayOfWeek = date.getDay()
    
    if (dayOfWeek === 1) { // Monday
      mood = Math.random() < 0.4 ? 'low' : Math.random() < 0.7 ? 'neutral' : 'high'
    } else if (dayOfWeek === 5) { // Friday
      mood = Math.random() < 0.6 ? 'high' : Math.random() < 0.8 ? 'neutral' : 'low'
    } else {
      const rand = Math.random()
      mood = rand < 0.3 ? 'low' : rand < 0.7 ? 'neutral' : 'high'
    }

    // Generate note occasionally
    let note: string | undefined
    if (Math.random() < 0.4) {
      const notes = [
        'Great focus today, completed the main feature',
        'Steady progress, some interruptions',
        'Feeling overwhelmed with meetings',
        'Productive morning, afternoon was challenging',
        'Team collaboration went well',
        'Struggled with context switching',
        'Deep work session was very productive',
        'Too many distractions today',
        'Good energy, accomplished a lot',
        'Feeling burnt out, need a break',
      ]
      note = notes[Math.floor(Math.random() * notes.length)]
    }

    reflections.push({
      userId,
      date: date.toISOString(),
      mood,
      note,
    })
  }

  return reflections
}

// Generate random friction tags
export function generateFrictions(userId: string, days: number = 7): Omit<Friction, 'id' | 'createdAt' | 'updatedAt'>[] {
  const frictions: Omit<Friction, 'id' | 'createdAt' | 'updatedAt'>[] = []
  const now = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    
    // Generate 0-3 frictions per day
    const frictionCount = Math.floor(Math.random() * 4)
    
    for (let j = 0; j < frictionCount; j++) {
      const tags: Array<'meetings' | 'unclear' | 'context' | 'tools' | 'fatigue'> = [
        'meetings', 'unclear', 'context', 'tools', 'fatigue'
      ]
      
      const tag = tags[Math.floor(Math.random() * tags.length)]
      
      // Add some randomness to the time within the day
      const hour = Math.floor(Math.random() * 8) + 9 // 9am to 5pm
      const minute = Math.floor(Math.random() * 60)
      date.setHours(hour, minute, 0, 0)
      
      frictions.push({
        userId,
        date: date.toISOString(),
        tag,
      })
    }
  }

  return frictions
}

// Generate sample users
export function generateUsers(): Omit<User, 'createdAt' | 'updatedAt'>[] {
  return [
    {
      id: 'demo-worker',
      name: 'Demo Worker',
      role: 'worker',
      teamId: 'demo-team',
    },
    {
      id: 'demo-manager',
      name: 'Demo Manager',
      role: 'manager',
      teamId: 'demo-team',
    },
    {
      id: 'worker-2',
      name: 'Alex Chen',
      role: 'worker',
      teamId: 'demo-team',
    },
    {
      id: 'worker-3',
      name: 'Sam Rodriguez',
      role: 'worker',
      teamId: 'demo-team',
    },
    {
      id: 'worker-4',
      name: 'Jordan Kim',
      role: 'worker',
      teamId: 'demo-team',
    },
  ]
}

// Generate sample experiments
export function generateExperiments(): Array<{
  title: string
  status: 'proposed' | 'running' | 'done'
  rationale?: string
  outcome?: string
}> {
  return [
    {
      title: 'No-Meeting Mornings',
      status: 'proposed',
      rationale: 'Focus time in the morning leads to better productivity and reduced context switching',
    },
    {
      title: 'Async Retrospectives',
      status: 'running',
      rationale: 'Reduce meeting fatigue while maintaining team alignment and feedback',
    },
    {
      title: 'Focus Friday',
      status: 'done',
      rationale: 'Dedicated deep work day to wrap up the week',
      outcome: 'Team reported 40% increase in productivity on Fridays',
    },
    {
      title: 'Slack Quiet Hours',
      status: 'proposed',
      rationale: 'Reduce interruptions during focus time',
    },
  ]
}

// Generate sample override logs
export function generateOverrideLogs(): Array<{
  managerId: string
  reason: string
  date: string
}> {
  return [
    {
      managerId: 'demo-manager',
      reason: 'Sprint priority shift due to client request',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      managerId: 'demo-manager',
      reason: 'Meeting schedule change based on team feedback',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      managerId: 'demo-manager',
      reason: 'Deadline adjustment for critical feature',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
  ]
}

// Generate sample appreciations
export function generateAppreciations(): Array<{
  userId: string
  emoji: string
  message?: string
}> {
  const emojis = ['🌸', '💡', '🙌', '🚀', '✨', '💪', '🎯', '🌈', '🔥', '⭐']
  const messages = [
    'Great collaboration today',
    'Brilliant solution',
    'Amazing teamwork',
    'Love the energy',
    'Excellent problem solving',
    'Outstanding work',
    'Perfect execution',
    'Creative thinking',
    'Solid contribution',
    'Well done!',
  ]

  const users = ['A', 'B', 'C', 'D', 'E']
  const appreciations: Array<{ userId: string; emoji: string; message?: string }> = []

  for (let i = 0; i < 10; i++) {
    appreciations.push({
      userId: users[Math.floor(Math.random() * users.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      message: Math.random() < 0.7 ? messages[Math.floor(Math.random() * messages.length)] : undefined,
    })
  }

  return appreciations
}

// Generate realistic team insights
export function generateTeamInsights() {
  return {
    moodDistribution: {
      low: Math.floor(Math.random() * 20) + 10, // 10-30%
      neutral: Math.floor(Math.random() * 30) + 30, // 30-60%
      high: Math.floor(Math.random() * 30) + 20, // 20-50%
    },
    frictionCounts: {
      meetings: Math.floor(Math.random() * 10) + 5,
      unclear: Math.floor(Math.random() * 8) + 2,
      context: Math.floor(Math.random() * 6) + 1,
      tools: Math.floor(Math.random() * 4) + 1,
      fatigue: Math.floor(Math.random() * 5) + 1,
    },
    weeklyTrends: {
      moodDelta: Math.floor(Math.random() * 20) - 10, // -10 to +10%
      frictionDelta: Math.floor(Math.random() * 30) - 15, // -15 to +15%
      experimentsCompleted: Math.floor(Math.random() * 3) + 1,
    },
    cultureHealthIndex: Math.floor(Math.random() * 30) + 60, // 60-90
  }
}
