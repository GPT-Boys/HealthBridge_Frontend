/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { subscriptionAPI } from '@/services/subscriptionAPI'
import { useAppStore } from './app'
import type { Plan, Subscription, Usage } from '@/types/subscription.types'

export const useSubscriptionStore = defineStore('subscription', () => {
  const appStore = useAppStore()

  const plans = ref<Plan[]>([])
  const currentSubscription = ref<Subscription | null>(null)
  const currentUsage = ref<Usage | null>(null)
  const loading = computed(() => appStore.isLoading)

  // Computed
  const currentPlan = computed(() => {
    if (!currentSubscription.value) return null
    return plans.value.find((p) => p.type === currentSubscription.value?.planType)
  })

  const isBasic = computed(() => currentSubscription.value?.planType === 'basic')
  const isPremium = computed(() => currentSubscription.value?.planType === 'premium')
  const isEnterprise = computed(() => currentSubscription.value?.planType === 'enterprise')

  const canUpgrade = computed(() => {
    return currentSubscription.value?.planType !== 'enterprise'
  })

  const canDowngrade = computed(() => {
    return currentSubscription.value?.planType !== 'basic'
  })

  const usagePercentage = computed(() => {
    if (!currentUsage.value) return { appointments: 0, storage: 0 }

    const appointments =
      currentUsage.value.usage.appointments.limit === -1
        ? 0
        : (currentUsage.value.usage.appointments.count /
            currentUsage.value.usage.appointments.limit) *
          100

    const storage =
      currentUsage.value.usage.storage.limitMB === -1
        ? 0
        : (currentUsage.value.usage.storage.usedMB / currentUsage.value.usage.storage.limitMB) * 100

    return {
      appointments: Math.min(Math.round(appointments), 100),
      storage: Math.min(Math.round(storage), 100),
    }
  })

  const isNearLimit = computed(() => {
    const percentages = usagePercentage.value
    return percentages.appointments >= 80 || percentages.storage >= 80
  })

  // Actions
  const fetchPlans = async () => {
    try {
      appStore.setLoading(true)
      const response = await subscriptionAPI.getPlans()
      plans.value = response.data.plans
    } catch (error: any) {
      appStore.showToast('Error cargando planes', 'error')
      throw error
    } finally {
      appStore.setLoading(false)
    }
  }

  const fetchMySubscription = async () => {
    try {
      appStore.setLoading(true)
      const response = await subscriptionAPI.getMySubscription()
      currentSubscription.value = response.data.subscription
      currentUsage.value = response.data.usage
    } catch (error: any) {
      appStore.showToast('Error cargando suscripción', 'error')
      throw error
    } finally {
      appStore.setLoading(false)
    }
  }

  const upgrade = async (planType: string) => {
    try {
      appStore.setLoading(true)
      const response = await subscriptionAPI.upgradeSubscription(planType)
      currentSubscription.value = response.data.subscription
      appStore.showToast('¡Upgrade exitoso! 🎉', 'success')
      await fetchMySubscription()
    } catch (error: any) {
      appStore.showToast(error.response?.data?.error || 'Error en upgrade', 'error')
      throw error
    } finally {
      appStore.setLoading(false)
    }
  }

  const downgrade = async (planType: string) => {
    try {
      appStore.setLoading(true)
      const response = await subscriptionAPI.downgradeSubscription(planType)
      currentSubscription.value = response.data.subscription
      appStore.showToast('Downgrade programado para fin de período', 'info')
      await fetchMySubscription()
    } catch (error: any) {
      appStore.showToast(error.response?.data?.error || 'Error en downgrade', 'error')
      throw error
    } finally {
      appStore.setLoading(false)
    }
  }

  const cancel = async (reason?: string, feedback?: string) => {
    try {
      appStore.setLoading(true)
      await subscriptionAPI.cancelSubscription(reason, feedback)
      appStore.showToast('Suscripción cancelada', 'info')
      await fetchMySubscription()
    } catch (error: any) {
      appStore.showToast(error.response?.data?.error || 'Error cancelando', 'error')
      throw error
    } finally {
      appStore.setLoading(false)
    }
  }

  const checkLimit = async (feature: string) => {
    try {
      const response = await subscriptionAPI.checkLimit(feature)
      return response.data
    } catch (error) {
      console.error('Error verificando limites de uso:', error)
      return { allowed: false, current: 0, limit: 0, remaining: 0 }
    }
  }

  const createCheckoutSession = async (priceId: string) => {
    try {
      appStore.setLoading(true)
      const response = await subscriptionAPI.createCheckoutSession(priceId)
      // Redirigir a Stripe Checkout
      window.location.href = response.data.url
    } catch (error: any) {
      appStore.showToast('Error creando sesión de pago', 'error')
      throw error
    } finally {
      appStore.setLoading(false)
    }
  }

  return {
    plans,
    currentSubscription,
    currentUsage,
    loading,
    currentPlan,
    isBasic,
    isPremium,
    isEnterprise,
    canUpgrade,
    canDowngrade,
    usagePercentage,
    isNearLimit,
    fetchPlans,
    fetchMySubscription,
    upgrade,
    downgrade,
    cancel,
    checkLimit,
    createCheckoutSession,
  }
})
