'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function OnboardingPage(){
  const [loading, setLoading] = useState(false)
  
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Welcome to Tablature
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        We'll set up a space for you. This takes a minute or less.
      </p>

      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-xl font-medium text-slate-900 mb-4">What we'll do:</h2>
        <ol className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-sm font-medium">1</span>
            <div>
              <div className="font-medium">Create your personal team</div>
              <div className="text-sm text-slate-600">You can rename it and invite teammates later</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-sm font-medium">2</span>
            <div>
              <div className="font-medium">Add starter data</div>
              <div className="text-sm text-slate-600">A few example reflections and frictions to get you started</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber text-sm font-medium">3</span>
            <div>
              <div className="font-medium">Connect integrations (optional)</div>
              <div className="text-sm text-slate-600">Link Slack to post updates to your channel</div>
            </div>
          </li>
        </ol>
      </div>

      <form 
        action="/api/onboarding/seed" 
        method="post"
        onSubmit={() => setLoading(true)}
        className="mt-8"
      >
        <button 
          className="w-full rounded-xl bg-ink px-6 py-3 text-white shadow-soft hover:shadow-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Setting up..." : "Create my space"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-slate-600">
        Prefer to start clean? <Link href="/my-flow" className="text-ink underline">Skip seeding</Link>
      </div>
    </main>
  )
}
