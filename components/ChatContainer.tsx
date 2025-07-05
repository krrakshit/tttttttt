'use client'

import { useEffect } from 'react'
import { useMessages } from '@/hooks/useMessages'
import { AuthUser } from '@/types/auth'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

interface ChatContainerProps {
  selectedUser: AuthUser
}

export default function ChatContainer({ selectedUser }: ChatContainerProps) {
  const { messages, getMessages, setSelectedUser, isLoading } = useMessages()

  useEffect(() => {
    setSelectedUser(selectedUser)
    getMessages(selectedUser._id)
  }, [selectedUser, getMessages, setSelectedUser])

  return (
    <div className="flex-1 flex flex-col bg-base-100">
      <ChatHeader user={selectedUser} />
      
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-base-content/60">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <p className="text-base-content/60">No messages yet</p>
              <p className="text-sm text-base-content/40">Start a conversation with {selectedUser.fullName}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.senderId === selectedUser._id ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === selectedUser._id
                      ? 'bg-base-200 text-base-content'
                      : 'bg-primary text-primary-content'
                  }`}
                >
                  {message.text && <p className="break-words">{message.text}</p>}
                  {message.image && (
                    <img src={message.image} alt="Message" className="mt-2 rounded max-w-full" />
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  )
} 