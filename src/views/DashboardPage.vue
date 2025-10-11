<template>
  <div class="dashboard">
    <div class="container py-5">
      <div class="text-center mb-5">
        <h1>¡Bienvenido, {{ authStore.userFullName }}! 🎉</h1>
        <p class="text-muted">Has iniciado sesión exitosamente como {{ authStore.userRole }}</p>
      </div>

      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Información del Usuario</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <strong>Email:</strong> {{ authStore.user.value?.email }}
                </li>
                <li class="list-group-item">
                  <strong>Nombre:</strong> {{ authStore.user.value?.firstName }}
                  {{ authStore.user.value?.lastName }}
                </li>
                <li class="list-group-item">
                  <strong>Rol:</strong>
                  <span class="badge bg-primary ms-2">{{ authStore.user.value?.role }}</span>
                </li>
                <li v-if="authStore.user.value?.profile?.phone" class="list-group-item">
                  <strong>Teléfono:</strong> {{ authStore.user.value.profile.phone }}
                </li>
                <li v-if="authStore.user.value?.profile?.specialization" class="list-group-item">
                  <strong>Especialización:</strong>
                  {{ authStore.user.value.profile.specialization }}
                </li>
              </ul>

              <div class="mt-4 d-grid">
                <button class="btn btn-danger" @click="handleLogout">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { logout } = useAuth()
const authStore = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card {
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
