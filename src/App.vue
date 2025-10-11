<template>
  <div id="app">
    <LoadingSpinner v-if="loading" fullscreen />
    <RouterView v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const authStore = useAuthStore()
const loading = ref(true)

onMounted(async () => {
  // Inicializar autenticación
  await authStore.initializeAuth()
  loading.value = false
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
}
</style>
