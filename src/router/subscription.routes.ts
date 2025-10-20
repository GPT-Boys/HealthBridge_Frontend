import type { RouteRecordRaw } from 'vue-router'

export const subscriptionRoutes: RouteRecordRaw[] = [
  {
    path: '/subscription',
    name: 'subscription',
    redirect: '/subscription/plans',
    children: [
      {
        path: 'plans',
        name: 'subscription-plans',
        component: () => import('@/views/subscription/PlansPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'my-subscription',
        name: 'my-subscription',
        component: () => import('@/views/subscription/MySubscription.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'upgrade',
        name: 'subscription-upgrade',
        component: () => import('@/views/subscription/UpgradePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'success',
        name: 'subscription-success',
        component: () => import('@/views/subscription/SuccessPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cancel',
        name: 'subscription-cancel',
        component: () => import('@/views/subscription/CancelPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]
