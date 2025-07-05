'use client'

import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useAuth } from './useAuth'

export const useSocket = () => {
  const [socket, setSocket] = useState< typeof Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', {
        path: '/api/socket',
        query: {
          userId: user._id,
        },
      })

      setSocket(newSocket)

      newSocket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users)
      })

      return () => {
        newSocket.close()
        setSocket(null)
      }
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [user])

  return {
    socket,
    onlineUsers,
  }
}