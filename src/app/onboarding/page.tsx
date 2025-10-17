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
        We'll create a space for you in under a minute.
      </p>

      <div className="mt-8 rounded-2xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-xl font-medium text-slate-900 mb-4">What we'll do:</h2>
        <ol className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-sm font-medium">1</span>
            <div>
              <div className="font-medium">Create your team</div>
              <div className="text-sm text-slate-600">Rename and invite later.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-sm font-medium">2</span>
            <div>
              <div className="font-medium">Add starter data</div>
              <div className="text-sm text-slate-600">A few examples so it's not empty.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber text-sm font-medium">3</span>
            <div>
              <div className="font-medium">Connect integrations (optional)</div>
              <div className="text-sm text-slate-600">Post updates to Slack.</div>
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
        Prefer to start clean? <Link href="/my-work" className="text-ink underline">Skip seeding</Link>
      </div>
    </main>
  )
}
