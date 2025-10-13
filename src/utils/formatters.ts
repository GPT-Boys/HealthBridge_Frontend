export const formatters = {
  // Formatear fecha
  formatDate: (date: string | Date, format: 'short' | 'long' = 'short') => {
    const dateObj = new Date(date)

    if (format === 'long') {
      return dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    return dateObj.toLocaleDateString('es-ES')
  },

  // Formatear hora
  formatTime: (date: string | Date) => {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
  },

  // Formatear fecha y hora
  formatDateTime: (date: string | Date) => {
    const dateObj = new Date(date)
    return `${formatters.formatDate(dateObj)} ${formatters.formatTime(dateObj)}`
  },

  // Formatear moneda
  formatCurrency: (amount: number, currency: 'BOB' | 'USD' = 'BOB') => {
    const symbols = { BOB: 'Bs.', USD: '$' }
    return `${symbols[currency]} ${amount.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  },

  // Formatear nombre completo
  formatFullName: (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`.trim()
  },

  // Formatear teléfono (Bolivia)
  formatPhone: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 8) {
      return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2')
    }
    return phone
  },

  // Truncar texto
  truncate: (text: string, length: number = 50) => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  },

  // Formatear status de cita
  formatAppointmentStatus: (status: string) => {
    const statusMap: { [key: string]: string } = {
      scheduled: 'Programada',
      confirmed: 'Confirmada',
      in_progress: 'En progreso',
      completed: 'Completada',
      cancelled: 'Cancelada',
      no_show: 'No asistió',
    }
    return statusMap[status] || status
  },

  // Obtener clase CSS para status
  getStatusClass: (status: string) => {
    const classMap: { [key: string]: string } = {
      scheduled: 'text-warning',
      confirmed: 'text-info',
      in_progress: 'text-primary',
      completed: 'text-success',
      cancelled: 'text-danger',
      no_show: 'text-muted',
    }
    return classMap[status] || 'text-secondary'
  },
}
