<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Registros Médicos</h2>
      <RouterLink
        v-if="authStore.hasRole('doctor')"
        to="/dashboard/medical-records/create"
        class="btn btn-primary"
      >
        <i class="bi bi-plus-circle me-2"></i>Nuevo Registro
      </RouterLink>
    </div>

    <!-- Filtros -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Fecha Desde</label>
            <input type="date" v-model="filters.dateFrom" class="form-control" @change="loadRecords" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Fecha Hasta</label>
            <input type="date" v-model="filters.dateTo" class="form-control" @change="loadRecords" />
          </div>
          <div class="col-md-3" v-if="authStore.hasRole(['patient', 'admin'])">
            <label class="form-label">Doctor</label>
            <select v-model="filters.doctorId" class="form-select" @change="loadRecords">
              <option value="">Todos</option>
              <option v-for="doc in doctors" :key="doc.id" :value="doc.id">
                Dr. {{ doc.firstName }} {{ doc.lastName }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Estado</label>
            <select v-model="filters.status" class="form-select" @change="loadRecords">
              <option value="">Todos</option>
              <option value="active">Activo</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Registros -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="records.length === 0" class="alert alert-info">
      <i class="bi bi-info-circle me-2"></i>No se encontraron registros médicos.
    </div>

    <div v-else class="row g-3">
      <div v-for="record in records" :key="record.id" class="col-12">
        <div class="card record-card" @click="goToDetail(record.id)">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-md-8">
                <div class="d-flex align-items-start gap-3">
                  <div class="record-icon">
                    <i class="bi bi-file-medical-fill"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="mb-1">{{ record.diagnosis }}</h5>
                    <p class="text-muted mb-2">
                      <i class="bi bi-calendar3 me-1"></i>
                      {{ formatters.formatDate(record.date) }}
                    </p>
                    <div class="d-flex flex-wrap gap-2">
                      <span
                        v-for="symptom in record.symptoms.slice(0, 3)"
                        :key="symptom"
                        class="badge bg-secondary"
                      >
                        {{ symptom }}
                      </span>
                      <span v-if="record.symptoms.length > 3" class="badge bg-light text-dark">
                        +{{ record.symptoms.length - 3 }} más
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 text-md-end">
                <div class="mb-2">
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
                <small class="text-muted d-block">
                  <i class="bi bi-person-fill me-1"></i>
                  {{ getDoctorName(record.doctorId) }}
                </small>
                <small v-if="record.followUpRequired" class="text-warning d-block mt-1">
                  <i class="bi bi-calendar-check me-1"></i>
                  Seguimiento requerido
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <nav v-if="pagination.totalPages > 1" class="mt-4" aria-label="Paginación">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: pagination.page === 1 }">
          <button class="page-link" @click="changePage(pagination.page - 1)">Anterior</button>
        </li>
        <li
          v-for="page in paginationPages"
          :key="page"
          class="page-item"
          :class="{ active: page === pagination.page }"
        >
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: pagination.page === pagination.totalPages }">
          <button class="page-link" @click="changePage(pagination.page + 1)">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { recordsAPI } from '@/services/medicalRecordAPI'
import { publicAPI } from '@/services/userAPI'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'
import { formatters } from '@/utils/formatters'
import type { MedicalRecord } from '@/types/medicalRecord.types'
import type { DoctorPublic } from '@/types/user.types'

const router = useRouter()
const authStore = useAuthStore()
const { loading, execute } = useApi()

const records = ref<MedicalRecord[]>([])
const doctors = ref<DoctorPublic[]>([])
const filters = ref({
  dateFrom: '',
  dateTo: '',
  doctorId: '',
  status: '',
  page: 1,
  limit: 10,
})

const pagination = ref({
  total: 0,
  page: 1,
  totalPages: 1,
})

const paginationPages = computed(() => {
  const pages = []
  const maxPages = 5
  let start = Math.max(1, pagination.value.page - Math.floor(maxPages / 2))
  const end = Math.min(pagination.value.totalPages, start + maxPages - 1)

  if (end - start < maxPages - 1) {
    start = Math.max(1, end - maxPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

onMounted(async () => {
  await loadDoctors()
  await loadRecords()
})

const loadDoctors = async () => {
  const res = await execute(() => publicAPI.getDoctors({ limit: 100 }))
  doctors.value = res?.doctors || []
}

const loadRecords = async () => {
  const params: any = { ...filters.value }
  
  // Si es paciente, solo ver sus propios registros
  if (authStore.hasRole('patient')) {
    params.patientId = authStore.user?.id
  }
  
  // Si es doctor, ver registros que creó
  if (authStore.hasRole('doctor') && !params.patientId) {
    params.doctorId = authStore.user?.id
  }

  const res = await execute(() => recordsAPI.list(params))
  records.value = res?.records || []
  pagination.value = res?.pagination || { total: 0, page: 1, totalPages: 1 }
}

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    filters.value.page = page
    loadRecords()
  }
}

const getDoctorName = (doctorId: string) => {
  const doctor = doctors.value.find((d) => d.id === doctorId)
  return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Desconocido'
}

const goToDetail = (id: string) => {
  router.push(`/dashboard/medical-records/${id}`)
}
</script>

<style scoped lang="scss">
.record-card {
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.record-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}
</style>
