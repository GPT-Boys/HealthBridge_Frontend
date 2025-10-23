<template>
  <div class="notifications-page">
    <div class="page-header mb-4">
      <h2>Notificaciones</h2>
      <p class="text-muted">Centro de notificaciones</p>
    </div>

    <div class="notifications-container card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Todas las notificaciones</h5>
        <button
          v-if="notifications.length > 0 && unreadCount > 0"
          class="btn btn-sm btn-outline-primary"
          @click="markAllAsRead"
        >
          <i class="bi bi-check2-all me-1"></i>
          Marcar todas como leídas
        </button>
      </div>

      <div class="card-body">
        <LoadingSpinner v-if="loading" />

        <div v-else-if="notifications.length === 0" class="text-center py-5">
          <i class="bi bi-bell-slash text-muted" style="font-size: 4rem"></i>
          <p class="text-muted mt-3">No tienes notificaciones</p>
        </div>

        <div v-else class="notifications-list">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class="{ unread: !notification.isRead }"
            @click="handleNotificationClick(notification)"
          >
            <div class="notification-icon" :class="getIconClass(notification.type)">
              <i class="bi" :class="getIcon(notification.type)"></i>
            </div>
            <div class="notification-content flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h6 class="notification-title mb-1">
                    {{ notification.title || getTitleFromType(notification.type) }}
                  </h6>
                  <p class="notification-message mb-2">
                    {{ notification.message || 'Nueva notificación' }}
                  </p>
                  <small class="text-muted">
                    <i class="bi bi-clock me-1"></i>
                    {{ formatTime(notification.createdAt) }}
                  </small>
                </div>
                <div class="notification-actions">
                  <button
                    v-if="!notification.isRead"
                    class="btn btn-sm btn-link text-primary"
                    @click.stop="markAsRead(notification.id)"
                    title="Marcar como leída"
                  >
                    <i class="bi bi-check2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginación -->
          <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                    Anterior
                  </a>
                </li>
                <li
                  v-for="page in visiblePages"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                    Siguiente
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { notificationAPI } from '@/services/notificationAPI'
import { useAppStore } from '@/stores/app'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

interface AppNotification {
  id: string
  recipientId: string
  type: string
  title?: string
  message?: string
  isRead: boolean
  createdAt: string
  data?: any
}

const router = useRouter()
const appStore = useAppStore()

const notifications = ref<AppNotification[]>([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 20

const unreadCount = computed(() => notifications.value.filter((n) => !n.isRead).length)

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

onMounted(() => {
  loadNotifications()
})

const loadNotifications = async () => {
  try {
    loading.value = true
    const { data } = await notificationAPI.getNotifications({
      page: currentPage.value,
      limit,
    })
    notifications.value = data.items || data || []
    totalPages.value = data.totalPages || 1
  } catch (error) {
    console.error('Error loading notifications:', error)
    appStore.showToast('Error', 'No se pudieron cargar las notificaciones', 'error')
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadNotifications()
}

const markAsRead = async (notificationId: string) => {
  try {
    await notificationAPI.markAsRead(notificationId)
    const notification = notifications.value.find((n) => n.id === notificationId)
    if (notification) {
      notification.isRead = true
    }
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}

const markAllAsRead = async () => {
  try {
    const unreadNotifications = notifications.value.filter((n) => !n.isRead)

    for (const notification of unreadNotifications) {
      await notificationAPI.markAsRead(notification.id)
      notification.isRead = true
    }

    appStore.showToast('Éxito', 'Todas las notificaciones marcadas como leídas', 'success')
  } catch (error) {
    console.error('Error marking notifications as read:', error)
    appStore.showToast('Error', 'No se pudieron marcar las notificaciones', 'error')
  }
}

const handleNotificationClick = async (notification: AppNotification) => {
  // Marcar como leída
  if (!notification.isRead) {
    await markAsRead(notification.id)
  }

  // Navegar según el tipo
  if (notification.type.includes('appointment')) {
    if (notification.data?.appointmentId) {
      router.push(`/dashboard/appointments/${notification.data.appointmentId}`)
    } else {
      router.push('/dashboard/appointments')
    }
  } else if (notification.type.includes('invoice') || notification.type.includes('payment')) {
    router.push('/dashboard/billing')
  } else if (notification.type.includes('subscription')) {
    router.push('/subscription/my-subscription')
  }
}

const getIconClass = (type: string) => {
  if (type.includes('appointment')) return 'bg-primary'
  if (type.includes('invoice') || type.includes('payment')) return 'bg-success'
  if (type.includes('subscription')) return 'bg-warning'
  return 'bg-info'
}

const getIcon = (type: string) => {
  if (type.includes('appointment')) return 'bi-calendar-check'
  if (type.includes('invoice')) return 'bi-receipt'
  if (type.includes('payment')) return 'bi-credit-card'
  if (type.includes('subscription')) return 'bi-star'
  return 'bi-info-circle'
}

const getTitleFromType = (type: string) => {
  if (type === 'appointment_created') return 'Cita Creada'
  if (type === 'appointment_updated') return 'Cita Actualizada'
  if (type === 'appointment_cancelled') return 'Cita Cancelada'
  if (type === 'appointment_reminder') return 'Recordatorio de Cita'
  return 'Notificación'
}

const formatTime = (date: string) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es })
  } catch {
    return 'Hace un momento'
  }
}
</script>

<style scoped lang="scss">
.notifications-page {
  max-width: 900px;
  margin: 0 auto;
}

.notifications-container {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notifications-list {
  .notification-item {
    padding: 1.25rem;
    display: flex;
    gap: 1rem;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.2s;

    &:hover {
      background-color: #f8f9fa;
    }

    &.unread {
      background-color: #f0f4ff;
      border-left: 4px solid #667eea;

      &:hover {
        background-color: #e6edff;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .notification-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;

    i {
      font-size: 1.5rem;
    }
  }

  .notification-content {
    min-width: 0;
  }

  .notification-title {
    font-weight: 600;
    color: #212529;
  }

  .notification-message {
    color: #6c757d;
    margin-bottom: 0;
  }

  .notification-actions {
    flex-shrink: 0;
  }
}
</style>
