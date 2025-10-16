import { format, formatDistanceToNow, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { Reflection, Friction } from '@/lib/types'

// Date formatting utilities
export function formatRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getWeekRange(date: Date = new Date()) {
  return {
    start: startOfWeek(date),
    end: endOfWeek(date),
  }
}

export function groupByDay<T extends { date: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const day = format(new Date(item.date), 'yyyy-MM-dd')
    if (!groups[day]) {
      groups[day] = []
    }
    groups[day].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function getDaysInRange(start: Date, end: Date): Date[] {
  return eachDayOfInterval({ start, end })
}

// Flow calculation utilities
export function calculateFlowScore(reflections: Reflection[], frictions: Friction[]): number {
  if (reflections.length === 0) return 50 // Neutral baseline

  const recentReflections = reflections.slice(0, 7) // Last 7 days
  const recentFrictions = frictions.slice(0, 7)

  // Calculate mood score (0-100)
  const moodScore = recentReflections.reduce((sum, r) => {
    return sum + (r.mood === 'high' ? 100 : r.mood === 'neutral' ? 50 : 0)
  }, 0) / recentReflections.length

  // Calculate friction penalty
  const frictionPenalty = Math.min(recentFrictions.length * 10, 30)

  return Math.max(0, Math.min(100, moodScore - frictionPenalty))
}

export function getPeakEnergyHour(reflections: Reflection[]): string {
  if (reflections.length === 0) return '10am'

  const hourCounts: Record<number, number> = {}
  
  reflections.forEach(r => {
    const hour = new Date(r.date).getHours()
    if (r.mood === 'high') {
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    }
  })

  const peakHour = Object.entries(hourCounts).reduce((a, b) => 
    hourCounts[Number(a[0])] > hourCounts[Number(b[0])] ? a : b
  )[0]

  const hour = Number(peakHour)
  return hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`
}

export function calculateFocusStreak(reflections: Reflection[]): number {
  if (reflections.length === 0) return 0

  const sortedReflections = reflections
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7) // Last 7 days

  let streak = 0
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today)
    checkDate.setDate(today.getDate() - i)
    const dayReflections = sortedReflections.filter(r => 
      format(new Date(r.date), 'yyyy-MM-dd') === format(checkDate, 'yyyy-MM-dd')
    )
    
    if (dayReflections.length > 0 && dayReflections.some(r => r.mood === 'high')) {
      streak++
    } else {
      break
    }
  }

  return streak
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidMood(mood: string): mood is 'low' | 'neutral' | 'high' {
  return ['low', 'neutral', 'high'].includes(mood)
}

export function isValidFrictionTag(tag: string): tag is 'meetings' | 'unclear' | 'context' | 'tools' | 'fatigue' {
  return ['meetings', 'unclear', 'context', 'tools', 'fatigue'].includes(tag)
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Color utilities
export function getMoodColor(mood: 'low' | 'neutral' | 'high'): string {
  switch (mood) {
    case 'high': return '#4ade80' // mint
    case 'neutral': return '#f59e0b' // amber
    case 'low': return '#ff6b6b' // coral
  }
}

export function getFrictionColor(tag: string): string {
  switch (tag) {
    case 'meetings': return '#ff6b6b' // coral
    case 'unclear': return '#f59e0b' // amber
    case 'context': return '#4ade80' // mint
    case 'tools': return '#94a3b8' // slate
    case 'fatigue': return '#ff6b6b' // coral
    default: return '#94a3b8'
  }
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch {
    // Silently fail if localStorage is not available
  }
}
