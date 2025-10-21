<template>
  <div class="container-fluid">
    <h2 class="mb-3">Mis Citas</h2>
    <div class="mb-3 d-flex gap-2">
      <RouterLink class="btn btn-primary" to="/dashboard/appointments/new">
        <i class="bi bi-calendar-plus"></i> Nueva Cita
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="appointments.length === 0" class="alert alert-info">
      No hay citas registradas.
    </div>

    <div v-else class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="apt in appointments" :key="apt.id">
            <td>{{ formatters.formatDate(apt.appointmentDate) }}</td>
            <td>{{ formatters.formatTime(apt.startTime) }} - {{ formatters.formatTime(apt.endTime) }}</td>
            <td class="text-capitalize">{{ apt.type }}</td>
            <td>
              <span :class="formatters.getStatusClass(apt.status)">
                {{ formatters.formatAppointmentStatus(apt.status) }}
              </span>
            </td>
            <td class="text-end">
              <RouterLink :to="`/dashboard/appointments/${apt.id}`" class="btn btn-sm btn-outline-primary">
                Ver
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { appointmentAPI } from '@/services/appointmentAPI'
import type { Appointment } from '@/types/appointment.types'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'

const { loading, execute } = useApi()
const appointments = ref<Appointment[]>([])

onMounted(async () => {
  const res = await execute(() => appointmentAPI.getAppointments({ limit: 20, page: 1 }))
  appointments.value = res?.appointments || []
})
</script>

<style scoped>
</style>
