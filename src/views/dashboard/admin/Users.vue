<template>
  <div class="admin-users-page">
    <div class="page-header mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h2>Gestión de Usuarios</h2>
          <p class="text-muted mb-0">Administra los usuarios del sistema</p>
        </div>
        <button class="btn btn-primary" @click="openCreateModal">
          <i class="bi bi-plus-lg me-2"></i>
          Nuevo Usuario
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Buscar</label>
            <input
              v-model="filters.search"
              type="text"
              class="form-control"
              placeholder="Nombre, email..."
              @input="loadUsers"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Rol</label>
            <select v-model="filters.role" class="form-select" @change="loadUsers">
              <option value="">Todos</option>
              <option value="admin">Administrador</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Paciente</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Estado</label>
            <select v-model="filters.isActive" class="form-select" @change="loadUsers">
              <option value="">Todos</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="bi bi-arrow-counterclockwise me-2"></i>
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="card">
      <div class="card-body">
        <LoadingSpinner v-if="loading" />

        <div v-else-if="users.length === 0" class="text-center py-5">
          <i class="bi bi-people text-muted" style="font-size: 4rem"></i>
          <p class="text-muted mt-3">No se encontraron usuarios</p>
        </div>

        <div v-else>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="avatar me-2">
                        <i class="bi bi-person-circle"></i>
                      </div>
                      <div>
                        <div class="fw-semibold">{{ user.firstName }} {{ user.lastName }}</div>
                        <small class="text-muted">{{ user.id }}</small>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span class="badge" :class="getRoleBadgeClass(user.role)">
                      {{ getRoleLabel(user.role) }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="user.isActive ? 'bg-success' : 'bg-secondary'"
                    >
                      {{ user.isActive ? 'Activo' : 'Inactivo' }}
                    </span>
                  </td>
                  <td>{{ user.createdAt ? formatDate(user.createdAt) : '-' }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        @click="openEditModal(user)"
                        title="Editar"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click="deleteUser(user)"
                        title="Eliminar"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Paginación -->
          <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                    Anterior
                  </a>
                </li>
                <li
                  v-for="page in visiblePages"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                    Siguiente
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Create/Edit -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditMode ? 'Editar Usuario' : 'Nuevo Usuario' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveUser">
              <div class="mb-3">
                <label class="form-label">Nombre *</label>
                <input
                  v-model="formData.firstName"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Apellido *</label>
                <input
                  v-model="formData.lastName"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  required
                  :disabled="isEditMode"
                />
              </div>
              <div v-if="!isEditMode" class="mb-3">
                <label class="form-label">Contraseña *</label>
                <input
                  v-model="formData.password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Rol *</label>
                <select v-model="formData.role" class="form-select" required>
                  <option value="">Seleccione...</option>
                  <option value="admin">Administrador</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Paciente</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input
                  v-model="formData.phone"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  v-model="formData.isActive"
                  type="checkbox"
                  class="form-check-input"
                  id="activeCheck"
                />
                <label class="form-check-label" for="activeCheck">Usuario activo</label>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="closeModal">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEditMode ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { userAPI } from '@/services/userAPI'
import { useAppStore } from '@/stores/app'
import type { User } from '@/types/user.types'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { format } from 'date-fns'

const appStore = useAppStore()

const users = ref<User[]>([])
const loading = ref(false)
const saving = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 15

const filters = ref({
  search: '',
  role: '',
  isActive: '',
})

const showModal = ref(false)
const isEditMode = ref(false)
const editingUserId = ref<string | null>(null)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
  phone: '',
  isActive: true,
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

onMounted(() => {
  loadUsers()
})

const loadUsers = async () => {
  try {
    loading.value = true
    const params: any = {
      page: currentPage.value,
      limit,
    }
    if (filters.value.search) params.search = filters.value.search
    if (filters.value.role) params.role = filters.value.role
    if (filters.value.isActive) params.isActive = filters.value.isActive === 'true'

    const { data } = await userAPI.listUsers(params)
    users.value = data.users || []
    totalPages.value = data.pagination?.totalPages || 1
  } catch (error) {
    console.error('Error loading users:', error)
    appStore.showToast('Error', 'No se pudieron cargar los usuarios', 'error')
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadUsers()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    role: '',
    isActive: '',
  }
  currentPage.value = 1
  loadUsers()
}

const openCreateModal = () => {
  isEditMode.value = false
  editingUserId.value = null
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    isActive: true,
  }
  showModal.value = true
}

const openEditModal = (user: User) => {
  isEditMode.value = true
  editingUserId.value = user.id
  formData.value = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
    role: user.role,
    phone: user.profile?.phone || '',
    isActive: user.isActive ?? true,
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingUserId.value = null
}

const saveUser = async () => {
  try {
    saving.value = true

    if (isEditMode.value && editingUserId.value) {
      // Actualizar usuario
      await userAPI.updateUser(editingUserId.value, {
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        role: formData.value.role,
        isActive: formData.value.isActive,
      })
      appStore.showToast('Éxito', 'Usuario actualizado correctamente', 'success')
    } else {
      // Crear usuario
      await userAPI.createUser({
        email: formData.value.email,
        password: formData.value.password,
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        role: formData.value.role,
      })
      appStore.showToast('Éxito', 'Usuario creado correctamente', 'success')
    }

    closeModal()
    loadUsers()
  } catch (error: any) {
    console.error('Error saving user:', error)
    appStore.showToast(
      'Error',
      error.response?.data?.message || 'No se pudo guardar el usuario',
      'error',
    )
  } finally {
    saving.value = false
  }
}

const deleteUser = async (user: User) => {
  const confirmed = await appStore.showConfirm(
    '¿Eliminar usuario?',
    `¿Estás seguro de que quieres eliminar a ${user.firstName} ${user.lastName}?`,
    'Sí, eliminar',
  )

  if (confirmed) {
    try {
      await userAPI.deleteUser(user.id)
      appStore.showToast('Éxito', 'Usuario eliminado correctamente', 'success')
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      appStore.showToast('Error', 'No se pudo eliminar el usuario', 'error')
    }
  }
}

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-danger'
    case 'doctor':
      return 'bg-primary'
    case 'patient':
      return 'bg-info'
    default:
      return 'bg-secondary'
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador'
    case 'doctor':
      return 'Doctor'
    case 'patient':
      return 'Paciente'
    default:
      return role
  }
}

const formatDate = (date: string) => {
  try {
    return format(new Date(date), 'dd/MM/yyyy')
  } catch {
    return '-'
  }
}
</script>

<style scoped lang="scss">
.admin-users-page {
  .avatar {
    font-size: 2rem;
    color: #6c757d;
  }

  .modal.show {
    display: block;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
