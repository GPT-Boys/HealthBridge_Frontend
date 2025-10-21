<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="row align-items-center min-vh-50">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="hero-title animate-fade-in">
              <span class="text-gradient">Sobre Nosotros</span>
            </h1>
            <p class="hero-subtitle animate-slide-up">
              Conectando la salud del futuro con la tecnología del presente
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values Section -->
    <section class="mvv-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="mvv-card">
              <div class="mvv-icon">
                <i class="bi bi-bullseye"></i>
              </div>
              <h3 class="mvv-title">Nuestra Misión</h3>
              <p class="mvv-description">
                Democratizar el acceso a la atención médica de calidad mediante tecnología
                innovadora, conectando pacientes y profesionales de la salud en una plataforma
                segura y eficiente.
              </p>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="mvv-card">
              <div class="mvv-icon">
                <i class="bi bi-eye"></i>
              </div>
              <h3 class="mvv-title">Nuestra Visión</h3>
              <p class="mvv-description">
                Ser la plataforma líder en salud digital de Latinoamérica, transformando la manera
                en que las personas acceden y gestionan su cuidado médico para el año 2030.
              </p>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="mvv-card">
              <div class="mvv-icon">
                <i class="bi bi-heart"></i>
              </div>
              <h3 class="mvv-title">Nuestros Valores</h3>
              <p class="mvv-description">
                <strong>Innovación:</strong> Tecnología de vanguardia<br />
                <strong>Confianza:</strong> Seguridad y privacidad<br />
                <strong>Accesibilidad:</strong> Salud para todos<br />
                <strong>Excelencia:</strong> Calidad en cada interacción
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="story-content">
              <h2 class="section-title">Nuestra Historia</h2>
              <p class="story-text">
                HealthBridge nació en 2024 con el propósito de revolucionar la atención médica
                digital. Nuestro equipo de desarrolladores visionarios identificó la necesidad de
                una plataforma integral que conectara pacientes y médicos de manera eficiente y
                segura.
              </p>
              <p class="story-text">
                Combinamos experiencia médica, ingeniería de software e inteligencia artificial para
                crear una solución que no solo mejora la experiencia del paciente, sino que también
                optimiza el trabajo de los profesionales de la salud.
              </p>
              <div class="story-stats">
                <div class="stat-item">
                  <span class="stat-number">2024</span>
                  <span class="stat-label">Fundación</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">4</span>
                  <span class="stat-label">Desarrolladores</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">100%</span>
                  <span class="stat-label">Compromiso</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="story-image">
              <div class="floating-element element-1">
                <i class="bi bi-code-slash"></i>
                <span>Desarrollo</span>
              </div>
              <div class="floating-element element-2">
                <i class="bi bi-shield-check"></i>
                <span>Seguridad</span>
              </div>
              <div class="floating-element element-3">
                <i class="bi bi-graph-up-arrow"></i>
                <span>Innovación</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Nuestro Equipo</h2>
          <p class="section-subtitle">Los visionarios detrás de HealthBridge</p>
        </div>

        <div class="row g-4">
          <div class="col-lg-3 col-md-6" v-for="(member, index) in teamMembers" :key="member.name">
            <div class="team-card animate-slide-up" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="team-avatar">
                <div class="avatar-circle">
                  <span class="avatar-initial">{{ member.initials }}</span>
                </div>
              </div>
              <div class="team-info">
                <h4 class="team-name">{{ member.name }}</h4>
                <p class="team-role">{{ member.role }}</p>
                <p class="team-description">{{ member.description }}</p>
                <div class="team-skills">
                  <span v-for="skill in member.skills" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="tech-section py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Tecnología de Vanguardia</h2>
          <p class="section-subtitle">Construido con las mejores herramientas del mercado</p>
        </div>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="tech in technologies" :key="tech.name">
            <div class="tech-card">
              <div class="tech-icon">
                <i :class="tech.icon"></i>
              </div>
              <h4 class="tech-name">{{ tech.name }}</h4>
              <p class="tech-description">{{ tech.description }}</p>
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
            <h3 class="cta-title">¿Listo para ser parte del futuro de la salud?</h3>
            <p class="cta-subtitle">
              Únete a nuestra comunidad y experimenta la medicina del mañana, hoy.
            </p>
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

const teamMembers = [
  {
    name: 'Oscar Menacho Silva',
    initials: 'OM',
    role: 'Desarrollador Full Stack',
    description:
      'Especialista en arquitectura de software y desarrollo backend con experiencia en sistemas de salud digital.',
    skills: ['Vue.js', 'Node.js', 'Python', 'PostgreSQL'],
  },
  {
    name: 'Rodrigo Rivera Mayan',
    initials: 'RR',
    role: 'Desarrollador Frontend',
    description:
      'Experto en interfaces de usuario y experiencia de usuario, enfocado en crear aplicaciones intuitivas y accesibles.',
    skills: ['Vue.js', 'TypeScript', 'CSS3', 'UI/UX'],
  },
  {
    name: 'José Manzaneda',
    initials: 'JM',
    role: 'Desarrollador Backend',
    description:
      'Especialista en APIs y sistemas distribuidos, con amplia experiencia en seguridad y escalabilidad.',
    skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
  },
  {
    name: 'Fabrisio Condarco',
    initials: 'FC',
    role: 'Desarrollador DevOps',
    description:
      'Experto en infraestructura cloud y automatización de despliegues, asegurando la estabilidad del sistema.',
    skills: ['AWS', 'Docker', 'CI/CD', 'Linux'],
  },
]

const technologies = [
  {
    name: 'Vue.js 3',
    description: 'Framework progresivo para construir interfaces de usuario modernas y reactivas.',
    icon: 'bi bi-code-slash',
  },
  {
    name: 'TypeScript',
    description: 'JavaScript con tipos estáticos para mayor seguridad y mantenibilidad del código.',
    icon: 'bi bi-filetype-tsx',
  },
  {
    name: 'Node.js',
    description: 'Entorno de ejecución de JavaScript del lado del servidor para APIs robustas.',
    icon: 'bi bi-server',
  },
  {
    name: 'MongoDB',
    description:
      'Base de datos no relacional de código abierto para almacenar datos médicos de forma segura.',
    icon: 'bi bi-database',
  },
  {
    name: 'Docker',
    description:
      'Contenedorización para despliegues consistentes y escalables en cualquier entorno.',
    icon: 'bi bi-box',
  },
  {
    name: 'AWS',
    description: 'Servicios cloud de Amazon para infraestructura escalable y segura.',
    icon: 'bi bi-cloud',
  },
]
</script>

<style scoped>
/* Hero Section */
.about-hero {
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
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: pattern-float 20s ease-in-out infinite;
}

@keyframes pattern-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
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
  max-width: 600px;
  margin: 0 auto;
}

/* Mission, Vision, Values Section */
.mvv-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.mvv-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0.1), transparent);
}

.mvv-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.mvv-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.mvv-card:hover::before {
  left: 100%;
}

.mvv-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.mvv-icon {
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

.mvv-icon i {
  font-size: 2rem;
  color: white;
}

.mvv-card:hover .mvv-icon {
  transform: scale(1.1) rotate(5deg);
}

.mvv-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.mvv-description {
  color: #666;
  line-height: 1.6;
}

/* Story Section */
.story-section {
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.story-text {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.story-stats {
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
  color: #667eea;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

.story-image {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-element {
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

.floating-element i {
  font-size: 1.5rem;
  color: #667eea;
}

.element-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.element-3 {
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

/* Team Section */
.team-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.team-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.team-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.team-card:hover::before {
  left: 100%;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.team-avatar {
  margin-bottom: 1.5rem;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.team-card:hover .avatar-circle {
  transform: scale(1.1);
}

.avatar-initial {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.team-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.team-role {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.team-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.team-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Technology Section */
.tech-section {
  background: white;
}

.tech-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.tech-icon {
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

.tech-icon i {
  font-size: 2rem;
  color: white;
}

.tech-card:hover .tech-icon {
  transform: scale(1.1) rotate(5deg);
}

.tech-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.tech-description {
  color: #666;
  line-height: 1.6;
  font-size: 0.9rem;
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

  .story-stats {
    justify-content: center;
    gap: 1.5rem;
  }

  .floating-element {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .floating-element i {
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

  .story-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .mvv-card,
  .team-card,
  .tech-card {
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

  .story-image {
    height: 300px;
  }

  .floating-element {
    padding: 0.75rem;
    font-size: 0.8rem;
  }

  .floating-element i {
    font-size: 1rem;
  }

  .mvv-card,
  .team-card,
  .tech-card {
    padding: 1.5rem 1rem;
  }

  .avatar-circle {
    width: 80px;
    height: 80px;
  }

  .avatar-initial {
    font-size: 1.5rem;
  }

  .mvv-icon,
  .tech-icon {
    width: 60px;
    height: 60px;
  }

  .mvv-icon i,
  .tech-icon i {
    font-size: 1.5rem;
  }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .mvv-card,
  .team-card,
  .tech-card,
  .floating-element,
  .hero-pattern {
    animation: none !important;
  }

  .mvv-card:hover,
  .team-card:hover,
  .tech-card:hover {
    transform: none;
  }

  .mvv-card:hover .mvv-icon,
  .team-card:hover .avatar-circle,
  .tech-card:hover .tech-icon {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .mvv-card,
  .team-card,
  .tech-card {
    border: 2px solid #000;
  }

  .mvv-icon,
  .tech-icon,
  .avatar-circle {
    background: #000;
  }

  .floating-element {
    background: #fff;
    border: 2px solid #000;
  }
}

/* Print styles */
@media print {
  .about-hero,
  .cta-section {
    background: none !important;
    color: #000 !important;
  }

  .mvv-card,
  .team-card,
  .tech-card {
    border: 1px solid #000;
    box-shadow: none;
  }

  .mvv-icon,
  .tech-icon,
  .avatar-circle {
    background: #000 !important;
    color: #fff !important;
  }

  .floating-element {
    display: none;
  }
}
</style>
