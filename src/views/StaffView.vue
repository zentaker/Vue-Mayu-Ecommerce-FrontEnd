<template>
  <div class="staff-view">
    <div class="staff-header">
      <h1>Panel de Staff</h1>
      <div class="header-actions">
        <span class="user-welcome">Bienvenido, {{ authStore.currentUser?.email }}</span>
        <button @click="handleLogout" class="logout-btn">
          Cerrar Sesión
        </button>
      </div>
    </div>

    <div class="staff-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'users' }"
        @click="activeTab = 'users'"
      >
        Usuarios
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'permissions' }"
        @click="activeTab = 'permissions'"
      >
        Permisos
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'content' }"
        @click="activeTab = 'content'"
      >
        Moderación
      </button>
    </div>

    <div class="staff-content">
      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="tab-content">
        <div class="content-header">
          <h2>Gestión de Usuarios</h2>
          <button @click="showUserModal = true" class="create-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nuevo Usuario
          </button>
        </div>

        <div class="users-table">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>admin@google.com</td>
                <td>Superadmin</td>
                <td><span class="role-badge superadmin">Superadmin</span></td>
                <td><span class="status active">Activo</span></td>
                <td>17 Nov 2025</td>
                <td>
                  <div class="action-buttons">
                    <button class="view-btn">Ver</button>
                    <button class="edit-btn">Editar</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>maria@example.com</td>
                <td>María García</td>
                <td><span class="role-badge user">User</span></td>
                <td><span class="status active">Activo</span></td>
                <td>15 Nov 2025</td>
                <td>
                  <div class="action-buttons">
                    <button class="view-btn">Ver</button>
                    <button class="edit-btn">Editar</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>ana@example.com</td>
                <td>Ana Martínez</td>
                <td><span class="role-badge staff">Staff</span></td>
                <td><span class="status active">Activo</span></td>
                <td>12 Nov 2025</td>
                <td>
                  <div class="action-buttons">
                    <button class="view-btn">Ver</button>
                    <button class="edit-btn">Editar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Permissions Tab -->
      <div v-if="activeTab === 'permissions'" class="tab-content">
        <div class="content-header">
          <h2>Gestión de Permisos</h2>
        </div>
        
        <div class="permissions-grid">
          <div class="permission-card">
            <div class="permission-header">
              <h3>Usuario Básico (User)</h3>
              <span class="permission-count">4 permisos</span>
            </div>
            <div class="permission-list">
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Ver Home</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Ver Catálogo</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Ver Rewards</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Ver Perfil</span>
              </div>
            </div>
          </div>

          <div class="permission-card">
            <div class="permission-header">
              <h3>Staff</h3>
              <span class="permission-count">6 permisos</span>
            </div>
            <div class="permission-list">
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Todos los permisos de User</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Gestionar usuarios</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Moderar contenido</span>
              </div>
            </div>
          </div>

          <div class="permission-card">
            <div class="permission-header">
              <h3>Admin</h3>
              <span class="permission-count">8 permisos</span>
            </div>
            <div class="permission-list">
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Todos los permisos de User</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Gestionar productos</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Gestionar inventario</span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Configurar sistema</span>
              </div>
            </div>
          </div>

          <div class="permission-card highlighted">
            <div class="permission-header">
              <h3>Superadmin</h3>
              <span class="permission-count">Acceso Total</span>
            </div>
            <div class="permission-list">
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c67b5c" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span><strong>Acceso completo a todas las funciones</strong></span>
              </div>
              <div class="permission-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c67b5c" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Staff + Admin + User</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Moderation Tab -->
      <div v-if="activeTab === 'content'" class="tab-content">
        <div class="content-header">
          <h2>Moderación de Contenido</h2>
        </div>
        
        <div class="moderation-grid">
          <div class="moderation-card pending">
            <div class="mod-header">
              <span class="mod-status">Pendiente Revisión</span>
              <span class="mod-date">Hace 2 horas</span>
            </div>
            <div class="mod-content">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400" alt="Outfit" class="mod-image" />
              <div class="mod-info">
                <h4>Conjunto Urbano Moderno</h4>
                <p><strong>Usuario:</strong> Carmen Ruiz</p>
                <p><strong>Reportes:</strong> 2</p>
                <p><strong>Motivo:</strong> Revisión de calidad</p>
              </div>
            </div>
            <div class="mod-actions">
              <button class="btn-approve">Aprobar</button>
              <button class="btn-reject">Rechazar</button>
              <button class="btn-details">Ver Detalles</button>
            </div>
          </div>

          <div class="moderation-card pending">
            <div class="mod-header">
              <span class="mod-status">Pendiente Revisión</span>
              <span class="mod-date">Hace 5 horas</span>
            </div>
            <div class="mod-content">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" alt="Outfit" class="mod-image" />
              <div class="mod-info">
                <h4>Look Casual Primavera</h4>
                <p><strong>Usuario:</strong> Isabel Torres</p>
                <p><strong>Reportes:</strong> 1</p>
                <p><strong>Motivo:</strong> Contenido inapropiado</p>
              </div>
            </div>
            <div class="mod-actions">
              <button class="btn-approve">Aprobar</button>
              <button class="btn-reject">Rechazar</button>
              <button class="btn-details">Ver Detalles</button>
            </div>
          </div>

          <div class="empty-state">
            <p>Más contenido para moderar se cargará desde Firebase</p>
          </div>
        </div>
      </div>
    </div>

    <!-- User Modal (Placeholder) -->
    <Transition name="modal">
      <div v-if="showUserModal" class="modal-overlay" @click="showUserModal = false">
        <div class="modal-content" @click.stop>
          <h2>Crear Nuevo Usuario</h2>
          <p>Formulario de creación de usuarios (próximamente)</p>
          <button @click="showUserModal = false" class="close-modal-btn">Cerrar</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref<'users' | 'permissions' | 'content'>('users')
const showUserModal = ref(false)

async function handleLogout() {
  await authStore.signOut()
  router.push('/')
}
</script>

<style scoped lang="scss">
.staff-view {
  min-height: calc(100vh - 60px);
  background: #faf8f5;
  padding: 2rem;
}

.staff-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e0d8cc;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-welcome {
  font-size: 0.9375rem;
  color: #7c6a5b;
}

.logout-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #b56a4d;
  }
}

.staff-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e0d8cc;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #7c6a5b;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #4a4238;
  }

  &.active {
    color: #c67b5c;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #c67b5c;
    }
  }
}

.staff-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.create-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #b56a4d;
    transform: translateY(-2px);
  }
}

.users-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      padding: 0.75rem;
      background: #f0ebe6;
      color: #4a4238;
      font-weight: 600;
      font-size: 0.875rem;
    }

    td {
      padding: 0.75rem;
      border-bottom: 1px solid #e0d8cc;
      font-size: 0.9375rem;
      color: #4a4238;
    }
  }
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  &.user {
    background: #e8f4fd;
    color: #0066cc;
  }

  &.staff {
    background: #fff3cd;
    color: #856404;
  }

  &.admin {
    background: #f8d7da;
    color: #721c24;
  }

  &.superadmin {
    background: #c67b5c;
    color: white;
  }
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 600;

  &.active {
    background: #d4edda;
    color: #155724;
  }
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.view-btn, .edit-btn {
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn {
  background: #e8f4fd;
  color: #0066cc;

  &:hover {
    background: #d0e9f9;
  }
}

.edit-btn {
  background: #f0ebe6;
  color: #4a4238;

  &:hover {
    background: #e0d8cc;
  }
}

.permissions-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.permission-card {
  background: #faf8f5;
  border: 2px solid #e0d8cc;
  border-radius: 12px;
  padding: 1.5rem;

  &.highlighted {
    border-color: #c67b5c;
    background: #fff5f0;
  }
}

.permission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0d8cc;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.permission-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: #7c6a5b;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.permission-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: #4a4238;
}

.moderation-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

.moderation-card {
  background: #faf8f5;
  border: 2px solid #e0d8cc;
  border-radius: 12px;
  overflow: hidden;

  &.pending {
    border-color: #ffc107;
  }
}

.mod-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e0d8cc;
}

.mod-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: #fff3cd;
  color: #856404;
}

.mod-date {
  font-size: 0.8125rem;
  color: #7c6a5b;
}

.mod-content {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
}

.mod-image {
  width: 100px;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.mod-info {
  flex: 1;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #7c6a5b;
    margin: 0.25rem 0;
  }
}

.mod-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;

  button {
    flex: 1;
    padding: 0.625rem;
    border: none;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
}

.btn-approve {
  background: #28a745;
  color: white;

  &:hover {
    background: #218838;
  }
}

.btn-reject {
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
}

.btn-details {
  background: #f0ebe6;
  color: #4a4238;

  &:hover {
    background: #e0d8cc;
  }
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #7c6a5b;
  font-size: 0.9375rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 1rem;
  }

  p {
    color: #7c6a5b;
    margin-bottom: 1.5rem;
  }
}

.close-modal-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #b56a4d;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .staff-view {
    padding: 1rem;
  }

  .staff-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .users-table {
    font-size: 0.875rem;
  }

  .permissions-grid, .moderation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
