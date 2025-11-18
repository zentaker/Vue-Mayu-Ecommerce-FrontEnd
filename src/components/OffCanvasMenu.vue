<template>
  <div>
    <div class="overlay" :class="{ active: isOpen }" @click="close"></div>
    <aside class="off-canvas-menu" :class="{ open: isOpen }">
      <!-- Header con branding MAYU -->
      <div class="menu-header">
        <h2>MAYU</h2>
        <button class="close-btn" @click="close" aria-label="Cerrar menú">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Secciones principales -->
      <nav class="menu-nav">
        <router-link to="/" @click="close" class="nav-item">
          <div class="icon-wrapper">
            <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Inicio</span>
        </router-link>

        <router-link to="/catalog" @click="close" class="nav-item">
          <div class="icon-wrapper">
            <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 7L12 12L3 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Catálogo</span>
        </router-link>

        <router-link to="/rewards" @click="close" class="nav-item">
          <div class="icon-wrapper">
            <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Rewards</span>
        </router-link>

        <!-- Staff Section - Only visible for Staff or Superadmin -->
        <router-link v-if="isStaff" to="/staff" @click="close" class="nav-item special">
          <div class="icon-wrapper">
            <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Staff</span>
        </router-link>

        <!-- Admin Section - Only visible for Admin or Superadmin -->
        <router-link v-if="isAdmin" to="/admin" @click="close" class="nav-item special">
          <div class="icon-wrapper">
            <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span>Admin</span>
        </router-link>
      </nav>

      <!-- Tarjeta de usuario en la parte inferior -->
      <div class="user-card" @click="goToProfile">
        <img 
          src="https://i.pravatar.cc/150?img=1" 
          alt="Usuario" 
          class="user-avatar"
        />
        <div class="user-info">
          <div class="user-name">María García</div>
          <div class="user-role">VIP Gold</div>
        </div>
        <button class="settings-btn" @click.stop="goToSettings" aria-label="Configuración">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const authStore = useAuthStore()
const { isStaff, isAdmin } = storeToRefs(authStore)

function close() {
  emit('close')
}

function goToProfile() {
  close()
  router.push('/account')
}

function goToSettings() {
  close()
  router.push('/settings')
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 200;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.off-canvas-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background: #ffffff;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 201;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
  border-radius: 0 16px 16px 0;
  
  &.open {
    transform: translateX(0);
  }
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid #f0ebe6;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
    letter-spacing: 0.5px;
  }
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #7c6a5b;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #faf8f5;
    color: #4a4238;
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.menu-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  color: #7c6a5b;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 12px;
  margin-bottom: 0.375rem;
  
  &:hover {
    background: #faf8f5;
    color: #4a4238;
    
    .icon-wrapper {
      background: #fff5f0;
      
      .nav-icon {
        color: #c67b5c;
      }
    }
  }
  
  &.router-link-active {
    background: #fff5f0;
    color: #c67b5c;
    font-weight: 600;
    
    .icon-wrapper {
      background: #c67b5c;
      
      .nav-icon {
        color: #ffffff;
      }
    }
  }
  
  // Special styling for Staff and Admin sections
  &.special {
    margin-top: 0.75rem;
    border-top: 1px solid #e0d8cc;
    padding-top: 1.25rem;
    
    .icon-wrapper {
      background: linear-gradient(135deg, #c67b5c 0%, #b56a4d 100%);
      
      .nav-icon {
        color: #ffffff;
      }
    }
    
    &:hover {
      background: linear-gradient(135deg, #fff5f0 0%, #ffe8df 100%);
      
      .icon-wrapper {
        background: linear-gradient(135deg, #b56a4d 0%, #a55839 100%);
      }
    }
    
    &.router-link-active {
      background: linear-gradient(135deg, #fff5f0 0%, #ffe8df 100%);
      
      .icon-wrapper {
        background: linear-gradient(135deg, #b56a4d 0%, #a55839 100%);
      }
    }
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f0ebe6;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-icon {
  color: #7c6a5b;
  transition: color 0.2s ease;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  margin: 1rem;
  background: #faf8f5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #f0ebe6;
  
  &:hover {
    background: #f0ebe6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  margin-bottom: 0.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #c67b5c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #7c6a5b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: #ffffff;
    color: #c67b5c;
  }
  
  &:active {
    transform: scale(0.9);
  }
}
</style>
