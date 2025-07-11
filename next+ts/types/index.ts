import { Document,Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  fullName: string
  password: string
  profilePic: string
  createdAt: Date
  updatedAt: Date
}

export interface IMessage extends Document {
  _id: string
  senderId: Schema.Types.ObjectId
  receiverId: Schema.Types.ObjectId
  text?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSocketMap {
  [userId: string]: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface AuthRequest extends Request {
  user?: IUser
}

export interface LoginCredentials  {
  email: string
  password: string
}

export interface SignupCredentials {
  fullName: string
  email: string
  password: string
}

export interface UpdateProfileData {
  profilePic: string
}

export interface SendMessageData {
  text?: string
  image?: string
}