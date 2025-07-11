import mongoose, { Schema, models } from 'mongoose'
import { IMessage } from '@/types'

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

const Message = models.Message || mongoose.model<IMessage>('Message', messageSchema)
export default Message