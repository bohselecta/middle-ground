'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AlignmentMeter from './AlignmentMeter'

type Preview = { alignment:number; intent:string; method:string; meta:{ windowDays:number; totals:{ reflections:number; frictions:number }; fallback?: boolean } }

export default function AlignmentPreview(){
  const [data,setData] = useState<Preview | null>(null)
  const [err,setErr] = useState<string | null>(null)

  useEffect(()=>{
    let on = true
    fetch('/api/preview/metrics').then(r=>r.json()).then(d=>{ if(on) setData(d) }).catch(e=>{ setErr('unavailable') })
    return ()=>{ on = false }
  },[])

  const intent = data?.intent ?? 'Clarify priorities'
  const method = data?.method ?? 'Adjust meeting times'
  const value = data?.alignment ?? 0.78

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white/70 p-6 shadow-soft">
      {/* Animated link lines */}
      <svg className="pointer-events-none absolute inset-0 -z-10" aria-hidden width="100%" height="100%">
        <defs>
          <linearGradient id="glow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(207,243,230,.8)" />
            <stop offset="100%" stopColor="rgba(255,216,168,.8)" />
          </linearGradient>
        </defs>
        {/* background subtle lines */}
        <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="url(#glow)" strokeWidth="2" opacity=".25" />
        <line x1="10%" y1="65%" x2="90%" y2="65%" stroke="url(#glow)" strokeWidth="2" opacity=".25" />
      </svg>

      <div className="grid items-center gap-6 sm:grid-cols-3">
        <motion.div className="rounded-2xl bg-amber/40 p-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-wide text-slate-700">Intent</div>
          <div className="mt-1 text-slate-900">{intent}</div>
        </motion.div>

        <motion.div className="px-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AlignmentMeter value={value} label="Alignment strength" />
          <div className="mt-2 text-center text-[12px] text-slate-600">Aggregated preview · Individual reflections remain private</div>
        </motion.div>

        <motion.div className="rounded-2xl bg-mint/50 p-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs uppercase tracking-wide text-slate-700">Method</div>
          <div className="mt-1 text-slate-900">{method}</div>
        </motion.div>
      </div>
    </div>
  )
}
