'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoteChip from '@/components/brand/NoteChip'
import { getSlack } from '@/lib/slack'

interface CultureMoment {
  id: string
  title: string
  description: string
  type: 'win' | 'milestone' | 'improvement'
  date: string
  impact: number // 0-100
}

interface Appreciation {
  id: string
  emoji: string
  message?: string
  sender: string
  createdAt: string
}

export default function CultureReel() {
  const [moments, setMoments] = useState<CultureMoment[]>([])
  const [appreciations, setAppreciations] = useState<Appreciation[]>([])
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0)
  const [isSharing, setIsSharing] = useState(false)

  useEffect(() => {
    // Generate sample culture moments
    const sampleMoments: CultureMoment[] = [
      {
        id: '1',
        title: 'Team completed first Focus Friday',
        description: 'Everyone protected their morning hours for deep work',
        type: 'milestone',
        date: '2024-01-15',
        impact: 85,
      },
      {
        id: '2',
        title: 'Morale rose 8% this week',
        description: 'Positive reflections increased significantly',
        type: 'improvement',
        date: '2024-01-14',
        impact: 72,
      },
      {
        id: '3',
        title: 'Async retro experiment success',
        description: 'Team loved the new async retrospective format',
        type: 'win',
        date: '2024-01-13',
        impact: 90,
      },
    ]

    const sampleAppreciations: Appreciation[] = [
      { id: '1', emoji: '🌸', message: 'Great collaboration today', sender: 'A', createdAt: '2024-01-15T10:00:00Z' },
      { id: '2', emoji: '💡', message: 'Brilliant solution', sender: 'B', createdAt: '2024-01-15T09:30:00Z' },
      { id: '3', emoji: '🙌', message: 'Amazing teamwork', sender: 'C', createdAt: '2024-01-14T16:00:00Z' },
      { id: '4', emoji: '🚀', message: 'Love the energy', sender: 'D', createdAt: '2024-01-14T14:00:00Z' },
    ]

    setMoments(sampleMoments)
    setAppreciations(sampleAppreciations)
  }, [])

  const currentMoment = moments[currentMomentIndex]

  const handleShareToSlack = async () => {
    if (!currentMoment) return

    setIsSharing(true)
    try {
      const text = `🎉 This week's Culture Moment: ${currentMoment.title} - ${currentMoment.description}`
      await getSlack().postMessage('general', text)
    } catch (error) {
      console.error('Error sharing to Slack:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'win': return 'mint'
      case 'milestone': return 'amber'
      case 'improvement': return 'coral'
      default: return 'neutral'
    }
  }

  return (
    <div className="space-y-6">
      {/* Culture Reel */}
      <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-slate-900">Weekly Highlight Reel</h3>
          <p className="text-sm text-slate-600">Celebrating team wins and improvements</p>
        </div>

        {currentMoment && (
          <div className="relative">
            <motion.div
              key={currentMoment.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-xl bg-gradient-to-r from-mint/20 to-amber/20 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <NoteChip label={currentMoment.type} tone={getTypeColor(currentMoment.type)} />
                    <span className="text-xs text-slate-500">{currentMoment.date}</span>
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">{currentMoment.title}</h4>
                  <p className="text-sm text-slate-600">{currentMoment.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{currentMoment.impact}%</div>
                  <div className="text-xs text-slate-500">Impact</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {moments.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMomentIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentMomentIndex ? 'bg-slate-900' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={handleShareToSlack}
                  disabled={isSharing}
                  className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-white text-sm font-medium shadow-soft hover:shadow-md disabled:opacity-50 transition"
                >
                  {isSharing ? 'Sharing...' : 'Share to Slack'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Appreciation Wall */}
      <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Appreciation Wall</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {appreciations.map((appreciation) => (
            <motion.div
              key={appreciation.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-white/70 p-4 shadow-soft hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{appreciation.emoji}</span>
                <span className="text-sm font-medium text-slate-900">{appreciation.sender}</span>
              </div>
              {appreciation.message && (
                <p className="text-sm text-slate-600">{appreciation.message}</p>
              )}
              <div className="text-xs text-slate-500 mt-2">
                {new Date(appreciation.createdAt).toLocaleDateString()}
              </div>
              
              {/* Sparkle animation on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trend Timeline */}
      <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Culture Health Index</h3>
        <div className="relative h-32">
          <svg width="100%" height="100%" viewBox="0 0 400 100" className="absolute inset-0">
            {/* Background grid */}
            <defs>
              <linearGradient id="cultureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="1" />
            <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="1" />
            <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="1" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="1" />
            
            {/* Trend line */}
            <motion.path
              d="M 50,70 Q 100,50 150,60 Q 200,40 250,45 Q 300,30 350,35"
              fill="none"
              stroke="url(#cultureGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Data points */}
            {[
              { x: 50, y: 70, value: 65 },
              { x: 100, y: 50, value: 75 },
              { x: 150, y: 60, value: 70 },
              { x: 200, y: 40, value: 80 },
              { x: 250, y: 45, value: 78 },
              { x: 300, y: 30, value: 85 },
              { x: 350, y: 35, value: 82 },
            ].map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="3"
                fill="#4ade80"
                stroke="white"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500">
            <span>4 weeks ago</span>
            <span>3 weeks ago</span>
            <span>2 weeks ago</span>
            <span>1 week ago</span>
            <span>This week</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">Current: 82/100</span>
            <span className="ml-2">↗ +5 from last week</span>
          </div>
          <NoteChip label="Healthy" tone="mint" />
        </div>
      </div>
    </div>
  )
}
