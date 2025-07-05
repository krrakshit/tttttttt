import mongoose, { Schema, models } from 'mongoose'
import { IUser } from '@/types'

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const User = models.User || mongoose.model<IUser>('User', userSchema)

export default User