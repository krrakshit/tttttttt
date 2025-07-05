'use client'

import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Dynamic import to avoid SSR issues
      import('socket.io-client').then((socketIO) => {
        const io = socketIO.default || socketIO
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
      })

      return () => {
        if (socket) {
          socket.close()
          setSocket(null)
        }
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