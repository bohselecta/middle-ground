'use client'
import { motion } from 'framer-motion'

export default function AlignmentMeter({ value, label = 'Alignment' }:{ value:number; label?:string }){
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div className="w-full">
      <div className="h-3 w-full rounded-full bg-slate-200">
        <motion.div
          className="h-3 rounded-full bg-mint"
          initial={{ width: 0 }}
          animate={{ width: pct + '%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
    </div>
  )
}
