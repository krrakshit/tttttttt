'use client'

import { useState, useEffect } from 'react'
import { AuthUser } from '@/types/auth'
import toast from 'react-hot-toast'

export const useUsers = () => {
  const [users, setUsers] = useState<AuthUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/messages/users', {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers,
  }
}