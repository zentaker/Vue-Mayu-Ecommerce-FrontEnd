<template>
  <div class="masonry-feed">
    <div v-for="outfit in outfits" :key="outfit.id" class="outfit-card">
      <div class="outfit-images">
        <img :src="outfit.image1" :alt="outfit.title" loading="lazy" />
        <img :src="outfit.image2" :alt="outfit.title" loading="lazy" />
      </div>
      <div class="outfit-title">
        <h3>{{ outfit.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Outfit } from '@/types'

defineProps<{
  outfits: Outfit[]
}>()
</script>

<style scoped lang="scss">
.masonry-feed {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 2rem;
  }
}

.outfit-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.outfit-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: #f0ebe6;
  
  img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
  }
}

.outfit-title {
  padding: 0.75rem 1rem;
  
  h3 {
    font-size: 0.95rem;
    font-weight: 500;
    color: #4a4238;
    margin: 0;
    line-height: 1.3;
  }
}
</style>
