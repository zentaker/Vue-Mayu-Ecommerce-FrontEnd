<template>
  <div class="product-detail">
    <button class="back-btn" @click="router.back()" aria-label="Volver">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
      </svg>
    </button>

    <div v-if="product" class="product-content">
      <!-- Image Gallery -->
      <div class="image-gallery">
        <div class="main-image-wrapper">
          <img 
            :src="currentImage" 
            :alt="product.name" 
            class="main-image"
            @click="openImageModal"
          />
        </div>
        <div v-if="product.imageUrl2" class="thumbnail-list">
          <button 
            class="thumbnail" 
            :class="{ active: currentImage === product.imageUrl }"
            @click="currentImage = product.imageUrl"
          >
            <img :src="product.imageUrl" :alt="`${product.name} - vista 1`" />
          </button>
          <button 
            class="thumbnail"
            :class="{ active: currentImage === product.imageUrl2 }"
            @click="currentImage = product.imageUrl2"
          >
            <img :src="product.imageUrl2" :alt="`${product.name} - vista 2`" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">${{ product.price.toFixed(2) }}</p>
        
        <div v-if="product.description" class="product-description">
          <p>{{ product.description }}</p>
        </div>

        <!-- Size Selector -->
        <div class="size-selector">
          <label class="selector-label">Talla</label>
          <div class="size-options">
            <button 
              v-for="size in product.size" 
              :key="size"
              class="size-btn"
              :class="{ selected: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Availability -->
        <div class="availability">
          <span v-if="product.available" class="in-stock">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            En stock
          </span>
          <span v-else class="out-of-stock">Agotado</span>
        </div>

        <!-- Add to Cart Button -->
        <button 
          class="add-to-cart-btn"
          :disabled="!product.available || !selectedSize"
          @click="handleAddToCart"
        >
          {{ selectedSize ? 'Agregar al Carrito' : 'Selecciona una talla' }}
        </button>

        <!-- Product Details -->
        <div class="product-details">
          <h3>Detalles del Producto</h3>
          <dl>
            <dt>Categoría</dt>
            <dd>{{ getCategoryName(product.category) }}</dd>
            <dt>Color</dt>
            <dd>{{ getColorName(product.color) }}</dd>
            <dt>Tallas Disponibles</dt>
            <dd>{{ product.size.join(', ') }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="modal">
      <div v-if="imageModalOpen" class="image-modal" @click="closeImageModal">
        <button class="close-modal-btn" @click="closeImageModal" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <img :src="currentImage" :alt="product?.name" class="modal-image" @click.stop />
      </div>
    </Transition>

    <!-- Success Toast -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Agregado al carrito
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalogStore'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()
const cartStore = useCartStore()

const selectedSize = ref<string>('')
const currentImage = ref<string>('')
const imageModalOpen = ref(false)
const showToast = ref(false)

const product = computed(() => {
  return catalogStore.products.find(p => p.id === route.params.id)
})

onMounted(() => {
  if (product.value) {
    currentImage.value = product.value.imageUrl
  } else {
    // Product not found, redirect to catalog
    router.push('/catalog')
  }
})

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    tops: 'Blusas y Tops',
    bottoms: 'Pantalones y Faldas',
    dresses: 'Vestidos',
    outerwear: 'Abrigos y Cardigans'
  }
  return names[category] || category
}

function getColorName(color: string): string {
  const names: Record<string, string> = {
    terracota: 'Terracota',
    beige: 'Beige',
    cream: 'Crema',
    brown: 'Marrón',
    white: 'Blanco',
    olive: 'Oliva',
    navy: 'Azul Marino'
  }
  return names[color] || color
}

function handleAddToCart() {
  if (product.value && selectedSize.value) {
    cartStore.addToCart(product.value, selectedSize.value)
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  }
}

function openImageModal() {
  imageModalOpen.value = true
}

function closeImageModal() {
  imageModalOpen.value = false
}
</script>

<style scoped lang="scss">
.product-detail {
  min-height: calc(100vh - 60px);
  background: #faf8f5;
}

.back-btn {
  position: fixed;
  top: 70px;
  left: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e0d8cc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4a4238;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: #f0ebe6;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.product-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    padding: 2rem;
  }
}

.image-gallery {
  position: sticky;
  top: 80px;
  height: fit-content;
}

.main-image-wrapper {
  aspect-ratio: 3/4;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
}

.thumbnail-list {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.thumbnail {
  width: 80px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  padding: 0;

  &:hover {
    border-color: #e0d8cc;
  }

  &.active {
    border-color: #c67b5c;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-info {
  padding-top: 1rem;

  @media (min-width: 768px) {
    padding-top: 0;
  }
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: #4a4238;
  margin: 0 0 1rem;
}

.product-price {
  font-size: 2rem;
  font-weight: 700;
  color: #c67b5c;
  margin: 0 0 1.5rem;
}

.product-description {
  padding: 1.5rem 0;
  border-top: 1px solid #e0d8cc;
  border-bottom: 1px solid #e0d8cc;
  margin-bottom: 1.5rem;

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #7c6a5b;
    margin: 0;
  }
}

.size-selector {
  margin-bottom: 1.5rem;
}

.selector-label {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  margin-bottom: 0.75rem;
}

.size-options {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.size-btn {
  min-width: 60px;
  padding: 0.75rem 1rem;
  border: 2px solid #e0d8cc;
  background: white;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #c67b5c;
  }

  &.selected {
    background: #c67b5c;
    border-color: #c67b5c;
    color: white;
  }
}

.availability {
  margin-bottom: 1.5rem;
}

.in-stock {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #28a745;
  font-size: 0.9375rem;
  font-weight: 600;

  svg {
    flex-shrink: 0;
  }
}

.out-of-stock {
  color: #dc3545;
  font-size: 0.9375rem;
  font-weight: 600;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  background: #c67b5c;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 2rem;

  &:hover:not(:disabled) {
    background: #b56a4d;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(198, 123, 92, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #e0d8cc;
    color: #7c6a5b;
    cursor: not-allowed;
  }
}

.product-details {
  padding: 1.5rem 0;
  border-top: 1px solid #e0d8cc;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 1rem;
  }

  dl {
    margin: 0;
  }

  dt {
    font-size: 0.875rem;
    font-weight: 600;
    color: #7c6a5b;
    margin: 0 0 0.25rem;
  }

  dd {
    font-size: 1rem;
    color: #4a4238;
    margin: 0 0 1rem;
  }
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.close-modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.toast {
  position: fixed;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  background: #28a745;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1500;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
