import { Server as NetServer } from 'http'
import {  NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { UserSocketMap } from '@/types'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO
    }
  }
}

let io: ServerIO
const userSocketMap: UserSocketMap = {}

export const initializeSocket = (server: NetServer): ServerIO => {
  io = new ServerIO(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    const userId = socket.handshake.query.userId as string
    if (userId) {
      userSocketMap[userId] = socket.id
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id)
      if (userId) {
        delete userSocketMap[userId]
      }
      io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
  })

  return io
}

export const getSocket = (): ServerIO => {
  if (!io) {
    throw new Error('Socket.io not initialized')
  }
  return io
}

export const getReceiverSocketId = (userId: string): string | undefined => {
  return userSocketMap[userId]
}

export { io }