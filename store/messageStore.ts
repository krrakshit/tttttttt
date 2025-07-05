import { create } from 'zustand'
import { Message } from '@/types/messages'
import { AuthUser } from '@/types/auth'

interface MessageState {
  messages: Message[]
  selectedUser: AuthUser | null
  isLoading: boolean
  error: string | null
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  setSelectedUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [], selectedUser: null, error: null }),
}))