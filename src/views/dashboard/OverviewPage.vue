<template>
  <div class="dashboard-overview">
    <!-- Page Header -->
    <div class="page-header mb-4">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h1 class="page-title">¡Hola, {{ authStore.user?.firstName }}! 👋</h1>
          <p class="text-muted">
            {{ getRoleGreeting() }}
          </p>
        </div>
        <div class="page-actions">
          <span class="badge bg-primary">{{ formatters.formatDate(new Date(), 'long') }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row mb-4">
      <!-- Para Pacientes -->
      <template v-if="authStore.hasRole('patient')">
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-primary">
              <i class="bi bi-calendar-event"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.upcomingAppointments }}</div>
              <div class="stats-label">Próximas Citas</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-success">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.completedAppointments }}</div>
              <div class="stats-label">Citas Completadas</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-info">
              <i class="bi bi-file-medical"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.medicalRecords }}</div>
              <div class="stats-label">Registros Médicos</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-warning">
              <i class="bi bi-receipt"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.pendingBills }}</div>
              <div class="stats-label">Facturas Pendientes</div>
            </div>
          </div>
        </div>
      </template>

      <!-- Para Doctores -->
      <template v-if="authStore.hasRole('doctor')">
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-primary">
              <i class="bi bi-calendar-day"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.todayAppointments }}</div>
              <div class="stats-label">Citas Hoy</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-info">
              <i class="bi bi-people"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.totalPatients }}</div>
              <div class="stats-label">Total Pacientes</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-success">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.completedToday }}</div>
              <div class="stats-label">Completadas Hoy</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 mb-3">
          <div class="stats-card">
            <div class="stats-icon bg-warning">
              <i class="bi bi-clock"></i>
            </div>
            <div class="stats-content">
              <div class="stats-number">{{ stats.pendingAppointments }}</div>
              <div class="stats-label">Pendientes</div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="row">
      <!-- Quick Actions -->
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Acciones Rápidas</h5>
          </div>
          <div class="card-body">
            <div class="quick-actions">
              <template v-if="authStore.hasRole('patient')">
                <RouterLink to="/dashboard/appointments/new" class="quick-action-btn">
                  <div class="quick-action-icon bg-primary">
                    <i class="bi bi-calendar-plus"></i>
                  </div>
                  <div class="quick-action-content">
                    <div class="quick-action-title">Nueva Cita</div>
                    <div class="quick-action-desc">Agenda una cita médica</div>
                  </div>
                </RouterLink>

                <RouterLink to="/dashboard/medical-records" class="quick-action-btn">
                  <div class="quick-action-icon bg-info">
                    <i class="bi bi-file-medical"></i>
                  </div>
                  <div class="quick-action-content">
                    <div class="quick-action-title">Ver Historial</div>
                    <div class="quick-action-desc">Consulta tus registros médicos</div>
                  </div>
                </RouterLink>

                <RouterLink to="/dashboard/billing" class="quick-action-btn">
                  <div class="quick-action-icon bg-success">
                    <i class="bi bi-credit-card"></i>
                  </div>
                  <div class="quick-action-content">
                    <div class="quick-action-title">Pagar Factura</div>
                    <div class="quick-action-desc">Gestiona tus pagos</div>
                  </div>
                </RouterLink>
              </template>

              <template v-if="authStore.hasRole('doctor')">
                <RouterLink to="/dashboard/patients" class="quick-action-btn">
                  <div class="quick-action-icon bg-info">
                    <i class="bi bi-people"></i>
                  </div>
                  <div class="quick-action-content">
                    <div class="quick-action-title">Ver Pacientes</div>
                    <div class="quick-action-desc">Lista de mis pacientes</div>
                  </div>
                </RouterLink>

                <RouterLink to="/dashboard/schedule" class="quick-action-btn">
                  <div class="quick-action-icon bg-warning">
                    <i class="bi bi-calendar3"></i>
                  </div>
                  <div class="quick-action-content">
                    <div class="quick-action-title">Mi Horario</div>
                    <div class="quick-action-desc">Gestionar disponibilidad</div>
                  </div>
                </RouterLink>

                <button class="quick-action-btn" @click="createMedicalRecord">
                  <div class="quick-action-icon bg-success">
                    <i class="bi bi-plus-circle"></i>
                  </div>
                  <div class="quick-action-content">
                    <div class="quick-action-title">Nuevo Registro</div>
                    <div class="quick-action-desc">Crear registro médico</div>
                  </div>
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity / Upcoming Appointments -->
      <div class="col-md-8 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">
              {{ authStore.hasRole('patient') ? 'Próximas Citas' : 'Citas de Hoy' }}
            </h5>
            <RouterLink to="/dashboard/appointments" class="btn btn-sm btn-outline-primary">
              Ver todas
            </RouterLink>
          </div>
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>

            <div v-else-if="appointments.length === 0" class="empty-state text-center py-4">
              <i class="bi bi-calendar-x text-muted mb-3" style="font-size: 3rem"></i>
              <h6 class="text-muted">No hay citas programadas</h6>
              <p class="text-muted small">
                {{
                  authStore.hasRole('patient')
                    ? 'Agenda tu primera cita médica'
                    : 'No tienes citas programadas para hoy'
                }}
              </p>
            </div>

            <div v-else class="appointments-list">
              <div
                v-for="appointment in appointments"
                :key="appointment.id"
                class="appointment-item"
              >
                <div class="appointment-time">
                  <div class="time">{{ formatters.formatTime(appointment.appointmentDate) }}</div>
                  <div class="date">{{ formatters.formatDate(appointment.appointmentDate) }}</div>
                </div>
                <div class="appointment-details">
                  <div class="appointment-title">
                    {{
                      authStore.hasRole('patient')
                        ? `Dr. ${appointment.doctorName}`
                        : appointment.patientName
                    }}
                  </div>
                  <div class="appointment-info">
                    <span class="appointment-type">{{ appointment.type }}</span>
                    <span
                      class="appointment-status"
                      :class="formatters.getStatusClass(appointment.status)"
                    >
                      {{ formatters.formatAppointmentStatus(appointment.status) }}
                    </span>
                  </div>
                </div>
                <div class="appointment-actions">
                  <RouterLink
                    :to="`/dashboard/appointments/${appointment.id}`"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Ver
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Notifications -->
    <div class="row" v-if="appStore.notifications.length > 0">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Notificaciones Recientes</h5>
          </div>
          <div class="card-body">
            <div class="notifications-list">
              <div
                v-for="notification in appStore.notifications.slice(0, 5)"
                :key="notification.id"
                class="notification-item"
                :class="{ unread: !notification.isRead }"
              >
                <div class="notification-icon">
                  <i class="bi bi-bell" v-if="notification.type === 'appointment_reminder'"></i>
                  <i
                    class="bi bi-calendar-check"
                    v-else-if="notification.type === 'appointment_confirmed'"
                  ></i>
                  <i class="bi bi-exclamation-circle" v-else></i>
                </div>
                <div class="notification-content">
                  <div class="notification-title">{{ notification.title }}</div>
                  <div class="notification-message">{{ notification.message }}</div>
                  <div class="notification-time">
                    {{ formatters.formatDateTime(notification.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { appointmentAPI } from '@/services/appointmentAPI'
import { formatters } from '@/utils/formatters'
import { useApi } from '@/composables/useApi'

const authStore = useAuthStore()
const appStore = useAppStore()

const { loading, execute } = useApi()

const stats = ref({
  upcomingAppointments: 0,
  completedAppointments: 0,
  medicalRecords: 0,
  pendingBills: 0,
  todayAppointments: 0,
  totalPatients: 0,
  completedToday: 0,
  pendingAppointments: 0,
})

interface Appointment {
  id: string
  appointmentDate: string
  doctorName?: string
  patientName?: string
  type: string
  status: string
}

const appointments = ref<Appointment[]>([])

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    // Cargar citas según el rol
    const appointmentsData = await execute(() =>
      appointmentAPI.getAppointments({
        limit: 5,
        status: authStore.hasRole('patient') ? ['scheduled', 'confirmed'] : undefined,
      }),
    )

    appointments.value = appointmentsData?.appointments || []

    // Calcular estadísticas (esto debería venir del backend)
    if (authStore.hasRole('patient')) {
      stats.value = {
        upcomingAppointments: appointments.value.length,
        completedAppointments: 12,
        medicalRecords: 8,
        pendingBills: 2,
        todayAppointments: 0,
        totalPatients: 0,
        completedToday: 0,
        pendingAppointments: 0,
      }
    } else if (authStore.hasRole('doctor')) {
      const today = new Date().toDateString()
      const todayAppointments = appointments.value.filter(
        (apt) => new Date(apt.appointmentDate).toDateString() === today,
      )

      stats.value = {
        upcomingAppointments: 0,
        completedAppointments: 0,
        medicalRecords: 0,
        pendingBills: 0,
        todayAppointments: todayAppointments.length,
        totalPatients: 45,
        completedToday: todayAppointments.filter((apt) => apt.status === 'completed').length,
        pendingAppointments: todayAppointments.filter((apt) => apt.status === 'scheduled').length,
      }
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

const getRoleGreeting = () => {
  const role = authStore.user?.role as 'patient' | 'doctor' | 'admin' | undefined
  const greetings: Record<string, string> = {
    patient: 'Gestiona tus citas y mantente al día con tu salud.',
    doctor: 'Revisa tus citas de hoy y gestiona a tus pacientes.',
    admin: 'Supervisa el sistema y gestiona usuarios y clínicas.',
  }
  return role ? greetings[role] : 'Bienvenido a HealthBridge.'
}

const createMedicalRecord = () => {
  // Esta funcionalidad se implementaría con un modal
  appStore.showToast('Crear Medical Record', 'Funcionalidad en desarrollo', 'info')
}
</script>

<style lang="scss" scoped>
.dashboard-overview {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  .page-title {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
}

.stats-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
}

.stats-icon {
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stats-content {
  .stats-number {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    line-height: 1;
  }

  .stats-label {
    color: #6c757d;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
}

.card {
  border: 1px solid #e9ecef;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .card-header {
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    border-radius: 1rem 1rem 0 0;
    padding: 1rem 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    border-color: #007bff;
    transform: translateX(4px);
    color: inherit;
  }
}

.quick-action-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.quick-action-content {
  .quick-action-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.25rem;
  }

  .quick-action-desc {
    color: #6c757d;
    font-size: 0.875rem;
  }
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    border-color: #007bff;
  }
}

.appointment-time {
  text-align: center;
  min-width: 80px;
  flex-shrink: 0;

  .time {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
  }

  .date {
    font-size: 0.8rem;
    color: #6c757d;
  }
}

.appointment-details {
  flex: 1;

  .appointment-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.25rem;
  }

  .appointment-info {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;

    .appointment-type {
      color: #6c757d;
      text-transform: capitalize;
    }

    .appointment-status {
      font-weight: 500;
      text-transform: capitalize;
    }
  }
}

.empty-state {
  padding: 3rem 1rem;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;

  &.unread {
    background: #f8f9ff;
    border-color: #007bff;
  }
}

.notification-icon {
  width: 40px;
  height: 40px;
  background: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;

  .notification-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.25rem;
  }

  .notification-message {
    color: #6c757d;
    margin-bottom: 0.5rem;
  }

  .notification-time {
    font-size: 0.8rem;
    color: #adb5bd;
  }
}

@media (max-width: 768px) {
  .stats-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .appointment-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .appointment-time {
    text-align: left;
    min-width: auto;
  }
}
</style>
