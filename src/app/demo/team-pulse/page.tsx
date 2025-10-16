'use client'
import { DEMO_TEAM } from '@/lib/demo'
import RequireAuthModal from '@/components/demo/RequireAuthModal'
import NoteChip from '@/components/brand/NoteChip'

export default function DemoTeamPulsePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Demo badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs">
        <span>📖</span>
        <span className="font-medium text-slate-700">Demo Mode — Read-only preview</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Team Pulse</h1>
      <p className="mt-2 text-lg text-slate-600">
        Team overview — understanding gaps and wins. See anonymized insights to guide team improvements.
      </p>

      {/* Team Heat Field */}
      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-lg font-medium text-slate-900 mb-4">Team Heat Field</h2>
        <div className="h-64 rounded-xl bg-gradient-to-br from-mint/20 to-coral/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🌡️</div>
            <div className="text-sm text-slate-600">Team mood visualization</div>
            <div className="text-xs text-slate-500 mt-1">Anonymized patterns from team members</div>
          </div>
        </div>
      </div>

      {/* Pattern Highlights */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Pattern Highlights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">High mood days</span>
              <NoteChip label={`${DEMO_TEAM.moods.high} this week`} tone="mint" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Meeting friction</span>
              <NoteChip label={`${DEMO_TEAM.frictions.meetings} reports`} tone="coral" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Focus patterns</span>
              <NoteChip label="Morning peak" tone="mint" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Suggestions</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-mint/20">
              <div className="text-sm font-medium text-slate-900">Reduce morning meetings</div>
              <div className="text-xs text-slate-600">Team reports high focus in AM</div>
            </div>
            <div className="p-3 rounded-xl bg-amber/20">
              <div className="text-sm font-medium text-slate-900">Clarify sprint goals</div>
              <div className="text-xs text-slate-600">Multiple "unclear" friction reports</div>
            </div>
          </div>
        </div>
      </div>

      {/* Override Log */}
      <div className="mt-6 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Manager Override Log</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-white/50">
            <div className="text-sm font-medium text-slate-900">Experiment: Focus mornings</div>
            <div className="text-xs text-slate-600">Started 3 days ago • 5 team members participating</div>
          </div>
          <div className="p-3 rounded-xl bg-white/50">
            <div className="text-sm font-medium text-slate-900">Override: Extended deadline</div>
            <div className="text-xs text-slate-600">Reason: Client feedback required more time</div>
          </div>
        </div>
        <div className="mt-4">
          <RequireAuthModal action="log an override">Log override</RequireAuthModal>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-medium text-slate-900">Ready to see your team's patterns?</div>
            <div className="text-sm text-slate-600">Create a free account to start tracking team insights.</div>
          </div>
          <a 
            href="/login?callbackUrl=/onboarding" 
            className="rounded-xl bg-ink px-6 py-3 text-white shadow-soft hover:shadow-md"
          >
            Start your team
          </a>
        </div>
      </div>
    </main>
  )
}
