'use client'
import CultureReel from '@/components/culture/CultureReel'

export default function CulturePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Culture Moments</h1>
              <p className="mt-2 text-lg text-slate-600">
                Clear communication worth celebrating. Share wins, appreciation, and track your team&apos;s culture health over time.
              </p>
        </div>

        {/* Culture Reel Component */}
        <CultureReel />
      </div>
    </div>
  );
}
