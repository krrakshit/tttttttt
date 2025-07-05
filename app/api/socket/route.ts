import { NextResponse } from 'next/server'
import { Server as NetServer } from 'http'
import { initializeSocket } from '@/lib/socket'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // This route is used for socket.io health check
    return NextResponse.json({ status: 'Socket.io server is running' })
  } catch (error) {
    console.error('Socket route error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Socket.io setup for Next.js API routes
export const config = {
  api: {
    bodyParser: false,
  },
}

// This function is called when socket.io needs to be initialized
export function GET_SOCKET_IO(server: NetServer) {
  return initializeSocket(server)
}
