import { defineStore } from 'pinia'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as any
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await axios.post('http://localhost:3001/auth/login', { email, password })
      this.token = data.token
      this.user = jwtDecode(this.token)
      localStorage.setItem('token', this.token)
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
