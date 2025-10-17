import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { assertProjectMember } from '@/lib/acl'
import { llmChat } from '@/lib/llm'
import { WORKER_SYSTEM, WORKER_PROMPT_V1, execPrompt } from '@/ai/personas/worker'
import { WorkerResultSchema } from '@/lib/ai-schemas'

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

    const { projectId, agentId, taskId } = await req.json()
    
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

    // Find the task
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!task) {
      return new NextResponse('Task not found', { status: 404 })
    }

    // Find the agent
    const agent = await prisma.agent.findUnique({
      where: { id: agentId }
    })

    if (!agent) {
      return new NextResponse('Agent not found', { status: 404 })
    }

    // Build context
    const context = `Project: ${projectId}\nRepository: (connect later)\nCoding standards: (link)\n`

    // Call LLM
    const { content, runId, tokenEstimate } = await llmChat([
      { role: 'system', content: WORKER_SYSTEM },
      { role: 'user', content: execPrompt(`${task.title}\n${task.description ?? ''}`, context) },
    ], {
      userId: session.user.id,
      projectId
    })

    // Validate response with Zod
    const result = WorkerResultSchema.parse(safeJSON(content))

    // Store message
    const msg = await prisma.agentMessage.create({
      data: {
        projectId,
        agentId,
        kind: 'action',
        text: content,
        data: {
          ...result,
          runId,
          promptVersion: WORKER_PROMPT_V1,
          tokenEstimate
        },
        runId,
        model: 'deepseek-chat'
      }
    })

    // Log for observability
    console.info({
      runId,
      projectId,
      taskId,
      type: 'execute',
      status: 'done',
      tokenEstimate,
      artifactCount: result.artifacts.length
    })

    return NextResponse.json({ result, messageId: msg.id, runId })
  } catch (error) {
    console.error('Error executing task:', error)
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

