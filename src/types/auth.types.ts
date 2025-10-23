// Re-exportar tipos de user.types para mantener compatibilidad
export type { User, UserProfile, UserRole, Gender } from './user.types'
import type { User, UserProfile } from './user.types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  role: 'doctor' | 'patient'
  profile?: Partial<UserProfile>
  acceptTerms: boolean
}

export interface AuthResponse {
  message: string
  user: User
  accessToken: string
  refreshToken: string
}

export interface TokenPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}
