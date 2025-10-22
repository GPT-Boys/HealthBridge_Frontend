<template>
  <div class="cancel-page">
    <div class="container py-5">
      <!-- Header -->
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="text-center mb-5">
            <div class="cancel-icon mb-3">
              <i class="bi bi-x-circle-fill"></i>
            </div>
            <h1 class="display-5 fw-bold text-danger">Cancelar Suscripción</h1>
            <p class="lead text-muted">
              Lamentamos verte partir. Tu suscripción permanecerá activa hasta el final del período
              actual.
            </p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <!-- <div v-if="subscriptionStore.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div> -->

      <!-- Main Content -->
      <!-- v-else -->
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Current Subscription Info -->
          <div class="card mb-4">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="bi bi-info-circle"></i>
                Información de tu Suscripción
              </h5>
            </div>
            <div class="card-body">
              <div v-if="subscriptionStore.currentPlan" class="row">
                <div class="col-md-6">
                  <h6 class="text-muted">Plan Actual</h6>
                  <h4 class="fw-bold">{{ subscriptionStore.currentPlan.name }}</h4>
                  <p class="text-muted">
                    <strong v-if="subscriptionStore.currentPlan.price === 0">Gratis</strong>
                    <strong v-else>Bs. {{ subscriptionStore.currentPlan.price }}/mes</strong>
                  </p>
                </div>
                <div class="col-md-6">
                  <h6 class="text-muted">Próxima Renovación</h6>
                  <h5 class="fw-bold text-primary">
                    {{ formatDate(subscriptionStore.currentSubscription?.endDate) }}
                  </h5>
                  <small class="text-muted"> Tu acceso continuará hasta esta fecha </small>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancellation Form -->
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="bi bi-chat-square-text"></i>
                Cuéntanos por qué cancelas
              </h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleCancel">
                <!-- Cancellation Reasons -->
                <div class="mb-4">
                  <label class="form-label fw-semibold">Motivo principal de cancelación</label>
                  <div class="row g-3">
                    <div v-for="reason in cancellationReasons" :key="reason.id" class="col-md-6">
                      <div class="form-check">
                        <input
                          :id="reason.id"
                          v-model="selectedReason"
                          :value="reason.id"
                          class="form-check-input"
                          type="radio"
                          name="cancellationReason"
                        />
                        <label :for="reason.id" class="form-check-label">
                          <i :class="reason.icon" class="me-2"></i>
                          {{ reason.label }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional Feedback -->
                <div class="mb-4">
                  <label for="feedback" class="form-label fw-semibold">
                    Comentarios adicionales (opcional)
                  </label>
                  <textarea
                    id="feedback"
                    v-model="feedback"
                    class="form-control"
                    rows="4"
                    placeholder="Ayúdanos a mejorar nuestro servicio..."
                  ></textarea>
                </div>

                <!-- Retention Offers -->
                <div v-if="showRetentionOffers" class="retention-offers mb-4">
                  <div class="alert alert-info border-0">
                    <h6 class="alert-heading">
                      <i class="bi bi-lightbulb"></i>
                      ¿Has considerado estas opciones?
                    </h6>
                    <div class="row g-3 mt-3">
                      <div class="col-md-6">
                        <div class="retention-option">
                          <h6 class="fw-semibold">
                            <i class="bi bi-pause-circle"></i>
                            Pausar Suscripción
                          </h6>
                          <p class="small text-muted mb-2">
                            Mantén tu cuenta pero pausa los pagos temporalmente
                          </p>
                          <button
                            type="button"
                            class="btn btn-outline-primary btn-sm"
                            @click="handlePause"
                          >
                            Más información
                          </button>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="retention-option">
                          <h6 class="fw-semibold">
                            <i class="bi bi-arrow-down-circle"></i>
                            Downgrade a Plan Básico
                          </h6>
                          <p class="small text-muted mb-2">
                            Reduce costos manteniendo funcionalidades esenciales
                          </p>
                          <button
                            type="button"
                            class="btn btn-outline-primary btn-sm"
                            @click="handleDowngrade"
                          >
                            Ver Plan Básico
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex gap-3 justify-content-end">
                  <button type="button" class="btn btn-outline-secondary" @click="handleGoBack">
                    <i class="bi bi-arrow-left"></i>
                    Volver
                  </button>
                  <button
                    type="submit"
                    class="btn btn-danger"
                    :disabled="!selectedReason || isProcessing"
                  >
                    <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-x-circle"></i>
                    {{ isProcessing ? 'Cancelando...' : 'Confirmar Cancelación' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- What Happens Next -->
          <div class="card mt-4">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="bi bi-question-circle"></i>
                ¿Qué sucede después?
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <div class="step-item text-center">
                    <div class="step-icon mb-2">
                      <i class="bi bi-calendar-check"></i>
                    </div>
                    <h6 class="fw-semibold">Acceso Continuado</h6>
                    <p class="small text-muted">
                      Mantienes acceso completo hasta
                      {{ formatDate(subscriptionStore.currentSubscription?.endDate) }}
                    </p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="step-item text-center">
                    <div class="step-icon mb-2">
                      <i class="bi bi-download"></i>
                    </div>
                    <h6 class="fw-semibold">Exportar Datos</h6>
                    <p class="small text-muted">
                      Puedes exportar todos tus datos antes de la fecha de finalización
                    </p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="step-item text-center">
                    <div class="step-icon mb-2">
                      <i class="bi bi-arrow-clockwise"></i>
                    </div>
                    <h6 class="fw-semibold">Reactivar</h6>
                    <p class="small text-muted">
                      Puedes reactivar tu suscripción en cualquier momento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubscriptionStore } from '@/stores/subscription'
import { useAppStore } from '@/stores/app'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Swal from 'sweetalert2'

const router = useRouter()
const subscriptionStore = useSubscriptionStore()
const appStore = useAppStore()

// Form data
const selectedReason = ref('')
const feedback = ref('')
const isProcessing = ref(false)

// Cancellation reasons
const cancellationReasons = ref([
  {
    id: 'too-expensive',
    label: 'Muy caro',
    icon: 'bi bi-currency-dollar',
  },
  {
    id: 'not-using',
    label: 'No lo uso lo suficiente',
    icon: 'bi bi-calendar-x',
  },
  {
    id: 'missing-features',
    label: 'Faltan funcionalidades',
    icon: 'bi bi-gear',
  },
  {
    id: 'technical-issues',
    label: 'Problemas técnicos',
    icon: 'bi bi-exclamation-triangle',
  },
  {
    id: 'found-alternative',
    label: 'Encontré una alternativa',
    icon: 'bi bi-arrow-right-circle',
  },
  {
    id: 'other',
    label: 'Otro motivo',
    icon: 'bi bi-three-dots',
  },
])

// Computed properties
const showRetentionOffers = computed(() => {
  // Show retention offers for premium/enterprise plans
  return subscriptionStore.currentSubscription?.planType !== 'basic'
})

// Methods
const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return format(new Date(date), 'dd MMM yyyy', { locale: es })
}

const handleCancel = async () => {
  if (!selectedReason.value) {
    appStore.showToast('Por favor selecciona un motivo de cancelación', 'warning')
    return
  }

  // Final confirmation
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    html: `
      <div class="text-start">
        <p>Tu suscripción será cancelada y:</p>
        <ul class="text-start">
          <li>Mantendrás acceso hasta <strong>${formatDate(subscriptionStore.currentSubscription?.endDate)}</strong></li>
          <li>No se realizarán más cobros</li>
          <li>Podrás reactivar en cualquier momento</li>
        </ul>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No cancelar',
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
  })

  if (result.isConfirmed) {
    try {
      isProcessing.value = true

      // Prepare cancellation data
      const cancellationData = {
        reason: selectedReason.value,
        feedback: feedback.value,
      }

      await subscriptionStore.cancel(JSON.stringify(cancellationData))

      // Success message
      await Swal.fire({
        title: 'Suscripción Cancelada',
        text: 'Tu suscripción ha sido cancelada exitosamente. Mantienes acceso hasta el final del período.',
        icon: 'success',
        confirmButtonText: 'Entendido',
      })

      // Redirect to success page
      router.push('/subscription/success')
    } catch (error) {
      console.error('Error canceling subscription:', error)
      appStore.showToast('Error al cancelar la suscripción', 'error')
    } finally {
      isProcessing.value = false
    }
  }
}

const handleGoBack = () => {
  router.push('/subscription/my-subscription')
}

const handlePause = () => {
  Swal.fire({
    title: 'Pausar Suscripción',
    text: 'Esta funcionalidad estará disponible próximamente. Por ahora puedes cancelar y reactivar cuando necesites.',
    icon: 'info',
    confirmButtonText: 'Entendido',
  })
}

const handleDowngrade = () => {
  router.push('/subscription/upgrade')
}

// Lifecycle
onMounted(async () => {
  await subscriptionStore.fetchMySubscription()
})
</script>

<style lang="scss" scoped>
.cancel-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.cancel-icon {
  i {
    font-size: 4rem;
    color: #dc3545;
    opacity: 0.8;
  }
}

.form-check {
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    border-color: #007bff;
  }

  .form-check-input:checked + .form-check-label {
    color: #007bff;
    font-weight: 600;
  }

  .form-check-input:checked ~ .form-check-label {
    color: #007bff;
    font-weight: 600;
  }
}

.retention-offers {
  .retention-option {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 0.5rem;
    border: 1px solid #dee2e6;

    h6 {
      color: #007bff;
      margin-bottom: 0.5rem;
    }
  }
}

.step-item {
  .step-icon {
    i {
      font-size: 2rem;
      color: #007bff;
    }
  }

  h6 {
    color: #2c3e50;
  }
}

.card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 0.75rem;

  .card-header {
    background: #fff;
    border-bottom: 1px solid #dee2e6;
    border-radius: 0.75rem 0.75rem 0 0 !important;

    h5 {
      color: #2c3e50;
      font-weight: 600;
    }
  }
}

.btn {
  border-radius: 0.5rem;
  font-weight: 500;

  &.btn-danger {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    border: none;

    &:hover {
      background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
      transform: translateY(-1px);
    }
  }

  &.btn-outline-secondary {
    &:hover {
      transform: translateY(-1px);
    }
  }
}

.form-control {
  border-radius: 0.5rem;
  border: 1px solid #ced4da;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.alert {
  border-radius: 0.75rem;

  &.alert-info {
    background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
    border: 1px solid #b8daff;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .cancel-icon i {
    font-size: 3rem;
  }

  .display-5 {
    font-size: 2rem;
  }

  .form-check {
    padding: 0.75rem;
  }
}
</style>






