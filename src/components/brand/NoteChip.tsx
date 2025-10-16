'use client'
import clsx from 'clsx'

type Tone = 'mint'|'amber'|'coral'|'neutral'
export default function NoteChip({
  label,
  tone = 'neutral',
  selected = false,
  onClick,
}: { 
  label: string; 
  tone?: Tone; 
  selected?: boolean; 
  onClick?: ()=>void 
}) {
  const toneCls = {
    mint: 'bg-mint',
    amber: 'bg-amber',
    coral: 'bg-coral',
    neutral: 'bg-white',
  }[tone]
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-2xl px-3 py-1.5 text-sm shadow-soft transition',
        toneCls,
        selected ? 'ring-2 ring-ink/10' : 'hover:shadow-md'
      )}
    >
      {label}
    </button>
  )
}
