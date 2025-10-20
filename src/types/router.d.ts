import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    roles?: Array<'patient' | 'doctor' | 'admin'>
  }
}

export {}
