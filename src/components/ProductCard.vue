<template>
  <article class="product-card">
    <router-link 
      :to="`/product/${product.id}`"
      class="card-link"
    >
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
    </router-link>
    <button 
      class="add-to-cart-btn" 
      @click="addToCart"
      :disabled="!product.available"
      :aria-label="`Agregar ${product.name} al carrito`"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 2L7 7H2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7h-5l-2-5H9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M9 11v6M15 11v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'add-to-cart': [product: Product]
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

function addToCart() {
  if (props.product.available) {
    emit('add-to-cart', props.product)
    console.log('Added to cart:', props.product.name)
  }
}
</script>

<style scoped lang="scss">
.product-card {
  display: inline-block;
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  overflow: visible;
  position: relative;
  break-inside: avoid;
  page-break-inside: avoid;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover, &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  &:focus {
    outline: 2px solid #c67b5c;
    outline-offset: 2px;
  }
}

.product-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f0ebe6;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
}

.badge-unavailable {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.product-info {
  padding: 0.75rem;
  padding-bottom: 0.5rem;
}

.product-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.375rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 1rem;
  font-weight: 700;
  color: #c67b5c;
  margin: 0 0 0.5rem;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-indicator {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #e0d8cc;
  flex-shrink: 0;
}

.sizes {
  font-size: 0.75rem;
  color: #7c6a5b;
}

.add-to-cart-btn {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #c67b5c;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(198, 123, 92, 0.3);
  
  &:hover:not(:disabled) {
    background: #b56a4d;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(198, 123, 92, 0.4);
  }
  
  &:focus {
    outline: 2px solid #c67b5c;
    outline-offset: 2px;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: none;
  }
  
  svg {
    flex-shrink: 0;
  }
}
</style>
