<template>
  <div v-if="show" class="upgrade-modal-overlay" @click="handleClose">
    <div class="upgrade-modal" @click.stop>
      <button class="modal-close" @click="handleClose">
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="modal-icon">
        <i class="bi bi-lock-fill"></i>
      </div>

      <h3 class="modal-title">Feature Premium</h3>

      <p class="modal-description">
        {{ featureName }} está disponible en el plan
        <strong>{{ requiredPlan === 'premium' ? 'Premium' : 'Enterprise' }}</strong> o superior.
      </p>

      <div v-if="featureDescription" class="feature-description">
        <p>{{ featureDescription }}</p>
      </div>

      <div class="modal-benefits">
        <h4>Con {{ requiredPlan === 'premium' ? 'Premium' : 'Enterprise' }} obtienes:</h4>
        <ul>
          <li v-for="(benefit, index) in benefits" :key="index">
            <i class="bi bi-check-circle-fill"></i>
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </div>

      <div class="modal-actions">
        <button class="btn btn-primary btn-lg w-100" @click="handleUpgrade">
          <i class="bi bi-arrow-up-circle"></i>
          Actualizar Plan
        </button>
        <button class="btn btn-outline-secondary" @click="handleClose">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  show: boolean
  featureName: string
  featureDescription?: string
  requiredPlan: 'premium' | 'enterprise'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const router = useRouter()

const benefits = computed(() => {
  if (props.requiredPlan === 'premium') {
    return [
      '10 citas médicas por mes',
      '1GB de almacenamiento',
      'Telemedicina integrada',
      'Notificaciones SMS',
      'Exportación de datos',
    ]
  } else {
    return [
      'Citas ilimitadas',
      'Almacenamiento ilimitado',
      'API completa',
      'Multi-clínica',
      'Soporte prioritario',
    ]
  }
})

const handleClose = () => {
  emit('close')
}

const handleUpgrade = () => {
  router.push('/subscription/upgrade')
  emit('close')
}
</script>

<style lang="scss" scoped>
.upgrade-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

.upgrade-modal {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  transition: color 0.2s;

  &:hover {
    color: #2c3e50;
  }
}

.modal-icon {
  text-align: center;
  margin-bottom: 1rem;

  i {
    font-size: 4rem;
    color: #ffc107;
  }
}

.modal-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.modal-description {
  text-align: center;
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.feature-description {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;

  p {
    margin: 0;
    color: #495057;
  }
}

.modal-benefits {
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;

      i {
        color: #28a745;
        font-size: 1.25rem;
      }

      span {
        color: #495057;
      }
    }
  }
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
