/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'

export function useApi<T = any>() {
  const data = ref<T | null>(null)
  const appStore = useAppStore()

  const execute = async (apiCall: () => Promise<any>) => {
    appStore.setLoading(true)
    appStore.setError(null)

    try {
      const response = await apiCall()
      data.value = response.data
      return response.data
    } catch (err: any) {
      const error = err.response?.data?.error || err.message || 'Error desconocido'
      appStore.showToast('Error', error, 'error')
      throw err
    } finally {
      appStore.setLoading(false)
    }
  }

  const reset = () => {
    appStore.setLoading(false)
    appStore.setError(null)
    data.value = null
  }

  return {
    loading: computed(() => appStore.isLoading),
    error: computed(() => appStore.error),
    data: computed(() => data.value),
    execute,
    reset,
  }
}
