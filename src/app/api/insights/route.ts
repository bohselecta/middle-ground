import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { aggregateMoods, groupFrictions, calculateTrends } from '@/lib/anonymize'

export async function GET() {
  try {
    // Get data from the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [reflections, frictions, experiments] = await Promise.all([
      prisma.reflection.findMany({
        where: {
          date: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          mood: true,
          date: true,
          userId: true,
        },
      }),
      prisma.friction.findMany({
        where: {
          date: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          tag: true,
          date: true,
          userId: true,
        },
      }),
      prisma.experiment.findMany({
        where: {
          status: 'done',
          updatedAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
    ])

    // Calculate insights
    const moodDistribution = aggregateMoods(reflections as any)
    const frictionCounts = groupFrictions(frictions as any)
    const weeklyTrends = calculateTrends(reflections as any, frictions as any, 7)
    
    // Calculate Culture Health Index (TAFI)
    const cultureHealthIndex = Math.round(
      (moodDistribution.high * 0.4) + 
      (weeklyTrends.frictionDelta < 0 ? 0.3 : 0) + 
      (experiments.length * 0.3)
    )

    const insights = {
      moodDistribution,
      frictionCounts,
      weeklyTrends,
      cultureHealthIndex,
      totalReflections: reflections.length,
      totalFrictions: frictions.length,
      completedExperiments: experiments.length,
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error('Error fetching insights:', error)
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 })
  }
}
