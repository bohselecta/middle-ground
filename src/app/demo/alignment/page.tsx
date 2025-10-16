'use client'
import { DEMO_EXPERIMENTS } from '@/lib/demo'
import RequireAuthModal from '@/components/demo/RequireAuthModal'
import NoteChip from '@/components/brand/NoteChip'

export default function DemoAlignmentPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Demo badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs">
        <span>📖</span>
        <span className="font-medium text-slate-700">Demo Mode — Read-only preview</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Alignment Canvas</h1>
      <p className="mt-2 text-lg text-slate-600">
        Where intent meets execution. Collaborate on experiments and find consensus through clear negotiation.
      </p>

      {/* Alignment Canvas */}
      <div className="mt-8 rounded-2xl bg-staff p-6 shadow-soft">
        <h2 className="text-lg font-medium text-slate-900 mb-4">Alignment Canvas</h2>
        <p className="text-sm text-slate-600 mb-6">Where intent meets execution</p>
        
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Intent Bubble */}
          <div className="rounded-2xl bg-amber/40 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-700 mb-2">Intent</div>
            <div className="text-slate-900 font-medium">Clarify sprint goals</div>
            <div className="text-xs text-slate-600 mt-1">Team wants clearer direction</div>
          </div>

          {/* Method Bubble */}
          <div className="rounded-2xl bg-mint/50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-700 mb-2">Method</div>
            <div className="text-slate-900 font-medium">Reduce meeting load</div>
            <div className="text-xs text-slate-600 mt-1">Focus on async communication</div>
          </div>
        </div>

        {/* Alignment Meter */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Alignment strength</span>
            <span>78%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-mint" style={{ width: '78%' }} />
          </div>
        </div>
      </div>

      {/* Active Experiments */}
      <div className="mt-6 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Active Experiments</h3>
        <div className="space-y-4">
          {DEMO_EXPERIMENTS.map((experiment, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{experiment.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{experiment.rationale}</div>
                  {experiment.start && (
                    <div className="text-xs text-slate-500 mt-2">
                      Started {experiment.start.toLocaleDateString()}
                    </div>
                  )}
                </div>
                <NoteChip 
                  label={experiment.status} 
                  tone={experiment.status === 'running' ? 'mint' : 'amber'} 
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <RequireAuthModal action="propose an experiment">Propose experiment</RequireAuthModal>
        </div>
      </div>

      {/* Consensus Building */}
      <div className="mt-6 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Consensus Building</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-mint/20">
            <div className="text-sm font-medium text-slate-900">Focus mornings experiment</div>
            <div className="text-xs text-slate-600">5 team members agree • 1 pending</div>
          </div>
          <div className="p-3 rounded-xl bg-amber/20">
            <div className="text-sm font-medium text-slate-900">Async standup proposal</div>
            <div className="text-xs text-slate-600">3 team members agree • 3 pending</div>
          </div>
        </div>
        <div className="mt-4">
          <RequireAuthModal action="vote on experiments">Vote on experiments</RequireAuthModal>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-medium text-slate-900">Ready to align your team?</div>
            <div className="text-sm text-slate-600">Create a free account to start proposing and tracking experiments.</div>
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
