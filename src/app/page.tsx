import Link from "next/link";
import NoteChip from "@/components/brand/NoteChip";
import StringLine from "@/components/brand/StringLine";
import ChordCard from "@/components/brand/ChordCard";
import AlignmentPreview from "@/components/landing/AlignmentPreview";

export default function TablatureHome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-soft">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28">
        {/* Background fret/staff motif */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-fret" />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900">
                  Coordinate the work. <span className="text-slate-700">Stay aligned.</span>
                </h1>
                <p className="mt-4 max-w-xl text-lg text-slate-600">
                  Tablature helps teams align <em>intent</em> and <em>execution</em> without surveillance.
                  Workers express needs clearly. Managers understand patterns safely.
                </p>

            {/* Trust signals as chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <NoteChip label="Privacy‑first" tone="mint" />
              <NoteChip label="No leaderboards" tone="neutral" />
              <NoteChip label="Clear insights" tone="amber" />
              <NoteChip label="Slack + Jira ready" tone="neutral" />
            </div>

            {/* CTA Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/my-flow"
                className="rounded-2xl bg-ink px-5 py-3 text-white shadow-soft hover:shadow-md"
              >
                Try the demo
              </Link>
              <Link
                href="/team-pulse"
                className="rounded-2xl border-2 border-slate-300 bg-transparent px-5 py-3 text-slate-900 hover:bg-white/70"
              >
                See Team Pulse
              </Link>
              <div className="text-sm text-slate-600">No tracking. Local demo ready.</div>
            </div>
          </div>

          {/* Right visual: Live Alignment Preview */}
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-staff" />
            <AlignmentPreview />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <div className="text-sm font-medium text-slate-700">1 · My Flow Map</div>
                <p className="mt-2 text-slate-600">Workers log friction with one tap and see personal patterns without judgment.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <div className="text-sm font-medium text-slate-700">2 · Team Pulse</div>
                <p className="mt-2 text-slate-600">Managers see anonymized patterns — understanding gaps and wins.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <div className="text-sm font-medium text-slate-700">3 · Alignment Canvas</div>
                <p className="mt-2 text-slate-600">Intent meets execution. Propose small experiments and track results clearly.</p>
              </div>
            </div>

        {/* Secondary CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 p-6 shadow-soft">
          <div>
            <div className="text-lg font-medium text-slate-900">Try Tablature locally</div>
            <div className="text-sm text-slate-600">MVP runs without external services. Add Neon + Slack when you&apos;re ready.</div>
          </div>
          <div className="flex gap-3">
            <Link href="/my-flow" className="rounded-2xl bg-ink px-4 py-2 text-white shadow-soft hover:shadow-md">Open Demo</Link>
            <Link href="/team-pulse" className="rounded-2xl border-2 border-slate-300 bg-transparent px-4 py-2 text-slate-900 hover:bg-white/70">See Pulse</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/60 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="mb-4 text-center">
            <p className="text-slate-600">All individual reflections remain private unless explicitly shared.</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="font-medium text-slate-800">Tablature</div>
                <div className="opacity-80">Privacy‑first · No leaderboards · Built for clarity</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
