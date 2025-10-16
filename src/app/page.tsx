import Link from "next/link";
import NoteChip from "@/components/brand/NoteChip";
import StringLine from "@/components/brand/StringLine";
import ChordCard from "@/components/brand/ChordCard";

export default function TablatureHome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-soft">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28">
        {/* Background fret/staff motif */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-fret" />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-mint" />
              Human alignment dashboard
            </div>
                <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-slate-900">
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
                href="/(dashboard)/my-flow"
                className="rounded-2xl bg-ink px-5 py-3 text-white shadow-soft hover:shadow-md"
              >
                Try the demo
              </Link>
              <Link
                href="/(dashboard)/team-pulse"
                className="rounded-2xl bg-white/70 px-5 py-3 text-slate-900 shadow-soft hover:shadow-md"
              >
                See Team Pulse
              </Link>
              <div className="text-sm text-slate-600">No tracking. Local demo ready.</div>
            </div>
          </div>

          {/* Right visual: Alignment preview card */}
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-staff" />
            <div className="rounded-[2rem] bg-white/70 p-6 shadow-soft backdrop-blur">
              <h3 className="text-lg font-medium text-slate-900">Alignment Canvas — preview</h3>
              <p className="mt-1 text-sm text-slate-600">Where intent meets method.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-amber/40 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-700">Intent</div>
                  <div className="mt-1 text-slate-900">Improve deep work time</div>
                </div>
                <div className="rounded-2xl bg-mint/50 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-700">Method</div>
                  <div className="mt-1 text-slate-900">Move meetings to afternoons</div>
                </div>
              </div>

              <div className="mt-5">
                <StringLine agreement={0.78} label="Agreement" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <button className="rounded-2xl bg-white/70 px-4 py-2 text-left shadow-soft hover:shadow-md">✅ Approve Trial</button>
                <button className="rounded-2xl bg-white/70 px-4 py-2 text-left shadow-soft hover:shadow-md">🕓 Postpone</button>
                <button className="rounded-2xl bg-white/70 px-4 py-2 text-left shadow-soft hover:shadow-md">🌀 Reroute</button>
              </div>
            </div>

            {/* Floating insight cards */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ChordCard title="Focus drop on Mondays" reason="Meetings ↑ 35%" cta="Propose Focus Morning" />
              <ChordCard title="Clarity flagged" reason="3 people noted unclear specs" cta="Clarify sprint goals" />
            </div>
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
            <Link href="/(dashboard)/my-flow" className="rounded-2xl bg-ink px-4 py-2 text-white shadow-soft hover:shadow-md">Open Demo</Link>
            <Link href="/(dashboard)/team-pulse" className="rounded-2xl bg-white px-4 py-2 text-slate-900 shadow-soft hover:shadow-md">See Pulse</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/60 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="font-medium text-slate-800">Tablature</div>
                <div className="opacity-80">Privacy‑first · No leaderboards · Built for clarity</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
