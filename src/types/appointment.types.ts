// Tipos para Appointment Service según especificación frontend
export type Role = 'admin' | 'doctor' | 'patient'

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'rescheduled'

export type AppointmentType =
  | 'consultation'
  | 'follow_up'
  | 'checkup'
  | 'emergency'
  | 'teleconsultation'
  | 'vaccination'
  | 'surgery'
  | 'therapy'

export interface ReminderLog {
  type: 'email' | 'sms' | 'whatsapp'
  sentAt: string
  status: 'sent' | 'delivered' | 'failed'
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  facilityId?: string
  appointmentDate: string // ISO date
  startTime: string // ISO date-time
  endTime: string // ISO date-time
  duration: number
  type: AppointmentType
  status: AppointmentStatus
  reason: string
  notes?: string
  specialization: string
  department?: string
  room?: string
  isVirtual: boolean
  meetingLink?: string
  requiresPreparation: boolean
  preparationInstructions?: string
  baseFee: number
  insuranceCovered: boolean
  insuranceProvider?: string
  finalCost?: number
  remindersSent: ReminderLog[]
  createdBy: string
  cancelledBy?: string
  cancelledAt?: string
  cancellationReason?: string
  originalAppointmentId?: string
  rescheduledFrom?: string
  rescheduledTo?: string
  reschedulingReason?: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentFilters {
  patientId?: string
  doctorId?: string
  facilityId?: string
  status?: AppointmentStatus | AppointmentStatus[]
  dateFrom?: string
  dateTo?: string
  specialization?: string
  type?: AppointmentType
  isVirtual?: boolean
  page?: number
  limit?: number
  sortBy?: 'appointmentDate' | 'startTime' | 'createdAt' | 'status' | 'type'
  sortOrder?: 'asc' | 'desc'
}

export interface AvailableSlot {
  startTime: string // ISO date-time
  endTime: string // ISO date-time
}

export interface SlotsResponse {
  message: string
  date: string
  duration: number
  availableSlots: AvailableSlot[]
  totalSlots: number
}

export interface AppointmentListResponse {
  message: string
  appointments: Appointment[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface AppointmentResponse {
  message: string
  appointment: Appointment
}

export interface AppointmentStatsResponse {
  message: string
  stats: {
    total: number
    byStatus: Record<AppointmentStatus, number>
    byType: Record<AppointmentType, number>
    virtual: number
    inPerson: number
  }
  period: { dateFrom?: string; dateTo?: string }
}
