'use client'
import CultureReel from '@/components/culture/CultureReel'

export default function CulturePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Kudos & Wins</h1>
              <p className="mt-2 text-lg text-slate-600">
                Celebrate what's working. Keep morale moving.
              </p>
        </div>

        {/* Culture Reel Component */}
        <CultureReel />
      </div>
    </div>
  );
}
