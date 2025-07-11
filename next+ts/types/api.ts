import { NextRequest } from 'next/server'
import { IUser } from './index'

export interface NextRequestWithUser extends NextRequest {
  user?: IUser
}

export interface ApiError {
  message: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  pages: number
}