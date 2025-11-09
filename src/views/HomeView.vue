<template>
  <div class="home-view">
    <div class="hero-section">
      <h1>Descubre tu Estilo</h1>
      <p>Colecciones pensadas para ti</p>
    </div>
    <MasonryFeed :outfits="catalogStore.outfits" />
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalogStore'
import MasonryFeed from '@/components/MasonryFeed.vue'

const catalogStore = useCatalogStore()
</script>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #faf8f5 0%, #f0ebe6 100%);
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 0.5rem;
    
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #7c6a5b;
    margin: 0;
  }
}
</style>
