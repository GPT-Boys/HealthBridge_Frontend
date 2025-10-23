<template>
  <div class="container-fluid" v-if="appointment">
    <h2 class="mb-3">Detalle de Cita</h2>
    <div class="card">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4"><strong>Fecha:</strong> {{ formatters.formatDate(appointment.appointmentDate) }}</div>
          <div class="col-md-4"><strong>Inicio:</strong> {{ formatters.formatTime(appointment.startTime) }}</div>
          <div class="col-md-4"><strong>Fin:</strong> {{ formatters.formatTime(appointment.endTime) }}</div>
          <div class="col-md-4 text-capitalize"><strong>Tipo:</strong> {{ appointment.type }}</div>
          <div class="col-md-4"><strong>Estado:</strong> {{ formatters.formatAppointmentStatus(appointment.status) }}</div>
          <div class="col-md-12"><strong>Motivo:</strong> {{ appointment.reason }}</div>
        </div>
      </div>
      <div class="card-footer d-flex gap-2 flex-wrap">
        <button class="btn btn-outline-danger" @click="cancel" :disabled="loading || !canModify(18)">
          Cancelar
        </button>
        <button class="btn btn-warning" @click="openReschedule" :disabled="loading || !canModify(18)">
          Reprogramar
        </button>
        <button class="btn btn-success" @click="confirm" :disabled="loading">
          Confirmar
        </button>
        <button class="btn btn-outline-primary" @click="sendReminder" :disabled="loading">
          Enviar recordatorio
        </button>
        <button class="btn btn-primary" @click="completeAndInvoice" :disabled="loading">
          Completar y Facturar
        </button>
        <RouterLink to="/dashboard/appointments" class="btn btn-secondary">Volver</RouterLink>
      </div>
    </div>

    <!-- Modal Reschedule simple -->
    <div class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,.25)" v-if="showReschedule">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Reprogramar Cita</h5>
            <button type="button" class="btn-close" @click="closeReschedule"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Fecha</label>
              <input type="date" v-model="reschedule.date" class="form-control" @change="loadSlots" />
            </div>
            <div class="mb-3">
              <label class="form-label">Duración (min)</label>
              <input type="number" v-model.number="reschedule.duration" class="form-control" min="15" step="15" @change="loadSlots" />
            </div>
            <div class="mb-3">
              <label class="form-label">Nuevo horario</label>
              <select v-model="reschedule.newStartTime" class="form-select">
                <option v-for="slot in slots" :key="slot.startTime" :value="slot.startTime">
                  {{ formatters.formatTime(slot.startTime) }} - {{ formatters.formatTime(slot.endTime) }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Motivo</label>
              <input type="text" v-model="reschedule.reason" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeReschedule">Cerrar</button>
            <button class="btn btn-primary" :disabled="loading || !reschedule.newStartTime" @click="doReschedule">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { appointmentAPI } from '@/services/appointmentAPI'
import type { Appointment, AvailableSlot } from '@/types/appointment.types'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'
import { useAppStore } from '@/stores/app'
import { invoicesAPI } from '@/services/billingAPI'
import { notificationAPI } from '@/services/notificationAPI'

const route = useRoute()
const router = useRouter()
const { loading, execute } = useApi()
const appStore = useAppStore()
const appointment = ref<Appointment | null>(null)
const showReschedule = ref(false)
const slots = ref<AvailableSlot[]>([])
const reschedule = ref({ date: '', duration: 30, newStartTime: '', reason: '' })

onMounted(async () => {
  const id = route.params.id as string
  const res = await execute(() => appointmentAPI.getAppointment(id))
  appointment.value = res?.appointment || null
})

const cancel = async () => {
  if (!appointment.value) return
  const ok = await appStore.showConfirm('Cancelar cita', '¿Seguro que deseas cancelar?', 'Sí, cancelar')
  if (!ok) return
  const res = await execute(() => appointmentAPI.cancelAppointment(appointment.value!.id, 'Cancelado por usuario'))
  appointment.value = res?.appointment || appointment.value
}

const confirm = async () => {
  if (!appointment.value) return
  const res = await execute(() => appointmentAPI.confirmAppointment(appointment.value!.id))
  appointment.value = res?.appointment || appointment.value
}

const canModify = (hours: number) => {
  if (!appointment.value) return false
  const start = new Date(appointment.value.startTime)
  const limit = new Date()
  limit.setHours(limit.getHours() + hours)
  return start > limit
}

const openReschedule = async () => {
  if (!appointment.value) return
  showReschedule.value = true
  reschedule.value.date = appointment.value.appointmentDate.slice(0, 10)
  reschedule.value.duration = appointment.value.duration
  await loadSlots()
}

const closeReschedule = () => {
  showReschedule.value = false
  reschedule.value = { date: '', duration: 30, newStartTime: '', reason: '' }
  slots.value = []
}

const loadSlots = async () => {
  if (!appointment.value || !reschedule.value.date) return
  const s = await execute(() =>
    appointmentAPI.getAvailableSlots(appointment.value!.doctorId, reschedule.value.date, reschedule.value.duration),
  )
  slots.value = s?.availableSlots || []
}

const doReschedule = async () => {
  if (!appointment.value || !reschedule.value.newStartTime) return
  const payload = {
    newStartTime: new Date(reschedule.value.newStartTime).toISOString(),
    newDuration: reschedule.value.duration,
    reason: reschedule.value.reason,
  }
  const res = await execute(() => appointmentAPI.rescheduleAppointment(appointment.value!.id, payload))
  appointment.value = res?.appointment || appointment.value
  closeReschedule()
}

const completeAndInvoice = async () => {
  if (!appointment.value) return
  // 1) Marcar como completada (PUT /appointments/:id)
  const updated = await execute(() =>
    appointmentAPI.updateAppointment(appointment.value!.id, { status: 'completed' }),
  )
  appointment.value = updated?.appointment || appointment.value
  // 2) Crear factura desde la cita
  await execute(() => invoicesAPI.createFromAppointment(appointment.value!.id))
  appStore.showToast('Facturación', 'Factura creada automáticamente.', 'success')
}

const sendReminder = async () => {
  if (!appointment.value) return
  // Enviar evento asíncrono de recordatorio vía Notification Service
  const payload = {
    patientId: appointment.value.patientId,
    appointmentDate: appointment.value.startTime,
  }
  await execute(() => notificationAPI.send('appointment_reminder', payload))
  appStore.showToast('Notificación', 'Recordatorio enviado', 'success')
}
</script>

<style scoped></style>
