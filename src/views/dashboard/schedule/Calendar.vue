<template>
  <div class="container-fluid">
    <h2 class="mb-3">Mi Agenda</h2>
    <div class="row g-3 mb-3">
      <div class="col-md-3">
        <label class="form-label">Fecha</label>
        <input type="date" v-model="date" class="form-control" @change="load" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-header">Citas del día</div>
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <ul v-else class="list-group list-group-flush">
              <li class="list-group-item" v-for="apt in appointments" :key="apt.id">
                <strong>{{ formatters.formatTime(apt.startTime) }}</strong>
                - Paciente: {{ apt.patientId }}
                <span class="ms-2 text-capitalize">({{ apt.status }})</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-header">Slots disponibles</div>
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <ul v-else class="list-group list-group-flush">
              <li class="list-group-item" v-for="slot in slots" :key="slot.startTime">
                {{ formatters.formatTime(slot.startTime) }} - {{ formatters.formatTime(slot.endTime) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'
import { appointmentAPI } from '@/services/appointmentAPI'
import type { Appointment, AvailableSlot } from '@/types/appointment.types'
import { formatters } from '@/utils/formatters'

const auth = useAuthStore()
const { loading, execute } = useApi()
const date = ref<string>(new Date().toISOString().slice(0, 10))
const appointments = ref<Appointment[]>([])
const slots = ref<AvailableSlot[]>([])

const load = async () => {
  const from = new Date(date.value + 'T00:00:00Z').toISOString()
  const to = new Date(date.value + 'T23:59:59Z').toISOString()
  const a = await execute(() => appointmentAPI.getAppointments({ doctorId: auth.user?.id, dateFrom: from, dateTo: to, limit: 50 }))
  appointments.value = a?.appointments || []
  const s = await execute(() => appointmentAPI.getAvailableSlots(auth.user?.id || '', date.value, 30))
  slots.value = s?.availableSlots || []
}

onMounted(load)
</script>

<style scoped></style>
