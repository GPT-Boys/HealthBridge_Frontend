<template>
  <div id="app">
    <LoadingSpinner v-if="isLoading" fullscreen />

    <RouterView v-else />

    <!-- Toast Container -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 11050">
      <!-- Los toasts se insertarán aquí -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const isLoading = computed(() => appStore.isLoading)
appStore.setLoading(true)

onMounted(async () => {
  // Inicializar autenticación
  await authStore.initializeAuth()
  appStore.setLoading(false)
})
</script>

<style lang="scss">
// Global styles
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}
</style>
