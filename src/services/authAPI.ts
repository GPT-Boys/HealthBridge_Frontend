import api from './api'
import type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth.types'

export const authAPI = {
  // Registro
  register: (data: RegisterData) =>
    api.post<AuthResponse>('/auth/register', {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      profile: data.profile,
    }),

  // Login
  login: (credentials: LoginCredentials) => api.post<AuthResponse>('/auth/login', credentials),

  // Verificar token
  verifyToken: () => api.post<{ valid: boolean; user: User }>('/auth/verify-token'),

  // Refresh token (con rotación automática)
  refreshToken: (refreshToken: string) =>
    api.post<{ accessToken: string; refreshToken: string }>('/auth/refresh-token', {
      refreshToken,
    }),

  // Logout
  logout: (refreshToken: string) => api.post<{ message: string }>('/auth/logout', { refreshToken }),

  // Logout de todos los dispositivos
  logoutAll: () => api.post<{ message: string }>('/auth/logout-all'),

  // Obtener perfil (vía auth service)
  getProfile: () => api.get<{ user: User }>('/auth/profile'),

  // Forgot password - solicitar reset
  forgotPassword: (email: string) =>
    api.post<{ message: string }>('/auth/forgot-password', { email }),

  // Reset password con token
  resetPassword: (token: string, newPassword: string) =>
    api.post<{ message: string }>('/auth/reset-password', { token, newPassword }),

  // Cambiar contraseña (autenticado)
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post<{ message: string }>('/auth/change-password', { currentPassword, newPassword }),

  // Health check
  healthCheck: () => api.get<{ service: string; status: string; time: string }>('/auth/health'),
}

