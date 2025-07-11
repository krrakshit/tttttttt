import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/db'
import User from '@/models/user.model'
import { NextRequestWithUser } from '@/types/api'

interface JwtPayload {
  userId: string
}

export async function authenticateUser(request: NextRequest): Promise<NextRequestWithUser | NextResponse> {
  try {
    const token = request.cookies.get('jwt')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized - No Token Provided' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid Token' },
        { status: 401 }
      )
    }

    await connectDB()
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const requestWithUser = request as NextRequestWithUser
    requestWithUser.user = user

    return requestWithUser
  } catch (error) {
    console.log('Error in auth middleware:', (error as Error).message)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}