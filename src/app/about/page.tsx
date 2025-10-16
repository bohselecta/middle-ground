export default function AboutPage() {
  return (
    <main className="bg-soft min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">About Tablature</h1>
        <p className="mt-3 text-lg text-slate-600">
          Tablature helps teams align <em>intent</em> and <em>execution</em> without surveillance.
          It's an alignment layer — a human dashboard that turns coordination into clarity.
        </p>

        <div className="mt-10 grid gap-6">
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">What we believe</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Good management is visible when conditions improve, not when people are micromanaged.</li>
              <li>Privacy is a feature. Reflections are personal; team views are aggregate only.</li>
              <li>Small experiments — moved meetings, clearer goals, deeper focus — compound into culture.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">How it works</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
              <li><strong>My Flow Map:</strong> Workers log friction and notice patterns.</li>
              <li><strong>Team Pulse:</strong> Managers see anonymized patterns — understanding gaps and wins.</li>
              <li><strong>Alignment Canvas:</strong> Intent meets execution; teams try small, time‑boxed experiments.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">Roadmap</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Neon + Prisma multi‑tenant database with RLS</li>
              <li>Slack/Jira/Calendar integrations (opt‑in)</li>
              <li>Empathetic AI summaries and culture insights</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
