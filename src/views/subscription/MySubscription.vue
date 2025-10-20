<template>
  <div class="my-subscription-view">
    <div class="container py-5">
      <h1 class="mb-4">
        <i class="bi bi-credit-card"></i>
        Mi Suscripción
      </h1>

      <!-- Loading -->
      <div v-if="subscriptionStore.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>

      <div v-else class="row g-4">
        <!-- Current Plan -->
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="bi bi-star-fill"></i>
                Plan Actual
              </h5>
            </div>
            <div class="card-body">
              <div v-if="subscriptionStore.currentPlan" class="plan-info">
                <div class="row align-items-center">
                  <div class="col-md-6">
                    <h3 class="plan-name">{{ subscriptionStore.currentPlan.name }}</h3>
                    <p class="plan-price">
                      <strong v-if="subscriptionStore.currentPlan.price === 0">Gratis</strong>
                      <strong v-else> Bs. {{ subscriptionStore.currentPlan.price }}/mes </strong>
                    </p>
                    <div class="plan-status">
                      <span
                        class="badge"
                        :class="{
                          'bg-success': subscriptionStore.currentSubscription?.status === 'active',
                          'bg-warning': subscriptionStore.currentSubscription?.status === 'trial',
                          'bg-danger':
                            subscriptionStore.currentSubscription?.status === 'cancelled',
                        }"
                      >
                        {{ getStatusText(subscriptionStore.currentSubscription?.status) }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-6 text-md-end">
                    <div class="plan-dates">
                      <p class="mb-1">
                        <small class="text-muted">Inicio:</small>
                        <br />
                        <strong>{{
                          formatDate(subscriptionStore.currentSubscription?.startDate)
                        }}</strong>
                      </p>
                      <p class="mb-1">
                        <small class="text-muted">Renovación:</small>
                        <br />
                        <strong>{{
                          formatDate(subscriptionStore.currentSubscription?.endDate)
                        }}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <hr />

                <div class="plan-actions">
                  <button
                    v-if="subscriptionStore.canUpgrade"
                    class="btn btn-primary me-2"
                    @click="router.push('/subscription/upgrade')"
                  >
                    <i class="bi bi-arrow-up-circle"></i>
                    Actualizar Plan
                  </button>
                  <button
                    v-if="subscriptionStore.currentSubscription?.status === 'active'"
                    class="btn btn-outline-danger"
                    @click="handleCancel"
                  >
                    <i class="bi bi-x-circle"></i>
                    Cancelar Suscripción
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Usage Progress -->
          <UsageProgress :usage="subscriptionStore.currentUsage" />
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Quick Stats -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="bi bi-graph-up"></i>
                Resumen
              </h5>
            </div>
            <div class="card-body">
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="bi bi-calendar-event"></i>
                </div>
                <div class="stat-info">
                  <p class="stat-label">Citas este mes</p>
                  <p class="stat-value">
                    {{ subscriptionStore.currentUsage?.usage.appointments.count || 0 }}
                  </p>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="bi bi-hdd"></i>
                </div>
                <div class="stat-info">
                  <p class="stat-label">Almacenamiento</p>
                  <p class="stat-value">
                    {{ (subscriptionStore.currentUsage?.usage.storage.usedMB || 0).toFixed(1) }} MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="bi bi-check-circle"></i>
                Features Incluidas
              </h5>
            </div>
            <div class="card-body">
              <ul class="features-list">
                <li
                  v-for="(feature, index) in subscriptionStore.currentPlan?.features"
                  :key="index"
                >
                  <i class="bi bi-check-circle-fill text-success"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useRouter } from 'vue-router'
import UsageProgress from '@/components/subscription/UsageProgress.vue'
import { useAppStore } from '@/stores/app'
import Swal from 'sweetalert2'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const appStore = useAppStore()
const subscriptionStore = useSubscriptionStore()
const router = useRouter()

onMounted(async () => {
  await subscriptionStore.fetchMySubscription()
  await subscriptionStore.fetchPlans()
})

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return format(new Date(date), 'dd MMM yyyy', { locale: es })
}

const getStatusText = (status?: string) => {
  const statusMap: Record<string, string> = {
    active: 'Activa',
    trial: 'Prueba',
    cancelled: 'Cancelada',
    expired: 'Expirada',
  }
  return statusMap[status || ''] || 'Desconocido'
}

const handleCancel = async () => {
  const result = await Swal.fire({
    title: '¿Cancelar suscripción?',
    text: 'Tu suscripción permanecerá activa hasta el final del período actual',
    icon: 'warning',
    input: 'textarea',
    inputLabel: 'Motivo de cancelación (opcional)',
    inputPlaceholder: 'Cuéntanos por qué cancelas...',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No cancelar',
    confirmButtonColor: '#dc3545',
  })

  if (result.isConfirmed) {
    try {
      await subscriptionStore.cancel(result.value)
      appStore.showToast(
        'Suscripción cancelada',
        'Lamentamos verte partir. Tu suscripción estará activa hasta el final del período',
        'success',
      )
    } catch (error) {
      console.error('Error canceling subscription:', error)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-subscription-view {
  min-height: 100vh;
  background: #f8f9fa;
}

.plan-info {
  .plan-name {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .plan-price {
    font-size: 1.25rem;
    color: #6c757d;
    margin-bottom: 1rem;
  }

  .plan-status {
    margin-bottom: 1rem;
  }

  .plan-dates {
    small {
      font-size: 0.875rem;
    }
  }

  .plan-actions {
    margin-top: 1rem;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }

  .stat-icon {
    font-size: 2rem;
    color: #007bff;
  }

  .stat-info {
    flex: 1;

    .stat-label {
      margin: 0;
      font-size: 0.875rem;
      color: #6c757d;
    }

    .stat-value {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #2c3e50;
    }
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      font-size: 1.125rem;
    }
  }
}
</style>
