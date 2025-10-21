import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const AUTH_TARGET = env.VITE_AUTH_SERVICE_TARGET || 'http://localhost:3001'
  const USERS_TARGET = env.VITE_USER_SERVICE_TARGET || 'http://localhost:3002'
  const APPOINTMENTS_TARGET = env.VITE_APPOINTMENT_SERVICE_TARGET || 'http://localhost:3003'
  const NOTIFICATION_TARGET = env.VITE_NOTIFICATION_SERVICE_TARGET || 'http://localhost:3004'
  const BILLING_TARGET = env.VITE_BILLING_SERVICE_TARGET || 'http://localhost:3006'

  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss";`,
        },
      },
    },
    server: {
      port: 5173,
      proxy: {
        // Auth
        '/api/auth': {
          target: AUTH_TARGET,
          changeOrigin: true,
        },
        // Users
        '/api/users': {
          target: USERS_TARGET,
          changeOrigin: true,
        },
        // Citas
        '/api/appointments': {
          target: APPOINTMENTS_TARGET,
          changeOrigin: true,
          // mismos paths
        },
        // Notificaciones
        '/api/notification': {
          target: NOTIFICATION_TARGET,
          changeOrigin: true,
        },
        // Facturación
        '/api/invoices': {
          target: BILLING_TARGET,
          changeOrigin: true,
        },
        '/api/payments': {
          target: BILLING_TARGET,
          changeOrigin: true,
        },
        '/api/reports': {
          target: BILLING_TARGET,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            ui: ['bootstrap', 'sweetalert2', 'animate.css'],
            bootstrap: ['bootstrap'],
            charts: ['chart.js', 'vue-chartjs'],
          },
        },
      },
    },
  }
})
