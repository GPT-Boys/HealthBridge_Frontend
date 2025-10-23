// Tipos para el microservicio de notificaciones

export type NotificationType =
  | 'appointment_created'
  | 'appointment_updated'
  | 'appointment_cancelled'
  | 'appointment_reminder'

export type ChannelType = 'email' | 'sms' | 'app' | 'whatsapp'

export type ChannelStatus = 'pending' | 'sent' | 'delivered' | 'failed'

export type Priority = 'low' | 'normal' | 'high' | 'urgent'

// Payloads de datos mínimos por tipo
export interface AppointmentCreatedData {
  patientId: string
  doctorId: string
  appointmentDate: string // ISO
  extra?: Record<string, unknown>
}

export interface AppointmentUpdatedData {
  patientId: string
  extra?: Record<string, unknown>
}

export interface AppointmentCancelledData {
  patientId: string
  extra?: Record<string, unknown>
}

export interface AppointmentReminderData {
  patientId: string
  appointmentDate: string // ISO
  extra?: Record<string, unknown>
}

export type NotificationDataPayload =
  | AppointmentCreatedData
  | AppointmentUpdatedData
  | AppointmentCancelledData
  | AppointmentReminderData

export interface SendNotificationRequest {
  type: NotificationType
  data: NotificationDataPayload
}

export interface SendNotificationResponse {
  message: string
}

// Modelo resumido para notificación in-app
export interface NotificationChannel {
  type: ChannelType
  status: ChannelStatus
  sentAt?: string
  error?: string
}

export interface AppNotification {
  id?: string
  recipientId: string
  recipientType: 'patient' | 'doctor' | 'admin'
  type: NotificationType
  title?: string
  message?: string
  channels: NotificationChannel[]
  data?: unknown
  priority: Priority
  scheduledFor?: string
  isRead: boolean
  readAt?: string
  createdAt: string
}
