import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/models/user.model'
import { generateToken, setTokenCookie } from '@/lib/utils'
import { SignupCredentials } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password }: SignupCredentials = await request.json()

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Generate JWT token
    const token = generateToken(user._id.toString())

    // Create response
    const response = NextResponse.json(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
      { status: 201 }
    )

    // Set JWT cookie
    setTokenCookie(response, token)

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
