<template>
  <div class="container-fluid">
    <div class="mb-4">
      <RouterLink to="/dashboard/medical-records" class="text-decoration-none text-muted mb-2 d-block">
        <i class="bi bi-arrow-left me-2"></i>Volver a registros
      </RouterLink>
      <h2>Nuevo Registro Médico</h2>
    </div>

    <form @submit.prevent="createRecord">
      <div class="row g-4">
        <div class="col-lg-8">
          <!-- Información Básica -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Información del Registro</h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Paciente *</label>
                  <select v-model="formData.patientId" class="form-select" required>
                    <option value="">Seleccionar paciente</option>
                    <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                      {{ patient.firstName }} {{ patient.lastName }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Fecha *</label>
                  <input type="date" v-model="formData.date" class="form-control" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Diagnóstico *</label>
                  <input
                    type="text"
                    v-model="formData.diagnosis"
                    class="form-control"
                    placeholder="Ej: Hipertensión arterial"
                    required
                  />
                </div>
                <div class="col-12">
                  <label class="form-label">Síntomas *</label>
                  <input
                    type="text"
                    v-model="symptomsInput"
                    class="form-control"
                    placeholder="Separar por comas. Ej: dolor de cabeza, mareos, náuseas"
                    required
                  />
                  <small class="text-muted">Los síntomas se separarán automáticamente</small>
                </div>
                <div class="col-12">
                  <label class="form-label">Tratamiento</label>
                  <textarea
                    v-model="formData.treatment"
                    class="form-control"
                    rows="3"
                    placeholder="Descripción del tratamiento recomendado"
                  ></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label">Notas Adicionales</label>
                  <textarea
                    v-model="formData.notes"
                    class="form-control"
                    rows="3"
                    placeholder="Observaciones adicionales"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Signos Vitales -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Signos Vitales</h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Presión Arterial</label>
                  <input
                    type="text"
                    v-model="formData.vitalSigns.bloodPressure"
                    class="form-control"
                    placeholder="120/80"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Frecuencia Cardíaca (bpm)</label>
                  <input
                    type="number"
                    v-model.number="formData.vitalSigns.heartRate"
                    class="form-control"
                    placeholder="75"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Temperatura (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    v-model.number="formData.vitalSigns.temperature"
                    class="form-control"
                    placeholder="36.5"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    v-model.number="formData.vitalSigns.weight"
                    class="form-control"
                    placeholder="70"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Altura (cm)</label>
                  <input
                    type="number"
                    v-model.number="formData.vitalSigns.height"
                    class="form-control"
                    placeholder="170"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Saturación de Oxígeno (%)</label>
                  <input
                    type="number"
                    v-model.number="formData.vitalSigns.oxygenSaturation"
                    class="form-control"
                    placeholder="98"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Historial Médico -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Historial Médico</h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Alergias</label>
                  <input
                    type="text"
                    v-model="allergiesInput"
                    class="form-control"
                    placeholder="Separar por comas. Ej: penicilina, polen"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label">Condiciones Crónicas</label>
                  <input
                    type="text"
                    v-model="chronicConditionsInput"
                    class="form-control"
                    placeholder="Separar por comas. Ej: diabetes, asma"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label">Medicamentos Actuales</label>
                  <input
                    type="text"
                    v-model="currentMedicationsInput"
                    class="form-control"
                    placeholder="Separar por comas. Ej: metformina, omeprazol"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label">Historial Familiar</label>
                  <textarea
                    v-model="formData.familyHistory"
                    class="form-control"
                    rows="2"
                    placeholder="Antecedentes médicos familiares relevantes"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Opciones</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    v-model="formData.followUpRequired"
                    class="form-check-input"
                    id="followUp"
                  />
                  <label class="form-check-label" for="followUp">Requiere Seguimiento</label>
                </div>
              </div>
              <div class="mb-3" v-if="formData.followUpRequired">
                <label class="form-label">Fecha de Seguimiento</label>
                <input type="date" v-model="formData.followUpDate" class="form-control" />
              </div>
              <div class="mb-3" v-if="formData.followUpRequired">
                <label class="form-label">Instrucciones de Seguimiento</label>
                <textarea
                  v-model="formData.followUpInstructions"
                  class="form-control"
                  rows="2"
                  placeholder="Indicaciones para el seguimiento"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    v-model="formData.isConfidential"
                    class="form-check-input"
                    id="confidential"
                  />
                  <label class="form-check-label" for="confidential">Registro Confidencial</label>
                </div>
                <small class="text-muted">
                  Los registros confidenciales tienen acceso restringido
                </small>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Cita Asociada</h5>
            </div>
            <div class="card-body">
              <label class="form-label">Cita (Opcional)</label>
              <select v-model="formData.appointmentId" class="form-select">
                <option value="">Ninguna</option>
                <option v-for="apt in appointments" :key="apt.id" :value="apt.id">
                  {{ formatters.formatDate(apt.appointmentDate) }} - {{ apt.reason }}
                </option>
              </select>
              <small class="text-muted">
                Asociar este registro con una cita existente
              </small>
            </div>
          </div>

          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
              <i class="bi bi-check-circle me-2"></i>
              {{ loading ? 'Guardando...' : 'Crear Registro' }}
            </button>
            <RouterLink to="/dashboard/medical-records" class="btn btn-outline-secondary">
              Cancelar
            </RouterLink>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { recordsAPI } from '@/services/medicalRecordAPI'
import { appointmentAPI } from '@/services/appointmentAPI'
import { userAPI } from '@/services/userAPI'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'
import type { User } from '@/types/user.types'
import type { Appointment } from '@/types/appointment.types'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()
const { loading, execute } = useApi()

const patients = ref<User[]>([])
const appointments = ref<Appointment[]>([])

const formData = ref({
  patientId: '',
  appointmentId: '',
  date: new Date().toISOString().split('T')[0],
  diagnosis: '',
  symptoms: [] as string[],
  treatment: '',
  notes: '',
  vitalSigns: {
    bloodPressure: '',
    heartRate: undefined as number | undefined,
    temperature: undefined as number | undefined,
    weight: undefined as number | undefined,
    height: undefined as number | undefined,
    oxygenSaturation: undefined as number | undefined,
  },
  allergies: [] as string[],
  chronicConditions: [] as string[],
  currentMedications: [] as string[],
  familyHistory: '',
  followUpRequired: false,
  followUpDate: '',
  followUpInstructions: '',
  isConfidential: false,
})

const symptomsInput = computed({
  get: () => formData.value.symptoms.join(', '),
  set: (val: string) => {
    formData.value.symptoms = val.split(',').map((s) => s.trim()).filter(Boolean)
  },
})

const allergiesInput = computed({
  get: () => formData.value.allergies.join(', '),
  set: (val: string) => {
    formData.value.allergies = val.split(',').map((s) => s.trim()).filter(Boolean)
  },
})

const chronicConditionsInput = computed({
  get: () => formData.value.chronicConditions.join(', '),
  set: (val: string) => {
    formData.value.chronicConditions = val.split(',').map((s) => s.trim()).filter(Boolean)
  },
})

const currentMedicationsInput = computed({
  get: () => formData.value.currentMedications.join(', '),
  set: (val: string) => {
    formData.value.currentMedications = val.split(',').map((s) => s.trim()).filter(Boolean)
  },
})

onMounted(async () => {
  await loadPatients()
  await loadAppointments()
})

const loadPatients = async () => {
  // Cargar lista de pacientes (para doctores/admin)
  const res = await execute(() => userAPI.listUsers({ role: 'patient', limit: 100 }))
  patients.value = res?.users || []
}

const loadAppointments = async () => {
  // Cargar citas del doctor
  const res = await execute(() =>
    appointmentAPI.getAppointments({ doctorId: authStore.user?.id, limit: 50 }),
  )
  appointments.value = res?.appointments || []
}

const createRecord = async () => {
  // Preparar datos eliminando campos vacíos en vitalSigns
  const payload: any = {
    ...formData.value,
    doctorId: authStore.user?.id,
    vitalSigns: Object.fromEntries(
      Object.entries(formData.value.vitalSigns).filter(([_, v]) => v !== undefined && v !== ''),
    ),
  }

  // Eliminar campos opcionales vacíos
  if (!payload.treatment) delete payload.treatment
  if (!payload.notes) delete payload.notes
  if (!payload.appointmentId) delete payload.appointmentId
  if (!payload.familyHistory) delete payload.familyHistory
  if (!payload.followUpDate) delete payload.followUpDate
  if (!payload.followUpInstructions) delete payload.followUpInstructions
  if (payload.allergies.length === 0) delete payload.allergies
  if (payload.chronicConditions.length === 0) delete payload.chronicConditions
  if (payload.currentMedications.length === 0) delete payload.currentMedications

  const res = await execute(() => recordsAPI.create(payload))
  if (res) {
    appStore.showToast('Éxito', 'Registro médico creado correctamente', 'success')
    router.push(`/dashboard/medical-records/${res.record.id}`)
  }
}
</script>

<style scoped lang="scss">
.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
