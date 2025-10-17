<template>
  <div class="register-view">
    <div class="register-card animate__animated animate__fadeInUp">
      <div class="card-header text-center">
        <div class="logo-container mb-3">
          <i class="bi bi-heart-pulse-fill text-primary"></i>
        </div>
        <h2 class="mb-2">Crear Cuenta</h2>
        <p class="text-muted">Únete a HealthBridge</p>
      </div>

      <div class="card-body">
        <form @submit.prevent="handleRegister">
          <!-- Nombre y Apellido -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName" class="form-label">Nombre</label>
              <input
                type="text"
                id="firstName"
                class="form-control"
                :class="{ 'is-invalid': formErrors.firstName }"
                v-model="form.firstName"
                placeholder="Juan"
                @blur="validateFirstName"
                required
              />
              <div v-if="formErrors.firstName" class="invalid-feedback">
                {{ formErrors.firstName }}
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName" class="form-label">Apellido</label>
              <input
                type="text"
                id="lastName"
                class="form-control"
                :class="{ 'is-invalid': formErrors.lastName }"
                v-model="form.lastName"
                placeholder="Pérez"
                @blur="validateLastName"
                required
              />
              <div v-if="formErrors.lastName" class="invalid-feedback">
                {{ formErrors.lastName }}
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico</label>
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

          <!-- Role -->
          <div class="mb-3">
            <label for="role" class="form-label">Tipo de Usuario</label>
            <select
              id="role"
              class="form-select"
              :class="{ 'is-invalid': formErrors.role }"
              v-model="form.role"
              @change="validateRole"
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="patient">Paciente</option>
              <option value="doctor">Doctor</option>
            </select>
            <div v-if="formErrors.role" class="invalid-feedback">
              {{ formErrors.role }}
            </div>
          </div>

          <!-- Doctor Fields -->
          <div
            v-if="form.role === 'doctor'"
            class="doctor-fields animate__animated animate__fadeIn"
          >
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="specialization" class="form-label">Especialización</label>
                <input
                  type="text"
                  id="specialization"
                  class="form-control"
                  v-model="form.profile.specialization"
                  placeholder="Ej: Cardiología"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="licenseNumber" class="form-label">Número de Licencia</label>
                <input
                  type="text"
                  id="licenseNumber"
                  class="form-control"
                  v-model="form.profile.licenseNumber"
                  placeholder="MED-12345"
                />
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div class="mb-3">
            <label for="phone" class="form-label">Teléfono (Opcional)</label>
            <div class="input-group">
              <span class="input-group-text">+591</span>
              <input
                type="tel"
                id="phone"
                class="form-control"
                :class="{ 'is-invalid': formErrors.phone }"
                v-model="form.profile.phone"
                placeholder="71234567"
                @blur="validatePhone"
              />
              <div v-if="formErrors.phone" class="invalid-feedback">
                {{ formErrors.phone }}
              </div>
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="form-control"
                :class="{ 'is-invalid': formErrors.password }"
                v-model="form.password"
                placeholder="Mínimo 12 caracteres"
                @input="checkPasswordStrength"
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
            </div>

            <!-- Password Strength -->
            <div class="password-strength mt-2">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar"
                  :class="passwordStrengthClass"
                  :style="{ width: passwordStrength + '%' }"
                ></div>
              </div>
              <small class="text-muted">{{ passwordStrengthText }}</small>
            </div>

            <!-- Password Requirements -->
            <div v-if="form.password" class="password-requirements mt-2">
              <small :class="hasMinLength ? 'text-success' : 'text-muted'">
                <i :class="hasMinLength ? 'bi bi-check-circle-fill' : 'bi bi-circle'"></i>
                Mínimo 12 caracteres
              </small>
              <small :class="hasUpperCase ? 'text-success' : 'text-muted'">
                <i :class="hasUpperCase ? 'bi bi-check-circle-fill' : 'bi bi-circle'"></i>
                Una mayúscula
              </small>
              <small :class="hasLowerCase ? 'text-success' : 'text-muted'">
                <i :class="hasLowerCase ? 'bi bi-check-circle-fill' : 'bi bi-circle'"></i>
                Una minúscula
              </small>
              <small :class="hasNumber ? 'text-success' : 'text-muted'">
                <i :class="hasNumber ? 'bi bi-check-circle-fill' : 'bi bi-circle'"></i>
                Un número
              </small>
              <small :class="hasSpecialChar ? 'text-success' : 'text-muted'">
                <i :class="hasSpecialChar ? 'bi bi-check-circle-fill' : 'bi bi-circle'"></i>
                Un carácter especial
              </small>
            </div>

            <div v-if="formErrors.password" class="invalid-feedback d-block">
              {{ formErrors.password }}
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              :class="{ 'is-invalid': formErrors.confirmPassword }"
              v-model="form.confirmPassword"
              placeholder="Repite tu contraseña"
              @blur="validateConfirmPassword"
              required
            />
            <div v-if="formErrors.confirmPassword" class="invalid-feedback">
              {{ formErrors.confirmPassword }}
            </div>
          </div>

          <!-- Terms -->
          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                id="acceptTerms"
                class="form-check-input"
                :class="{ 'is-invalid': formErrors.acceptTerms }"
                v-model="form.acceptTerms"
                @change="validateTerms"
                required
              />
              <label for="acceptTerms" class="form-check-label">
                Acepto los
                <a href="#" class="text-primary">Términos de Servicio</a>
                y la
                <a href="#" class="text-primary">Política de Privacidad</a>
              </label>
              <div v-if="formErrors.acceptTerms" class="invalid-feedback d-block">
                {{ formErrors.acceptTerms }}
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary w-100 mb-3"
            :disabled="appStore.isLoading || !isFormValid"
          >
            <span v-if="appStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
            {{ appStore.isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center">
          <p class="mb-0">
            ¿Ya tienes cuenta?
            <RouterLink to="/auth/login" class="text-primary text-decoration-none fw-semibold">
              Inicia sesión aquí
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
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
  confirmPassword: '',
  firstName: '',
  lastName: '',
  role: '',
  profile: {
    phone: '',
    specialization: '',
    licenseNumber: '',
  },
  acceptTerms: false,
})

const formErrors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  role: '',
  phone: '',
  acceptTerms: '',
})

const showPassword = ref(false)
const passwordStrength = ref(0)

// Password validation computed
const hasMinLength = computed(() => form.password.length >= 12)
const hasUpperCase = computed(() => /[A-Z]/.test(form.password))
const hasLowerCase = computed(() => /[a-z]/.test(form.password))
const hasNumber = computed(() => /[0-9]/.test(form.password))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(form.password))

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value < 25) return 'bg-danger'
  if (passwordStrength.value < 50) return 'bg-warning'
  if (passwordStrength.value < 75) return 'bg-info'
  return 'bg-success'
})

const passwordStrengthText = computed(() => {
  if (passwordStrength.value < 25) return 'Muy débil'
  if (passwordStrength.value < 50) return 'Débil'
  if (passwordStrength.value < 75) return 'Buena'
  return 'Fuerte'
})

const isFormValid = computed(() => {
  return (
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    form.password === form.confirmPassword &&
    form.role &&
    form.acceptTerms &&
    passwordStrength.value >= 50 &&
    !Object.values(formErrors).some((error) => error !== '')
  )
})

const checkPasswordStrength = () => {
  let strength = 0

  if (hasMinLength.value) strength += 20
  if (hasUpperCase.value) strength += 20
  if (hasLowerCase.value) strength += 20
  if (hasNumber.value) strength += 20
  if (hasSpecialChar.value) strength += 20

  passwordStrength.value = strength
}

const validateFirstName = () => {
  if (!form.firstName.trim()) {
    formErrors.firstName = 'El nombre es obligatorio'
    return false
  }
  if (form.firstName.length < 2) {
    formErrors.firstName = 'Mínimo 2 caracteres'
    return false
  }
  formErrors.firstName = ''
  return true
}

const validateLastName = () => {
  if (!form.lastName.trim()) {
    formErrors.lastName = 'El apellido es obligatorio'
    return false
  }
  if (form.lastName.length < 2) {
    formErrors.lastName = 'Mínimo 2 caracteres'
    return false
  }
  formErrors.lastName = ''
  return true
}

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

const validateRole = () => {
  if (!form.role) {
    formErrors.role = 'Selecciona un tipo de usuario'
    return false
  }
  formErrors.role = ''
  return true
}

const validatePhone = () => {
  if (form.profile.phone && !validators.phone(form.profile.phone)) {
    formErrors.phone = 'Teléfono inválido'
    return false
  }
  formErrors.phone = ''
  return true
}

const validatePassword = () => {
  const validation = validators.password(form.password)
  if (!validation.isValid) {
    formErrors.password = validation.errors.join(', ')
    return false
  }
  formErrors.password = ''
  return true
}

const validateConfirmPassword = () => {
  if (form.password !== form.confirmPassword) {
    formErrors.confirmPassword = 'Las contraseñas no coinciden'
    return false
  }
  formErrors.confirmPassword = ''
  return true
}

const validateTerms = () => {
  if (!form.acceptTerms) {
    formErrors.acceptTerms = 'Debes aceptar los términos'
    return false
  }
  formErrors.acceptTerms = ''
  return true
}

const handleRegister = async () => {
  // Validar todos los campos
  const isValid =
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validateRole() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateTerms() &&
    validatePhone()

  if (!isValid) {
    return
  }

  appStore.setLoading(true)

  const result = await authStore.register({
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    firstName: form.firstName,
    lastName: form.lastName,
    role: form.role as 'doctor' | 'patient',
    profile: {
      phone: form.profile.phone ? `+591${form.profile.phone}` : undefined,
      specialization: form.profile.specialization || undefined,
      licenseNumber: form.profile.licenseNumber || undefined,
    },
    acceptTerms: form.acceptTerms,
  })

  if (result.success) {
    router.push('/dashboard')
  }

  appStore.setLoading(false)
}
</script>

<style lang="scss" scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.register-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

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

.doctor-fields {
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #e3f2fd;
}

.password-strength {
  .progress {
    height: 4px;
    border-radius: 2px;
  }
}

.password-requirements {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  small {
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      font-size: 0.875rem;
    }
  }
}

.form-control,
.form-select {
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

@media (max-width: 576px) {
  .register-card {
    margin: 1rem;
    max-height: none;
  }
}
</style>
