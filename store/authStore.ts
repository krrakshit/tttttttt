import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthUser } from '@/types/auth'

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user: AuthUser | null) => set({ user }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),
      clearAuth: () => set({ user: null, error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)