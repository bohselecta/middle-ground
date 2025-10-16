"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [sent, setSent] = useState(false)
  
  return (
    <main className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign in to Tablature</h1>
      <p className="mt-2 text-slate-600">
        Use your email to get a magic link. No password needed.
      </p>
      
      {!sent ? (
        <form className="mt-6" onSubmit={async (e) => {
          e.preventDefault()
          const email = new FormData(e.currentTarget).get("email") as string
          await signIn("email", { email, callbackUrl: "/my-flow" })
          setSent(true)
        }}>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
          />
          <button className="mt-3 w-full rounded-xl bg-ink px-4 py-2 text-white shadow-soft hover:shadow-md">
            Send magic link
          </button>
        </form>
      ) : (
        <div className="mt-6 rounded-2xl bg-mint/20 p-4">
          <p className="text-sm text-slate-700">
            Check your email for a sign-in link. It may take a minute to arrive.
          </p>
        </div>
      )}

      {/* Optional OAuth buttons - uncomment when ready */}
      {/* 
      <div className="mt-6 space-y-2">
        <button 
          onClick={() => signIn("github", { callbackUrl: "/my-flow" })} 
          className="w-full rounded-xl bg-white px-4 py-2 shadow-soft hover:shadow-md"
        >
          Sign in with GitHub
        </button>
        <button 
          onClick={() => signIn("google", { callbackUrl: "/my-flow" })} 
          className="w-full rounded-xl bg-white px-4 py-2 shadow-soft hover:shadow-md"
        >
          Sign in with Google
        </button>
      </div>
      */}
    </main>
  )
}
