// Core types matching Prisma models
export type Role = 'worker' | 'manager'
export type Mood = 'low' | 'neutral' | 'high'
export type FrictionTag = 'meetings' | 'unclear' | 'context' | 'tools' | 'fatigue'
export type ExperimentStatus = 'proposed' | 'running' | 'done'

// AI Agent types
export type AgentType = 'human' | 'ai_manager' | 'ai_worker'
export type AgentStatus = 'idle' | 'thinking' | 'waiting_approval' | 'running' | 'blocked' | 'done'
export type TaskStatus = 'todo' | 'doing' | 'review' | 'done' | 'blocked'
export type MessageKind = 'plan' | 'critique' | 'action' | 'result' | 'report'

export interface User {
  id: string
  name: string
  role: Role
  teamId?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  teamId?: string
  ownerId: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Agent {
  id: string
  projectId: string
  userId?: string
  type: AgentType
  role: string
  skills: string[]
  tools: string[]
  llm?: string
  status: AgentStatus
  lastSeen: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: TaskStatus
  ownerAgentId?: string
  createdAt: string
  updatedAt: string
}

export interface AgentMessage {
  id: string
  projectId: string
  agentId: string
  kind: MessageKind
  text: string
  data?: any
  runId?: string
  model?: string
  createdAt: string
}

// AI response schemas
export interface ManagerPlan {
  summary: string
  tasks: Array<{
    title: string
    why: string
    owner: 'ai' | 'human'
    skills: string[]
    estimateH: number
  }>
  risks: string[]
  checkins: string[]
}

export interface WorkerResult {
  summary: string
  artifacts: Array<{
    type: 'code' | 'doc' | 'script'
    path: string
    content: string
  }>
  next: string[]
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
