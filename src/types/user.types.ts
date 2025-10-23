// Tipos para User Service según especificación backend

export type UserRole = 'admin' | 'doctor' | 'patient'

export type Gender = 'male' | 'female' | 'other'

export type DoctorAvailabilityDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface UserProfile {
  phone?: string
  address?: string
  birthDate?: string
  gender?: Gender
  avatar?: string
  bio?: string
  // Doctor-specific
  specialization?: string
  licenseNumber?: string
  yearsOfExperience?: number
  consultationFee?: number
  qualifications?: string[]
  languages?: string[]
  availability?: Array<{
    day: DoctorAvailabilityDay
    startTime: string
    endTime: string
    isAvailable: boolean
  }>
  // Patient-specific
  bloodType?: string
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  insuranceProvider?: string
  insurancePolicyNumber?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  profile?: UserProfile
  isEmailVerified?: boolean
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface DoctorPublic {
  id: string
  firstName: string
  lastName: string
  email: string
  profile: {
    specialization: string
    licenseNumber?: string
    yearsOfExperience?: number
    consultationFee?: number
    qualifications?: string[]
    languages?: string[]
    availability?: Array<{
      day: DoctorAvailabilityDay
      startTime: string
      endTime: string
      isAvailable: boolean
    }>
    avatar?: string
    bio?: string
  }
  rating?: number
  totalAppointments?: number
}

export interface Specialization {
  name: string
  count: number
}

export interface UpdateProfilePayload {
  phone?: string
  address?: string
  birthDate?: string
  gender?: Gender
  avatar?: string
  bio?: string
  // Doctor-specific
  specialization?: string
  licenseNumber?: string
  yearsOfExperience?: number
  consultationFee?: number
  qualifications?: string[]
  languages?: string[]
  availability?: Array<{
    day: DoctorAvailabilityDay
    startTime: string
    endTime: string
    isAvailable: boolean
  }>
  // Patient-specific
  bloodType?: string
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  insuranceProvider?: string
  insurancePolicyNumber?: string
}

export interface DoctorFilters {
  specialization?: string
  minFee?: number
  maxFee?: number
  language?: string
  available?: boolean
  page?: number
  limit?: number
}

export interface PaginationInfo {
  total: number
  page: number
  totalPages: number
}

export interface DoctorListResponse {
  message: string
  doctors: DoctorPublic[]
  pagination: PaginationInfo
}

export interface UserResponse {
  message: string
  user: User
}
