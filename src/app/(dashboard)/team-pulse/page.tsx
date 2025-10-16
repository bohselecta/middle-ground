'use client'
import { useEffect, useState } from 'react'
import TeamHeatField from '@/components/pulse/TeamHeatField'
import ChordCard from '@/components/brand/ChordCard'
import NoteChip from '@/components/brand/NoteChip'
import { useAppStore } from '@/lib/store'

interface TeamInsights {
  moodDistribution: { low: number; neutral: number; high: number }
  frictionCounts: Record<string, number>
  weeklyTrends: { moodDelta: number; frictionDelta: number; experimentsCompleted: number }
  cultureHealthIndex: number
}

export default function TeamPulsePage() {
  const { setCurrentUser } = useAppStore()
  const [insights, setInsights] = useState<TeamInsights | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize demo manager user
  useEffect(() => {
    setCurrentUser({
      id: 'demo-manager',
      name: 'Demo Manager',
      role: 'manager',
      teamId: 'demo-team',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }, [setCurrentUser])

  // Fetch team insights
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/insights')
        if (response.ok) {
          const data = await response.json()
          setInsights(data)
        }
      } catch (error) {
        console.error('Error fetching insights:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsights()
  }, [])

  const suggestedActions = [
    {
      title: 'Focus drop on Mondays',
      reason: 'Meetings ↑ 35%',
      cta: 'Propose Focus Morning',
      agreement: 0.72,
    },
    {
      title: 'Clarity flagged',
      reason: '3 people noted unclear specs',
      cta: 'Clarify sprint goals',
      agreement: 0.85,
    },
    {
      title: 'Context switching',
      reason: 'Multiple interruptions reported',
      cta: 'Async communication trial',
      agreement: 0.68,
    },
  ]

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Team Pulse</h1>
              <p className="mt-2 text-lg text-slate-600">
                Team overview — understanding gaps and wins. See anonymized insights to guide team improvements.
              </p>
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Team Heat Field */}
          <div className="lg:col-span-1">
            <TeamHeatField insights={insights} />
          </div>

          {/* Pattern Highlights */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
              <h3 className="text-lg font-medium text-slate-900 mb-4">Pattern Highlights</h3>
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                </div>
              ) : insights ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Energy drop Monday</span>
                    <NoteChip label={`${insights.weeklyTrends.moodDelta}%`} tone="coral" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Meetings ↑</span>
                    <span className="text-sm font-medium text-slate-900">
                      {insights.frictionCounts.meetings || 0} reports
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Unclear requirements</span>
                    <span className="text-sm font-medium text-slate-900">
                      {insights.frictionCounts.unclear || 0} flags
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Culture Health</span>
                    <NoteChip 
                      label={`${insights.cultureHealthIndex}/100`} 
                      tone={insights.cultureHealthIndex > 70 ? 'mint' : insights.cultureHealthIndex > 40 ? 'amber' : 'coral'} 
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Suggested Actions</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestedActions.map((action, index) => (
              <ChordCard
                key={index}
                title={action.title}
                reason={action.reason}
                cta={action.cta}
                agreement={action.agreement}
                onClick={() => {
                  // In a real app, this would open the Alignment Canvas with pre-filled data
                  console.log('Opening alignment canvas for:', action.title)
                }}
              />
            ))}
          </div>
        </div>

        {/* Recognition Radar */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Recognition Radar</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Team celebrated wins</span>
                <span className="text-sm font-medium text-slate-900">4× this week</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Positive reflections</span>
                <NoteChip label={`${insights?.moodDistribution.high || 0}%`} tone="mint" />
              </div>
              <button className="w-full rounded-xl bg-mint px-4 py-2 text-slate-900 font-medium shadow-soft hover:shadow-md transition">
                Celebrate with Note
              </button>
            </div>
          </div>

          {/* Manager Override Log */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Override Log</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-slate-900">Sprint priority shift</div>
                <div className="text-slate-600">Override made – reason logged: client request</div>
                <div className="text-xs text-slate-500 mt-1">2 hours ago</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-900">Meeting schedule change</div>
                <div className="text-slate-600">Override made – reason logged: team feedback</div>
                <div className="text-xs text-slate-500 mt-1">1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
