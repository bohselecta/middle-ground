'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import NoteChip from '@/components/brand/NoteChip'
import { brand } from '@/lib/brand'
import { useAppStore } from '@/lib/store'

const frictionTags = [
  { tag: 'meetings', label: 'Too many meetings', emoji: '📅', tone: 'coral' as const },
  { tag: 'unclear', label: 'Unclear goals', emoji: '❓', tone: 'coral' as const },
  { tag: 'context', label: 'Context switching', emoji: '🔄', tone: 'coral' as const },
  { tag: 'tools', label: 'Tech issues', emoji: '🔧', tone: 'coral' as const },
  { tag: 'fatigue', label: 'Burnout creeping', emoji: '😴', tone: 'coral' as const },
]

export default function FrictionLogModal() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const { addFriction, currentUser } = useAppStore()

  const handleSubmit = async () => {
    if (!selectedTag || !currentUser) return

    setIsSubmitting(true)
    
    try {
      // Submit to frictions API
      const frictionResponse = await fetch('/api/frictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          tag: selectedTag,
        }),
      })

      if (frictionResponse.ok) {
        const friction = await frictionResponse.json()
        addFriction(friction)
      }

      // Submit to Slack
      await fetch('/api/slack/friction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          tag: selectedTag,
        }),
      })

      // Show success animation
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setIsOpen(false)
        setSelectedTag(null)
      }, 2000)
      
    } catch (error) {
      console.error('Error logging friction:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <span className="text-xl">+</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/90 backdrop-blur p-6 shadow-xl"
                >
                  <div className="mb-6">
                    <Dialog.Title className="text-lg font-medium text-slate-900">
                      Report a blocker
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-slate-600 mt-1">
                      What got in the way today?
                    </Dialog.Description>
                  </div>

                  <div className="space-y-4">
                    {/* Friction tags */}
                    <div className="grid gap-2">
                      {frictionTags.map((friction) => (
                        <button
                          key={friction.tag}
                          onClick={() => setSelectedTag(friction.tag)}
                          className={`flex items-center gap-3 p-3 rounded-xl text-left transition ${
                            selectedTag === friction.tag
                              ? 'bg-coral/20 border-2 border-coral'
                              : 'bg-white/70 hover:bg-white border-2 border-transparent'
                          }`}
                        >
                          <span className="text-xl">{friction.emoji}</span>
                          <span className="text-sm font-medium text-slate-900">
                            {friction.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-4">
                      <Dialog.Close asChild>
                        <button className="flex-1 rounded-xl bg-white/70 px-4 py-3 text-slate-900 font-medium shadow-soft hover:shadow-md transition">
                          Cancel
                        </button>
                      </Dialog.Close>
                      
                      <button
                        onClick={handleSubmit}
                        disabled={!selectedTag || isSubmitting}
                        className="flex-1 rounded-xl bg-coral px-4 py-3 text-white font-medium shadow-soft hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {isSubmitting ? 'Logging…' : 'Report blocker'}
                      </button>
                    </div>
                  </div>

                  {/* Success animation */}
                  <AnimatePresence>
                    {showSuccess && (
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
                            ✨
                          </motion.div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm font-medium text-slate-900"
                          >
                            {brand.tone.frictionLogged}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
