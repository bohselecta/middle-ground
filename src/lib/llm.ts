import { createId } from '@paralleldrive/cuid2'

export type LLMMessage = { role: 'system'|'user'|'assistant'; content: string }

// Rate limiting cache (in-memory for MVP)
const rateLimitCache = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_PER_MINUTE = 30

// Budget tracking (in-memory for MVP)
const budgetCache = new Map<string, { spent: number; resetTime: number }>()

function getRateLimitKey(userId: string, projectId: string): string {
  return `rate:${userId}:${projectId}`
}

function getBudgetKey(projectId: string): string {
  return `budget:${projectId}`
}

function checkRateLimit(userId: string, projectId: string): boolean {
  const key = getRateLimitKey(userId, projectId)
  const now = Date.now()
  const minuteMs = 60 * 1000
  
  const current = rateLimitCache.get(key)
  if (!current || now > current.resetTime) {
    rateLimitCache.set(key, { count: 1, resetTime: now + minuteMs })
    return true
  }
  
  if (current.count >= RATE_LIMIT_PER_MINUTE) {
    return false
  }
  
  current.count++
  return true
}

function checkBudget(projectId: string): boolean {
  const key = getBudgetKey(projectId)
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000
  const budgetCents = parseInt(process.env.LLM_BUDGET_CENTS_PER_DAY || '500')
  
  const current = budgetCache.get(key)
  if (!current || now > current.resetTime) {
    budgetCache.set(key, { spent: 0, resetTime: now + dayMs })
    return true
  }
  
  // Rough estimate: 1 cent per 1000 tokens
  const estimatedCost = 1 // cents per request
  if (current.spent + estimatedCost > budgetCents) {
    return false
  }
  
  current.spent += estimatedCost
  return true
}

export async function llmChat(
  messages: LLMMessage[], 
  opts?: { 
    model?: string; 
    temperature?: number;
    userId?: string;
    projectId?: string;
  }
): Promise<{ content: string; runId: string; tokenEstimate: number }> {
  // Rate limiting check
  if (opts?.userId && opts?.projectId) {
    if (!checkRateLimit(opts.userId, opts.projectId)) {
      throw new Error('RATE_LIMIT_EXCEEDED')
    }
    
    if (!checkBudget(opts.projectId)) {
      throw new Error('BUDGET_EXCEEDED')
    }
  }

  const base = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'
  const model = opts?.model || process.env.DEEPSEEK_MODEL || 'deepseek-chat'
  const temperature = opts?.temperature ?? 0.2
  const runId = createId()
  
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}` 
    },
    body: JSON.stringify({ 
      model, 
      temperature, 
      messages,
      stream: false
    })
  })
  
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`LLM error ${res.status}: ${errorText}`)
  }
  
  const j = await res.json()
  const content = j.choices?.[0]?.message?.content as string
  
  // Rough token estimation (4 chars per token)
  const tokenEstimate = Math.ceil(content.length / 4)
  
  return { content, runId, tokenEstimate }
}

