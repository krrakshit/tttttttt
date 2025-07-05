'use client'

import { MessageSquare } from 'lucide-react'

export default function NoChatSelected() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Welcome to ChatApp</h3>
          <p className="text-muted-foreground max-w-md">
            Select a conversation from the sidebar to start chatting with your friends and family.
          </p>
        </div>
      </div>
    </div>
  )
} 