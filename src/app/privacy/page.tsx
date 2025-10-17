export default function PrivacyPage() {
  return (
    <main className="bg-soft min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy & Principles</h1>
        <p className="mt-3 text-lg text-slate-600">
          You control what's shared. We show patterns, not people.
        </p>

        <div className="mt-10 grid gap-6">
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">What we collect (MVP)</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li><strong>Reflections:</strong> Mood + optional note. Private by default.</li>
              <li><strong>Blockers:</strong> A tag (e.g., meetings, unclear). Shared in aggregate.</li>
              <li><strong>Trials:</strong> Proposals and outcomes. Visible to the team.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">What managers can see</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Aggregated trends only.</li>
              <li>No personal diaries unless someone opts in.</li>
              <li>Overrides require a reason.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">Your controls</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Share anonymized trends (toggle)</li>
              <li>Opt-out of manager view</li>
              <li>Export/delete (planned)</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">Security & storage</h2>
            <p className="mt-3 text-slate-700">
              Postgres (Neon) + role-based access. Production hardening: tenant RLS, encrypted secrets, audit logs.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Questions about privacy? Email privacy@tablature.io
        </p>
      </section>
    </main>
  )
}
