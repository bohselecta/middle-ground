import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Safety: aggregates only. No free text returned.
export async function GET() {
  try {
    // Last 7 days window
    const since = new Date(); since.setDate(since.getDate() - 7)

    // Reflections mood distribution
    const reflections = await prisma.reflection.groupBy({
      by: ['mood'],
      where: { date: { gte: since } },
      _count: { mood: true },
    })

    // Frictions by tag
    const frictions = await prisma.friction.groupBy({
      by: ['tag'],
      where: { date: { gte: since } },
      _count: { tag: true },
    })

    const totalRef = reflections.reduce((a, r) => a + r._count.mood, 0)
    const high = reflections.find(r => r.mood === 'high')?._count.mood ?? 0
    const neutral = reflections.find(r => r.mood === 'neutral')?._count.mood ?? 0
    const low = reflections.find(r => r.mood === 'low')?._count.mood ?? 0

    // Simple preview metric: alignment % = weighted mood minus friction pressure
    const moodScore = totalRef
      ? (high * 1.0 + neutral * 0.6 + low * 0.2) / totalRef
      : 0.7

    const totalFric = frictions.reduce((a, f) => a + f._count.tag, 0)
    const frictionPressure = totalFric ? Math.min(0.25 + totalFric * 0.02, 0.4) : 0.25

    const alignment = Math.max(0.05, Math.min(0.95, moodScore - frictionPressure + 0.35))

    // Suggest an intent/method preview from recent experiment titles if any
    const exp = await prisma.experiment.findFirst({
      orderBy: { start: 'desc' },
      select: { title: true },
    })

    return NextResponse.json({
      alignment, // 0..1
      intent: exp?.title ?? 'Clarify sprint goals',
      method: totalFric > 0 ? 'Reduce meeting load' : 'Maintain current plan',
      meta: {
        windowDays: 7,
        totals: { reflections: totalRef, frictions: totalFric },
      }
    })
  } catch (e) {
    // Fallback safe preview when DB is absent
    return NextResponse.json({
      alignment: 0.78,
      intent: 'Ship release 1.0',
      method: 'Refine deployment scripts',
      meta: { windowDays: 7, totals: { reflections: 0, frictions: 0 }, fallback: true }
    })
  }
}
