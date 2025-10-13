<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="row min-vh-100">
        <!-- Left Side - Branding -->
        <div class="col-md-6 auth-brand-section">
          <div class="brand-content">
            <div class="brand-logo animate__animated animate__fadeInDown">
              <i class="bi bi-heart-pulse-fill"></i>
              <h1>HealthBridge</h1>
            </div>
            <div class="brand-description animate__animated animate__fadeInUp animate__delay-1s">
              <h3>Tu salud, nuestra prioridad</h3>
              <p>
                Conectamos pacientes y doctores para una atención médica más eficiente y
                personalizada.
              </p>

              <div class="features">
                <div class="feature-item">
                  <i class="bi bi-calendar-check"></i>
                  <span>Agenda citas fácilmente</span>
                </div>
                <div class="feature-item">
                  <i class="bi bi-file-medical"></i>
                  <span>Accede a tu historial médico</span>
                </div>
                <div class="feature-item">
                  <i class="bi bi-bell"></i>
                  <span>Recibe recordatorios</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Auth Forms -->
        <div class="col-md-6 auth-form-section">
          <div class="form-container">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-brand-section {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/medical-bg.svg') center/cover;
    opacity: 0.1;
  }
}

.brand-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.brand-logo {
  margin-bottom: 2rem;

  i {
    font-size: 4rem;
    color: #ff6b6b;
    margin-bottom: 1rem;
    display: block;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
}

.brand-description {
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.8;
    margin-bottom: 2rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

.features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;

  i {
    font-size: 1.5rem;
    color: #ff6b6b;
  }

  span {
    font-size: 1rem;
    opacity: 0.9;
  }
}

.auth-form-section {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
}

@media (max-width: 768px) {
  .auth-brand-section {
    display: none;
  }

  .auth-form-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .form-container {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
}
</style>
