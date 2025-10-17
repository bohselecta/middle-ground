export interface AIJob {
  runId: string
  type: 'plan' | 'execute'
  projectId: string
  status: 'pending' | 'running' | 'done' | 'error'
}

// Future-safe structure for moving to queues/cron
// Keep execution synchronous now, but designed for async migration

