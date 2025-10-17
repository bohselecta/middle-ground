export default function AboutPage() {
  return (
    <main className="bg-soft min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">About Tablature</h1>
        <p className="mt-3 text-lg text-slate-600">
          A human dashboard that aligns intent and execution without surveillance.
        </p>

        <div className="mt-10 grid gap-6">
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">What we believe</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Good management improves conditions—not control.</li>
              <li>Privacy is a feature: team views are aggregates only.</li>
              <li>Small, time-boxed experiments change culture.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">How it works</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
              <li><strong>My Work:</strong> You notice patterns by logging small signals.</li>
              <li><strong>Team Overview:</strong> Leaders see trends—never private notes.</li>
              <li><strong>Plan & Align:</strong> Agree on experiments. Measure outcomes.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium">Roadmap</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
              <li>Neon + Prisma multi-tenant (RLS)</li>
              <li>Slack/Jira/Calendar (opt-in)</li>
              <li>Helpful AI summaries and culture insights</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
