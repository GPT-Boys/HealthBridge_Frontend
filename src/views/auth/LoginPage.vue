<template>
  <div class="login-view">
    <div class="login-card animate__animated animate__fadeInUp">
      <div class="card-header text-center">
        <div class="logo-container mb-3">
          <i class="bi bi-heart-pulse-fill text-primary"></i>
        </div>
        <h2 class="mb-2">Iniciar Sesión</h2>
        <p class="text-muted">Ingresa a tu cuenta de HealthBridge</p>
      </div>

      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">
              <i class="bi bi-envelope me-2"></i>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              class="form-control"
              :class="{ 'is-invalid': formErrors.email }"
              v-model="form.email"
              placeholder="tu@email.com"
              @blur="validateEmail"
              required
            />
            <div v-if="formErrors.email" class="invalid-feedback">
              {{ formErrors.email }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">
              <i class="bi bi-lock me-2"></i>
              Contraseña
            </label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="form-control"
                :class="{ 'is-invalid': formErrors.password }"
                v-model="form.password"
                placeholder="Tu contraseña"
                @blur="validatePassword"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <div v-if="formErrors.password" class="invalid-feedback">
                {{ formErrors.password }}
              </div>
            </div>
          </div>

          <!-- Remember me & Forgot password -->
          <div class="mb-3 d-flex justify-content-between align-items-center">
            <div class="form-check">
              <input
                type="checkbox"
                id="remember"
                class="form-check-input"
                v-model="form.remember"
              />
              <label for="remember" class="form-check-label"> Recordarme </label>
            </div>
            <RouterLink to="/auth/forgot-password" class="text-primary text-decoration-none">
              ¿Olvidaste tu contraseña?
            </RouterLink>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="appStore.isLoading">
            <span v-if="appStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
            {{ appStore.isLoading ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">
          <span>o</span>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p class="mb-0">
            ¿No tienes cuenta?
            <RouterLink to="/auth/register" class="text-primary text-decoration-none fw-semibold">
              Regístrate aquí
            </RouterLink>
          </p>
        </div>

        <!-- Demo Credentials -->
        <div class="demo-credentials mt-4">
          <h6 class="text-muted mb-2">
            <i class="bi bi-info-circle me-2"></i>
            Credenciales de Demostración:
          </h6>
          <div class="row g-2">
            <div class="col-6">
              <div class="demo-card" @click="fillDemoCredentials('doctor')">
                <strong>Doctor</strong>
                <small>doctor@test.com</small>
                <small>Test123!@#</small>
              </div>
            </div>
            <div class="col-6">
              <div class="demo-card" @click="fillDemoCredentials('patient')">
                <strong>Paciente</strong>
                <small>patient@test.com</small>
                <small>Test123!@#</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { validators } from '@/utils/validators'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const formErrors = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)

const validateEmail = () => {
  if (!form.email) {
    formErrors.email = 'El email es obligatorio'
    return false
  }
  if (!validators.email(form.email)) {
    formErrors.email = 'Email inválido'
    return false
  }
  formErrors.email = ''
  return true
}

const validatePassword = () => {
  if (!form.password) {
    formErrors.password = 'La contraseña es obligatoria'
    return false
  }
  formErrors.password = ''
  return true
}

const handleLogin = async () => {
  appStore.setLoading(true)

  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  const result = await authStore.login({
    email: form.email,
    password: form.password,
  })

  if (result.success) {
    router.push('/dashboard')
  }

  appStore.setLoading(false)
}

const fillDemoCredentials = (type: 'doctor' | 'patient') => {
  if (type === 'doctor') {
    form.email = 'doctor@test.com'
    form.password = 'Test123!@#'
  } else {
    form.email = 'patient@test.com'
    form.password = 'Test123!@#'
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.login-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
  overflow: hidden;

  .card-header {
    padding: 2rem 2rem 1rem;

    .logo-container {
      i {
        font-size: 3rem;
        color: #007bff;
      }
    }

    h2 {
      font-weight: 700;
      color: #2c3e50;
    }
  }

  .card-body {
    padding: 1rem 2rem 2rem;
  }
}

.form-control {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #e9ecef;
  transition: all 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &.is-invalid {
    border-color: #dc3545;
  }
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border: none;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
  }
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #dee2e6;
  }

  span {
    position: relative;
    background: white;
    padding: 0 1rem;
    color: #6c757d;
    font-size: 0.875rem;
  }
}

.demo-credentials {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px dashed #dee2e6;

  h6 {
    font-size: 0.875rem;
  }

  .demo-card {
    background: white;
    padding: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    border: 1px solid #e9ecef;

    &:hover {
      border-color: #007bff;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
    }

    strong {
      display: block;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    small {
      display: block;
      color: #6c757d;
      font-size: 0.75rem;
    }
  }
}

@media (max-width: 576px) {
  .login-card {
    margin: 1rem;
  }
}
</style>
