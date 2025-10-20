import api from './api'
import type { Plan, Subscription, Usage, LimitCheck } from '@/types/subscription.types'

export const subscriptionAPI = {
  // Planes
  getPlans: () => api.get<{ plans: Plan[] }>('http://localhost:3007/api/plans'),

  getPlan: (type: string) => api.get<{ plan: Plan }>('http://localhost:3007/api/plans/' + type),

  // Suscripciones
  getMySubscription: () =>
    api.get<{ subscription: Subscription; usage: Usage }>(
      'http://localhost:3007/api/subscription/my-subscription',
    ),

  createSubscription: (data: { planType: string; paymentMethod?: string }) =>
    api.post<{ subscription: Subscription }>('http://localhost:3007/api/subscription', data),

  upgradeSubscription: (planType: string) =>
    api.post<{ subscription: Subscription }>('http://localhost:3007/api/subscription/upgrade', {
      planType,
    }),

  downgradeSubscription: (planType: string) =>
    api.post<{ subscription: Subscription }>('http://localhost:3007/api/subscription/downgrade', {
      planType,
    }),

  cancelSubscription: (reason?: string) =>
    api.post<{ subscription: Subscription }>('http://localhost:3007/api/subscription/cancel', {
      reason,
    }),

  createCheckoutSession: (priceId: string) =>
    api.post<{ sessionId: string; url: string }>(
      'http://localhost:3007/api/subscription/checkout-session',
      { priceId },
    ),

  // Uso
  getCurrentUsage: () => api.get<{ usage: Usage }>('http://localhost:3007/api/usage/current'),

  checkLimit: (feature: string) =>
    api.get<LimitCheck>(`http://localhost:3007/api/usage/check/${feature}`),

  trackUsage: (data: { type: string; value?: number }) =>
    api.post('http://localhost:3007/api/usage/track', data),
}
