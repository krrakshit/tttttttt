'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                {user.profilePic ? (
                  <img src={user.profilePic} alt={user.fullName} className="w-20 h-20 rounded-full" />
                ) : (
                  <span className="text-primary font-bold text-2xl">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.fullName}</h2>
                <p className="text-base-content/60">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  value={user.fullName}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 