'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader, Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
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
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          
          <div className="space-y-6">
            <div className="alert alert-info">
              <div>
                <h3 className="font-medium">Settings Coming Soon</h3>
                <p className="text-sm">Profile picture upload and other settings will be available soon.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Theme</span>
                </label>
                <select className="select select-bordered w-full">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Notifications</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="checkbox" defaultChecked />
                    <span>Enable push notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="checkbox" defaultChecked />
                    <span>Sound notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 