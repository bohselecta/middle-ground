'use client'
import { motion } from 'framer-motion'

export default function StringLine({
  agreement,
  label,
}: { agreement: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(agreement * 100)))
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-slate-200">
        <motion.div
          className="h-2 rounded-full bg-mint"
          initial={{ width: 0 }}
          animate={{ width: pct + '%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>
      <div className="mt-1 text-xs text-slate-600">{label ?? 'Alignment'}: {pct}%</div>
    </div>
  )
}
