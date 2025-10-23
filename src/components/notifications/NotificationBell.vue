<template>
  <div class="notification-bell">
    <button
      class="btn btn-link position-relative p-2"
      @click="toggleDropdown"
      ref="bellButton"
    >
      <i class="bi bi-bell fs-5"></i>
      <span
        v-if="unreadCount > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="notification-dropdown"
      ref="dropdown"
    >
      <div class="notification-header">
        <h6 class="mb-0">Notificaciones</h6>
        <button
          v-if="notifications.length > 0"
          class="btn btn-link btn-sm text-primary p-0"
          @click="markAllAsRead"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div class="notification-list">
        <div
          v-if="loading"
          class="text-center py-4"
        >
          <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
        </div>

        <div
          v-else-if="notifications.length === 0"
          class="text-center py-4 text-muted"
        >
          <i class="bi bi-bell-slash fs-3 d-block mb-2"></i>
          <small>No tienes notificaciones</small>
        </div>

        <div
          v-else
          class="notification-items"
        >
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
              <div class="notification-title">{{ notification.title || getTitleFromType(notification.type) }}</div>
              <div class="notification-message">{{ notification.message || 'Nueva notificación' }}</div>
              <small class="notification-time text-muted">
                {{ formatTime(notification.createdAt) }}
              </small>
            </div>
            <div v-if="!notification.isRead" class="notification-badge"></div>
          </div>
        </div>
      </div>

      <div class="notification-footer" v-if="notifications.length > 0">
        <RouterLink to="/dashboard/notifications" class="text-decoration-none" @click="showDropdown = false">
          Ver todas las notificaciones
        </RouterLink>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="showDropdown"
      class="notification-backdrop"
      @click="showDropdown = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { notificationAPI } from '@/services/notificationAPI'
import { wsService } from '@/services/websocket'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

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
const authStore = useAuthStore()
const appStore = useAppStore()

const showDropdown = ref(false)
const notifications = ref<AppNotification[]>([])
const loading = ref(false)
const bellButton = ref<HTMLElement>()
const dropdown = ref<HTMLElement>()

const unreadCount = computed(() => notifications.value.filter((n) => !n.isRead).length)

onMounted(async () => {
  await loadNotifications()
  setupWebSocket()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const loadNotifications = async () => {
  try {
    loading.value = true
    const { data } = await notificationAPI.getNotifications({ limit: 10 })
    notifications.value = data || []
  } catch (error) {
    console.error('Error loading notifications:', error)
  } finally {
    loading.value = false
  }
}

const setupWebSocket = () => {
  if (authStore.user?.id) {
    wsService.connect(authStore.user.id)
    
    // Escuchar nuevas notificaciones
    const originalHandler = (wsService as any).handleMessage
    ;(wsService as any).handleMessage = (data: any) => {
      if (data.type === 'notification') {
        notifications.value.unshift(data.payload)
        // Opcional: mostrar toast
        appStore.showToast('Nueva notificación', data.payload.message || 'Tienes una nueva notificación', 'info')
      }
      if (originalHandler) originalHandler.call(wsService, data)
    }
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    loadNotifications()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    showDropdown.value &&
    dropdown.value &&
    bellButton.value &&
    !dropdown.value.contains(event.target as Node) &&
    !bellButton.value.contains(event.target as Node)
  ) {
    showDropdown.value = false
  }
}

const markAllAsRead = async () => {
  try {
    // Marcar todas como leídas localmente
    const unreadNotifications = notifications.value.filter((n) => !n.isRead)
    
    for (const notification of unreadNotifications) {
      await notificationAPI.markAsRead(notification.id)
      notification.isRead = true
    }
    
    appStore.showToast('Éxito', 'Todas las notificaciones marcadas como leídas', 'success')
  } catch (error) {
    console.error('Error marking notifications as read:', error)
  }
}

const handleNotificationClick = async (notification: AppNotification) => {
  // Marcar como leída
  if (!notification.isRead) {
    try {
      await notificationAPI.markAsRead(notification.id)
      notification.isRead = true
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  // Navegar según el tipo
  showDropdown.value = false
  
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
.notification-bell {
  position: relative;

  .btn-link {
    color: #212529;
    text-decoration: none;

    &:hover {
      color: #667eea;
    }
  }

  .badge {
    font-size: 0.6rem;
    padding: 0.25em 0.4em;
  }
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 380px;
  max-width: 90vw;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1050;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h6 {
    font-weight: 600;
  }
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-items {
  .notification-item {
    padding: 1rem;
    display: flex;
    gap: 0.75rem;
    cursor: pointer;
    border-bottom: 1px solid #f8f9fa;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f9fa;
    }

    &.unread {
      background-color: #f0f4ff;

      &:hover {
        background-color: #e6edff;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .notification-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;

    i {
      font-size: 1.25rem;
    }
  }

  .notification-content {
    min-width: 0;

    .notification-title {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .notification-message {
      font-size: 0.85rem;
      color: #6c757d;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 0.25rem;
    }

    .notification-time {
      font-size: 0.75rem;
    }
  }

  .notification-badge {
    width: 8px;
    height: 8px;
    background: #667eea;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 0.5rem;
  }
}

.notification-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e9ecef;
  text-align: center;

  a {
    color: #667eea;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
      color: #5568d3;
    }
  }
}

.notification-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1040;
}
</style>
