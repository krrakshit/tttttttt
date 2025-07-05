'use client'

import { useState, useEffect } from 'react'
import { Message, SendMessageData } from '@/types/message'
import { AuthUser } from '@/types/auth'
import { useSocket } from './useSocket'
import toast from 'react-hot-toast'

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: Message) => {
        setMessages(prev => [...prev, message])
      })

      return () => {
        socket.off('newMessage')
      }
    }
  }, [socket])

  const getMessages = async (userId: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/messages/${userId}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }

      const data = await response.json()
      setMessages(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch messages'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (data: SendMessageData) => {
    if (!selectedUser) return

    try {
      setError(null)
      
      const response = await fetch(`/api/messages/send/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const newMessage = await response.json()
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return {
    messages,
    selectedUser,
    sendMessage,
    getMessages,
    setSelectedUser,
    isLoading,
    error,
  }
}