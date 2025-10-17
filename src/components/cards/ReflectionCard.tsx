'use client'
import { useState } from 'react'
import { atom, useAtom } from 'jotai'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { useAppStore } from '@/lib/store'

// Jotai atom for ephemeral emoji state
const selectedEmojiAtom = atom('😊')

const moodOptions = [
  { emoji: '😔', label: 'Low', value: 'low' },
  { emoji: '😊', label: 'Neutral', value: 'neutral' },
  { emoji: '🚀', label: 'High', value: 'high' },
]

export default function ReflectionCard() {
  const [note, setNote] = useState('')
  const [selectedMood, setSelectedMood] = useState('neutral')
  const [selectedEmoji, setSelectedEmoji] = useAtom(selectedEmojiAtom)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const { addReflection, currentUser } = useAppStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          mood: selectedMood,
          note: note.trim() || undefined,
        }),
      })

      if (response.ok) {
        const reflection = await response.json()
        addReflection(reflection)
        
        // Show success animation
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        
        // Reset form
        setNote('')
        setSelectedMood('neutral')
        setSelectedEmoji('😊')
      }
    } catch (error) {
      console.error('Error saving reflection:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative rounded-2xl bg-white/70 p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-900">How did today feel?</h3>
        <p className="text-sm text-slate-600">Log a mood and any notes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mood selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Mood
          </label>
          <div className="flex gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => {
                  setSelectedMood(mood.value)
                  setSelectedEmoji(mood.emoji)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedMood === mood.value
                    ? 'bg-mint text-slate-900 shadow-soft'
                    : 'bg-white/70 text-slate-600 hover:bg-white hover:shadow-soft'
                }`}
              >
                <span className="text-lg">{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What went well? What got in the way?"
            className="w-full px-4 py-3 rounded-xl border border-white/60 bg-white/70 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint resize-none"
            rows={3}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-ink px-4 py-3 text-white font-medium shadow-soft hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? 'Saving…' : 'Save reflection'}
        </button>
      </form>

      {/* Success animation */}
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
              {brand.tone.reflectionSaved}
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
