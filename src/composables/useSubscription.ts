import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useRouter } from 'vue-router'

export function useSubscription() {
  const subscriptionStore = useSubscriptionStore()
  const router = useRouter()

  const requireFeature = (feature: string, redirectOnFail = true) => {
    const hasFeature = computed(() => {
      const plan = subscriptionStore.currentPlan
      if (!plan) return false

      // Lógica de features según el plan
      const features: Record<string, string[]> = {
        basic: [],
        premium: ['telemedicine', 'sms', 'export'],
        enterprise: ['telemedicine', 'sms', 'export', 'api', 'multiClinic', 'advanced'],
      }

      return features[plan.type]?.includes(feature) || false
    })

    if (!hasFeature.value && redirectOnFail) {
      router.push('/subscription/upgrade')
    }

    return hasFeature
  }

  const checkAppointmentLimit = async () => {
    return await subscriptionStore.checkLimit('appointments')
  }

  const checkStorageLimit = async () => {
    return await subscriptionStore.checkLimit('storage')
  }

  const showUpgradeModal = () => {
    // Implementar modal de upgrade
    router.push('/subscription/upgrade')
  }

  return {
    requireFeature,
    checkAppointmentLimit,
    checkStorageLimit,
    showUpgradeModal,
  }
}
