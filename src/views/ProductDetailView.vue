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

    <!-- Reviews Section -->
    <div v-if="product && product.reviews && product.reviews.length > 0" class="reviews-section">
      <div class="reviews-header">
        <h2>Valoraciones de Clientes</h2>
        <div class="rating-summary">
          <div class="rating-number">{{ product.rating?.toFixed(1) }}</div>
          <div class="rating-details">
            <div class="stars-display">
              <svg v-for="star in 5" :key="star" class="star" :class="{ filled: star <= Math.round(product.rating || 0) }" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="review-count">{{ product.reviewCount }} valoraciones</p>
          </div>
        </div>
      </div>

      <div class="reviews-list">
        <article v-for="review in product.reviews" :key="review.id" class="review-card">
          <div class="review-header">
            <img :src="review.userAvatar" :alt="review.userName" class="reviewer-avatar" />
            <div class="reviewer-info">
              <h4 class="reviewer-name">{{ review.userName }}</h4>
              <div class="review-meta">
                <div class="review-stars">
                  <svg v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.rating }" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span class="review-date">{{ formatDate(review.date) }}</span>
              </div>
            </div>
          </div>
          <p class="review-comment">{{ review.comment }}</p>
          <div v-if="review.images && review.images.length > 0" class="review-images">
            <img v-for="(image, idx) in review.images" :key="idx" :src="image" alt="Foto del producto" class="review-image" @click="openReviewImage(image)" />
          </div>
        </article>
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
        <img :src="reviewModalImage || currentImage" :alt="product?.name" class="modal-image" @click.stop />
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
  reviewModalImage.value = null
  imageModalOpen.value = true
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

const reviewModalImage = ref<string | null>(null)

function openReviewImage(imageUrl: string) {
  reviewModalImage.value = imageUrl
  imageModalOpen.value = true
}

function closeImageModal() {
  imageModalOpen.value = false
  reviewModalImage.value = null
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
  height: fit-content;
  
  @media (min-width: 1024px) {
    position: sticky;
    top: 80px;
    max-height: calc(100vh - 120px);
  }
}

.main-image-wrapper {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: zoom-in;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  max-width: 100%;
  max-height: clamp(360px, 70vh, 550px);
  object-fit: contain;
  transition: transform 0.3s;
  display: block;

  @media (max-width: 767px) {
    max-height: clamp(300px, 60vh, 450px);
  }

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

.reviews-section {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 0 1rem 3rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem 4rem;
  }
}

.reviews-header {
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 1.5rem;
  }
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #fff5f0;
  border-radius: 12px;
}

.rating-number {
  font-size: 3rem;
  font-weight: 700;
  color: #c67b5c;
  line-height: 1;
}

.rating-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stars-display {
  display: flex;
  gap: 0.25rem;
  
  .star {
    color: #e0d8cc;
    
    &.filled {
      color: #f59e0b;
    }
  }
}

.review-count {
  font-size: 0.875rem;
  color: #7c6a5b;
  margin: 0;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.review-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e0d8cc;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.review-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.reviewer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.reviewer-info {
  flex: 1;
  min-width: 0;
}

.reviewer-name {
  font-size: 1rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.5rem;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.review-stars {
  display: flex;
  gap: 0.125rem;
  
  .star {
    color: #e0d8cc;
    
    &.filled {
      color: #f59e0b;
    }
  }
}

.review-date {
  font-size: 0.875rem;
  color: #7c6a5b;
}

.review-comment {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #4a4238;
  margin: 0 0 1rem;
}

.review-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

.review-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
</style>
