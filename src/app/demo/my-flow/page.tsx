'use client'
import { DEMO_REFLECTIONS, DEMO_FRICTIONS } from '@/lib/demo'
import RequireAuthModal from '@/components/demo/RequireAuthModal'
import NoteChip from '@/components/brand/NoteChip'

export default function DemoMyFlowPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Demo badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs">
        <span>📖</span>
        <span className="font-medium text-slate-700">Demo Mode — Read-only preview</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">My Flow Map</h1>
      <p className="mt-2 text-lg text-slate-600">
        Your personal alignment view. Log friction, reflect on your day, and see your patterns clearly.
      </p>

      {/* Demo Flow Graph */}
      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-lg font-medium text-slate-900 mb-4">Flow Graph</h2>
        <div className="h-64 rounded-xl bg-gradient-to-br from-mint/20 to-amber/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-sm text-slate-600">Interactive flow visualization</div>
            <div className="text-xs text-slate-500 mt-1">Shows your mood patterns over time</div>
          </div>
        </div>
      </div>

      {/* Demo Reflections */}
      <div className="mt-6 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-lg font-medium text-slate-900 mb-4">Recent Reflections</h2>
        <div className="space-y-3">
          {DEMO_REFLECTIONS.map((reflection, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
              <NoteChip 
                label={reflection.mood === 'high' ? '😊 High' : reflection.mood === 'neutral' ? '😐 Neutral' : '😔 Low'} 
                tone={reflection.mood === 'high' ? 'mint' : reflection.mood === 'neutral' ? 'amber' : 'coral'} 
              />
              <div className="flex-1">
                <div className="text-sm text-slate-900">{reflection.note}</div>
                <div className="text-xs text-slate-500">{reflection.date.toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <RequireAuthModal action="add a reflection">Add reflection</RequireAuthModal>
        </div>
      </div>

      {/* Demo Frictions */}
      <div className="mt-6 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-lg font-medium text-slate-900 mb-4">Recent Frictions</h2>
        <div className="space-y-3">
          {DEMO_FRICTIONS.map((friction, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
              <NoteChip 
                label={friction.tag} 
                tone="coral" 
              />
              <div className="flex-1">
                <div className="text-sm text-slate-900">Friction logged</div>
                <div className="text-xs text-slate-500">{friction.date.toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <RequireAuthModal action="log friction">Log friction</RequireAuthModal>
        </div>
      </div>

      {/* Pattern Insights */}
      <div className="mt-6 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Pattern Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Focus streak</span>
            <NoteChip label="3 days" tone="mint" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Meeting friction</span>
            <NoteChip label="High" tone="coral" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Weekly mood</span>
            <NoteChip label="Positive" tone="mint" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-medium text-slate-900">Ready to track your own patterns?</div>
            <div className="text-sm text-slate-600">Create a free account to start logging your reflections and frictions.</div>
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
