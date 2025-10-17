'use client'
import AlignmentCanvas from '@/components/canvas/AlignmentCanvas'
import NoteChip from '@/components/brand/NoteChip'

export default function AlignmentPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Plan & Align</h1>
              <p className="mt-2 text-lg text-slate-600">
                Agree on a plan. Try small trials. Review results together.
              </p>
        </div>

        {/* Main Alignment Canvas */}
        <div className="mb-8">
          <AlignmentCanvas />
        </div>

        {/* Additional Context */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Active Experiments */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Trials</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">No-Meeting Mornings</span>
                <NoteChip label="Running" tone="mint" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Async Retrospectives</span>
                <NoteChip label="Proposed" tone="amber" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Focus Friday</span>
                <NoteChip label="Done" tone="neutral" />
              </div>
            </div>
          </div>

          {/* Team Consensus */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Notes</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Current proposal</span>
                  <span className="text-sm font-medium text-slate-900">78%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-mint to-amber rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              
              <div className="text-sm text-slate-600">
                <div className="font-medium text-slate-900 mb-1">Recent feedback:</div>
                <div className="space-y-1">
                  <div>• 3 team members support the proposal</div>
                  <div>• 1 suggestion for Friday afternoon meetings</div>
                  <div>• All agree on async communication benefits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
