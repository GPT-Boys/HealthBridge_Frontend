<template>
  <div class="forgot-password-form animate__animated animate__fadeInUp">
    <div class="form-header text-center mb-4">
      <i class="bi bi-key text-primary mb-3" style="font-size: 3rem"></i>
      <h2 class="mb-2">Recuperar Contraseña</h2>
      <p class="text-muted">
        Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
      </p>
    </div>

    <div v-if="!emailSent">
      <form @submit.prevent="handleForgotPassword">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="form.email"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="appStore.isLoading">
          <span v-if="appStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
          {{ appStore.isLoading ? 'Enviando...' : 'Enviar Enlace' }}
        </button>
      </form>
    </div>

    <div v-else class="success-message text-center">
      <i class="bi bi-check-circle-fill text-success mb-3" style="font-size: 4rem"></i>
      <h3 class="text-success mb-3">¡Enlace Enviado!</h3>
      <p class="mb-4">
        Hemos enviado un enlace de recuperación a <strong>{{ form.email }}</strong
        >. Revisa tu bandeja de entrada y sigue las instrucciones.
      </p>
      <button class="btn btn-outline-primary" @click="emailSent = false">
        Intentar con otro email
      </button>
    </div>

    <div class="text-center mt-4">
      <p class="mb-0">
        ¿Recordaste tu contraseña?
        <RouterLink to="/auth/login" class="text-primary text-decoration-none fw-semibold">
          Inicia sesión aquí
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const form = ref({
  email: '',
})

const emailSent = ref(false)

const handleForgotPassword = async () => {
  appStore.setLoading(true)

  try {
    // Simular envío de email (implementar con el backend)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    emailSent.value = true
    appStore.showToast('Éxito!', 'Enlace de recuperación enviado exitosamente', 'success')
  } catch (error) {
    appStore.showToast(
      'Éxito!',
      `Error al enviar el enlace. Intenta nuevamente. - ${error}`,
      'error',
    )
  } finally {
    appStore.setLoading(false)
  }
}
</script>

<style lang="scss" scoped>
.forgot-password-form {
  max-width: 100%;
}

.form-header h2 {
  color: #2c3e50;
  font-weight: 600;
}

.input-group-text {
  background: #f8f9fa;
  border-right: none;
}

.form-control {
  border-left: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.btn-primary {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border: none;
  font-weight: 600;
  padding: 0.75rem;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
    transform: translateY(-1px);
  }
}

.success-message {
  padding: 2rem 0;

  h3 {
    font-weight: 600;
  }

  p {
    color: #6c757d;
    line-height: 1.6;
  }
}
</style>
