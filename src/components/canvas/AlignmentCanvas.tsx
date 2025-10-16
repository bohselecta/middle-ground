'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StringLine from '@/components/brand/StringLine'
import NoteChip from '@/components/brand/NoteChip'
import { brand } from '@/lib/brand'
import { useAppStore } from '@/lib/store'

interface Experiment {
  id: string
  title: string
  status: string
  rationale?: string
  agreement?: number
}

export default function AlignmentCanvas() {
  const [intent, setIntent] = useState('Improve team focus and reduce interruptions')
  const [method, setMethod] = useState('Implement no-meeting mornings for deep work')
  const [agreement, setAgreement] = useState(0.78)
  const [showConsensus, setShowConsensus] = useState(false)
  const [experiments, setExperiments] = useState<Experiment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const { addExperiment } = useAppStore()

  // Fetch experiments on mount
  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await fetch('/api/experiments')
        if (response.ok) {
          const data = await response.json()
          setExperiments(data)
        }
      } catch (error) {
        console.error('Error fetching experiments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperiments()
  }, [])

  // Show consensus shimmer when agreement is high
  useEffect(() => {
    if (agreement >= 0.7) {
      setShowConsensus(true)
      setTimeout(() => setShowConsensus(false), 2000)
    }
  }, [agreement])

  const handleExperimentAction = async (experimentId: string, action: 'approve' | 'postpone' | 'reroute') => {
    try {
      if (action === 'approve') {
        const response = await fetch(`/api/experiments?id=${experimentId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'running' }),
        })
        
        if (response.ok) {
          const updatedExperiment = await response.json()
          addExperiment(updatedExperiment)
          setExperiments(prev => prev.map(exp => 
            exp.id === experimentId ? { ...exp, status: 'running' } : exp
          ))
        }
      }
    } catch (error) {
      console.error('Error updating experiment:', error)
    }
  }

  const currentExperiment = experiments.find(exp => exp.status === 'proposed')

  return (
    <div className="relative rounded-2xl bg-staff p-6 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-900">Alignment Canvas</h3>
        <p className="text-sm text-slate-600">Where intent meets execution</p>
      </div>

      {/* Intent and Method Bubbles */}
      <div className="relative mb-8">
        {/* Intent Bubble (Amber) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-0 top-0 w-48 rounded-2xl bg-amber/40 p-4 shadow-soft"
        >
          <div className="text-xs uppercase tracking-wide text-slate-700 mb-2">Intent</div>
          <div className="text-sm text-slate-900">{intent}</div>
        </motion.div>

        {/* Method Bubble (Mint) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute right-0 top-0 w-48 rounded-2xl bg-mint/50 p-4 shadow-soft"
        >
          <div className="text-xs uppercase tracking-wide text-slate-700 mb-2">Method</div>
          <div className="text-sm text-slate-900">{method}</div>
        </motion.div>

        {/* Connection Line */}
        <div className="relative h-24 flex items-center justify-center">
          <motion.div
            className="h-1 rounded-full bg-gradient-to-r from-amber to-mint"
            style={{ width: `${agreement * 200}px` }}
            initial={{ width: 0 }}
            animate={{ width: `${agreement * 200}px` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* Consensus shimmer */}
          <AnimatePresence>
            {showConsensus && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 shimmer-once rounded-full"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Agreement Indicator */}
        <div className="mt-4 flex justify-center">
          <div className="w-64">
            <StringLine agreement={agreement} label="Agreement" />
          </div>
        </div>
      </div>

      {/* Experiment Proposal */}
      {currentExperiment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/70 p-6 shadow-soft mb-6"
        >
          <h4 className="text-lg font-medium text-slate-900 mb-2">{currentExperiment.title}</h4>
          {currentExperiment.rationale && (
            <p className="text-sm text-slate-600 mb-4">{currentExperiment.rationale}</p>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={() => handleExperimentAction(currentExperiment.id, 'approve')}
              className="flex items-center gap-2 rounded-xl bg-mint px-4 py-2 text-slate-900 font-medium shadow-soft hover:shadow-md transition"
            >
              ✅ Approve Trial
            </button>
            <button
              onClick={() => handleExperimentAction(currentExperiment.id, 'postpone')}
              className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-slate-900 font-medium shadow-soft hover:shadow-md transition"
            >
              🕓 Postpone
            </button>
            <button
              onClick={() => handleExperimentAction(currentExperiment.id, 'reroute')}
              className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-slate-900 font-medium shadow-soft hover:shadow-md transition"
            >
              🌀 Reroute
            </button>
          </div>
        </motion.div>
      )}

      {/* Micro Check-In Cards */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-900 mb-3">Quick Check-In</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/70 p-4 shadow-soft">
            <div className="text-xs text-slate-600 mb-2">Calm / Stressed</div>
            <div className="flex gap-2">
              {['😌', '😐', '😰'].map((emoji, index) => (
                <button
                  key={index}
                  className="rounded-lg bg-white/70 p-2 hover:bg-white hover:shadow-soft transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="rounded-xl bg-white/70 p-4 shadow-soft">
            <div className="text-xs text-slate-600 mb-2">Aligned / Confused</div>
            <div className="flex gap-2">
              {['🎯', '🤔', '❓'].map((emoji, index) => (
                <button
                  key={index}
                  className="rounded-lg bg-white/70 p-2 hover:bg-white hover:shadow-soft transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Threads */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-900">Team Feedback</h4>
        
        <div className="space-y-2">
          <div className="rounded-xl bg-white/70 p-3 shadow-soft">
            <div className="text-sm text-slate-900">"Can we try async retro here?"</div>
            <div className="text-xs text-slate-500 mt-1">2 hours ago</div>
          </div>
          
          <div className="rounded-xl bg-white/70 p-3 shadow-soft">
            <div className="text-sm text-slate-900">"Love the no-meeting mornings idea!"</div>
            <div className="text-xs text-slate-500 mt-1">1 hour ago</div>
          </div>
          
          <div className="rounded-xl bg-white/70 p-3 shadow-soft">
            <div className="text-sm text-slate-900">"What about Friday afternoons for meetings?"</div>
            <div className="text-xs text-slate-500 mt-1">30 minutes ago</div>
          </div>
        </div>
      </div>

      {/* Consensus Message */}
      <AnimatePresence>
        {showConsensus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur rounded-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl mb-2"
              >
                🌿
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium text-slate-900"
              >
                {brand.tone.consensus}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
