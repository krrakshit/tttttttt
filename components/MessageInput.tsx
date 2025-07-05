'use client'

import { useState, useRef } from 'react'
import { useMessages } from '@/hooks/useMessages'
import { Send, Image as ImageIcon } from 'lucide-react'

export default function MessageInput() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { sendMessage, selectedUser } = useMessages()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !selectedUser) return

    setIsLoading(true)
    try {
      await sendMessage({ text: message.trim() })
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedUser) return

    setIsLoading(true)
    try {
      // For now, we'll use a placeholder image URL
      // In a real app, you'd upload to Cloudinary or similar
      const imageUrl = URL.createObjectURL(file)
      await sendMessage({ image: imageUrl })
    } catch (error) {
      console.error('Failed to send image:', error)
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  if (!selectedUser) return null

  return (
    <div className="p-4 border-t border-base-300 bg-base-100">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-ghost btn-sm"
          disabled={isLoading}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          disabled={isLoading}
        />

        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!message.trim() || isLoading}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
} 