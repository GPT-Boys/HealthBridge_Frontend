<template>
  <div class="container mt-5">
    <h2 class="text-center">HealthBridge - Login</h2>
    <div class="card p-4 shadow">
      <input v-model="email" type="email" class="form-control mb-2" placeholder="Email" />
      <input v-model="password" type="password" class="form-control mb-2" placeholder="Password" />
      <button @click="handleLogin" class="btn btn-primary w-100">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Error en login')
  }
}
</script>
