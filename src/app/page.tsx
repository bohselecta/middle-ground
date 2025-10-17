'use client'
import Link from "next/link";
import NoteChip from "@/components/brand/NoteChip";
import StringLine from "@/components/brand/StringLine";
import ChordCard from "@/components/brand/ChordCard";
import AlignmentPreview from "@/components/landing/AlignmentPreview";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import SlackIcon from "@/components/icons/SlackIcon";

export default function TablatureHome() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-soft">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-12 pb-14 sm:pt-16">
        {/* Background fret/staff motif */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-fret" />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
                <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-900">
                  Coordinate the work. <span className="text-slate-700">Stay aligned.</span>
                </h1>
                <p className="mt-4 max-w-xl text-lg text-slate-600">
                  Tablature lines up intent and execution. Workers share needs safely. Managers see patterns—never personal diaries.
                </p>

            {/* Trust signals as chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <NoteChip label="Privacy‑first" tone="mint" />
              <NoteChip label="No leaderboards" tone="neutral" />
              <NoteChip label="Clear, useful insights" tone="amber" />
              <NoteChip label="Slack + Jira ready" tone="neutral" />
            </div>

            {/* CTA Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/demo"
                className="rounded-2xl bg-ink px-6 py-3 text-white shadow-soft hover:shadow-md"
              >
                Try the demo
              </Link>
              <Link
                href="/login?callbackUrl=/onboarding"
                className="rounded-2xl border-2 border-slate-300 bg-transparent px-6 py-3 text-slate-900 hover:bg-white/70"
              >
                Start your team
              </Link>
              <div className="text-sm text-slate-600">No credit card. Setup in minutes.</div>
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
                <div className="text-sm font-medium text-slate-700">1 · My Work</div>
                <p className="mt-2 text-slate-600">Log friction with one tap. See your own patterns—no judgment.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <div className="text-sm font-medium text-slate-700">2 · Team Overview</div>
                <p className="mt-2 text-slate-600">Leaders get anonymized trends and suggested actions.</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <div className="text-sm font-medium text-slate-700">3 · Plan & Align</div>
                <p className="mt-2 text-slate-600">Agree on a simple plan. Try small trials. Review results.</p>
              </div>
            </div>

        {/* Secondary CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 p-6 shadow-soft">
          <div>
            <div className="text-lg font-medium text-slate-900">Run the MVP locally</div>
            <div className="text-sm text-slate-600">Works without integrations. Add Neon + Slack when ready.</div>
          </div>
          <div className="flex gap-3">
            <Link href="/my-work" className="rounded-2xl bg-ink px-4 py-2 text-white shadow-soft hover:shadow-md">Open Demo</Link>
            <Link href="/team" className="rounded-2xl border-2 border-slate-300 bg-transparent px-4 py-2 text-slate-900 hover:bg-white/70">See Pulse</Link>
          </div>
        </div>
      </section>

      {/* Connect tools you use */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900">Bring the tools you use</h2>
        <p className="mt-1 text-slate-600">Optional and privacy-first. Slack posts frictions and updates into your channel.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <IntegrationCard
            title="Slack"
            desc="One-tap frictions and experiment updates in Slack."
            cta="Connect Slack"
            icon={<SlackIcon className="h-5 w-5" />}
            onClick={() => { window.location.href = '/integrations/slack' }}
          />
          <IntegrationCard
            title="Jira"
            desc="Turn experiments into issues automatically."
            cta="Coming soon"
            disabled
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/60 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="mb-4 text-center">
            <p className="text-slate-600">Reflections are private unless you choose to share.</p>
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
