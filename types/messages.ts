import { AuthUser } from "./auth"
import { SendMessageData } from "./index"
import { Schema}  from "mongoose"

export interface Message {
    _id: string
    senderId: Schema.Types.ObjectId
    receiverId: Schema.Types.ObjectId
    text?: string
    image?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface MessageState {
    messages: Message[]
    selectedUser: AuthUser | null
    isLoading: boolean
    error: string | null
  }
  
  export interface MessageContextType {
    messages: Message[]
    selectedUser: AuthUser | null
    sendMessage: (data: SendMessageData) => Promise<void>
    getMessages: (userId: string) => Promise<void>
    setSelectedUser: (user: AuthUser | null) => void
    isLoading: boolean
    error: string | null
  }