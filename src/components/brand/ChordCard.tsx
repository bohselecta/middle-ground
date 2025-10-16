'use client'
import StringLine from './StringLine'

export default function ChordCard({
  title,
  reason,
  cta,
  onClick,
  agreement,
}: {
  title: string
  reason?: string
  cta?: string
  onClick?: ()=>void
  agreement?: number
}) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 shadow-soft hover:shadow-md transition">
      <div className="text-lg font-medium">{title}</div>
      {reason && <div className="mt-1 text-slate-600">{reason}</div>}
      {typeof agreement === 'number' && (
        <div className="mt-3"><StringLine agreement={agreement} /></div>
      )}
      {cta && (
        <div className="mt-4">
          <button onClick={onClick} className="rounded-xl bg-ink px-3 py-2 text-white">{cta}</button>
        </div>
      )}
    </div>
  )
}
