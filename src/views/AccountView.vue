<template>
  <div class="profile-view">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="avatar-container">
        <img 
          :src="userAvatar" 
          :alt="userStore.currentUser?.name || 'Usuario'"
          class="avatar"
        />
      </div>
      
      <div class="profile-stats">
        <div class="stat">
          <span class="stat-value">{{ userOutfits.length }}</span>
          <span class="stat-label">posts</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ followersCount }}</span>
          <span class="stat-label">followers</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ followingCount }}</span>
          <span class="stat-label">following</span>
        </div>
      </div>
    </div>

    <!-- Profile Info -->
    <div class="profile-info">
      <h1 class="profile-name">{{ userStore.currentUser?.name || 'Usuario' }}</h1>
      <p class="profile-bio">{{ userBio }}</p>
      <div class="vip-badge" :class="userStore.currentUser?.vipLevel">
        {{ formatVipLevel(userStore.currentUser?.vipLevel || 'bronze') }}
      </div>
    </div>

    <!-- Tabs (optional for future) -->
    <div class="profile-tabs">
      <div class="tab active">
        <MaterialIcon name="grid_view" :size="24" />
      </div>
    </div>

    <!-- Photo Grid -->
    <div class="photo-grid">
      <div 
        v-for="outfit in userOutfits" 
        :key="outfit.id" 
        class="photo-item"
        @click="handleViewPost(outfit.id)"
      >
        <img :src="outfit.imageUrl" :alt="outfit.title" />
        <div class="photo-overlay">
          <div class="overlay-stats">
            <span>
              <MaterialIcon name="favorite" :size="18" :fill="true" />
              {{ outfit.likes }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-if="userOutfits.length === 0" class="empty-grid">
        <MaterialIcon name="image" :size="64" />
        <h3>No hay publicaciones aún</h3>
        <p>Cuando publiques fotos, aparecerán aquí.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useCatalogStore } from '@/stores/catalogStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const catalogStore = useCatalogStore()
const router = useRouter()

const followersCount = ref(1247)
const followingCount = ref(389)

const userAvatar = computed(() => {
  return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
})

const userBio = computed(() => {
  return '✨ Fashion lover | Apasionada de la moda sostenible\n📍 Madrid, España\n💌 Siempre buscando el outfit perfecto'
})

const userOutfits = computed(() => {
  const currentUserName = userStore.currentUser?.name
  if (!currentUserName) return []
  
  return catalogStore.outfits.filter(outfit => 
    outfit.userName.toLowerCase().includes(currentUserName.toLowerCase())
  )
})

function handleViewPost(id: string) {
  router.push(`/post/${id}`)
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
.profile-view {
  min-height: 100vh;
  background: #faf8f5;
  padding-bottom: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1rem 1rem;
  background: white;
  
  @media (min-width: 768px) {
    padding: 2rem;
    gap: 3rem;
  }
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0d8cc;
  
  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
}

.profile-stats {
  display: flex;
  gap: 1.5rem;
  flex: 1;
  
  @media (min-width: 768px) {
    gap: 3rem;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #4a4238;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.stat-label {
  font-size: 0.8125rem;
  color: #7c6a5b;
  margin-top: 0.125rem;
  
  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
}

.profile-info {
  padding: 1rem 1rem 0.75rem;
  background: white;
  border-bottom: 1px solid #f0ebe6;
}

.profile-name {
  font-size: 1rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
}

.profile-bio {
  font-size: 0.875rem;
  color: #4a4238;
  line-height: 1.5;
  margin: 0 0 0.75rem;
  white-space: pre-line;
}

.vip-badge {
  display: inline-block;
  background: #fff5f0;
  color: #c67b5c;
  padding: 0.375rem 0.875rem;
  border-radius: 16px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: capitalize;
  
  &.gold {
    background: #fef9e7;
    color: #d4a574;
  }
  
  &.silver {
    background: #f5f5f5;
    color: #a8a8a8;
  }
  
  &.platinum {
    background: #e8f4f8;
    color: #6eb5d0;
  }
}

.profile-tabs {
  display: flex;
  justify-content: center;
  background: white;
  border-bottom: 1px solid #f0ebe6;
  padding: 0.5rem 0;
}

.tab {
  padding: 0.75rem;
  cursor: pointer;
  color: #b8a99a;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  
  &.active {
    color: #4a4238;
    border-bottom-color: #4a4238;
  }
  
  .material-icon {
    display: block;
  }
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: white;
  
  @media (min-width: 768px) {
    gap: 4px;
  }
}

.photo-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  background: #f0ebe6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    .photo-overlay {
      opacity: 1;
    }
  }
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.overlay-stats {
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .material-icon {
    flex-shrink: 0;
  }
}

.empty-grid {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  
  .material-icon {
    color: #e0d8cc;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.5rem;
  }
  
  p {
    font-size: 0.9375rem;
    color: #7c6a5b;
    margin: 0;
  }
}
</style>
