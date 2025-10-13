/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppStore } from '@/stores/app'

export class WebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  connect(userId: string) {
    const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3000'}/ws?userId=${userId}`

    try {
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('🔗 WebSocket conectado')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('🔌 WebSocket desconectado')
        this.attemptReconnect(userId)
      }

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error)
      }
    } catch (error) {
      console.error('Error conectando WebSocket:', error)
    }
  }

  private attemptReconnect(userId: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(
          `🔄 Reintentando conexión WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
        )
        this.connect(userId)
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  private handleMessage(data: any) {
    const appStore = useAppStore()

    switch (data.type) {
      case 'notification':
        appStore.addNotification(data.payload)
        break
      case 'appointment_update':
        // Manejar actualizaciones de citas
        break
      default:
        console.log('Mensaje WebSocket no manejado:', data)
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const wsService = new WebSocketService()
