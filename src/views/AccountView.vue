<template>
  <div class="account-view">
    <div class="account-header">
      <h1>Perfil</h1>
    </div>
    
    <div class="account-content">
      <!-- Mi Feed Section -->
      <div class="my-feed-section section-card">
        <h2>Mi Feed</h2>
        <p class="feed-description">Gestiona tus publicaciones de outfits</p>
        <div v-if="userOutfits.length === 0" class="empty-feed">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <p>Aún no has publicado ningún outfit</p>
          <button class="action-btn primary" @click="handleCreatePost">Crear mi primera publicación</button>
        </div>
        <div v-else class="feed-grid">
          <div v-for="outfit in userOutfits" :key="outfit.id" class="outfit-card">
            <img :src="outfit.imageUrl" :alt="outfit.title" class="outfit-image" />
            <div class="outfit-info">
              <h4>{{ outfit.title }}</h4>
              <div class="outfit-stats">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  </svg>
                  {{ outfit.likes }}
                </span>
              </div>
            </div>
            <div class="outfit-actions">
              <button class="icon-action-btn" @click="handleEditPost(outfit.id)" aria-label="Editar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="icon-action-btn delete" @click="handleDeletePost(outfit.id)" aria-label="Eliminar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
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
import { ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useCatalogStore } from '@/stores/catalogStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const catalogStore = useCatalogStore()
const router = useRouter()

const notifications = ref(userStore.currentUser?.preferences.notifications || false)
const newsletter = ref(userStore.currentUser?.preferences.newsletter || false)

// Get user's outfits (filtered by current user)
const userOutfits = computed(() => {
  const currentUserEmail = userStore.currentUser?.email
  if (!currentUserEmail) return []
  
  // Filter outfits that belong to the current user
  // For now, we'll use a simple email match in userName
  // In a real app, you'd have a userId field
  return catalogStore.outfits.filter(outfit => 
    outfit.userName.toLowerCase().includes(userStore.currentUser?.name?.toLowerCase() || '')
  )
})

function handleCreatePost() {
  console.log('Create new post')
  // TODO: Implement create post functionality
  alert('Funcionalidad de crear publicación próximamente')
}

function handleEditPost(id: string) {
  console.log('Edit post:', id)
  // TODO: Implement edit post functionality
  alert('Funcionalidad de editar publicación próximamente')
}

function handleDeletePost(id: string) {
  if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
    console.log('Delete post:', id)
    // TODO: Implement delete post functionality
    alert('Funcionalidad de eliminar publicación próximamente')
  }
}

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
  
  &.primary {
    background: #c67b5c;
    color: #ffffff;
    
    &:hover {
      background: #b56a4d;
    }
  }
}

.feed-description {
  color: #7c6a5b;
  font-size: 0.9rem;
  margin: -0.75rem 0 1.25rem;
}

.empty-feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  
  svg {
    color: #e0d8cc;
    margin-bottom: 1rem;
  }
  
  p {
    color: #7c6a5b;
    font-size: 1rem;
    margin: 0 0 1.5rem;
  }
}

.feed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

.outfit-card {
  position: relative;
  background: #faf8f5;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.outfit-image {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
}

.outfit-info {
  padding: 0.75rem;
  
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.outfit-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8rem;
    color: #7c6a5b;
    
    svg {
      flex-shrink: 0;
    }
  }
}

.outfit-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.icon-action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #4a4238;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: white;
    transform: scale(1.05);
  }
  
  &.delete {
    color: #e74c3c;
    
    &:hover {
      background: #fee;
    }
  }
}
</style>
