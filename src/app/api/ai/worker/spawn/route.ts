import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { assertProjectMember } from '@/lib/acl'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { 
      projectId, 
      role = 'worker', 
      skills = ['coding'], 
      tools = ['cursor'], 
      llm = 'deepseek-chat' 
    } = await req.json()
    
    // Verify user has access to this project
    await assertProjectMember(prisma, session.user.id, projectId)

    const agent = await prisma.agent.create({
      data: {
        projectId,
        type: 'ai_worker',
        role,
        skills,
        tools,
        llm
      }
    })

    return NextResponse.json(agent)
  } catch (error) {
    console.error('Error spawning AI worker:', error)
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return new NextResponse('Forbidden', { status: 403 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

