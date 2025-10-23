import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import NProgress from 'nprogress'

// Layouts
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import LandingLayout from '@/layouts/LandingLayout.vue'

// Routes
import { subscriptionRoutes } from './subscription.routes'

// Views
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LandingLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/common/HomePage.vue'),
      },
      {
        path: 'services',
        name: 'services',
        component: () => import('@/views/common/ServicesPage.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/common/AboutPage.vue'),
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/common/ContactPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterPage.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPasswordPage.vue'),
        meta: { requiresGuest: true },
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/OverviewPage.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/dashboard/ProfilePage.vue'),
      },
      // Appointments
      {
        path: 'appointments',
        name: 'appointments',
        component: () => import('@/views/dashboard/appointments/List.vue'),
        meta: { roles: ['patient', 'doctor', 'admin'] },
      },
      {
        path: 'appointments/new',
        name: 'new-appointment',
        component: () => import('@/views/dashboard/appointments/Create.vue'),
        meta: { roles: ['patient'] },
      },
      {
        path: 'appointments/:id',
        name: 'appointment-detail',
        component: () => import('@/views/dashboard/appointments/Detail.vue'),
        meta: { roles: ['patient', 'doctor', 'admin'] },
      },
      // Medical Records
      {
        path: 'medical-records',
        name: 'medical-records',
        component: () => import('@/views/dashboard/medical-records/List.vue'),
        meta: { roles: ['patient', 'doctor', 'admin'] },
      },
      {
        path: 'medical-records/create',
        name: 'medical-record-create',
        component: () => import('@/views/dashboard/medical-records/Create.vue'),
        meta: { roles: ['doctor'] },
      },
      {
        path: 'medical-records/:id',
        name: 'medical-record-detail',
        component: () => import('@/views/dashboard/medical-records/Detail.vue'),
        meta: { roles: ['patient', 'doctor', 'admin'] },
      },
      // Notifications
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('@/views/dashboard/notifications/List.vue'),
        meta: { roles: ['patient', 'doctor', 'admin'] },
      },
      // Billing
      {
        path: 'billing',
        name: 'billing',
        component: () => import('@/views/dashboard/billing/List.vue'),
        meta: { roles: ['patient', 'admin', 'doctor'] },
      },
      {
        path: 'billing/invoices/:id',
        name: 'invoice-detail',
        component: () => import('@/views/dashboard/billing/Detail.vue'),
        meta: { roles: ['patient', 'admin', 'doctor'] },
      },
      // // Rutas para doctores
      // {
      //   path: 'patients',
      //   name: 'patients',
      //   component: () => import('@/views/dashboard/patients/List.vue'),
      //   meta: { roles: ['doctor', 'admin'] },
      // },
      // {
      //   path: 'patients/:id',
      //   name: 'patient-detail',
      //   component: () => import('@/views/dashboard/patients/Detail.vue'),
      //   meta: { roles: ['doctor', 'admin'] },
      // },
      // {
      //   path: 'schedule',
      //   name: 'schedule',
      //   component: () => import('@/views/dashboard/schedule/Calendar.vue'),
      //   meta: { roles: ['doctor'] },
      // },
      // Rutas para admin
      {
        path: 'admin/users',
        name: 'admin-users',
        component: () => import('@/views/dashboard/admin/Users.vue'),
        meta: { roles: ['admin'] },
      },
      // {
      //   path: 'admin/clinics',
      //   name: 'admin-clinics',
      //   component: () => import('@/views/dashboard/admin/Clinics.vue'),
      //   meta: { roles: ['admin'] },
      // },
      // {
      //   path: 'admin/reports',
      //   name: 'admin-reports',
      //   component: () => import('@/views/dashboard/admin/Reports.vue'),
      //   meta: { roles: ['admin'] },
      // },
    ],
  },
  ...subscriptionRoutes,
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/common/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const authStore = useAuthStore()
  const appStore = useAppStore()

  // Verificar autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
    return
  }

  // Redirigir si ya está autenticado
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }

  // Verificar roles
  if (to.meta.roles && authStore.user) {
    const userRoles = Array.isArray(to.meta.roles) ? to.meta.roles : [to.meta.roles]
    if (!userRoles.includes(authStore.user.role)) {
      appStore.showToast(
        '¡No Autorizado!',
        'No tienes permisos para acceder a esta página',
        'error',
      )
      next('/dashboard')
      return
    }
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
