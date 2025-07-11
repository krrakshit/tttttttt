'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Loader } from 'lucide-react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import NoChatSelected from './components/NoChatSelected'
import ChatContainer from './components/ChatContainer'
import { useChatStore } from '@/store/messageStore'

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { selectedUser } = useChatStore()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="h-screen bg-muted">
      <Navbar />
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-background rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}
