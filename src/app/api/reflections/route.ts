import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createReflectionSchema = z.object({
  userId: z.string(),
  mood: z.enum(['low', 'neutral', 'high']),
  note: z.string().optional(),
})

export async function GET() {
  try {
    const reflections = await prisma.reflection.findMany({
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
    return NextResponse.json(reflections)
  } catch (error) {
    console.error('Error fetching reflections:', error)
    return NextResponse.json({ error: 'Failed to fetch reflections' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, mood, note } = createReflectionSchema.parse(body)

    const reflection = await prisma.reflection.create({
      data: {
        userId,
        mood,
        note,
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

    return NextResponse.json(reflection)
  } catch (error) {
    console.error('Error creating reflection:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create reflection' }, { status: 500 })
  }
}
