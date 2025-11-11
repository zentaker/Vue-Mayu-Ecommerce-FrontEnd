<template>
  <div>
    <!-- Floating Cart Button -->
    <button 
      class="floating-cart-btn" 
      @click="cartStore.toggleCart()"
      :class="{ 'has-items': cartStore.totalItems > 0 }"
      aria-label="Ver carrito de compras"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
    </button>

    <!-- Cart Drawer -->
    <Transition name="cart-overlay">
      <div v-if="cartStore.isOpen" class="cart-overlay" @click="cartStore.toggleCart()"></div>
    </Transition>

    <Transition name="cart-drawer">
      <aside v-if="cartStore.isOpen" class="cart-drawer">
        <div class="cart-header">
          <h2>Carrito</h2>
          <button 
            class="close-btn" 
            @click="cartStore.toggleCart()"
            aria-label="Cerrar carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div v-if="cartStore.items.length === 0" class="cart-empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p>Tu carrito está vacío</p>
        </div>

        <div v-else class="cart-items">
          <div 
            v-for="item in cartStore.items" 
            :key="`${item.product.id}-${item.selectedSize}`" 
            class="cart-item"
          >
            <img :src="item.product.image" :alt="item.product.name" class="cart-item-image" />
            <div class="cart-item-details">
              <h3 class="cart-item-name">{{ item.product.name }}</h3>
              <p v-if="item.selectedSize" class="cart-item-size">Talla: {{ item.selectedSize }}</p>
              <p class="cart-item-price">${{ item.product.price.toFixed(2) }}</p>
            </div>
            <div class="cart-item-controls">
              <button 
                class="qty-btn" 
                @click="cartStore.updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)"
                aria-label="Disminuir cantidad"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <span class="qty-display">{{ item.quantity }}</span>
              <button 
                class="qty-btn" 
                @click="cartStore.updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)"
                aria-label="Aumentar cantidad"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="cartStore.items.length > 0" class="cart-footer">
          <div class="cart-total">
            <span class="total-label">Total:</span>
            <span class="total-amount">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <button class="checkout-btn">
            Proceder al Pago
          </button>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped lang="scss">
.floating-cart-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #c67b5c;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(198, 123, 92, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;

  &:hover {
    background: #b56a4d;
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(198, 123, 92, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  &.has-items {
    animation: pulse 2s infinite;
  }
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #d9534f;
  color: white;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0 6px;
  border: 2px solid white;
  animation: badge-pop 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(198, 123, 92, 0.4);
  }
  50% {
    box-shadow: 0 4px 20px rgba(198, 123, 92, 0.6);
  }
}

@keyframes badge-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.cart-overlay-enter-active,
.cart-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.cart-overlay-enter-from,
.cart-overlay-leave-to {
  opacity: 0;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: #faf8f5;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
}

.cart-drawer-enter-active,
.cart-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-drawer-enter-from,
.cart-drawer-leave-to {
  transform: translateX(100%);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e0d8cc;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.close-btn {
  background: none;
  border: none;
  color: #7c6a5b;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #4a4238;
  }
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #7c6a5b;
  padding: 2rem;

  svg {
    margin-bottom: 1rem;
    opacity: 0.3;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #e0d8cc;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.cart-item-details {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.25rem;
}

.cart-item-size {
  font-size: 0.8125rem;
  color: #7c6a5b;
  margin: 0 0 0.5rem;
}

.cart-item-price {
  font-size: 1rem;
  font-weight: 700;
  color: #c67b5c;
  margin: 0;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  background: #f0ebe6;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4a4238;
  transition: background 0.2s;

  &:hover {
    background: #e0d8cc;
  }
}

.qty-display {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  min-width: 24px;
  text-align: center;
}

.cart-footer {
  border-top: 1px solid #e0d8cc;
  padding: 1.5rem;
  background: white;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.total-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a4238;
}

.total-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #c67b5c;
}

.checkout-btn {
  width: 100%;
  background: #c67b5c;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #b56a4d;
  }

  &:active {
    transform: scale(0.98);
  }
}

@media (max-width: 480px) {
  .cart-drawer {
    max-width: 100%;
  }
}
</style>
