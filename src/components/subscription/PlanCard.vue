<template>
  <div
    class="plan-card"
    :class="{
      'plan-current': isCurrent,
      'plan-recommended': isRecommended,
      'plan-popular': plan.type === 'premium',
    }"
  >
    <div v-if="plan.type === 'premium'" class="popular-badge">⭐ Más Popular</div>

    <div class="plan-header">
      <div class="plan-icon">
        <i :class="getPlanIcon()"></i>
      </div>
      <h3 class="plan-name">{{ plan.name }}</h3>
      <div class="plan-price">
        <span v-if="plan.price === 0" class="price-free">Gratis</span>
        <template v-else>
          <span class="price-currency">Bs.</span>
          <span class="price-amount">{{ plan.price }}</span>
          <span class="price-period">/mes</span>
        </template>
      </div>
    </div>

    <div class="plan-features">
      <ul>
        <li v-for="(feature, index) in plan.features" :key="index">
          <i class="bi bi-check-circle-fill text-success"></i>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>

    <div class="plan-limits">
      <div class="limit-item">
        <i class="bi bi-calendar-event"></i>
        <span>
          {{ plan.limits.appointments === -1 ? 'Ilimitadas' : plan.limits.appointments }}
          citas/mes
        </span>
      </div>
      <div class="limit-item">
        <i class="bi bi-hdd"></i>
        <span>
          {{ plan.limits.storage === -1 ? 'Ilimitado' : plan.limits.storage + 'MB' }}
          storage
        </span>
      </div>
    </div>

    <div class="plan-action">
      <button v-if="isCurrent" class="btn btn-outline-primary w-100" disabled>
        <i class="bi bi-check-lg"></i> Plan Actual
      </button>
      <button
        v-else-if="canUpgrade"
        class="btn btn-primary w-100"
        @click="handleUpgrade"
        :disabled="loading"
      >
        <i class="bi bi-arrow-up-circle"></i>
        Actualizar a {{ plan.name }}
      </button>
      <button
        v-else-if="canDowngrade"
        class="btn btn-outline-secondary w-100"
        @click="handleDowngrade"
        :disabled="loading"
      >
        <i class="bi bi-arrow-down-circle"></i>
        Cambiar a {{ plan.name }}
      </button>
      <button v-else class="btn btn-success w-100" @click="handleSelect" :disabled="loading">
        Seleccionar Plan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import type { Plan } from '@/types/subscription.types'

interface Props {
  plan: Plan
  isCurrent?: boolean
  isRecommended?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  upgrade: [planType: string]
  downgrade: [planType: string]
  select: [planType: string]
}>()

const subscriptionStore = useSubscriptionStore()

const canUpgrade = computed(() => {
  if (!subscriptionStore.currentSubscription) return true
  const planHierarchy: Record<string, number> = {
    basic: 1,
    premium: 2,
    enterprise: 3,
  }
  const current = planHierarchy[subscriptionStore.currentSubscription.planType] ?? 0
  const target = planHierarchy[props.plan.type] ?? 0
  return target > current
})

const canDowngrade = computed(() => {
  if (!subscriptionStore.currentSubscription) return false
  const planHierarchy: Record<string, number> = {
    basic: 1,
    premium: 2,
    enterprise: 3,
  }
  const current = planHierarchy[subscriptionStore.currentSubscription.planType] ?? 0
  const target = planHierarchy[props.plan.type] ?? 0
  return target < current
})
const getPlanIcon = () => {
  const icons: Record<string, string> = {
    basic: 'bi bi-person',
    premium: 'bi bi-star-fill',
    enterprise: 'bi bi-building',
  }
  return icons[props.plan.type] || 'bi bi-box'
}

const handleUpgrade = () => {
  emit('upgrade', props.plan.type)
}

const handleDowngrade = () => {
  emit('downgrade', props.plan.type)
}

const handleSelect = () => {
  emit('select', props.plan.type)
}
</script>

<style lang="scss" scoped>
.plan-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  &.plan-current {
    border: 3px solid #007bff;
  }

  &.plan-recommended {
    border: 3px solid #28a745;
  }

  &.plan-popular {
    border: 3px solid #ffc107;
  }
}

.popular-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-icon {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.plan-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;

  .price-free {
    font-size: 2rem;
    font-weight: 700;
    color: #28a745;
  }

  .price-currency {
    font-size: 1.25rem;
    font-weight: 600;
    color: #6c757d;
  }

  .price-amount {
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
  }

  .price-period {
    font-size: 1rem;
    color: #6c757d;
  }
}

.plan-features {
  margin-bottom: 2rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      i {
        font-size: 1.25rem;
      }

      span {
        font-size: 0.9375rem;
        color: #495057;
      }
    }
  }
}

.plan-limits {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.limit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;

  i {
    color: #007bff;
  }
}

.plan-action {
  .btn {
    font-weight: 600;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
