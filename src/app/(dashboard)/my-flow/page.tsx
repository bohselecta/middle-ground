'use client'
import { useEffect } from 'react'
import FlowGraph from '@/components/charts/FlowGraph'
import ReflectionCard from '@/components/cards/ReflectionCard'
import FrictionLogModal from '@/components/modals/FrictionLogModal'
import NoteChip from '@/components/brand/NoteChip'
import { useAppStore, useReflections, useFrictions } from '@/lib/store'

export default function MyFlowPage() {
  const { currentUser, reflections, frictions, setCurrentUser } = useAppStore()
  const reflectionsData = useReflections()
  const frictionsData = useFrictions()

  // Initialize demo user if none exists
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser({
        id: 'demo-worker',
        name: 'Demo Worker',
        role: 'worker',
        teamId: 'demo-team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [currentUser, setCurrentUser])

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">My Flow Map</h1>
              <p className="mt-2 text-lg text-slate-600">
                Your personal alignment view. Log friction, reflect on your day, and see your patterns clearly.
              </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left column - Flow Graph */}
          <div className="lg:col-span-1">
            <FlowGraph reflections={reflectionsData} frictions={frictionsData} />
          </div>

          {/* Right column - Reflection Card */}
          <div className="lg:col-span-1">
            <ReflectionCard />
          </div>
        </div>

        {/* Bottom section - Insights and Privacy */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Flow Insights */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Pattern Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Focus streak</span>
                <NoteChip label="3 days" tone="mint" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Peak energy</span>
                <span className="text-sm font-medium text-slate-900">10am</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Meetings impact</span>
                <span className="text-sm font-medium text-slate-900">40%</span>
              </div>
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Privacy</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-white/60 bg-white/70 text-mint focus:ring-mint/50"
                />
                <span className="text-sm text-slate-600">Share anonymized trends</span>
              </label>
              <p className="text-xs text-slate-500">
                Managers see only aggregated patterns, never your personal notes.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h3 className="text-lg font-medium text-slate-900 mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Reflections</span>
                <span className="text-sm font-medium text-slate-900">{reflectionsData.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Frictions logged</span>
                <span className="text-sm font-medium text-slate-900">{frictionsData.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Flow score</span>
                <NoteChip label="Good" tone="mint" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating friction log button */}
      <FrictionLogModal />
    </div>
  );
}
