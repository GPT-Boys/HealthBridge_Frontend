<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <nav class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <i class="bi bi-heart-pulse-fill"></i>
          <span v-show="!appStore.sidebarCollapsed">HealthBridge</span>
        </div>
      </div>

      <div class="sidebar-menu">
        <div class="menu-section">
          <div class="menu-title" v-show="!appStore.sidebarCollapsed">Principal</div>

          <RouterLink to="/dashboard" class="menu-item" active-class="active">
            <i class="bi bi-speedometer2"></i>
            <span v-show="!appStore.sidebarCollapsed">Dashboard</span>
          </RouterLink>

          <RouterLink to="/dashboard/profile" class="menu-item" active-class="active">
            <i class="bi bi-person-circle"></i>
            <span v-show="!appStore.sidebarCollapsed">Mi Perfil</span>
          </RouterLink>
        </div>

        <!-- Menú para Pacientes -->
        <div class="menu-section" v-if="authStore.hasRole('patient')">
          <div class="menu-title" v-show="!appStore.sidebarCollapsed">Paciente</div>

          <RouterLink to="/dashboard/appointments" class="menu-item" active-class="active">
            <i class="bi bi-calendar-event"></i>
            <span v-show="!appStore.sidebarCollapsed">Mis Citas</span>
          </RouterLink>

          <RouterLink to="/dashboard/appointments/new" class="menu-item" active-class="active">
            <i class="bi bi-calendar-plus"></i>
            <span v-show="!appStore.sidebarCollapsed">Nueva Cita</span>
          </RouterLink>

          <RouterLink to="/dashboard/medical-records" class="menu-item" active-class="active">
            <i class="bi bi-file-medical"></i>
            <span v-show="!appStore.sidebarCollapsed">Historial Médico</span>
          </RouterLink>

          <RouterLink to="/dashboard/billing" class="menu-item" active-class="active">
            <i class="bi bi-receipt"></i>
            <span v-show="!appStore.sidebarCollapsed">Facturación</span>
          </RouterLink>
        </div>

        <!-- Menú para Doctores -->
        <div class="menu-section" v-if="authStore.hasRole('doctor')">
          <div class="menu-title" v-show="!appStore.sidebarCollapsed">Doctor</div>

          <RouterLink to="/dashboard/appointments" class="menu-item" active-class="active">
            <i class="bi bi-calendar-event"></i>
            <span v-show="!appStore.sidebarCollapsed">Citas</span>
          </RouterLink>

          <RouterLink to="/dashboard/patients" class="menu-item" active-class="active">
            <i class="bi bi-people"></i>
            <span v-show="!appStore.sidebarCollapsed">Pacientes</span>
          </RouterLink>

          <RouterLink to="/dashboard/schedule" class="menu-item" active-class="active">
            <i class="bi bi-calendar3"></i>
            <span v-show="!appStore.sidebarCollapsed">Horario</span>
          </RouterLink>

          <RouterLink to="/dashboard/medical-records" class="menu-item" active-class="active">
            <i class="bi bi-file-medical"></i>
            <span v-show="!appStore.sidebarCollapsed">Registros</span>
          </RouterLink>
        </div>

        <!-- Menú para Admin -->
        <div class="menu-section" v-if="authStore.hasRole('admin')">
          <div class="menu-title" v-show="!appStore.sidebarCollapsed">Administración</div>

          <RouterLink to="/dashboard/admin/users" class="menu-item" active-class="active">
            <i class="bi bi-person-gear"></i>
            <span v-show="!appStore.sidebarCollapsed">Usuarios</span>
          </RouterLink>

          <RouterLink to="/dashboard/admin/clinics" class="menu-item" active-class="active">
            <i class="bi bi-building"></i>
            <span v-show="!appStore.sidebarCollapsed">Clínicas</span>
          </RouterLink>

          <RouterLink to="/dashboard/admin/reports" class="menu-item" active-class="active">
            <i class="bi bi-graph-up"></i>
            <span v-show="!appStore.sidebarCollapsed">Reportes</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="main-content" :class="{ expanded: appStore.sidebarCollapsed }">
      <!-- Top Navigation -->
      <header class="top-nav">
        <div class="nav-left">
          <button class="btn btn-link sidebar-toggle" @click="appStore.toggleSidebar">
            <i class="bi bi-list"></i>
          </button>
        </div>

        <div class="nav-right">
          <!-- Notifications -->
          <NotificationBell />

          <!-- User Menu -->
          <div class="nav-item dropdown">
            <button class="btn btn-link nav-button dropdown-toggle" data-bs-toggle="dropdown">
              <div class="user-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <span class="user-name">{{ authStore.userFullName }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <RouterLink to="/dashboard/profile" class="dropdown-item">
                  <i class="bi bi-person"></i>
                  Mi Perfil
                </RouterLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item" @click="logout">
                  <i class="bi bi-box-arrow-right"></i>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import NotificationBell from '@/components/notifications/NotificationBell.vue'

const authStore = useAuthStore()
const appStore = useAppStore()
const router = useRouter()

const logout = async () => {
  const confirm = await appStore.showConfirm(
    '¿Cerrar sesión?',
    '¿Estás seguro de que quieres cerrar tu sesión?',
    'Sí, cerrar sesión',
  )

  if (confirm) {
    authStore.logout()
    router.push('/auth/login')
  }
}
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
  color: white;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  overflow-y: auto;

  &.collapsed {
    width: 70px;
  }
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;

  i {
    color: #ff6b6b;
    font-size: 2rem;
  }
}

.sidebar-menu {
  padding: 1rem 0;
}

.menu-section {
  margin-bottom: 2rem;
}

.menu-title {
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
    border-right: 3px solid #ff6b6b;
  }

  i {
    font-size: 1.25rem;
    width: 20px;
    text-align: center;
  }
}

.main-content {
  flex: 1;
  margin-left: 280px;
  transition: all 0.3s ease;

  &.expanded {
    margin-left: 70px;
  }
}

.top-nav {
  background: white;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: 1px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-toggle {
  border: none;
  background: none;
  font-size: 1.5rem;
  color: #6c757d;

  &:hover {
    color: #495057;
  }
}

.nav-button {
  border: none;
  background: none;
  color: #6c757d;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #495057;
  }
}

.user-avatar {
  font-size: 1.5rem;
}

.page-content {
  padding: 1.5rem;
  min-height: calc(100vh - 70px);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);

    &.show {
      transform: translateX(0);
    }
  }

  .main-content {
    margin-left: 0;
  }
}
</style>
