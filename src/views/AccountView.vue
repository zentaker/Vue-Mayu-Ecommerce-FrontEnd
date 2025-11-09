<template>
  <div class="account-view">
    <div class="account-header">
      <h1>Mi Cuenta</h1>
    </div>
    
    <div class="account-content">
      <div class="profile-section section-card">
        <h2>Información Personal</h2>
        <div class="info-row">
          <label>Nombre</label>
          <p>{{ userStore.currentUser?.name }}</p>
        </div>
        <div class="info-row">
          <label>Email</label>
          <p>{{ userStore.currentUser?.email }}</p>
        </div>
        <div class="info-row">
          <label>Nivel VIP</label>
          <p class="vip-badge" :class="userStore.currentUser?.vipLevel">
            {{ formatVipLevel(userStore.currentUser?.vipLevel || 'bronze') }}
          </p>
        </div>
      </div>
      
      <div class="address-section section-card">
        <h2>Dirección de Envío</h2>
        <div class="info-row">
          <label>Dirección</label>
          <p>{{ userStore.currentUser?.address?.street }}</p>
        </div>
        <div class="info-row">
          <label>Ciudad</label>
          <p>{{ userStore.currentUser?.address?.city }}</p>
        </div>
        <div class="info-row">
          <label>Código Postal</label>
          <p>{{ userStore.currentUser?.address?.zipCode }}</p>
        </div>
        <div class="info-row">
          <label>País</label>
          <p>{{ userStore.currentUser?.address?.country }}</p>
        </div>
      </div>
      
      <div class="preferences-section section-card">
        <h2>Preferencias</h2>
        <div class="preference-row">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="notifications"
              @change="updateNotifications"
            />
            <span>Recibir notificaciones</span>
          </label>
        </div>
        <div class="preference-row">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="newsletter"
              @change="updateNewsletter"
            />
            <span>Suscribirse al newsletter</span>
          </label>
        </div>
      </div>
      
      <div class="actions-section section-card">
        <h2>Acciones</h2>
        <button class="action-btn secondary">Cambiar contraseña</button>
        <button class="action-btn secondary">Configuración de privacidad</button>
        <button class="action-btn danger" @click="handleLogout">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const notifications = ref(userStore.currentUser?.preferences.notifications || false)
const newsletter = ref(userStore.currentUser?.preferences.newsletter || false)

watch(() => userStore.currentUser?.preferences, (prefs) => {
  if (prefs) {
    notifications.value = prefs.notifications
    newsletter.value = prefs.newsletter
  }
}, { deep: true })

function updateNotifications() {
  userStore.updatePreferences({ notifications: notifications.value })
}

function updateNewsletter() {
  userStore.updatePreferences({ newsletter: newsletter.value })
}

function handleLogout() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    userStore.logout()
    router.push('/')
  }
}

function formatVipLevel(level: string): string {
  const map: Record<string, string> = {
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro',
    platinum: 'Platino'
  }
  return map[level] || level
}
</script>

<style scoped lang="scss">
.account-view {
  min-height: 100vh;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.account-header {
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.account-content {
  max-width: 800px;
  margin: 0 auto;
}

.section-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f0ebe6;
  }
}

.info-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #7c6a5b;
  }
  
  p {
    font-size: 0.95rem;
    color: #4a4238;
    margin: 0;
    text-align: right;
  }
}

.vip-badge {
  background: #fff5f0;
  color: #c67b5c;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-weight: 600;
  text-transform: capitalize;
  
  &.gold {
    background: #fef9e7;
    color: #d4a574;
  }
}

.preference-row {
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4a4238;
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.actions-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.secondary {
    background: #faf8f5;
    color: #4a4238;
    border: 1px solid #e0d8cc;
    
    &:hover {
      background: #f0ebe6;
    }
  }
  
  &.danger {
    background: #e74c3c;
    color: #ffffff;
    
    &:hover {
      background: #c0392b;
    }
  }
}
</style>
