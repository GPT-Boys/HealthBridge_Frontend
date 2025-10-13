/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import Swal, { type SweetAlertIcon } from 'sweetalert2'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sidebarCollapsed = ref(false)
  const notifications = ref<any[]>([])

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (err: string | null) => {
    error.value = err
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const showToast = (
    title: string,
    text: string,
    type: 'success' | 'error' | 'info' | 'warning' | 'question' = 'info',
  ) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    const icons = {
      success: 'success',
      error: 'error',
      info: 'info',
      warning: 'warning',
      question: 'question',
    }

    Toast.fire({
      title: title,
      text: text,
      icon: icons[type] as SweetAlertIcon,
    })
  }

  const showConfirm = async (
    title: string,
    text: string,
    confirmText: string = 'Sí, continuar',
  ) => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar',
    })

    return result.isConfirmed
  }

  const addNotification = (notification: any) => {
    notifications.value.unshift(notification)

    // Mostrar toast para nuevas notificaciones
    if (notification.type === 'appointment_reminder') {
      showToast('Recordatorio', 'Tienes una cita médica pronto', 'info')
    }
  }

  const markNotificationAsRead = (notificationId: string) => {
    const notification = notifications.value.find((n) => n.id === notificationId)
    if (notification) {
      notification.isRead = true
    }
  }

  const getUnreadCount = () => {
    return notifications.value.filter((n) => !n.isRead).length
  }

  return {
    isLoading,
    error,
    sidebarCollapsed,
    notifications,
    setLoading,
    setError,
    toggleSidebar,
    showToast,
    showConfirm,
    addNotification,
    markNotificationAsRead,
    getUnreadCount,
  }
})
