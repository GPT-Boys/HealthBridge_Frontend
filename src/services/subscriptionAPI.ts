import api from './api'
import type { Plan, Subscription, Usage, LimitCheck } from '@/types/subscription.types'

export const subscriptionAPI = {
  // Planes
  // Público: lista de planes via Gateway/Proxy -> GET /api/plans
  getPlans: () => api.get<{ plans: Plan[] }>('/plans'),

  // Público: detalle de plan -> GET /api/plans/:type
  getPlan: (type: string) => api.get<{ plan: Plan }>(`/plans/${type}`),

  // Suscripciones
  // GET /api/subscription/my-subscription
  getMySubscription: () =>
    api.get<{ subscription: Subscription; usage: Usage }>(
      '/subscription/my-subscription',
    ),

  // POST /api/subscription
  createSubscription: (data: { planType: string; paymentMethod?: string }) =>
    api.post<{ subscription: Subscription }>('/subscription', data),

  // POST /api/subscription/upgrade
  upgradeSubscription: (planType: string) =>
    api.post<{ subscription: Subscription }>('/subscription/upgrade', {
      planType,
    }),

  // POST /api/subscription/downgrade
  downgradeSubscription: (planType: string) =>
    api.post<{ subscription: Subscription }>('/subscription/downgrade', {
      planType,
    }),

  // POST /api/subscription/cancel
  cancelSubscription: (reason?: string, feedback?: string) =>
    api.post<{ subscription: Subscription }>('/subscription/cancel', {
      reason,
      feedback,
    }),

  // POST /api/subscription/checkout-session
  createCheckoutSession: (priceId: string) =>
    api.post<{ sessionId: string; url: string }>(
      '/subscription/checkout-session',
      { priceId },
    ),

  // Uso
  // GET /api/usage/current
  getCurrentUsage: () => api.get<{ usage: Usage }>('/usage/current'),

  // GET /api/usage/check/:feature
  checkLimit: (feature: string) => api.get<LimitCheck>(`/usage/check/${feature}`),

  // POST /api/usage/track
  trackUsage: (data: { type: string; value?: number }) => api.post('/usage/track', data),
}
