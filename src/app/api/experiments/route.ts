import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const createExperimentSchema = z.object({
  title: z.string(),
  rationale: z.string().optional(),
})

const updateExperimentSchema = z.object({
  status: z.enum(['proposed', 'running', 'done']).optional(),
  outcome: z.string().optional(),
})

export async function GET() {
  try {
    const experiments = await prisma.experiment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(experiments)
  } catch (error) {
    console.error('Error fetching experiments:', error)
    return NextResponse.json({ error: 'Failed to fetch experiments' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, rationale } = createExperimentSchema.parse(body)

    const experiment = await prisma.experiment.create({
      data: {
        title,
        rationale,
      },
    })

    return NextResponse.json(experiment)
  } catch (error) {
    console.error('Error creating experiment:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create experiment' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Experiment ID required' }, { status: 400 })
    }

    const body = await req.json()
    const updateData = updateExperimentSchema.parse(body)

    const experiment = await prisma.experiment.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(experiment)
  } catch (error) {
    console.error('Error updating experiment:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update experiment' }, { status: 500 })
  }
}
