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

  // Refresh token
  refreshToken: (refreshToken: string) =>
    api.post<{ accessToken: string; refreshToken: string }>('/auth/refresh-token', {
      refreshToken,
    }),

  // Logout
  logout: (refreshToken: string) => api.post('/auth/logout', { refreshToken }),

  // Logout de todos los dispositivos
  logoutAll: () => api.post('/auth/logout-all'),

  // Obtener perfil
  getProfile: () => api.get<{ user: User }>('/auth/profile'),

  // Health check
  healthCheck: () => api.get('/health'),
}
