/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/services/authAPI'
import { useAppStore } from './app'
import type { User, LoginCredentials, RegisterData } from '@/types/auth.types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const appStore = useAppStore()

  // Computed
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const userRole = computed(() => user.value?.role || null)
  const userFullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : '',
  )

  // Actions
  const login = async (credentials: LoginCredentials) => {
    try {
      appStore.setLoading(true)
      appStore.setError(null)

      const response = await authAPI.login(credentials)
      const { user: userData, accessToken: token, refreshToken: refresh } = response.data

      // Guardar en state
      user.value = userData
      accessToken.value = token
      refreshToken.value = refresh

      // Guardar en localStorage
      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('user', JSON.stringify(userData))

      appStore.showToast('¡Bienvenido!', `Hola ${userData.firstName}`, 'success')

      return { success: true }
    } catch (err: any) {
      const error = err.response?.data?.error || 'Error al iniciar sesión'
      appStore.setError(error)

      appStore.showToast('Error', error, 'error')

      return { success: false, error: error }
    } finally {
      appStore.setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    try {
      appStore.setLoading(true)
      appStore.setError(null)

      const response = await authAPI.register(data)
      const { user: userData, accessToken: token, refreshToken: refresh } = response.data

      // Guardar en state
      user.value = userData
      accessToken.value = token
      refreshToken.value = refresh

      // Guardar en localStorage
      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', refresh)
      localStorage.setItem('user', JSON.stringify(userData))

      appStore.showToast('¡Registro Exitoso!', 'Tu cuenta ha sido creada correctamente', 'success')

      return { success: true }
    } catch (err: any) {
      const error = err.response?.data?.error || 'Error al registrarse'
      appStore.setError(error)

      appStore.showToast('Error', error, 'error')

      return { success: false, error: error }
    } finally {
      appStore.setLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (refreshToken.value) {
        await authAPI.logout(refreshToken.value)
      }
    } catch (err) {
      console.error('Error durante logout:', err)
    } finally {
      // Limpiar state
      user.value = null
      accessToken.value = null
      refreshToken.value = null
      appStore.setError(null)

      // Limpiar localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      appStore.showToast('Sesión Cerrada', 'Has cerrado sesión exitosamente', 'info')
    }
  }

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const response = await authAPI.refreshToken(refreshToken.value)
      const { accessToken: newToken, refreshToken: newRefresh } = response.data

      accessToken.value = newToken
      refreshToken.value = newRefresh

      localStorage.setItem('accessToken', newToken)
      localStorage.setItem('refreshToken', newRefresh)

      return newToken
    } catch (err) {
      console.error('Error refreshing token:', err)
      await logout()
      return null
    }
  }

  const verifyToken = async (): Promise<boolean> => {
    try {
      if (!accessToken.value) return false

      const response = await authAPI.verifyToken()

      if (response.data.valid) {
        user.value = response.data.user
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return true
      }

      return false
    } catch (err) {
      console.error('Error verifying token:', err)
      await logout()
      return false
    }
  }

  const initializeAuth = async () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('accessToken')

    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser)
      accessToken.value = storedToken

      // Verificar que el token siga válido
      const isValid = await verifyToken()

      if (!isValid) {
        await logout()
      }
    }
  }

  const hasRole = (role: string | string[]): boolean => {
    if (!user.value) return false

    if (Array.isArray(role)) {
      return role.includes(user.value.role)
    }

    return user.value.role === role
  }

  return {
    // State
    user,
    accessToken,
    refreshToken,

    // Computed
    isAuthenticated,
    userRole,
    userFullName,

    // Actions
    login,
    register,
    logout,
    refreshAccessToken,
    verifyToken,
    initializeAuth,
    hasRole,
  }
})
