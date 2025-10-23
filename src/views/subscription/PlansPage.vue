<template>
  <div class="plans-view">
    <div class="container py-5">
      <!-- Header -->
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold mb-3">Elige el Plan Perfecto para Ti</h1>
        <p class="lead text-muted">Comienza gratis y actualiza cuando estés listo</p>
      </div>

      <!-- Loading -->
      <!-- <div v-if="subscriptionStore.loading" class="text-center py-5"> -->
      <!--   <div class="spinner-border text-primary" role="status"> -->
      <!--     <span class="visually-hidden">Cargando...</span> -->
      <!--   </div> -->
      <!-- </div> -->

      <!-- Plans Grid -->
      <!-- v-else -->
      <div class="row g-4 justify-content-center mb-5">
        <div v-for="plan in subscriptionStore.plans" :key="plan._id" class="col-md-6 col-lg-4">
          <PlanCard
            :plan="plan"
            :is-current="subscriptionStore.currentSubscription?.planType === plan.type"
            :is-recommended="plan.type === 'premium'"
            :loading="subscriptionStore.loading"
            @upgrade="handleUpgrade"
            @downgrade="handleDowngrade"
            @select="handleSelect"
          />
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-section mt-5">
        <h2 class="text-center mb-4">Comparación Detallada</h2>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Funcionalidad</th>
                <th class="text-center">Basic</th>
                <th class="text-center">Premium</th>
                <th class="text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Citas por mes</td>
                <td class="text-center">2</td>
                <td class="text-center">10</td>
                <td class="text-center">Ilimitadas</td>
              </tr>
              <tr>
                <td>Almacenamiento</td>
                <td class="text-center">100MB</td>
                <td class="text-center">500MB</td>
                <td class="text-center">Ilimitado</td>
              </tr>
              <tr>
                <td>Telemedicina</td>
                <td class="text-center"><i class="bi bi-x text-danger"></i></td>
                <td class="text-center"><i class="bi bi-check text-success"></i></td>
                <td class="text-center"><i class="bi bi-check text-success"></i></td>
              </tr>
              <tr>
                <td>Notificaciones SMS</td>
                <td class="text-center"><i class="bi bi-x text-danger"></i></td>
                <td class="text-center"><i class="bi bi-check text-success"></i></td>
                <td class="text-center"><i class="bi bi-check text-success"></i></td>
              </tr>
              <tr>
                <td>API Access</td>
                <td class="text-center"><i class="bi bi-x text-danger"></i></td>
                <td class="text-center"><i class="bi bi-x text-danger"></i></td>
                <td class="text-center"><i class="bi bi-check text-success"></i></td>
              </tr>
              <tr>
                <td>Multi-Clínica</td>
                <td class="text-center"><i class="bi bi-x text-danger"></i></td>
                <td class="text-center"><i class="bi bi-x text-danger"></i></td>
                <td class="text-center"><i class="bi bi-check text-success"></i></td>
              </tr>
              <tr>
                <td>Soporte</td>
                <td class="text-center">Email</td>
                <td class="text-center">Prioritario</td>
                <td class="text-center">24/7 Dedicado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section mt-5">
        <h2 class="text-center mb-4">Preguntas Frecuentes</h2>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                  >
                    ¿Puedo cambiar de plan en cualquier momento?
                  </button>
                </h2>
                <div
                  id="faq1"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body">
                    Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los upgrades son
                    inmediatos, mientras que los downgrades se aplican al final del período de
                    facturación actual.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                  >
                    ¿Qué métodos de pago aceptan?
                  </button>
                </h2>
                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Aceptamos tarjetas de crédito y débito a través de nuestra pasarela de pago
                    segura Stripe.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                  >
                    ¿Hay contrato de permanencia?
                  </button>
                </h2>
                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    No, todos nuestros planes son mensuales sin contrato de permanencia. Puedes
                    cancelar en cualquier momento.
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
import { onMounted } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useRouter } from 'vue-router'
import PlanCard from '@/components/subscription/PlanCard.vue'
import Swal from 'sweetalert2'

const subscriptionStore = useSubscriptionStore()
const router = useRouter()

onMounted(async () => {
  await subscriptionStore.fetchPlans()
  await subscriptionStore.fetchMySubscription()
})

const handleUpgrade = async (planType: string) => {
  const result = await Swal.fire({
    title: '¿Actualizar plan?',
    text: `Se aplicará el cambio inmediatamente`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, actualizar',
    cancelButtonText: 'Cancelar',
  })

  if (result.isConfirmed) {
    try {
      await subscriptionStore.upgrade(planType)
    } catch (error) {
      console.error('Error upgrading:', error)
    }
  }
}

const handleDowngrade = async (planType: string) => {
  const result = await Swal.fire({
    title: '¿Cambiar a un plan inferior?',
    text: 'El cambio se aplicará al final del período de facturación actual',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cambiar',
    cancelButtonText: 'Cancelar',
  })

  if (result.isConfirmed) {
    try {
      await subscriptionStore.downgrade(planType)
    } catch (error) {
      console.error('Error downgrading:', error)
    }
  }
}

const handleSelect = async (planType: string) => {
  router.push(`/subscription/upgrade?plan=${planType}`)
}
</script>

<style lang="scss" scoped>
.plans-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.comparison-section,
.faq-section {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table {
  th {
    font-weight: 600;
    color: #2c3e50;
  }

  td {
    vertical-align: middle;
  }
}
</style>
