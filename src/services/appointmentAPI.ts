/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'

export const appointmentAPI = {
  getAppointments: (params?: any) => api.get('/appointment/appointments', { params }),

  getAppointment: (id: string) => api.get(`/appointment/appointments/${id}`),

  createAppointment: (data: any) => api.post('/appointment/appointments', data),

  updateAppointment: (id: string, data: any) => api.put(`/appointment/appointments/${id}`, data),

  cancelAppointment: (id: string) => api.delete(`/appointment/appointments/${id}`),

  getAvailability: (doctorId: string, date: string) =>
    api.get(`/appointment/availability/${doctorId}`, { params: { date } }),
}
