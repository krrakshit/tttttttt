import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/middleware/auth.middleware'
import { connectDB } from '@/lib/db'
import Message from '@/models/message.model'
import { getSocket, getReceiverSocketId } from '@/lib/socket'
import { SendMessageData } from '@/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateUser(request)

    if (authResult instanceof NextResponse) {
      return authResult
    }

    const { user } = authResult

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const { id: receiverId } = await params
    const { text, image }: SendMessageData = await request.json()

    if (!text && !image) {
      return NextResponse.json(
        { message: 'Message text or image is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Create new message
    const message = new Message({
      senderId: user._id,
      receiverId,
      text,
      image,
    })

    await message.save()

    // Populate sender and receiver details
    await message.populate('senderId', 'fullName profilePic')
    await message.populate('receiverId', 'fullName profilePic')

    // Emit message via socket.io
    try {
      const io = getSocket()
      const receiverSocketId = getReceiverSocketId(receiverId)
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', message)
      }
    } catch (socketError) {
      console.error('Socket error:', socketError)
      // Continue even if socket fails
    }

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
