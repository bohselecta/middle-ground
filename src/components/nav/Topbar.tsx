'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@/lib/store'
import NoteChip from '@/components/brand/NoteChip'
import SlackStatusBadge from '@/components/integrations/SlackStatusBadge'

const dailyQuotes = [
  'Small improvements create clear progress.',
  'Listen to the patterns of your team.',
  'Alignment is a practice, not a destination.',
  'Every insight matters in the process.',
  'Focus flows from understanding.',
]

const statusOptions = [
  { label: 'Focused', emoji: '🎯', color: 'mint' as const },
  { label: 'Recharge', emoji: '🧘', color: 'amber' as const },
  { label: 'Blocked', emoji: '🚧', color: 'coral' as const },
]

export default function Topbar() {
  const user = useUser()
  const [currentStatus, setCurrentStatus] = useState(statusOptions[0])
  const [showProfile, setShowProfile] = useState(false)
  const [slackConnected, setSlackConnected] = useState(false)
  
  // Rotate quote daily
  const today = new Date().getDate()
  const currentQuote = dailyQuotes[today % dailyQuotes.length]

  // Fetch Slack status on mount
  useEffect(() => {
    fetch('/api/integrations/slack/status')
      .then(res => res.json())
      .then(data => setSlackConnected(data.connected))
      .catch(() => setSlackConnected(false))
  }, [])

  return (
    <div className="flex h-16 items-center justify-between border-b border-white/60 bg-white/70 backdrop-blur px-6">
      {/* Daily quote */}
      <div className="text-sm text-slate-600 italic">
        "{currentQuote}"
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Quick action button */}
        <button className="rounded-2xl bg-ink px-4 py-2 text-sm text-white shadow-soft hover:shadow-md transition">
          +
        </button>

        {/* Notification bell */}
        <button className="relative rounded-2xl bg-white/70 p-2 shadow-soft hover:shadow-md transition">
          <span className="text-lg">🔔</span>
          {/* Subtle pulse animation */}
          <div className="absolute inset-0 rounded-2xl bg-mint/20 animate-pulse" />
        </button>

        {/* Slack status badge */}
        <SlackStatusBadge connected={slackConnected} />

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-2 shadow-soft hover:shadow-md transition"
          >
            {/* Status indicator */}
            <NoteChip 
              label={`${currentStatus.emoji} ${currentStatus.label}`} 
              tone={currentStatus.color}
            />
            
            {/* User info */}
            <div className="text-left">
              <div className="text-sm font-medium text-slate-900">
                {user?.name || 'Demo User'}
              </div>
              <div className="text-xs text-slate-600">
                {user?.role || 'worker'}
              </div>
            </div>
          </button>

          {/* Dropdown menu */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white/90 backdrop-blur p-4 shadow-md border border-white/60">
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-900">Status</div>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status.label}
                      onClick={() => {
                        setCurrentStatus(status)
                        setShowProfile(false)
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-white/70 transition"
                    >
                      <span className="text-lg">{status.emoji}</span>
                      <span className="text-sm">{status.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-white/60 pt-3">
                  <button className="text-sm text-slate-600 hover:text-slate-900">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
