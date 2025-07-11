import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/middleware/auth.middleware'
import { connectDB } from '@/lib/db'
import User from '@/models/user.model'
import { UpdateProfileData } from '@/types'

export async function PUT(request: NextRequest) {
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

    const { profilePic }: UpdateProfileData = await request.json()

    if (!profilePic) {
      return NextResponse.json(
        { message: 'Profile picture is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePic },
      { new: true, select: '-password' }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
