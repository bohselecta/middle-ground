// Core types matching Prisma models
export type Role = 'worker' | 'manager'
export type Mood = 'low' | 'neutral' | 'high'
export type FrictionTag = 'meetings' | 'unclear' | 'context' | 'tools' | 'fatigue'
export type ExperimentStatus = 'proposed' | 'running' | 'done'

export interface User {
  id: string
  name: string
  role: Role
  teamId?: string
  createdAt: string
  updatedAt: string
}

export interface Reflection {
  id: string
  userId: string
  date: string
  mood: Mood
  note?: string
  createdAt: string
  updatedAt: string
}

export interface Friction {
  id: string
  userId: string
  date: string
  tag: FrictionTag
  createdAt: string
  updatedAt: string
}

export interface Experiment {
  id: string
  title: string
  status: ExperimentStatus
  start?: string
  end?: string
  rationale?: string
  outcome?: string
  createdAt: string
  updatedAt: string
}

export interface OverrideLog {
  id: string
  managerId: string
  reason: string
  date: string
  createdAt: string
  updatedAt: string
}

export interface Appreciation {
  id: string
  userId: string
  emoji: string
  message?: string
  createdAt: string
  updatedAt: string
}

// Helper types for UI
export interface FlowPoint {
  t: number
  intensity: number
}

export interface TeamInsights {
  moodDistribution: {
    low: number
    neutral: number
    high: number
  }
  frictionCounts: Record<FrictionTag, number>
  weeklyTrends: {
    moodDelta: number
    frictionDelta: number
    experimentsCompleted: number
  }
  cultureHealthIndex: number
}

export interface PrivacySettings {
  shareAnonymizedTrends: boolean
  optOutManagerView: boolean
  calmMode: boolean
}
