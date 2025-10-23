<template>
  <div class="container-fluid" v-if="record">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <RouterLink to="/dashboard/medical-records" class="text-decoration-none text-muted mb-2 d-block">
          <i class="bi bi-arrow-left me-2"></i>Volver a registros
        </RouterLink>
        <h2 class="mb-0">{{ record.diagnosis }}</h2>
      </div>
      <div class="d-flex gap-2">
        <button
          v-if="canEdit"
          class="btn btn-outline-primary"
          @click="editMode = !editMode"
        >
          <i class="bi" :class="editMode ? 'bi-x-circle' : 'bi-pencil'"></i>
          {{ editMode ? 'Cancelar' : 'Editar' }}
        </button>
        <button
          v-if="editMode"
          class="btn btn-primary"
          @click="saveChanges"
          :disabled="loading"
        >
          <i class="bi bi-check-circle me-2"></i>Guardar Cambios
        </button>
      </div>
    </div>

    <!-- Información Principal -->
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Información del Registro</h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label"><strong>Fecha:</strong></label>
                <div v-if="!editMode">{{ formatters.formatDate(record.date) }}</div>
                <input v-else type="date" v-model="editData.date" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label"><strong>Estado:</strong></label>
                <div v-if="!editMode">
                  <span
                    class="badge"
                    :class="{
                      'bg-success': record.status === 'active',
                      'bg-secondary': record.status === 'archived',
                    }"
                  >
                    {{ record.status === 'active' ? 'Activo' : 'Archivado' }}
                  </span>
                  <span v-if="record.isConfidential" class="badge bg-warning ms-2">
                    <i class="bi bi-lock-fill"></i> Confidencial
                  </span>
                </div>
                <div v-else class="d-flex gap-2">
                  <select v-model="editData.status" class="form-select">
                    <option value="active">Activo</option>
                    <option value="archived">Archivado</option>
                  </select>
                  <div class="form-check">
                    <input
                      type="checkbox"
                      v-model="editData.isConfidential"
                      class="form-check-input"
                      id="confidential"
                    />
                    <label class="form-check-label" for="confidential">Confidencial</label>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <label class="form-label"><strong>Diagnóstico:</strong></label>
                <div v-if="!editMode">{{ record.diagnosis }}</div>
                <input v-else type="text" v-model="editData.diagnosis" class="form-control" />
              </div>
              <div class="col-12">
                <label class="form-label"><strong>Síntomas:</strong></label>
                <div v-if="!editMode">
                  <span v-for="symptom in record.symptoms" :key="symptom" class="badge bg-secondary me-1">
                    {{ symptom }}
                  </span>
                </div>
                <input
                  v-else
                  type="text"
                  v-model="symptomsInput"
                  class="form-control"
                  placeholder="Separar por comas"
                />
              </div>
              <div class="col-12" v-if="record.treatment">
                <label class="form-label"><strong>Tratamiento:</strong></label>
                <div v-if="!editMode" class="text-pre-wrap">{{ record.treatment }}</div>
                <textarea v-else v-model="editData.treatment" class="form-control" rows="3"></textarea>
              </div>
              <div class="col-12" v-if="record.notes">
                <label class="form-label"><strong>Notas:</strong></label>
                <div v-if="!editMode" class="text-pre-wrap">{{ record.notes }}</div>
                <textarea v-else v-model="editData.notes" class="form-control" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Signos Vitales -->
        <div class="card mb-4" v-if="record.vitalSigns">
          <div class="card-header">
            <h5 class="mb-0">Signos Vitales</h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4" v-if="record.vitalSigns.bloodPressure">
                <div class="vital-sign-box">
                  <i class="bi bi-heart-pulse"></i>
                  <div class="vital-label">Presión Arterial</div>
                  <div class="vital-value">{{ record.vitalSigns.bloodPressure }}</div>
                </div>
              </div>
              <div class="col-md-4" v-if="record.vitalSigns.heartRate">
                <div class="vital-sign-box">
                  <i class="bi bi-activity"></i>
                  <div class="vital-label">Frecuencia Cardíaca</div>
                  <div class="vital-value">{{ record.vitalSigns.heartRate }} bpm</div>
                </div>
              </div>
              <div class="col-md-4" v-if="record.vitalSigns.temperature">
                <div class="vital-sign-box">
                  <i class="bi bi-thermometer-half"></i>
                  <div class="vital-label">Temperatura</div>
                  <div class="vital-value">{{ record.vitalSigns.temperature }}°C</div>
                </div>
              </div>
              <div class="col-md-4" v-if="record.vitalSigns.weight">
                <div class="vital-sign-box">
                  <i class="bi bi-speedometer"></i>
                  <div class="vital-label">Peso</div>
                  <div class="vital-value">{{ record.vitalSigns.weight }} kg</div>
                </div>
              </div>
              <div class="col-md-4" v-if="record.vitalSigns.height">
                <div class="vital-sign-box">
                  <i class="bi bi-rulers"></i>
                  <div class="vital-label">Altura</div>
                  <div class="vital-value">{{ record.vitalSigns.height }} cm</div>
                </div>
              </div>
              <div class="col-md-4" v-if="record.vitalSigns.bmi">
                <div class="vital-sign-box">
                  <i class="bi bi-calculator"></i>
                  <div class="vital-label">IMC</div>
                  <div class="vital-value">{{ record.vitalSigns.bmi }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Prescripciones -->
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Prescripciones</h5>
            <button
              v-if="authStore.hasRole('doctor')"
              class="btn btn-sm btn-primary"
              @click="showAddPrescription = true"
            >
              <i class="bi bi-plus-circle me-1"></i>Agregar
            </button>
          </div>
          <div class="card-body">
            <div v-if="prescriptions.length === 0" class="text-muted text-center py-3">
              No hay prescripciones registradas
            </div>
            <div v-else class="list-group list-group-flush">
              <div
                v-for="rx in prescriptions"
                :key="rx.id"
                class="list-group-item"
              >
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-1">{{ rx.medication }}</h6>
                    <p class="mb-1 text-muted">
                      <strong>Dosis:</strong> {{ rx.dosage }} | <strong>Frecuencia:</strong> {{ rx.frequency }}
                    </p>
                    <p class="mb-1 text-muted"><strong>Duración:</strong> {{ rx.duration }}</p>
                    <small v-if="rx.instructions" class="text-muted">{{ rx.instructions }}</small>
                  </div>
                  <div class="text-end">
                    <span
                      class="badge"
                      :class="{
                        'bg-success': rx.status === 'active',
                        'bg-secondary': rx.status === 'completed',
                        'bg-danger': rx.status === 'cancelled',
                      }"
                    >
                      {{ rx.status }}
                    </span>
                    <div class="mt-2" v-if="rx.status === 'active' && rx.refillsAllowed > 0">
                      <small class="text-muted">
                        Refills: {{ rx.refillsUsed }}/{{ rx.refillsAllowed }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Archivos Adjuntos -->
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Archivos Adjuntos</h5>
            <button class="btn btn-sm btn-primary" @click="showUploadFile = true">
              <i class="bi bi-upload me-1"></i>Subir Archivo
            </button>
          </div>
          <div class="card-body">
            <div v-if="files.length === 0" class="text-muted text-center py-3">
              No hay archivos adjuntos
            </div>
            <div v-else class="row g-3">
              <div v-for="file in files" :key="file.id" class="col-md-6">
                <div class="file-card">
                  <div class="d-flex align-items-center gap-3">
                    <div class="file-icon">
                      <i
                        class="bi"
                        :class="{
                          'bi-image': file.category === 'image',
                          'bi-file-earmark-pdf': file.category === 'lab_result',
                          'bi-file-earmark-text': file.category === 'report',
                          'bi-capsule': file.category === 'prescription',
                          'bi-file-earmark': file.category === 'other',
                        }"
                      ></i>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-0">{{ file.originalName }}</h6>
                      <small class="text-muted">{{ formatFileSize(file.fileSize) }}</small>
                      <div>
                        <span class="badge bg-info">{{ file.category }}</span>
                      </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary" @click="downloadFile(file.id)">
                      <i class="bi bi-download"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">Detalles</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <small class="text-muted">Doctor</small>
              <div>{{ getDoctorName(record.doctorId) }}</div>
            </div>
            <div class="mb-3" v-if="record.followUpRequired">
              <small class="text-muted">Seguimiento</small>
              <div class="text-warning">
                <i class="bi bi-calendar-check me-1"></i>
                Requerido
                <div v-if="record.followUpDate" class="mt-1">
                  {{ formatters.formatDate(record.followUpDate) }}
                </div>
              </div>
            </div>
            <div class="mb-3" v-if="record.allergies && record.allergies.length > 0">
              <small class="text-muted">Alergias</small>
              <div>
                <span v-for="allergy in record.allergies" :key="allergy" class="badge bg-danger me-1">
                  {{ allergy }}
                </span>
              </div>
            </div>
            <div class="mb-3" v-if="record.chronicConditions && record.chronicConditions.length > 0">
              <small class="text-muted">Condiciones Crónicas</small>
              <div>
                <span
                  v-for="condition in record.chronicConditions"
                  :key="condition"
                  class="badge bg-warning me-1"
                >
                  {{ condition }}
                </span>
              </div>
            </div>
            <hr />
            <small class="text-muted">Creado: {{ formatters.formatDate(record.createdAt) }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Upload File -->
    <div class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,.25)" v-if="showUploadFile">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Subir Archivo</h5>
            <button type="button" class="btn-close" @click="showUploadFile = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Archivo</label>
              <input type="file" class="form-control" ref="fileInput" />
            </div>
            <div class="mb-3">
              <label class="form-label">Categoría</label>
              <select v-model="uploadData.category" class="form-select">
                <option value="image">Imagen</option>
                <option value="lab_result">Resultado de Laboratorio</option>
                <option value="report">Reporte</option>
                <option value="prescription">Receta</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea v-model="uploadData.description" class="form-control" rows="2"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showUploadFile = false">Cancelar</button>
            <button class="btn btn-primary" @click="uploadFile" :disabled="loading">Subir</button>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { recordsAPI, prescriptionsAPI, filesAPI } from '@/services/medicalRecordAPI'
import { publicAPI } from '@/services/userAPI'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'
import type { MedicalRecord, Prescription, MedicalFile } from '@/types/medicalRecord.types'
import type { DoctorPublic } from '@/types/user.types'

const route = useRoute()
const authStore = useAuthStore()
const appStore = useAppStore()
const { loading, execute } = useApi()

const record = ref<MedicalRecord | null>(null)
const prescriptions = ref<Prescription[]>([])
const files = ref<MedicalFile[]>([])
const doctors = ref<DoctorPublic[]>([])
const editMode = ref(false)
const showUploadFile = ref(false)
const showAddPrescription = ref(false)
const fileInput = ref<HTMLInputElement>()

const editData = ref({
  date: '',
  diagnosis: '',
  symptoms: [] as string[],
  treatment: '',
  notes: '',
  status: 'active' as any,
  isConfidential: false,
})

const symptomsInput = computed({
  get: () => editData.value.symptoms.join(', '),
  set: (val: string) => {
    editData.value.symptoms = val.split(',').map((s) => s.trim()).filter(Boolean)
  },
})

const uploadData = ref({
  category: 'other' as any,
  description: '',
})

const canEdit = computed(() => {
  if (authStore.hasRole('admin')) return true
  if (authStore.hasRole('doctor') && record.value?.doctorId === authStore.user?.id) return true
  return false
})

onMounted(async () => {
  await loadDoctors()
  await loadRecord()
  await loadPrescriptions()
  await loadFiles()
})

const loadDoctors = async () => {
  const res = await execute(() => publicAPI.getDoctors({ limit: 100 }))
  doctors.value = res?.doctors || []
}

const loadRecord = async () => {
  const id = route.params.id as string
  const res = await execute(() => recordsAPI.getById(id))
  record.value = res?.record || null
  if (record.value) {
    editData.value = {
      date: record.value.date?.split('T')[0] || '',
      diagnosis: record.value.diagnosis,
      symptoms: [...record.value.symptoms],
      treatment: record.value.treatment || '',
      notes: record.value.notes || '',
      status: record.value.status,
      isConfidential: record.value.isConfidential,
    }
  }
}

const loadPrescriptions = async () => {
  const id = route.params.id as string
  const res = await execute(() => prescriptionsAPI.list({ recordId: id }))
  prescriptions.value = res?.prescriptions || []
}

const loadFiles = async () => {
  const id = route.params.id as string
  const res = await execute(() => filesAPI.list({ recordId: id }))
  files.value = res?.files || []
}

const saveChanges = async () => {
  if (!record.value) return
  const res = await execute(() => recordsAPI.update(record.value!.id, editData.value))
  if (res) {
    record.value = res.record
    editMode.value = false
    appStore.showToast('Guardado', 'Registro actualizado correctamente', 'success')
  }
}

const uploadFile = async () => {
  if (!fileInput.value?.files?.[0]) return
  const formData = new FormData()
  formData.append('file', fileInput.value.files[0])
  formData.append('recordId', route.params.id as string)
  formData.append('patientId', record.value!.patientId)
  formData.append('category', uploadData.value.category)
  formData.append('description', uploadData.value.description)

  const res = await execute(() => filesAPI.upload(formData))
  if (res) {
    showUploadFile.value = false
    uploadData.value = { category: 'other', description: '' }
    await loadFiles()
    appStore.showToast('Éxito', 'Archivo subido correctamente', 'success')
  }
}

const downloadFile = async (fileId: string) => {
  const blob = await execute(() => filesAPI.download(fileId))
  if (blob) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = files.value.find((f) => f.id === fileId)?.originalName || 'file'
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

const getDoctorName = (doctorId: string) => {
  const doctor = doctors.value.find((d) => d.id === doctorId)
  return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Desconocido'
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<style scoped lang="scss">
.vital-sign-box {
  text-align: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  i {
    font-size: 2rem;
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  .vital-label {
    font-size: 0.85rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
  }

  .vital-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
  }
}

.file-card {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }
}

.file-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
