<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        <div class="hero-particles"></div>
      </div>

      <div class="container hero-content">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <div class="hero-text animate-fade-in">
              <h1 class="hero-title">
                <span class="text-gradient">Tu salud</span><br />
                nuestra prioridad
              </h1>
              <p class="hero-subtitle">
                Conecta con profesionales médicos y gestiona tus citas fácilmente desde una sola
                plataforma.
                <br /><strong>Salud digital al alcance de todos.</strong>
              </p>
              <div class="hero-buttons">
                <RouterLink
                  to="/auth/register"
                  class="btn btn-primary btn-lg btn-gradient animate-bounce-in"
                >
                  <i class="bi bi-rocket-takeoff me-2"></i>
                  ¡Comienza ahora!
                </RouterLink>
                <RouterLink to="/auth/login" class="btn btn-outline-light btn-lg ms-3">
                  <i class="bi bi-box-arrow-in-right me-2"></i>
                  Iniciar Sesión
                </RouterLink>
              </div>
              <div class="hero-stats">
                <div class="stat-item">
                  <span class="stat-number">10K+</span>
                  <span class="stat-label">Pacientes</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">500+</span>
                  <span class="stat-label">Médicos</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">50K+</span>
                  <span class="stat-label">Citas</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image animate-slide-up">
              <div class="floating-card card-1">
                <i class="bi bi-calendar-check text-primary"></i>
                <span>Cita Confirmada</span>
              </div>
              <div class="floating-card card-2">
                <i class="bi bi-person-heart text-success"></i>
                <span>Doctor Online</span>
              </div>
              <div class="floating-card card-3">
                <i class="bi bi-shield-check text-info"></i>
                <span>Datos Seguros</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">¿Por qué elegir HealthBridge?</h2>
          <p class="section-subtitle">Innovación y calidad al servicio de tu salud</p>
        </div>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="feature-card card-hover">
              <div class="feature-icon">
                <i class="bi bi-heart-pulse-fill"></i>
              </div>
              <h5 class="feature-title">Atención Integral</h5>
              <p class="feature-description">
                Encuentra médicos de distintas especialidades y agenda tus citas con facilidad.
                Atención personalizada para cada necesidad.
              </p>
              <div class="feature-link">
                <a href="#" class="text-primary"> Saber más <i class="bi bi-arrow-right"></i> </a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="feature-card card-hover">
              <div class="feature-icon">
                <i class="bi bi-shield-check"></i>
              </div>
              <h5 class="feature-title">Seguridad y Confianza</h5>
              <p class="feature-description">
                Tus datos están protegidos con los más altos estándares de seguridad digital.
                Privacidad garantizada en cada consulta.
              </p>
              <div class="feature-link">
                <a href="#" class="text-primary"> Saber más <i class="bi bi-arrow-right"></i> </a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="feature-card card-hover">
              <div class="feature-icon">
                <i class="bi bi-phone"></i>
              </div>
              <h5 class="feature-title">Acceso desde tu Móvil</h5>
              <p class="feature-description">
                Gestiona tus citas desde tu smartphone o tablet, en cualquier momento. La salud en
                la palma de tu mano.
              </p>
              <div class="feature-link">
                <a href="#" class="text-primary"> Saber más <i class="bi bi-arrow-right"></i> </a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="feature-card card-hover">
              <div class="feature-icon">
                <i class="bi bi-clock-history"></i>
              </div>
              <h5 class="feature-title">Disponibilidad 24/7</h5>
              <p class="feature-description">
                Accede a tu información médica y gestiona citas en cualquier momento del día.
                Siempre disponible para ti.
              </p>
              <div class="feature-link">
                <a href="#" class="text-primary"> Saber más <i class="bi bi-arrow-right"></i> </a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="feature-card card-hover">
              <div class="feature-icon">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
              <h5 class="feature-title">Seguimiento Personalizado</h5>
              <p class="feature-description">
                Monitorea tu progreso de salud con herramientas avanzadas y reportes detallados. Tu
                bienestar es nuestra meta.
              </p>
              <div class="feature-link">
                <a href="#" class="text-primary"> Saber más <i class="bi bi-arrow-right"></i> </a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="feature-card card-hover">
              <div class="feature-icon">
                <i class="bi bi-people"></i>
              </div>
              <h5 class="feature-title">Comunidad Médica</h5>
              <p class="feature-description">
                Conecta con una red de profesionales certificados y pacientes que comparten tu
                experiencia. Juntos hacia una mejor salud.
              </p>
              <div class="feature-link">
                <a href="#" class="text-primary"> Saber más <i class="bi bi-arrow-right"></i> </a>
              </div>
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
            <h3 class="cta-title">¿Listo para comenzar tu viaje hacia una mejor salud?</h3>
            <p class="cta-subtitle">
              Únete a miles de pacientes que ya confían en HealthBridge para su cuidado médico.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <RouterLink to="/auth/register" class="btn btn-primary btn-lg btn-gradient">
              <i class="bi bi-person-plus me-2"></i>
              Registrarse Gratis
            </RouterLink>
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
/* Hero Section Styles */
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: rgba(0, 0, 0, 0.3);
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  animation: particles-float 20s ease-in-out infinite;
}

@keyframes particles-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
}

.hero-buttons {
  margin-bottom: 3rem;
}

.hero-buttons .btn {
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.hero-buttons .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.25rem;
}

/* Hero Image Styles */
.hero-image {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #333;
  animation: float 6s ease-in-out infinite;
}

.floating-card i {
  font-size: 1.5rem;
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  animation: scroll-bounce 2s infinite;
}

@keyframes scroll-bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) rotate(-45deg);
  }
  40% {
    transform: translateY(-10px) rotate(-45deg);
  }
  60% {
    transform: translateY(-5px) rotate(-45deg);
  }
}

/* Features Section Styles */
.features-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0.1), transparent);
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

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  transition: all 0.3s ease;
}

.feature-icon i {
  font-size: 2rem;
  color: white;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.feature-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-link a {
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.feature-link a:hover {
  color: #667eea !important;
  transform: translateX(5px);
}

.feature-link i {
  transition: transform 0.3s ease;
}

.feature-link a:hover i {
  transform: translateX(3px);
}

/* CTA Section Styles */
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

  .hero-stats {
    justify-content: center;
    gap: 1.5rem;
  }

  .floating-card {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .floating-card i {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-buttons .btn {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
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

  .hero-image {
    height: 300px;
  }

  .floating-card {
    padding: 0.75rem;
    font-size: 0.8rem;
  }

  .floating-card i {
    font-size: 1rem;
  }

  .feature-card {
    padding: 1.5rem 1rem;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
  }

  .feature-icon i {
    font-size: 1.5rem;
  }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-bounce-in,
  .floating-card,
  .scroll-arrow,
  .hero-particles {
    animation: none !important;
  }

  .feature-card:hover .feature-icon {
    transform: none;
  }

  .hero-buttons .btn:hover {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .hero-section {
    background: #000;
  }

  .feature-card {
    border: 2px solid #000;
  }

  .floating-card {
    background: #fff;
    border: 2px solid #000;
  }
}

/* Print styles */
@media print {
  .hero-section,
  .cta-section {
    background: none !important;
    color: #000 !important;
  }

  .floating-card,
  .scroll-indicator {
    display: none;
  }

  .feature-card {
    border: 1px solid #000;
    box-shadow: none;
  }
}
</style>
