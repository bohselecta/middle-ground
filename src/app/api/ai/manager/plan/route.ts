import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { assertProjectMember } from '@/lib/acl'
import { llmChat } from '@/lib/llm'
import { MANAGER_SYSTEM, MANAGER_PROMPT_V1, planPrompt } from '@/ai/personas/manager'
import { PlanSchema } from '@/lib/ai-schemas'

function safeJSON(s: string) {
  try {
    return JSON.parse(s)
  } catch {
    return { summary: s }
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { projectId, goal, context = '', includeReflections = false } = await req.json()
    
    // Verify user has access to this project
    await assertProjectMember(prisma, session.user.id, projectId)

    // Check if user is in safe mode
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { safeMode: true }
    })

    if (user?.safeMode) {
      return new NextResponse('AI execution disabled in Safe Mode', { status: 403 })
    }

    // Find AI manager for this project
    const manager = await prisma.agent.findFirst({
      where: { projectId, type: 'ai_manager' }
    })

    if (!manager) {
      return new NextResponse('No AI manager found for this project', { status: 404 })
    }

    // Build context (never include reflections unless explicitly requested)
    let fullContext = context
    if (includeReflections) {
      const reflections = await prisma.reflection.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { mood: true, note: true, createdAt: true }
      })
      fullContext += `\n\nRecent reflections: ${JSON.stringify(reflections)}`
    }

    // Call LLM
    const { content, runId, tokenEstimate } = await llmChat([
      { role: 'system', content: MANAGER_SYSTEM },
      { role: 'user', content: planPrompt(goal, fullContext) },
    ], {
      userId: session.user.id,
      projectId
    })

    // Validate response with Zod
    const plan = PlanSchema.parse(safeJSON(content))

    // Store message
    const msg = await prisma.agentMessage.create({
      data: {
        projectId,
        agentId: manager.id,
        kind: 'plan',
        text: content,
        data: {
          ...plan,
          runId,
          promptVersion: MANAGER_PROMPT_V1,
          tokenEstimate
        },
        runId,
        model: 'deepseek-chat'
      }
    })

    // Create tasks for human-owned items
    const humanTasks = plan.tasks.filter(task => task.owner === 'human')
    if (humanTasks.length > 0) {
      await prisma.task.createMany({
        data: humanTasks.map(task => ({
          projectId,
          title: task.title,
          description: task.why,
          status: 'todo'
        }))
      })
    }

    // Log for observability
    console.info({
      runId,
      projectId,
      type: 'plan',
      status: 'done',
      tokenEstimate,
      taskCount: plan.tasks.length
    })

    return NextResponse.json({ plan, messageId: msg.id, runId })
  } catch (error) {
    console.error('Error generating plan:', error)
    if (error instanceof Error) {
      if (error.message === 'FORBIDDEN') {
        return new NextResponse('Forbidden', { status: 403 })
      }
      if (error.message === 'RATE_LIMIT_EXCEEDED') {
        return new NextResponse('Too many AI requests. Please wait a moment.', { status: 429 })
      }
      if (error.message === 'BUDGET_EXCEEDED') {
        return new NextResponse('Daily AI budget reached. Resets at midnight UTC.', { status: 429 })
      }
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
