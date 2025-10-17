import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get last 10 AI runs from AgentMessage
    const runs = await prisma.agentMessage.findMany({
      where: {
        runId: { not: null },
        OR: [
          { kind: 'plan' },
          { kind: 'action' }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        runId: true,
        kind: true,
        model: true,
        createdAt: true,
        data: true,
        agent: {
          select: {
            type: true,
            role: true
          }
        }
      }
    })

    // Format for health endpoint
    const healthData = runs.map(run => ({
      runId: run.runId,
      kind: run.kind,
      model: run.model,
      status: 'done', // All stored runs are completed
      duration: 0, // Could calculate from timestamps if needed
      tokenEstimate: run.data?.tokenEstimate || 0,
      createdAt: run.createdAt,
      agentType: run.agent.type,
      agentRole: run.agent.role
    }))

    return NextResponse.json({ runs: healthData })
  } catch (error) {
    console.error('Error fetching AI health:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

