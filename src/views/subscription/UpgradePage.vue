<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="upgrade-view">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!-- Header -->
          <div class="text-center mb-5">
            <h1 class="display-4 fw-bold mb-3">
              <i class="bi bi-arrow-up-circle-fill text-primary" aria-hidden="true"></i>
              Actualiza tu Plan
            </h1>
            <p class="lead text-muted">Desbloquea todo el potencial de HealthBridge</p>
          </div>

          <!-- Current Plan Info -->
          <div v-if="subscriptionStore?.currentPlan" class="current-plan-alert mb-4">
            <div class="alert alert-info d-flex align-items-center gap-2" role="status">
              <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
              <div>
                Actualmente estás en el plan
                <strong>{{ subscriptionStore.currentPlan.name }}</strong>
              </div>
            </div>
          </div>

          <!-- Error / status -->
          <div v-if="error" class="mb-4">
            <div class="alert alert-danger" role="alert">{{ error }}</div>
          </div>

          <!-- Plans -->
          <div class="row g-4 mb-5">
            <div
              v-for="plan in upgradePlans"
              :key="plan._id"
              class="col-md-6"
              :aria-label="`Plan ${plan.name}`"
            >
              <PlanCard
                :plan="plan"
                :is-current="isCurrentPlan(plan)"
                :is-recommended="plan.type === 'premium'"
                :loading="subscriptionStore?.loading || loadingPlans || processingId === plan._id"
                @upgrade="(planType) => handleUpgrade(plan)"
              />
            </div>

            <div v-if="!loadingPlans && upgradePlans.length === 0" class="col-12">
              <div class="alert alert-secondary text-center">
                No hay planes disponibles para actualizar.
              </div>
            </div>

            <div v-if="loadingPlans" class="col-12 text-center py-4">
              <div class="spinner-border text-primary" role="status" aria-hidden="true"></div>
              <div class="mt-2 small text-muted">Cargando planes...</div>
            </div>
          </div>

          <!-- Benefits Section -->
          <div class="benefits-section">
            <h2 class="text-center mb-4">¿Por qué actualizar?</h2>

            <div class="row g-4">
              <div class="col-md-4">
                <div class="benefit-card p-4 h-100">
                  <div class="benefit-icon mb-3">
                    <i class="bi bi-speedometer2"></i>
                  </div>
                  <h4>Más Productividad</h4>
                  <p class="mb-0">Gestiona más pacientes y citas sin límites.</p>
                </div>
              </div>

              <div class="col-md-4">
                <div class="benefit-card p-4 h-100">
                  <div class="benefit-icon mb-3">
                    <i class="bi bi-shield-check"></i>
                  </div>
                  <h4>Más Seguridad</h4>
                  <p class="mb-0">Almacenamiento ampliado y backups automáticos.</p>
                </div>
              </div>

              <div class="col-md-4">
                <div class="benefit-card p-4 h-100">
                  <div class="benefit-icon mb-3">
                    <i class="bi bi-headset"></i>
                  </div>
                  <h4>Soporte Prioritario</h4>
                  <p class="mb-0">Atención personalizada y respuesta rápida.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonials -->
          <div class="testimonials-section mt-5">
            <h2 class="text-center mb-4">Lo que dicen nuestros clientes</h2>

            <div class="row g-4">
              <div class="col-md-4">
                <div class="testimonial-card p-4 h-100">
                  <div class="stars mb-2" aria-hidden="true">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <p class="testimonial-text">
                    "El upgrade a Premium fue la mejor decisión. Ahora puedo atender más pacientes y
                    la telemedicina es increíble."
                  </p>
                  <p class="testimonial-author mb-0">- Dr. Juan Pérez, Medicina General</p>
                </div>
              </div>

              <div class="col-md-4">
                <div class="testimonial-card p-4 h-100">
                  <div class="stars mb-2" aria-hidden="true">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <p class="testimonial-text">
                    "Enterprise nos permitió gestionar nuestras 3 clínicas desde una sola
                    plataforma. Excelente inversión."
                  </p>
                  <p class="testimonial-author mb-0">- Dra. García</p>
                </div>
              </div>

              <div class="col-md-4 d-none d-md-block">
                <div class="testimonial-card p-4 h-100">
                  <div class="stars mb-2" aria-hidden="true">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <p class="testimonial-text">
                    "Soporte y estabilidad de primera. Nuestro flujo de trabajo mejoró
                    drásticamente."
                  </p>
                  <p class="testimonial-author mb-0">- Clínica Salud+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live region for accessibility (status messages) -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ statusMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PlanCard from '@/components/subscription/PlanCard.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import type { Plan } from '@/types/subscription.types'
import { PlanType } from '@/types/subscription.types'

const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let subscriptionStore: any = null
try {
  subscriptionStore = useSubscriptionStore()
} catch {
  // fallback minimal store-like object if actual store not available during standalone editing
  subscriptionStore = {
    currentPlan: null,
    loading: false,
    async upgradeToPlan(_: string) {
      console.log(_)
      return { success: true }
    },
  }
}

const plans = ref<Plan[]>([])
const loadingPlans = ref(false)
const processingId = ref<string | null>(null)
const error = ref<string | null>(null)
const statusMessage = ref('')

const upgradePlans = computed(() => {
  if (!plans.value || plans.value.length === 0) return []
  const currentId = subscriptionStore?.currentPlan?._id
  return plans.value.filter((p) => p._id !== currentId)
})

function isCurrentPlan(plan: Plan) {
  return subscriptionStore?.currentPlan && subscriptionStore.currentPlan._id === plan._id
}

async function fetchPlans() {
  loadingPlans.value = true
  error.value = null
  try {
    // Prefer store action if available
    if (typeof subscriptionStore.fetchAvailablePlans === 'function') {
      plans.value = await subscriptionStore.fetchAvailablePlans()
      return
    }

    // Generic fetch fallback - adjust endpoint to your API
    const res = await fetch('/api/plans')
    if (!res.ok) throw new Error('No se pudieron cargar los planes')
    plans.value = await res.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // fallback to a minimal set of example plans so the view remains usable
    plans.value = [
      {
        _id: 'basic',
        name: 'Basic',
        price: 0,
        currency: 'USD',
        type: PlanType.BASIC,
        billingPeriod: 'monthly',
        features: ['Funcionalidad básica'],
        limits: { appointments: 10, storage: 100, filesPerRecord: 5 },
        isActive: true,
      },
      {
        _id: 'premium',
        name: 'Premium',
        price: 1999,
        currency: 'USD',
        type: PlanType.PREMIUM,
        billingPeriod: 'monthly',
        features: ['Mejor rendimiento y soporte'],
        limits: { appointments: 50, storage: 500, filesPerRecord: 20 },
        isActive: true,
      },
      {
        _id: 'enterprise',
        name: 'Enterprise',
        price: 4999,
        currency: 'USD',
        type: PlanType.ENTERPRISE,
        billingPeriod: 'monthly',
        features: ['Solución para organizaciones'],
        limits: { appointments: -1, storage: -1, filesPerRecord: -1 },
        isActive: true,
      },
    ]
    error.value = err?.message || 'Error cargando planes, mostrando opciones básicas.'
  } finally {
    loadingPlans.value = false
  }
}

async function handleUpgrade(plan: Plan) {
  error.value = null
  processingId.value = plan._id
  statusMessage.value = `Iniciando actualización al plan ${plan.name}`
  try {
    // If store provides upgrade flow, prefer it
    if (typeof subscriptionStore.upgradeToPlan === 'function') {
      const result = await subscriptionStore.upgradeToPlan(plan._id)
      if (result && result.success) {
        statusMessage.value = `Actualización a ${plan.name} iniciada`
        // optionally navigate to billing/checkout if returned url
        if (result.checkoutUrl) {
          window.location.href = result.checkoutUrl
          return
        }
        // refresh store or navigate to subscription page
        if (typeof subscriptionStore.refresh === 'function') await subscriptionStore.refresh()
        router.push({ name: 'SubscriptionOverview' }).catch(() => {})
        return
      } else {
        throw new Error(result?.message || 'No se pudo iniciar la actualización')
      }
    }

    // Generic upgrade: redirect to a checkout route with plan id
    router.push({ name: 'Checkout', query: { plan: plan._id } })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err?.message || 'Error al intentar actualizar el plan'
    statusMessage.value = error.value ?? ''
  } finally {
    processingId.value = null
  }
}

onMounted(() => {
  fetchPlans()
})
</script>

<style lang="scss" scoped>
.upgrade-view {
  .current-plan-alert .alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .benefit-card {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    text-align: center;
    background: #fff;
    .benefit-icon {
      font-size: 1.6rem;
      color: var(--bs-primary, #0d6efd);
    }
    h4 {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      color: #6c757d;
    }
  }

  .testimonial-card {
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 0.5rem;
    background: #fff;
    .stars {
      color: #ffc107;
      font-size: 1rem;
    }
    .testimonial-text {
      color: #495057;
      margin: 0.5rem 0;
    }
    .testimonial-author {
      color: #6c757d;
      font-size: 0.9rem;
    }
  }

  /* Make PlanCard column a consistent height */
  .col-md-6 {
    display: flex;
    align-items: stretch;
  }

  /* accessibility helper */
  .visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
}
</style>
