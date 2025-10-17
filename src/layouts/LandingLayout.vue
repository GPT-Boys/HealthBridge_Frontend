<template>
  <div class="landing-layout">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">
          <i class="bi bi-heart-pulse-fill text-primary"></i>
          <span class="ms-2 fw-bold">HealthBridge</span>
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Inicio</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/services" class="nav-link">Servicios</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">Sobre Nosotros</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/contact" class="nav-link">Contacto</RouterLink>
            </li>
          </ul>

          <div class="d-flex">
            <RouterLink to="/auth/login" class="btn btn-outline-primary me-2">
              Inicio de Sesión
            </RouterLink>
            <RouterLink to="/auth/register" class="btn btn-primary">Registrarse</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer bg-light py-4 mt-auto">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p class="mb-0">&copy; 2025 GPT-Boys HealthBridge. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-end">
            <a href="#" class="text-decoration-none me-3">Políticas de Privacidad</a>
            <a href="#" class="text-decoration-none">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.landing-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  padding-top: 76px;
  flex: 1;
}

.navbar-brand {
  font-size: 1.5rem;
}

.footer {
  margin-top: auto;
}
</style>
