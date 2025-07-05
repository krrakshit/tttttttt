'use client'

import { useAuth } from '@/hooks/useAuth'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <nav className="bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">C</span>
          </div>
          ChatApp
        </Link>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {user.profilePic ? (
                  <img src={user.profilePic} alt={user.fullName} className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-primary font-medium text-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-sm text-foreground">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
              title="Profile"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              href="/settings"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs text-destructive hover:text-destructive"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 