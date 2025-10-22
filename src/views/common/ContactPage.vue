<template>
  <section
    class="contact-page d-flex align-items-center justify-content-center min-vh-100 bg-gradient"
  >
    <div
      class="contact-card bg-glass shadow-lg p-5 rounded-4 col-11 col-md-8 col-lg-5 animate-fade-in"
    >
      <h2 class="text-center fw-bold text-white mb-4">💬 Contáctanos</h2>

      <form @submit.prevent="handleSubmit" class="text-white">
        <div class="mb-3">
          <label class="form-label fw-semibold">Nombre</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control bg-transparent text-white border-light"
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Correo electrónico</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control bg-transparent text-white border-light"
            placeholder="example@correo.com"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Mensaje</label>
          <textarea
            v-model="form.message"
            rows="4"
            class="form-control bg-transparent text-white border-light"
            placeholder="Escribe tu mensaje..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="btn btn-light w-100 fw-semibold py-2 rounded-3 shadow-sm hover-glow"
        >
          🚀 Enviar mensaje
        </button>
      </form>

      <!-- Créditos -->
      <div class="text-center mt-4 text-white-50 small">
        <p class="mb-1 fw-semibold">Desarrollado con ❤️ por:</p>
        <p>Oscar Menacho Silva · Rodrigo Rivera Mayan · José Manzaneda · Fabrisio Condarco</p>
      </div>
    </div>

    <!-- Toast de confirmación -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 9999">
      <div
        class="toast align-items-center text-white bg-success border-0 show"
        role="alert"
        v-if="showToast"
      >
        <div class="d-flex">
          <div class="toast-body">
            ✅ Gracias, {{ form.name || 'amigo' }}. Tu mensaje ha sido enviado.
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            @click="showToast = false"
          ></button>
        </div>
      </div>
    </div>

    <!-- Audio de notificación -->
    <audio ref="pingSound" preload="none">
      <source
        src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-back-2575.mp3"
        type="audio/mp3"
      />
    </audio>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const showToast = ref(false)
const pingSound = ref<HTMLAudioElement | null>(null)

const handleSubmit = () => {
  // Mostrar el toast
  showToast.value = true

  // Reproducir el sonido "ping"
  if (pingSound.value) {
    pingSound.value.currentTime = 0
    pingSound.value.play().catch(() => {})
  }

  // Limpiar formulario y ocultar toast
  setTimeout(() => {
    showToast.value = false
    form.name = ''
    form.email = ''
    form.message = ''
  }, 3500)
}
</script>

<style scoped>
.contact-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 0;
}
.contact-card {
  position: relative;
  margin: 3% auto;
  z-index: 1;
}

/* Fondo con gradiente moderno */
.bg-gradient {
  background: #2a7b9b;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* Tarjeta con efecto glass */
.bg-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animación de entrada suave */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Efecto hover brillante en el botón */
.hover-glow:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
  transform: scale(1.02);
  transition: 0.3s ease;
}
</style>
