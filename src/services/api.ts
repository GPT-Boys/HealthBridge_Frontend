import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')

// Crear instancia de Axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const authStore = useAuthStore()
    const appStore = useAppStore()

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Si el error es 401 y no es un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newToken = await authStore.refreshAccessToken()

        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Si falla el refresh, hacer logout
        authStore.logout()
        appStore.showToast(
          'Sesión expirada',
          'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
          'warning',
        )
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    } else if (error.response && error.response.status >= 500) {
      appStore.showToast(
        'Error del servidor',
        'Error del servidor. Por favor, intente más tarde.',
        'error',
      )
    } else if (error.code === 'ECONNABORTED') {
      appStore.showToast(
        'Tiempo expirado',
        'La solicitud tardó demasiado. Por favor, intente nuevamente.',
        'error',
      )
    }

    return Promise.reject(error)
  },
)

export default api
