'use client'

import { useEffect, useState } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useSocket } from '@/hooks/useSocket'
import { AuthUser } from '@/types/auth'
import { Search, Users } from 'lucide-react'

interface SidebarProps {
  onUserSelect: (user: AuthUser) => void
}

export default function Sidebar({ onUserSelect }: SidebarProps) {
  const { users, isLoading } = useUsers()
  const { onlineUsers } = useSocket()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<AuthUser[]>([])

  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [users, searchTerm])

  const isUserOnline = (userId: string) => {
    return onlineUsers.includes(userId)
  }

  return (
    <div className="w-80 bg-base-100 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          Conversations
        </h2>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-base-300">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-base-content/60">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-base-content/60">
            {searchTerm ? 'No users found' : 'No users available'}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => onUserSelect(user)}
                className="w-full p-3 rounded-lg hover:bg-base-200 transition-colors text-left flex items-center gap-3"
              >
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
                  {isUserOnline(user._id) && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.fullName}</p>
                  <p className="text-sm text-base-content/60 truncate">{user.email}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 