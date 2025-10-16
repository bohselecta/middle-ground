import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Reflection, Friction, Experiment, PrivacySettings } from '@/lib/types'

interface AppState {
  // User state
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  
  // Data state
  reflections: Reflection[]
  frictions: Friction[]
  experiments: Experiment[]
  
  // Actions
  addReflection: (reflection: Reflection) => void
  addFriction: (friction: Friction) => void
  addExperiment: (experiment: Experiment) => void
  updateExperiment: (id: string, updates: Partial<Experiment>) => void
  
  // Privacy settings
  privacySettings: PrivacySettings
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void
  
  // Loading states
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      
      // Data state
      reflections: [],
      frictions: [],
      experiments: [],
      
      // Actions
      addReflection: (reflection) =>
        set((state) => ({
          reflections: [reflection, ...state.reflections],
        })),
      
      addFriction: (friction) =>
        set((state) => ({
          frictions: [friction, ...state.frictions],
        })),
      
      addExperiment: (experiment) =>
        set((state) => ({
          experiments: [experiment, ...state.experiments],
        })),
      
      updateExperiment: (id, updates) =>
        set((state) => ({
          experiments: state.experiments.map((exp) =>
            exp.id === id ? { ...exp, ...updates } : exp
          ),
        })),
      
      // Privacy settings
      privacySettings: {
        shareAnonymizedTrends: true,
        optOutManagerView: false,
        calmMode: false,
      },
      updatePrivacySettings: (settings) =>
        set((state) => ({
          privacySettings: { ...state.privacySettings, ...settings },
        })),
      
      // Loading states
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'tablature-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        privacySettings: state.privacySettings,
      }),
    }
  )
)

// Helper hooks
export const useUser = () => useAppStore((state) => state.currentUser)
export const useReflections = () => useAppStore((state) => state.reflections)
export const useFrictions = () => useAppStore((state) => state.frictions)
export const useExperiments = () => useAppStore((state) => state.experiments)
export const usePrivacySettings = () => useAppStore((state) => state.privacySettings)
