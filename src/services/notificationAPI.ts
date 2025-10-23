/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'
import type {
  NotificationType,
  NotificationDataPayload,
  SendNotificationResponse,
} from '@/types/notification.types'

export const notificationAPI = {
  // Listado de notificaciones in-app (si backend lo soporta)
  getNotifications: (params?: any) => api.get('/notification/notifications', { params }),

  // Marcar como leída una notificación
  markAsRead: (id: string) => api.put(`/notification/notifications/${id}/read`),

  // Crear notificación in-app manual (ruta existente en FE)
  createNotification: (data: any) => api.post('/notification/notifications', data),

  // Enviar evento de notificación vía colas (contrato oficial)
  send: async (
    type: NotificationType,
    data: NotificationDataPayload,
  ): Promise<SendNotificationResponse> => {
    const { data: res } = await api.post('/notification/send', { type, data })
    return res
  },
}
