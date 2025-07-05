import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/middleware/auth.middleware'
import { connectDB } from '@/lib/db'
import User from '@/models/user.model'

export async function GET(request: NextRequest) {
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

    await connectDB()

    // Get all users except the current user
    const users = await User.find({ _id: { $ne: user._id } })
      .select('-password')
      .sort({ fullName: 1 })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
