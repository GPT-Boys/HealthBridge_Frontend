<template>
  <div class="container-fluid">
    <h2 class="mb-3">Nueva Cita</h2>
    <form @submit.prevent="submit">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Doctor ID</label>
          <input v-model="form.doctorId" type="text" class="form-control" required />
        </div>
        <div class="col-md-4">
          <label class="form-label">Fecha (YYYY-MM-DD)</label>
          <input v-model="form.appointmentDate" type="date" class="form-control" required />
        </div>
        <div class="col-md-4">
          <label class="form-label">Hora de inicio</label>
          <input v-model="form.startTime" type="datetime-local" class="form-control" required />
        </div>
        <div class="col-md-3">
          <label class="form-label">Duración (min)</label>
          <input v-model.number="form.duration" type="number" class="form-control" min="15" step="15" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Tipo</label>
          <select v-model="form.type" class="form-select" required>
            <option value="consultation">Consulta</option>
            <option value="follow_up">Control</option>
            <option value="checkup">Chequeo</option>
            <option value="emergency">Emergencia</option>
            <option value="teleconsultation">Teleconsulta</option>
            <option value="vaccination">Vacunación</option>
            <option value="surgery">Cirugía</option>
            <option value="therapy">Terapia</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Especialidad</label>
          <input v-model="form.specialization" type="text" class="form-control" />
        </div>
        <div class="col-12">
          <label class="form-label">Motivo</label>
          <textarea v-model="form.reason" class="form-control" rows="3" required></textarea>
        </div>
        <div class="col-md-3">
          <label class="form-label">Virtual</label>
          <select v-model="form.isVirtual" class="form-select">
            <option :value="false">Presencial</option>
            <option :value="true">Virtual</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Cubierto por seguro</label>
          <select v-model="form.insuranceCovered" class="form-select">
            <option :value="false">No</option>
            <option :value="true">Sí</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Proveedor de seguro</label>
          <input v-model="form.insuranceProvider" type="text" class="form-control" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Tarifa base</label>
          <input v-model.number="form.baseFee" type="number" min="0" class="form-control" />
        </div>
        <div class="col-12">
          <button class="btn btn-primary" :disabled="loading">Crear Cita</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { appointmentAPI } from '@/services/appointmentAPI'
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const router = useRouter()
const { loading, execute } = useApi()
const appStore = useAppStore()

const form = reactive({
  patientId: authStore.user?.id || '',
  doctorId: '',
  appointmentDate: '',
  startTime: '',
  duration: 30,
  type: 'consultation',
  reason: '',
  specialization: '',
  baseFee: 0,
  isVirtual: false,
  insuranceCovered: false,
  insuranceProvider: '',
  notes: '',
})

const submit = async () => {
  // Regla: 48 horas de antelación
  const start = new Date(form.startTime)
  const minDate = new Date()
  minDate.setHours(minDate.getHours() + 48)
  if (isNaN(start.getTime()) || start < minDate) {
    appStore.showToast('Validación', 'La cita debe reservarse con al menos 48 horas de antelación.', 'warning')
    return
  }

  // Regla: Solo 1 cita por día por paciente
  const dayStart = new Date(form.appointmentDate + 'T00:00:00')
  const dayEnd = new Date(form.appointmentDate + 'T23:59:59')
  const existing = await execute(() =>
    appointmentAPI.getAppointments({
      patientId: form.patientId,
      dateFrom: dayStart.toISOString(),
      dateTo: dayEnd.toISOString(),
      limit: 1,
    }),
  )
  if (existing?.appointments?.length > 0) {
    appStore.showToast('Validación', 'Ya tienes una cita ese día. Solo se permite 1 cita diaria.', 'warning')
    return
  }

  await execute(() => appointmentAPI.createAppointment(form))
  router.push('/dashboard/appointments')
}

// Duración por especialidad (ejemplo simple)
const specializationDuration: Record<string, number> = {
  Cardiología: 30,
  Neurología: 45,
  Pediatría: 30,
  Dermatología: 20,
}

watch(
  () => form.specialization,
  (val) => {
    if (val && specializationDuration[val] && !form.duration) {
      form.duration = specializationDuration[val]
    }
  },
)
</script>

<style scoped></style>
