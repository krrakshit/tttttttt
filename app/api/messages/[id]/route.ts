import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/middleware/auth.middleware'
import { connectDB } from '@/lib/db'
import Message from '@/models/message.model'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const { id: otherUserId } = params

    if (!otherUserId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Get messages between current user and the other user
    const messages = await Message.find({
      $or: [
        { senderId: user._id, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('senderId', 'fullName profilePic')
      .populate('receiverId', 'fullName profilePic')

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
