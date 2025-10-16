export default function PrivacyPage() {
  return (
    <main className="bg-soft min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy & Principles</h1>
        <p className="mt-3 text-lg text-slate-600">
          Tablature is built on privacy and consent. People feel safer — and more honest — when they
          control how their signals are used. Here's how we handle your data.
        </p>

        <div className="mt-10 grid gap-6">
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">What we collect (MVP)</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li><strong>Reflections:</strong> mood + optional note — <em>private by default</em>.</li>
              <li><strong>Frictions:</strong> tag only (e.g., meetings, unclear) — shared in aggregate.</li>
              <li><strong>Experiments:</strong> proposals and outcomes — visible to the team.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">What managers can see</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Aggregated trends (counts, averages, anonymized patterns).</li>
              <li>No personal diaries or free‑text reflections unless a worker opts in.</li>
              <li>Transparent override log requires rationale for top‑down changes.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">Your controls</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Toggle: share anonymized trends / keep private.</li>
              <li>Opt‑out of manager view (still see personal analytics).</li>
              <li>Export/delete your data at any time (planned).</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">Security & storage</h2>
            <p className="mt-3 text-slate-700">
              MVP stores data in Postgres (Neon) with role‑based access. Production hardening will include
              per‑tenant row‑level security, encrypted secrets, and audit logs for sensitive actions.
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
