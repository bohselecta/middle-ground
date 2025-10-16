'use client'
import { useState } from 'react'
import NoteChip from '@/components/brand/NoteChip'
import { useAppStore } from '@/lib/store'
import SlackStatusBadge from '@/components/integrations/SlackStatusBadge'

export default function SettingsPage() {
  const { privacySettings, updatePrivacySettings } = useAppStore()
  const [localSettings, setLocalSettings] = useState(privacySettings)

  const handleSettingChange = async (key: string, value: boolean) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    updatePrivacySettings(newSettings)
    
    // Save to database
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      })
    } catch (error) {
      console.error('Failed to save setting:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Settings & Privacy</h1>
              <p className="mt-2 text-lg text-slate-600">
                Control how your data contributes. Manage integrations and customize your Tablature experience.
              </p>
        </div>

        <div className="space-y-8">
          {/* Privacy Console */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Privacy Console</h2>
            <div className="space-y-6">
              <div className="rounded-xl bg-mint/20 p-4">
                <h3 className="text-lg font-medium text-slate-900 mb-2">Your Data Rights</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-mint">✓</span>
                    <span>You own your data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-mint">✓</span>
                    <span>Only aggregated trends are shared</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-mint">✓</span>
                    <span>Reflections are private by default</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-mint">✓</span>
                    <span>Export/delete your data at any time</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">Share anonymized trends</div>
                    <div className="text-sm text-slate-600">Managers see only aggregated patterns, never your personal notes</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.shareAnonymizedTrends}
                      onChange={(e) => handleSettingChange('shareAnonymizedTrends', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">Opt-out of manager view</div>
                    <div className="text-sm text-slate-600">Keep personal analytics private, even from aggregated views</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.optOutManagerView}
                      onChange={(e) => handleSettingChange('optOutManagerView', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">Calm Mode</div>
                    <div className="text-sm text-slate-600">Disable animations and shimmer effects for a calmer experience</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.calmMode}
                      onChange={(e) => handleSettingChange('calmMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Anonymity Controls */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Anonymity Controls</h2>
            <div className="space-y-4">
              <div className="text-sm text-slate-600 mb-4">
                Choose how much of your data contributes to team insights:
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-mint bg-mint/10 cursor-pointer">
                  <input type="radio" name="anonymity" value="aggregate" defaultChecked className="text-mint" />
                  <div>
                    <div className="font-medium text-slate-900">Aggregate only (Recommended)</div>
                    <div className="text-sm text-slate-600">Your data contributes to team patterns, but you remain anonymous</div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-transparent bg-white/70 cursor-pointer hover:border-slate-200">
                  <input type="radio" name="anonymity" value="manager" className="text-mint" />
                  <div>
                    <div className="font-medium text-slate-900">Manager view allowed</div>
                    <div className="text-sm text-slate-600">Managers can see your individual patterns (with your explicit consent)</div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-transparent bg-white/70 cursor-pointer hover:border-slate-200">
                  <input type="radio" name="anonymity" value="private" className="text-mint" />
                  <div>
                    <div className="font-medium text-slate-900">Fully private</div>
                    <div className="text-sm text-slate-600">You see only your own analytics, no team contribution</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Integration Toggles */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Integrations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 border-2 border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-medium text-slate-900">Slack</div>
                    <div className="text-sm text-slate-600">Friction logging & culture sharing</div>
                  </div>
                </div>
                <NoteChip label="Connected" tone="mint" />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 border-2 border-slate-200 opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <div className="font-medium text-slate-900">Jira</div>
                    <div className="text-sm text-slate-600">Task tracking integration</div>
                  </div>
                </div>
                <NoteChip label="Coming Soon" tone="neutral" />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 border-2 border-slate-200 opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <div className="font-medium text-slate-900">Calendar</div>
                    <div className="text-sm text-slate-600">Meeting pattern analysis</div>
                  </div>
                </div>
                <NoteChip label="Coming Soon" tone="neutral" />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 border-2 border-slate-200 opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-medium text-slate-900">Google Workspace</div>
                    <div className="text-sm text-slate-600">Document collaboration insights</div>
                  </div>
                </div>
                <NoteChip label="Coming Soon" tone="neutral" />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Remind me to reflect</div>
                  <div className="text-sm text-slate-600">Daily prompts to log your mood and thoughts</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Weekly mood summary</div>
                  <div className="text-sm text-slate-600">Email digest of your weekly patterns</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Culture Moments digest</div>
                  <div className="text-sm text-slate-600">Weekly team celebration highlights</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mint"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Data Management</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Export your data</div>
                  <div className="text-sm text-slate-600">Download all your reflections, frictions, and settings</div>
                </div>
                <button className="rounded-xl bg-mint px-4 py-2 text-slate-900 font-medium shadow-soft hover:shadow-md transition">
                  Export
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">Delete account</div>
                  <div className="text-sm text-slate-600">Permanently remove all your data from Tablature</div>
                </div>
                <button className="rounded-xl bg-coral px-4 py-2 text-white font-medium shadow-soft hover:shadow-md transition">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Integrations</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-white/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-600">Slack</div>
                    <div className="text-xs text-slate-600">Post friction tags and experiment summaries. No personal reflections are posted.</div>
                  </div>
                  <SlackStatusBadge connected={false /* fetch from /api/integrations/slack/status */} />
                </div>
                <div className="mt-3 flex gap-2">
                  <form action="/api/integrations/slack/connect" method="post">
                    <button className="rounded-xl bg-ink px-3 py-2 text-white">Connect</button>
                  </form>
                  <button className="rounded-xl bg-white px-3 py-2 text-slate-900 shadow-soft">Disable posting</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
