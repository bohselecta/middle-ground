import { z } from 'zod'

export const PlanSchema = z.object({
  summary: z.string(),
  tasks: z.array(z.object({
    title: z.string(),
    why: z.string().optional().default(""),
    owner: z.enum(['ai','human']),
    skills: z.array(z.string()).default([]),
    estimateH: z.number().nonnegative().default(1)
  })).default([]),
  risks: z.array(z.string()).default([]),
  checkins: z.array(z.string()).default([])
})

export const WorkerResultSchema = z.object({
  summary: z.string(),
  artifacts: z.array(z.object({
    type: z.enum(['code','doc','script']),
    path: z.string(),
    content: z.string()
  })).default([]),
  next: z.array(z.string()).default([])
})

export type ManagerPlan = z.infer<typeof PlanSchema>
export type WorkerResult = z.infer<typeof WorkerResultSchema>

