/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'
import type {
  User,
  DoctorPublic,
  Specialization,
  UpdateProfilePayload,
  DoctorFilters,
  DoctorListResponse,
  UserResponse,
} from '@/types/user.types'

// Base: /api/users

// ENDPOINTS PÚBLICOS (no requieren autenticación)
export const publicAPI = {
  // Listar doctores públicos
  getDoctors: (params?: DoctorFilters) =>
    api.get<DoctorListResponse>('/users/public/doctors', { params }),

  // Obtener un doctor público por ID
  getDoctorById: (id: string) =>
    api.get<{ message: string; doctor: DoctorPublic }>(`/users/public/doctors/${id}`),

  // Obtener especializaciones disponibles
  getSpecializations: () =>
    api.get<{ message: string; specializations: Specialization[] }>('/users/public/specialties'),
}

// ENDPOINTS PROTEGIDOS (requieren autenticación)
export const userAPI = {
  // Obtener perfil propio
  getProfile: () =>
    api.get<UserResponse>('/users/profile'),

  // Actualizar perfil propio
  updateProfile: (data: UpdateProfilePayload) =>
    api.put<UserResponse>('/users/profile', data),

  // Subir avatar
  uploadAvatar: (formData: FormData) =>
    api.post<{ message: string; avatarUrl: string }>('/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Listar doctores (requiere autenticación)
  getDoctors: (params?: DoctorFilters) =>
    api.get<DoctorListResponse>('/users/doctors', { params }),

  // Obtener doctor por ID (requiere autenticación)
  getDoctorById: (id: string) =>
    api.get<{ message: string; doctor: DoctorPublic }>(`/users/doctors/${id}`),

  // Obtener usuario por ID (solo admin)
  getUserById: (id: string) =>
    api.get<UserResponse>(`/users/${id}`),

  // Crear usuario (solo admin)
  createUser: (data: any) =>
    api.post<UserResponse>('/users', data),

  // Actualizar usuario (solo admin)
  updateUser: (id: string, data: any) =>
    api.put<UserResponse>(`/users/${id}`, data),

  // Eliminar usuario (solo admin)
  deleteUser: (id: string) =>
    api.delete<{ message: string }>(`/users/${id}`),

  // Listar todos los usuarios (solo admin)
  listUsers: (params?: { role?: string; page?: number; limit?: number }) =>
    api.get<{
      message: string
      users: User[]
      pagination: { total: number; page: number; totalPages: number }
    }>('/users', { params }),
}

export default {
  public: publicAPI,
  ...userAPI,
}
