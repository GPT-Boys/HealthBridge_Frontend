<template>
  <div class="services-page py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">Nuestros Servicios</h2>
      <div class="row g-4">
        <div class="col-md-4" v-for="service in services" :key="service.title">
          <div class="card shadow-sm h-100">
            <div class="card-body text-center">
              <i :class="service.icon + ' text-primary fs-1 mb-3'"></i>
              <h5 class="card-title">{{ service.title }}</h5>
              <p class="card-text">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Consultas Médicas',
    description: 'Agenda una cita con especialistas en diferentes áreas de la salud.',
    icon: 'bi bi-person-check',
  },
  {
    title: 'Diagnóstico en Línea',
    description: 'Recibe orientación médica inmediata mediante videollamadas seguras.',
    icon: 'bi bi-camera-video',
  },
  {
    title: 'Historial Clínico Digital',
    description: 'Accede fácilmente a tus antecedentes y resultados de exámenes.',
    icon: 'bi bi-file-earmark-medical',
  },
]
</script>
