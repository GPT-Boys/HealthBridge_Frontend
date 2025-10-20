<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="success-view">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Success Header -->
          <div class="text-center mb-5">
            <div class="success-icon mb-4">
              <i class="bi bi-check-circle-fill text-success" aria-hidden="true"></i>
            </div>
            <h1 class="display-4 fw-bold mb-3 text-success">¡Actualización Exitosa!</h1>
            <p class="lead text-muted">
              Tu plan ha sido actualizado correctamente. Disfruta de todas las nuevas
              funcionalidades.
            </p>
          </div>

          <!-- Plan Details Card -->
          <div v-if="subscriptionDetails" class="success-card mb-5">
            <div class="card border-success">
              <div class="card-header bg-success text-white">
                <h3 class="card-title mb-0">
                  <i class="bi bi-star-fill me-2" aria-hidden="true"></i>
                  Nuevo Plan: {{ subscriptionDetails.planName }}
                </h3>
              </div>
              <div class="card-body">
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="detail-item">
                      <i class="bi bi-calendar-check text-primary me-2" aria-hidden="true"></i>
                      <strong>Fecha de activación:</strong>
                      <span class="ms-2">{{ formatDate(subscriptionDetails.startDate) }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-item">
                      <i class="bi bi-calendar-event text-primary me-2" aria-hidden="true"></i>
                      <strong>Próximo pago:</strong>
                      <span class="ms-2">{{
                        formatDate(subscriptionDetails.nextPaymentDate)
                      }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-item">
                      <i class="bi bi-credit-card text-primary me-2" aria-hidden="true"></i>
                      <strong>Método de pago:</strong>
                      <span class="ms-2">{{ subscriptionDetails.paymentMethod }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-item">
                      <i class="bi bi-arrow-repeat text-primary me-2" aria-hidden="true"></i>
                      <strong>Renovación automática:</strong>
                      <span class="ms-2">
                        {{ subscriptionDetails.autoRenew ? 'Activada' : 'Desactivada' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- New Features Section -->
          <div class="new-features-section mb-5">
            <h2 class="text-center mb-4">Nuevas Funcionalidades Disponibles</h2>
            <div class="row g-4">
              <div class="col-md-4">
                <div class="feature-card p-4 h-100 text-center">
                  <div class="feature-icon mb-3">
                    <i class="bi bi-calendar-plus text-primary"></i>
                  </div>
                  <h4>Citas Ilimitadas</h4>
                  <p class="mb-0">Gestiona tantas citas como necesites sin restricciones.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="feature-card p-4 h-100 text-center">
                  <div class="feature-icon mb-3">
                    <i class="bi bi-cloud-upload text-primary"></i>
                  </div>
                  <h4>Almacenamiento Ampliado</h4>
                  <p class="mb-0">Más espacio para tus archivos y documentos médicos.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="feature-card p-4 h-100 text-center">
                  <div class="feature-icon mb-3">
                    <i class="bi bi-headset text-primary"></i>
                  </div>
                  <h4>Soporte Prioritario</h4>
                  <p class="mb-0">Atención personalizada y respuesta rápida a tus consultas.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="next-steps-section mb-5">
            <h2 class="text-center mb-4">Próximos Pasos</h2>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="step-item d-flex align-items-center p-3 border rounded">
                  <div class="step-number me-3">
                    <span class="badge bg-primary rounded-circle">1</span>
                  </div>
                  <div>
                    <h5 class="mb-1">Explora las nuevas funciones</h5>
                    <p class="mb-0 small text-muted">
                      Descubre todas las características de tu nuevo plan.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="step-item d-flex align-items-center p-3 border rounded">
                  <div class="step-number me-3">
                    <span class="badge bg-primary rounded-circle">2</span>
                  </div>
                  <div>
                    <h5 class="mb-1">Configura tu perfil</h5>
                    <p class="mb-0 small text-muted">
                      Personaliza tu experiencia con las nuevas opciones.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="step-item d-flex align-items-center p-3 border rounded">
                  <div class="step-number me-3">
                    <span class="badge bg-primary rounded-circle">3</span>
                  </div>
                  <div>
                    <h5 class="mb-1">Invita a tu equipo</h5>
                    <p class="mb-0 small text-muted">
                      Comparte el acceso con otros miembros de tu clínica.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="step-item d-flex align-items-center p-3 border rounded">
                  <div class="step-number me-3">
                    <span class="badge bg-primary rounded-circle">4</span>
                  </div>
                  <div>
                    <h5 class="mb-1">Contacta soporte</h5>
                    <p class="mb-0 small text-muted">
                      Nuestro equipo está listo para ayudarte con la migración.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons text-center">
            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <button class="btn btn-primary btn-lg me-md-2" @click="goToDashboard">
                <i class="bi bi-speedometer2 me-2" aria-hidden="true"></i>
                Ir al Dashboard
              </button>
              <button class="btn btn-outline-primary btn-lg me-md-2" @click="goToSubscription">
                <i class="bi bi-gear me-2" aria-hidden="true"></i>
                Gestionar Suscripción
              </button>
              <button
                class="btn btn-outline-secondary btn-lg"
                @click="downloadInvoice"
                :disabled="loading"
              >
                <i class="bi bi-download me-2" aria-hidden="true"></i>
                Descargar Factura
              </button>
            </div>
          </div>

          <!-- Support Contact -->
          <div class="support-section mt-5">
            <div class="card border-light">
              <div class="card-body text-center">
                <h4 class="card-title">¿Necesitas ayuda?</h4>
                <p class="card-text">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta
                  sobre tu nueva suscripción.
                </p>
                <div class="d-flex justify-content-center gap-3">
                  <a href="mailto:support@healthbridge.com" class="btn btn-outline-primary">
                    <i class="bi bi-envelope me-2" aria-hidden="true"></i>
                    Email
                  </a>
                  <a href="tel:+1234567890" class="btn btn-outline-primary">
                    <i class="bi bi-telephone me-2" aria-hidden="true"></i>
                    Teléfono
                  </a>
                  <button class="btn btn-outline-primary" @click="openChat">
                    <i class="bi bi-chat-dots me-2" aria-hidden="true"></i>
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live region for accessibility -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubscriptionStore } from '@/stores/subscription'

interface SubscriptionDetails {
  planName: string
  startDate: string
  nextPaymentDate: string
  paymentMethod: string
  autoRenew: boolean
}

const router = useRouter()
const subscriptionStore = useSubscriptionStore()

const subscriptionDetails = ref<SubscriptionDetails | null>(null)
const loading = ref(false)
const statusMessage = ref('')

onMounted(async () => {
  await loadSubscriptionDetails()
})

async function loadSubscriptionDetails() {
  try {
    // Try to get subscription details from the store
    if (subscriptionStore?.currentSubscription) {
      const subscription = subscriptionStore.currentSubscription
      subscriptionDetails.value = {
        planName: subscription.planType.toUpperCase(),
        startDate: subscription.startDate,
        nextPaymentDate: subscription.nextPaymentDate || subscription.endDate,
        paymentMethod: subscription.paymentMethod,
        autoRenew: subscription.autoRenew,
      }
    } else {
      // Fallback data if store is not available
      subscriptionDetails.value = {
        planName: 'PREMIUM',
        startDate: new Date().toISOString(),
        nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'Tarjeta de crédito terminada en 4242',
        autoRenew: true,
      }
    }
  } catch (error) {
    console.error('Error loading subscription details:', error)
    statusMessage.value = 'Error cargando detalles de la suscripción'
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return 'Fecha no disponible'
  }
}

function goToDashboard() {
  router.push({ name: 'Dashboard' }).catch(() => {})
}

function goToSubscription() {
  router.push({ name: 'my-subscription' }).catch(() => {})
}

async function downloadInvoice() {
  loading.value = true
  statusMessage.value = 'Preparando descarga de factura...'

  try {
    // Simulate invoice download
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, this would trigger an actual download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `factura-${new Date().toISOString().split('T')[0]}.pdf`
    link.click()

    statusMessage.value = 'Factura descargada exitosamente'
  } catch (error) {
    console.error('Error downloading invoice:', error)
    statusMessage.value = 'Error al descargar la factura'
  } finally {
    loading.value = false
  }
}

function openChat() {
  // In a real implementation, this would open a chat widget
  alert('Funcionalidad de chat en desarrollo')
}
</script>

<style lang="scss" scoped>
.success-view {
  .success-icon {
    font-size: 4rem;
    animation: bounceIn 0.6s ease-out;
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .success-card {
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .detail-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.95rem;

      i {
        font-size: 1.1rem;
      }
    }
  }

  .feature-card {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    background: #fff;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      font-size: 2rem;
    }

    h4 {
      margin-top: 0.5rem;
      margin-bottom: 0.75rem;
      color: #2c3e50;
    }

    p {
      color: #6c757d;
      line-height: 1.5;
    }
  }

  .step-item {
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
      border-color: #dee2e6 !important;
    }

    .step-number {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    h5 {
      color: #2c3e50;
      font-size: 1rem;
    }
  }

  .action-buttons {
    .btn {
      min-width: 180px;
      font-weight: 600;
    }
  }

  .support-section {
    .card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: none;
    }

    .btn {
      min-width: 120px;
    }
  }

  /* Accessibility helper */
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .action-buttons {
      .d-md-flex {
        flex-direction: column;
      }

      .btn {
        margin-bottom: 0.5rem;
        min-width: auto;
      }
    }

    .support-section {
      .d-flex {
        flex-direction: column;
        gap: 0.5rem !important;
      }
    }
  }
}
</style>
