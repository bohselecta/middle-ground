import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createFrictionSchema = z.object({
  userId: z.string(),
  tag: z.enum(['meetings', 'unclear', 'context', 'tools', 'fatigue']),
})

export async function GET() {
  try {
    const frictions = await prisma.friction.findMany({
      orderBy: { date: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    })
    return NextResponse.json(frictions)
  } catch (error) {
    console.error('Error fetching frictions:', error)
    return NextResponse.json({ error: 'Failed to fetch frictions' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, tag } = createFrictionSchema.parse(body)

    const friction = await prisma.friction.create({
      data: {
        userId,
        tag,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json(friction)
  } catch (error) {
    console.error('Error creating friction:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create friction' }, { status: 500 })
  }
}
