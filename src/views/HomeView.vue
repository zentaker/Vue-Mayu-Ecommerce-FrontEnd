<template>
  <div class="home-view">
    <!-- Feed Content (tabs moved to header) -->
    <MasonryFeed :outfits="filteredOutfits" />
    <FloatingUpload />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'
import MasonryFeed from '@/components/MasonryFeed.vue'
import FloatingUpload from '@/components/FloatingUpload.vue'

const props = defineProps<{
  activeTab: string
}>()

const catalogStore = useCatalogStore()

// Lista de usuarios que "seguimos" (mock data)
const followingUsers = ['María García', 'Carmen Ruiz', 'Isabel Torres']

const filteredOutfits = computed(() => {
  const allOutfits = catalogStore.outfits
  
  // Filtrar según el tab activo
  switch (props.activeTab) {
    case 'following':
      // Mostrar solo outfits de usuarios que seguimos
      const followedOutfits = allOutfits.filter(outfit => 
        followingUsers.includes(outfit.userName)
      )
      return followedOutfits.length > 0 ? followedOutfits : allOutfits
      
    case 'nearby':
      // Mostrar outfits cercanos (mock: primeros 4)
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
</style>
