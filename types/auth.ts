import { LoginCredentials, SignupCredentials, UpdateProfileData } from "./index"

export interface AuthUser {
    _id: string
    fullName: string
    email: string
    profilePic: string
  }
  
  export interface AuthState {
    user: AuthUser | null
    isLoading: boolean
    error: string | null
  }
  
  export interface AuthContextType {
    user: AuthUser | null
    login: (credentials: LoginCredentials) => Promise<void>
    signup: (credentials: SignupCredentials) => Promise<void>
    logout: () => Promise<void>
    updateProfile: (data: UpdateProfileData) => Promise<void>
    isLoading: boolean
    error: string | null
  }