"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  return (
    <main className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign in to Tablature</h1>
      <p className="mt-2 text-slate-600">
        Use your email to get a magic link. No password needed.
      </p>
      
      {error && (
        <div className="mt-4 rounded-2xl bg-coral/20 p-4">
          <p className="text-sm text-slate-700">{error}</p>
        </div>
      )}
      
      {!sent ? (
        <form className="mt-6" onSubmit={async (e) => {
          e.preventDefault()
          setLoading(true)
          setError(null)
          
          try {
            const email = new FormData(e.currentTarget).get("email") as string
            const result = await signIn("email", { 
              email, 
              callbackUrl: "/my-flow",
              redirect: false 
            })
            
            if (result?.error) {
              setError("Email provider not configured. Please contact support or try again later.")
            } else {
              setSent(true)
            }
          } catch (err) {
            setError("Something went wrong. Please try again.")
          } finally {
            setLoading(false)
          }
        }}>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-xl border border-slate-300 px-3 py-2"
            disabled={loading}
          />
          <button 
            className="mt-3 w-full rounded-xl bg-ink px-4 py-2 text-white shadow-soft hover:shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </form>
      ) : (
        <div className="mt-6 rounded-2xl bg-mint/20 p-4">
          <p className="text-sm text-slate-700">
            Check your email for a sign-in link. It may take a minute to arrive.
          </p>
          <button 
            onClick={() => {
              setSent(false)
              setError(null)
            }}
            className="mt-2 text-sm text-slate-600 hover:text-slate-900"
          >
            Try again
          </button>
        </div>
      )}

      {/* Development fallback */}
      <div className="mt-6 rounded-2xl bg-amber/20 p-4">
        <p className="text-sm text-slate-700">
          <strong>Development Note:</strong> Email magic links require EMAIL_SERVER configuration. 
          For now, you can bypass authentication by going directly to <a href="/my-flow" className="text-ink underline">/my-flow</a>.
        </p>
      </div>

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
