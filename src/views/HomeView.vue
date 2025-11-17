<template>
  <div class="home-view">
    <!-- Feed Tabs -->
    <div class="feed-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
        <span v-if="tab.id === 'following' && tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Feed Content -->
    <MasonryFeed :outfits="filteredOutfits" />
    <FloatingUpload />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'
import MasonryFeed from '@/components/MasonryFeed.vue'
import FloatingUpload from '@/components/FloatingUpload.vue'

const catalogStore = useCatalogStore()
const activeTab = ref('discover')

const tabs = ref([
  { id: 'following', label: 'Seguir', badge: 8 },
  { id: 'discover', label: 'Descubrir', badge: null },
  { id: 'nearby', label: 'Cerca', badge: null }
])

// Lista de usuarios que "seguimos" (mock data)
const followingUsers = ['María García', 'Carmen Ruiz', 'Isabel Torres']

const filteredOutfits = computed(() => {
  const allOutfits = catalogStore.outfits
  
  // Filtrar según el tab activo
  switch (activeTab.value) {
    case 'following':
      // Mostrar solo outfits de usuarios que seguimos
      const followedOutfits = allOutfits.filter(outfit => 
        followingUsers.includes(outfit.userName)
      )
      return followedOutfits.length > 0 ? followedOutfits : allOutfits
      
    case 'nearby':
      // Mostrar outfits cercanos (mock: shuffle para simular variedad)
      const nearbyOutfits = allOutfits.slice(0, 4)
      return nearbyOutfits.length > 0 ? nearbyOutfits : allOutfits
      
    case 'discover':
    default:
      // Mostrar todos los outfits
      return allOutfits
  }
})
</script>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
  background: #faf8f5;
}

.feed-tabs {
  position: sticky;
  top: 65px;
  z-index: 90;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #f0ebe6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.tab-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #7c6a5b;
  cursor: pointer;
  padding: 0.5rem 0.25rem;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  
  @media (min-width: 768px) {
    font-size: 1.0625rem;
  }
  
  &:hover {
    color: #4a4238;
  }
  
  &.active {
    color: #4a4238;
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.75rem;
      left: 0;
      right: 0;
      height: 2px;
      background: #4a4238;
    }
  }
}

.tab-badge {
  background: #c67b5c;
  color: white;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}
</style>
