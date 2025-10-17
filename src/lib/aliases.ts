import type { Reflection, Friction, Experiment } from '@prisma/client'

// UI-friendly type aliases (DB schema unchanged)
export type CheckIn = Reflection
export type Blocker = Friction
export type Trial = Experiment

// Re-export for convenience
export { Reflection, Friction, Experiment }
