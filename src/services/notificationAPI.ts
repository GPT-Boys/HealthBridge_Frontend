/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api'

export const notificationAPI = {
  getNotifications: (params?: any) => api.get('/notification/notifications', { params }),

  markAsRead: (id: string) => api.put(`/notification/notifications/${id}/read`),

  createNotification: (data: any) => api.post('/notification/notifications', data),
}
