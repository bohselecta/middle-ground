import { Reflection, Friction } from '@/lib/types'

export function aggregateMoods(reflections: Pick<Reflection, 'mood'>[]): {
  low: number
  neutral: number
  high: number
} {
  const total = reflections.length
  if (total === 0) return { low: 0, neutral: 0, high: 0 }

  const counts = reflections.reduce(
    (acc, reflection) => {
      acc[reflection.mood]++
      return acc
    },
    { low: 0, neutral: 0, high: 0 }
  )

  return {
    low: Math.round((counts.low / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100),
    high: Math.round((counts.high / total) * 100),
  }
}

export function groupFrictions(frictions: Pick<Friction, 'tag'>[]): Record<string, number> {
  return frictions.reduce((acc, friction) => {
    acc[friction.tag] = (acc[friction.tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

export function calculateTrends(
  reflections: Pick<Reflection, 'mood' | 'date'>[],
  frictions: Pick<Friction, 'date'>[],
  days: number
): {
  moodDelta: number
  frictionDelta: number
  experimentsCompleted: number
} {
  const now = new Date()
  const midPoint = new Date(now.getTime() - (days / 2) * 24 * 60 * 60 * 1000)

  // Calculate mood trends
  const recentReflections = reflections.filter(r => new Date(r.date) >= midPoint)
  const olderReflections = reflections.filter(r => new Date(r.date) < midPoint)
  
  const recentMoodAvg = recentReflections.length > 0 
    ? recentReflections.reduce((sum, r) => sum + (r.mood === 'high' ? 1 : r.mood === 'neutral' ? 0.5 : 0), 0) / recentReflections.length
    : 0
    
  const olderMoodAvg = olderReflections.length > 0
    ? olderReflections.reduce((sum, r) => sum + (r.mood === 'high' ? 1 : r.mood === 'neutral' ? 0.5 : 0), 0) / olderReflections.length
    : 0

  const moodDelta = Math.round((recentMoodAvg - olderMoodAvg) * 100)

  // Calculate friction trends
  const recentFrictions = frictions.filter(f => new Date(f.date) >= midPoint)
  const olderFrictions = frictions.filter(f => new Date(f.date) < midPoint)
  
  const frictionDelta = olderFrictions.length > 0
    ? Math.round(((recentFrictions.length - olderFrictions.length) / olderFrictions.length) * 100)
    : recentFrictions.length > 0 ? 100 : 0

  return {
    moodDelta,
    frictionDelta,
    experimentsCompleted: 0, // This would be calculated from experiments data
  }
}

export function anonymizeReflections(reflections: Reflection[]): Pick<Reflection, 'mood' | 'date'>[] {
  return reflections.map(r => ({
    mood: r.mood,
    date: r.date,
  }))
}

export function anonymizeFrictions(frictions: Friction[]): Pick<Friction, 'tag' | 'date'>[] {
  return frictions.map(f => ({
    tag: f.tag,
    date: f.date,
  }))
}
