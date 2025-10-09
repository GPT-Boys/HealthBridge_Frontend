export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'doctor' | 'patient'
  profile?: UserProfile
  isEmailVerified?: boolean
  createdAt?: string
}

export interface UserProfile {
  phone?: string
  address?: string
  birthDate?: string
  gender?: 'male' | 'female' | 'other'
  specialization?: string
  licenseNumber?: string
  avatar?: string
}

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
