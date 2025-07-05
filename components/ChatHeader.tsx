'use client'

import { useSocket } from '@/hooks/useSocket'
import { AuthUser } from '@/types/auth'

interface ChatHeaderProps {
  user: AuthUser
}

export default function ChatHeader({ user }: ChatHeaderProps) {
  const { onlineUsers } = useSocket()
  const isOnline = onlineUsers.includes(user._id)

  return (
    <div className="p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {user.profilePic ? (
              <img src={user.profilePic} alt={user.fullName} className="w-10 h-10 rounded-full" />
            ) : (
              <span className="text-primary font-medium">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{user.fullName}</h3>
          <p className="text-sm text-base-content/60">
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    </div>
  )
} 