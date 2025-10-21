/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'
import type {
  Appointment,
  AppointmentFilters,
  AppointmentListResponse,
  AppointmentResponse,
  AppointmentStatsResponse,
  SlotsResponse,
} from '@/types/appointment.types'

// Base: /api/appointments
export const appointmentAPI = {
  // Listar citas (con filtros y paginación)
  getAppointments: (params?: Partial<AppointmentFilters>) =>
    api.get<AppointmentListResponse>('/appointments', { params }),

  // Obtener una cita por ID
  getAppointment: (id: string) => api.get<AppointmentResponse>(`/appointments/${id}`),

  // Crear una cita
  createAppointment: (data: any) => api.post<{ message: string; appointment: Appointment }>(`/appointments`, data),

  // Actualizar una cita
  updateAppointment: (id: string, data: any) =>
    api.put<{ message: string; appointment: Appointment }>(`/appointments/${id}`, data),

  // Cancelar una cita (POST /:id/cancel)
  cancelAppointment: (id: string, reason: string) =>
    api.post<{ message: string; appointment: Appointment }>(`/appointments/${id}/cancel`, { reason }),

  // Reagendar una cita
  rescheduleAppointment: (
    id: string,
    payload: { newStartTime: string; newDuration?: number; reason?: string },
  ) => api.post<{ message: string; appointment: Appointment }>(`/appointments/${id}/reschedule`, payload),

  // Confirmar una cita
  confirmAppointment: (id: string) =>
    api.post<{ message: string; appointment: Appointment }>(`/appointments/${id}/confirm`, {}),

  // Obtener slots disponibles
  getAvailableSlots: (doctorId: string, date: string, duration?: number) =>
    api.get<SlotsResponse>(`/appointments/slots/available`, { params: { doctorId, date, duration } }),

  // Estadísticas para doctor/admin
  getStats: (params: { doctorId?: string; dateFrom?: string; dateTo?: string }) =>
    api.get<AppointmentStatsResponse>('/appointments/stats', { params }),
}
