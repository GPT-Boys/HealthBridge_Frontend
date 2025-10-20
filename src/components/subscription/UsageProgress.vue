<template>
  <div class="usage-progress">
    <h4 class="usage-title">
      <i class="bi bi-graph-up"></i>
      Uso del Mes Actual
    </h4>

    <div v-if="usage" class="usage-items">
      <!-- Citas -->
      <div class="usage-item">
        <div class="usage-header">
          <span class="usage-label">
            <i class="bi bi-calendar-event"></i>
            Citas Médicas
          </span>
          <span class="usage-count">
            {{ usage.usage.appointments.count }} /
            {{ usage.usage.appointments.limit === -1 ? '∞' : usage.usage.appointments.limit }}
          </span>
        </div>
        <div class="progress">
          <div
            class="progress-bar"
            :class="getProgressClass(appointmentPercentage)"
            :style="{ width: appointmentPercentage + '%' }"
          ></div>
        </div>
        <small class="text-muted">
          {{ usage.usage.appointments.limit - usage.usage.appointments.count }}
          citas restantes
        </small>
      </div>

      <!-- Storage -->
      <div class="usage-item">
        <div class="usage-header">
          <span class="usage-label">
            <i class="bi bi-hdd"></i>
            Almacenamiento
          </span>
          <span class="usage-count">
            {{ usage.usage.storage.usedMB.toFixed(1) }} MB /
            {{ usage.usage.storage.limitMB === -1 ? '∞' : usage.usage.storage.limitMB + ' MB' }}
          </span>
        </div>
        <div class="progress">
          <div
            class="progress-bar"
            :class="getProgressClass(storagePercentage)"
            :style="{ width: storagePercentage + '%' }"
          ></div>
        </div>
        <small class="text-muted">
          {{ (usage.usage.storage.limitMB - usage.usage.storage.usedMB).toFixed(1) }}
          MB disponibles
        </small>
      </div>

      <!-- API Calls (solo para Enterprise) -->
      <div v-if="usage.usage.apiCalls.limit > 0" class="usage-item">
        <div class="usage-header">
          <span class="usage-label">
            <i class="bi bi-cloud"></i>
            Llamadas API
          </span>
          <span class="usage-count">
            {{ usage.usage.apiCalls.count }} / {{ usage.usage.apiCalls.limit }}
          </span>
        </div>
        <div class="progress">
          <div
            class="progress-bar"
            :class="getProgressClass(apiPercentage)"
            :style="{ width: apiPercentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Alert si está cerca del límite -->
    <div v-if="isNearLimit" class="alert alert-warning mt-3" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i>
      Estás cerca de alcanzar tus límites.
      <router-link to="/subscription/upgrade" class="alert-link">
        Considera hacer upgrade
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Usage } from '@/types/subscription.types'

interface Props {
  usage: Usage | null
}

const props = defineProps<Props>()

const appointmentPercentage = computed(() => {
  if (!props.usage || props.usage.usage.appointments.limit === -1) return 0
  return Math.min(
    (props.usage.usage.appointments.count / props.usage.usage.appointments.limit) * 100,
    100,
  )
})

const storagePercentage = computed(() => {
  if (!props.usage || props.usage.usage.storage.limitMB === -1) return 0
  return Math.min((props.usage.usage.storage.usedMB / props.usage.usage.storage.limitMB) * 100, 100)
})

const apiPercentage = computed(() => {
  if (!props.usage || props.usage.usage.apiCalls.limit === 0) return 0
  return Math.min((props.usage.usage.apiCalls.count / props.usage.usage.apiCalls.limit) * 100, 100)
})

const isNearLimit = computed(() => {
  return appointmentPercentage.value >= 80 || storagePercentage.value >= 80
})

const getProgressClass = (percentage: number) => {
  if (percentage >= 90) return 'bg-danger'
  if (percentage >= 75) return 'bg-warning'
  return 'bg-success'
}
</script>

<style lang="scss" scoped>
.usage-progress {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.usage-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: #007bff;
  }
}

.usage-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.usage-item {
  .usage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .usage-label {
    font-weight: 500;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .usage-count {
    font-weight: 600;
    color: #2c3e50;
  }

  .progress {
    height: 0.75rem;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 0.25rem;
  }
}
</style>
