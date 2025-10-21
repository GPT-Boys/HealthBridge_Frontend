<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero d-flex align-items-center text-center text-white">
      <div class="container">
        <h1 class="display-4 fw-bold mb-3">Tu salud, nuestra prioridad</h1>
        <p class="lead mb-4">
          Conecta con profesionales médicos y gestiona tus citas fácilmente desde una sola plataforma.
        </p>
        <RouterLink to="/auth/register" class="btn btn-primary btn-lg">
          ¡Comienza ahora!
        </RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">¿Por qué elegir HealthBridge?</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <i class="bi bi-heart-pulse-fill text-primary fs-1"></i>
            <h5 class="mt-3">Atención Integral</h5>
            <p>Encuentra médicos de distintas especialidades y agenda tus citas con facilidad.</p>
          </div>
          <div class="col-md-4">
            <i class="bi bi-shield-check text-primary fs-1"></i>
            <h5 class="mt-3">Seguridad y Confianza</h5>
            <p>Tus datos están protegidos con los más altos estándares de seguridad digital.</p>
          </div>
          <div class="col-md-4">
            <i class="bi bi-phone text-primary fs-1"></i>
            <h5 class="mt-3">Acceso desde tu Móvil</h5>
            <p>Gestiona tus citas desde tu smartphone o tablet, en cualquier momento.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('@/assets/healthcare-bg.jpg') center/cover no-repeat;
  height: 90vh;
}
.features {
  margin-bottom: 6rem; /* espacio para el footer */
}

</style>
