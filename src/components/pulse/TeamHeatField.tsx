'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NoteChip from '@/components/brand/NoteChip'

interface TeamMember {
  id: string
  energy: number // 0-1 scale
  status: 'steady' | 'focused' | 'stressed'
  lastActive: string
}

interface TeamHeatFieldProps {
  insights?: {
    moodDistribution: { low: number; neutral: number; high: number }
    frictionCounts: Record<string, number>
    weeklyTrends: { moodDelta: number; frictionDelta: number }
  } | null
}

export default function TeamHeatField({ insights }: TeamHeatFieldProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    // Generate sample team data
    const members: TeamMember[] = [
      { id: '1', energy: 0.8, status: 'focused', lastActive: '2h ago' },
      { id: '2', energy: 0.6, status: 'steady', lastActive: '1h ago' },
      { id: '3', energy: 0.3, status: 'stressed', lastActive: '30m ago' },
      { id: '4', energy: 0.7, status: 'steady', lastActive: '45m ago' },
      { id: '5', energy: 0.4, status: 'stressed', lastActive: '1h ago' },
      { id: '6', energy: 0.9, status: 'focused', lastActive: '15m ago' },
    ]
    setTeamMembers(members)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'focused': return '#f59e0b' // amber
      case 'steady': return '#4ade80' // mint
      case 'stressed': return '#ff6b6b' // coral
      default: return '#94a3b8' // slate
    }
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'focused': return '🎯'
      case 'steady': return '🌊'
      case 'stressed': return '😰'
      default: return '❓'
    }
  }

  return (
    <div className="relative rounded-2xl bg-staff p-6 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-900">Team Heat Field</h3>
        <p className="text-sm text-slate-600">Anonymized team energy constellation</p>
      </div>

      {/* Constellation visualization */}
      <div className="relative h-64 w-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          className="absolute inset-0"
        >
          {/* Background grid */}
          <defs>
            <pattern id="staffGrid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#staffGrid)" />
          
          {/* Team member dots */}
          {teamMembers.map((member, index) => {
            const angle = (index / teamMembers.length) * 2 * Math.PI
            const radius = 60 + (member.energy * 40) // Distance from center based on energy
            const x = 200 + Math.cos(angle) * radius
            const y = 100 + Math.sin(angle) * radius
            
            return (
              <motion.g
                key={member.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={8 + (member.energy * 4)} // Size based on energy
                  fill={getStatusColor(member.status)}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setHoveredMember(member)}
                  onMouseLeave={() => setHoveredMember(null)}
                />
                
                {/* Pulse animation for active members */}
                {member.lastActive.includes('m') && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={12 + (member.energy * 4)}
                    fill="none"
                    stroke={getStatusColor(member.status)}
                    strokeWidth="1"
                    opacity="0.3"
                    animate={{ r: [12 + (member.energy * 4), 20 + (member.energy * 4), 12 + (member.energy * 4)] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {hoveredMember && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <span>{getStatusEmoji(hoveredMember.status)}</span>
              <span>{hoveredMember.status}</span>
            </div>
            <div className="text-xs opacity-80">Active {hoveredMember.lastActive}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-mint" />
          <span>Steady</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber" />
          <span>Focused</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-coral" />
          <span>Stressed</span>
        </div>
      </div>

      {/* Pattern insights */}
      {insights && (
        <div className="mt-6 rounded-xl bg-white/70 p-4">
          <h4 className="text-sm font-medium text-slate-900 mb-2">Pattern Insights</h4>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>High energy members</span>
              <NoteChip label={`${Math.round(insights.moodDistribution.high)}%`} tone="mint" />
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly mood trend</span>
              <span className={insights.weeklyTrends.moodDelta >= 0 ? 'text-mint' : 'text-coral'}>
                {insights.weeklyTrends.moodDelta >= 0 ? '+' : ''}{insights.weeklyTrends.moodDelta}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Friction reports</span>
              <span className="text-slate-900">
                {Object.values(insights.frictionCounts).reduce((sum, count) => sum + count, 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
