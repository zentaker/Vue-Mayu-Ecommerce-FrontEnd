<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.imageUrl" :alt="product.name" loading="lazy" />
      <span v-if="!product.available" class="badge-unavailable">Agotado</span>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">€{{ product.price.toFixed(2) }}</p>
      <div class="product-meta">
        <span class="color-indicator" :style="{ background: getColorCode(product.color) }"></span>
        <span class="sizes">{{ product.size.join(', ') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()

function getColorCode(color: string): string {
  const colorMap: Record<string, string> = {
    terracota: '#c67b5c',
    beige: '#d4c5b9',
    cream: '#faf8f5',
    brown: '#7c6a5b',
    white: '#ffffff',
    blue: '#5b7c9e',
    multicolor: 'linear-gradient(45deg, #c67b5c, #7c6a5b, #5b7c9e)'
  }
  return colorMap[color] || '#cccccc'
}
</script>

<style scoped lang="scss">
.product-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.product-image {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f0ebe6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.badge-unavailable {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a4238;
  margin: 0 0 0.5rem;
  line-height: 1.3;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #c67b5c;
  margin: 0 0 0.75rem;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #f0ebe6;
}

.sizes {
  font-size: 0.85rem;
  color: #7c6a5b;
}
</style>
