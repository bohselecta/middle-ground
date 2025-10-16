import AlignmentPreview from '@/components/landing/AlignmentPreview'
import Link from 'next/link'

export default function DemoPage(){
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Demo badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs">
        <span>📖</span>
        <span className="font-medium text-slate-700">Demo Mode — Read-only preview</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Try Tablature
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        Explore how Tablature works. To log frictions or propose experiments, create a free account.
      </p>

      {/* Alignment Preview */}
      <section className="mt-8">
        <h2 className="text-xl font-medium text-slate-900 mb-4">Live Alignment Dashboard</h2>
        <AlignmentPreview />
      </section>

      {/* Feature previews */}
      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        <Link href="/demo/my-flow" className="rounded-2xl bg-white/70 p-6 shadow-soft hover:shadow-md transition">
          <div className="text-sm font-medium text-slate-700">My Flow Map</div>
          <p className="mt-2 text-sm text-slate-600">See how workers track personal patterns</p>
        </Link>
        <Link href="/demo/team-pulse" className="rounded-2xl bg-white/70 p-6 shadow-soft hover:shadow-md transition">
          <div className="text-sm font-medium text-slate-700">Team Pulse</div>
          <p className="mt-2 text-sm text-slate-600">View anonymized team insights</p>
        </Link>
        <Link href="/demo/alignment" className="rounded-2xl bg-white/70 p-6 shadow-soft hover:shadow-md transition">
          <div className="text-sm font-medium text-slate-700">Alignment Canvas</div>
          <p className="mt-2 text-sm text-slate-600">See how experiments work</p>
        </Link>
      </section>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-white/70 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-medium text-slate-900">Ready to try it with your team?</div>
            <div className="text-sm text-slate-600">Create a free account in seconds. No credit card required.</div>
          </div>
          <Link 
            href="/login?callbackUrl=/onboarding" 
            className="rounded-xl bg-ink px-6 py-3 text-white shadow-soft hover:shadow-md"
          >
            Start your team
          </Link>
        </div>
      </div>
    </main>
  )
}
