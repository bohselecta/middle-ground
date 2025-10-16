import SlackIcon from '@/components/icons/SlackIcon'

export default function SlackIntegrationPage(){
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center gap-3">
        <SlackIcon className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Slack integration</h1>
      </div>
      <p className="mt-2 text-slate-600">Optional and privacy‑first. Use Slack to log frictions and share updates where your team already works.</p>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl bg-white/70 p-4 shadow-soft">
          <div className="text-sm font-medium text-slate-700">What you get</div>
          <ul className="mt-2 list-disc pl-6 text-slate-700">
            <li>One‑tap friction logs posted to a Slack channel you choose</li>
            <li>Experiment proposals and outcomes summarized for your team</li>
            <li>Zero personal reflections published unless you explicitly share</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white/70 p-4 shadow-soft">
          <div className="text-sm font-medium text-slate-700">Connect</div>
          <p className="mt-1 text-slate-600">Click connect to authorize the Tablature bot. You can disable posting any time.</p>
          <form action="/api/integrations/slack/connect" method="post">
            <button className="mt-3 rounded-xl bg-ink px-4 py-2 text-white">Connect Slack</button>
          </form>
        </div>

        <div className="rounded-2xl bg-white/70 p-4 shadow-soft">
          <div className="text-sm font-medium text-slate-700">Data & safety</div>
          <p className="mt-1 text-slate-600">We only post what you choose: friction tags, experiment summaries. Reflections and personal notes remain private unless you explicitly share them.</p>
        </div>
      </div>
    </main>
  )
}
