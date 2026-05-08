<template>
  <div class="settings-view">
    <div class="settings-header">
      <h1>Ajustes</h1>
    </div>

    <div class="settings-content">
      <!-- User Section -->
      <section class="settings-section">
        <div class="section-header">
          <MaterialIcon name="person" :size="22" />
          <h2>Cuenta</h2>
        </div>
        <div class="user-info-card">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" 
            alt="Usuario" 
            class="user-avatar"
          />
          <div class="user-details">
            <div class="user-name">{{ currentUser?.displayName || 'Usuario' }}</div>
            <div class="user-email">{{ currentUser?.email || '' }}</div>
            <div class="user-role-badge" :class="currentUser?.role">
              {{ formatRole(currentUser?.role) }}
            </div>
          </div>
        </div>
      </section>

      <!-- Account Actions -->
      <section class="settings-section">
        <div class="section-header">
          <MaterialIcon name="tune" :size="22" />
          <h2>Preferencias</h2>
        </div>
        <div class="settings-list">
          <router-link to="/account" class="settings-item">
            <div class="item-icon">
              <MaterialIcon name="account_circle" :size="22" />
            </div>
            <div class="item-content">
              <div class="item-title">Mi Perfil</div>
              <div class="item-description">Ver y editar tu información</div>
            </div>
            <MaterialIcon class="chevron" name="chevron_right" :size="22" />
          </router-link>
        </div>
      </section>

      <!-- Logout Section -->
      <section class="settings-section danger-section">
        <div class="section-header">
          <MaterialIcon name="logout" :size="22" />
          <h2>Sesión</h2>
        </div>
        <div class="settings-list">
          <button @click="handleLogout" class="settings-item logout-btn">
            <div class="item-icon danger">
              <MaterialIcon name="logout" :size="22" />
            </div>
            <div class="item-content">
              <div class="item-title danger">Cerrar Sesión</div>
              <div class="item-description">Salir de tu cuenta</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import type { UserRole } from '@/types'

const authStore = useAuthStore()
const router = useRouter()

const currentUser = computed(() => authStore.currentUser)

async function handleLogout() {
  try {
    await authStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

function formatRole(role: UserRole | undefined): string {
  const roleMap: Record<UserRole, string> = {
    user: 'Usuario',
    staff: 'Staff',
    admin: 'Admin',
    superadmin: 'Superadmin'
  }
  return role ? roleMap[role] : 'Usuario'
}
</script>

<style scoped lang="scss">
.settings-view {
  min-height: 100vh;
  background: #faf8f5;
  padding-bottom: 2rem;
}

.settings-header {
  background: white;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #f0ebe6;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
    
    h1 {
      font-size: 2rem;
    }
  }
}

.settings-content {
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
}

.settings-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0ebe6;
  
  .material-icon {
    color: #c67b5c;
  }
  
  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0;
  }
}

.user-info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #faf8f5;
  border-radius: 12px;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a4238;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.875rem;
  color: #7c6a5b;
  margin-bottom: 0.5rem;
}

.user-role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  background: #e0d8cc;
  color: #4a4238;
  
  &.staff {
    background: #d4e4f7;
    color: #2563eb;
  }
  
  &.admin {
    background: #fce7f3;
    color: #be185d;
  }
  
  &.superadmin {
    background: linear-gradient(135deg, #c67b5c 0%, #b56a4d 100%);
    color: white;
  }
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: #faf8f5;
  border: 1px solid #f0ebe6;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: #f0ebe6;
    transform: translateX(2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.logout-btn {
  border: none;
  width: 100%;
  font-family: inherit;
  
  &:hover {
    background: #fef2f2;
    border-color: #fee2e2;
  }
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  color: #c67b5c;
  flex-shrink: 0;
  
  &.danger {
    background: #fef2f2;
    color: #dc2626;
  }
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  color: #4a4238;
  margin-bottom: 0.125rem;
  
  &.danger {
    color: #dc2626;
  }
}

.item-description {
  font-size: 0.8125rem;
  color: #7c6a5b;
}

.chevron {
  color: #b8a99a;
  flex-shrink: 0;
}

.danger-section {
  .section-header .material-icon {
    color: #dc2626;
  }
}
</style>
