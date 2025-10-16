'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RequireAuthModal({ 
  children, 
  action = "try this" 
}: { 
  children: React.ReactNode
  action?: string 
}){
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="rounded-xl bg-ink px-3 py-2 text-white shadow-soft hover:shadow-md"
      >
        {children}
      </button>
      
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-medium text-slate-900">
              Create a free account to {action}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Demo is read-only. Sign up to log frictions, add reflections, and propose experiments.
            </p>
            <div className="mt-6 flex gap-3">
              <Link 
                href="/login?callbackUrl=/onboarding" 
                className="flex-1 rounded-xl bg-ink px-4 py-2 text-center text-white"
              >
                Create account
              </Link>
              <button 
                onClick={() => setOpen(false)} 
                className="flex-1 rounded-xl bg-white px-4 py-2 text-slate-900 shadow-soft"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
