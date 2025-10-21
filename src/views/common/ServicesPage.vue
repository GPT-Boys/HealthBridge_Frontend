<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="services-hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="row align-items-center min-vh-50">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="hero-title animate-fade-in">
              <span class="text-gradient">Nuestros Servicios</span>
            </h1>
            <p class="hero-subtitle animate-slide-up">
              Soluciones integrales de salud digital diseñadas para brindarte la mejor atención
              médica en cada etapa de tu vida.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="(service, index) in services" :key="service.title">
            <div
              class="service-card card-hover animate-slide-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <div class="service-content">
                <h3 class="service-title">{{ service.title }}</h3>
                <p class="service-description">{{ service.description }}</p>
                <ul class="service-features">
                  <li v-for="feature in service.features" :key="feature">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    {{ feature }}
                  </li>
                </ul>
                <div class="service-footer">
                  <RouterLink :to="service.link" class="btn btn-primary btn-sm">
                    <i class="bi bi-arrow-right me-1"></i>
                    {{ service.buttonText }}
                  </RouterLink>
                  <span class="service-price">{{ service.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Services Section -->
    <section class="special-services py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Servicios Especializados</h2>
          <p class="section-subtitle">Atención especializada para necesidades específicas</p>
        </div>

        <div class="row g-4">
          <div class="col-lg-6">
            <div class="special-card">
              <div class="special-icon">
                <i class="bi bi-heart-pulse"></i>
              </div>
              <div class="special-content">
                <h4>Monitoreo Continuo</h4>
                <p>
                  Seguimiento de tus indicadores de salud con tecnología avanzada y alertas
                  inteligentes.
                </p>
                <div class="special-features">
                  <span class="feature-tag">IoT</span>
                  <span class="feature-tag">IA</span>
                  <span class="feature-tag">24/7</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="special-card">
              <div class="special-icon">
                <i class="bi bi-shield-plus"></i>
              </div>
              <div class="special-content">
                <h4>Prevención Avanzada</h4>
                <p>
                  Programas de prevención personalizados basados en tu perfil de salud y factores de
                  riesgo.
                </p>
                <div class="special-features">
                  <span class="feature-tag">Personalizado</span>
                  <span class="feature-tag">Predictivo</span>
                  <span class="feature-tag">Científico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">¿Cómo Funciona?</h2>
          <p class="section-subtitle">Un proceso simple y seguro en 4 pasos</p>
        </div>

        <div class="row g-4">
          <div class="col-lg-3 col-md-6" v-for="(step, index) in processSteps" :key="step.title">
            <div class="process-step">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-icon">
                <i :class="step.icon"></i>
              </div>
              <h5 class="step-title">{{ step.title }}</h5>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h3 class="cta-title">¿Listo para experimentar nuestros servicios?</h3>
            <p class="cta-subtitle">Comienza tu viaje hacia una mejor salud hoy mismo.</p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <RouterLink to="/auth/register" class="btn btn-primary btn-lg btn-gradient">
              <i class="bi bi-rocket-takeoff me-2"></i>
              Comenzar Ahora
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const services = [
  {
    title: 'Consultas Médicas',
    description: 'Agenda citas con especialistas certificados en diferentes áreas de la salud.',
    icon: 'bi bi-person-check',
    features: [
      'Más de 20 especialidades médicas',
      'Agenda disponible 24/7',
      'Recordatorios automáticos',
      'Cancelación flexible',
    ],
    link: '/dashboard/appointments/create',
    buttonText: 'Agendar Cita',
    price: 'Desde $50',
  },
  {
    title: 'Telemedicina',
    description:
      'Recibe atención médica inmediata mediante videollamadas seguras y confidenciales.',
    icon: 'bi bi-camera-video',
    features: [
      'Videollamadas HD seguras',
      'Prescripciones digitales',
      'Seguimiento post-consulta',
      'Disponible 24/7',
    ],
    link: '/dashboard/appointments/create',
    buttonText: 'Consulta Virtual',
    price: 'Desde $35',
  },
  {
    title: 'Historial Clínico Digital',
    description: 'Accede a tu información médica completa de forma segura y organizada.',
    icon: 'bi bi-file-earmark-medical',
    features: [
      'Historial completo digitalizado',
      'Resultados de laboratorio',
      'Imágenes médicas',
      'Acceso desde cualquier dispositivo',
    ],
    link: '/dashboard/profile',
    buttonText: 'Ver Historial',
    price: 'Gratis',
  },
  {
    title: 'Medicina Preventiva',
    description:
      'Programas de prevención y bienestar personalizados para mantener tu salud óptima.',
    icon: 'bi bi-shield-check',
    features: [
      'Chequeos preventivos',
      'Vacunación programada',
      'Seguimiento de indicadores',
      'Alertas de salud',
    ],
    link: '/dashboard/appointments/create',
    buttonText: 'Programar',
    price: 'Desde $80',
  },
  {
    title: 'Nutrición y Dietética',
    description: 'Asesoramiento nutricional personalizado por profesionales certificados.',
    icon: 'bi bi-heart-pulse',
    features: [
      'Planes alimentarios personalizados',
      'Seguimiento nutricional',
      'Educación alimentaria',
      'App móvil incluida',
    ],
    link: '/dashboard/appointments/create',
    buttonText: 'Consultar',
    price: 'Desde $60',
  },
  {
    title: 'Psicología y Bienestar',
    description: 'Atención psicológica profesional para tu bienestar mental y emocional.',
    icon: 'bi bi-people',
    features: [
      'Terapia individual y grupal',
      'Sesiones online y presenciales',
      'Programas de bienestar',
      'Seguimiento continuo',
    ],
    link: '/dashboard/appointments/create',
    buttonText: 'Reservar',
    price: 'Desde $70',
  },
]

const processSteps = [
  {
    title: 'Regístrate',
    description: 'Crea tu cuenta de forma rápida y segura con tu información básica.',
    icon: 'bi bi-person-plus',
  },
  {
    title: 'Selecciona Servicio',
    description: 'Elige el servicio médico que necesitas de nuestra amplia gama de opciones.',
    icon: 'bi bi-list-check',
  },
  {
    title: 'Agenda tu Cita',
    description: 'Reserva tu cita en el horario que mejor se adapte a tu disponibilidad.',
    icon: 'bi bi-calendar-event',
  },
  {
    title: 'Recibe Atención',
    description: 'Disfruta de una atención médica de calidad, presencial o virtual.',
    icon: 'bi bi-heart-pulse',
  },
]
</script>

<style scoped>
/* Hero Section */
.services-hero {
  position: relative;
  min-height: 50vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 80px; /* Espacio para el navbar fijo */
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: pattern-float 15s ease-in-out infinite;
}

@keyframes pattern-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
}

/* Services Section */
.services-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.services-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0.1), transparent);
}

.service-card {
  background: white;
  border-radius: 20px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.service-card:hover::before {
  left: 100%;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 1.5rem;
  transition: all 0.3s ease;
}

.service-icon i {
  font-size: 2rem;
  color: white;
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(5deg);
}

.service-content {
  padding: 0 2rem 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.service-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
  flex-grow: 1;
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.service-features li {
  padding: 0.5rem 0;
  color: #555;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.service-price {
  font-weight: 600;
  color: #667eea;
  font-size: 1.1rem;
}

/* Special Services Section */
.special-services {
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.special-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.special-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.special-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.special-icon i {
  font-size: 2.5rem;
  color: white;
}

.special-content h4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.special-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.special-features {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.feature-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Process Section */
.process-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.process-step {
  text-align: center;
  position: relative;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 2;
}

.step-icon {
  width: 80px;
  height: 80px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.step-icon i {
  font-size: 2rem;
  color: #667eea;
}

.process-step:hover .step-icon {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.1);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.step-description {
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0;
  color: white;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .special-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .special-icon {
    width: 80px;
    height: 80px;
  }

  .special-icon i {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .service-content {
    padding: 0 1.5rem 1.5rem;
  }

  .service-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .special-card {
    padding: 2rem;
  }

  .cta-section .row {
    text-align: center;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .service-card {
    margin-bottom: 1rem;
  }

  .service-icon {
    width: 60px;
    height: 60px;
    margin: 1.5rem auto 1rem;
  }

  .service-icon i {
    font-size: 1.5rem;
  }

  .service-title {
    font-size: 1.25rem;
  }

  .special-card {
    padding: 1.5rem;
  }

  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }

  .step-icon {
    width: 60px;
    height: 60px;
  }

  .step-icon i {
    font-size: 1.5rem;
  }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .service-card,
  .special-card,
  .step-icon,
  .hero-pattern {
    animation: none !important;
  }

  .service-card:hover,
  .special-card:hover {
    transform: none;
  }

  .service-card:hover .service-icon,
  .process-step:hover .step-icon {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .service-card,
  .special-card {
    border: 2px solid #000;
  }

  .service-icon,
  .special-icon,
  .step-number {
    background: #000;
  }
}

/* Print styles */
@media print {
  .services-hero,
  .cta-section {
    background: none !important;
    color: #000 !important;
  }

  .service-card,
  .special-card {
    border: 1px solid #000;
    box-shadow: none;
  }

  .service-icon,
  .special-icon,
  .step-number {
    background: #000 !important;
    color: #fff !important;
  }
}
</style>
