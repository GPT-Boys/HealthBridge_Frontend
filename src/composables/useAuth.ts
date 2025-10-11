/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const loading = computed(() => authStore.loading)

  const login = async (credentials: any) => {
    const result = await authStore.login(credentials)
    if (result.success) {
      router.push('/dashboard')
    }
    return result
  }

  const register = async (data: any) => {
    const result = await authStore.register(data)
    if (result.success) {
      router.push('/dashboard')
    }
    return result
  }

  const logout = async () => {
    await authStore.logout()
    router.push('/auth/login')
  }

  const hasRole = (role: string | string[]) => {
    return authStore.hasRole(role)
  }

  return {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    hasRole,
  }
}
