import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  })

  function addToCart(product: Product, size?: string) {
    const existingItem = items.value.find(
      item => item.product.id === product.id && item.selectedSize === size
    )

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        product,
        quantity: 1,
        selectedSize: size
      })
    }

    console.log('Added to cart:', product.name)
  }

  function removeFromCart(productId: string, size?: string) {
    const index = items.value.findIndex(
      item => item.product.id === productId && item.selectedSize === size
    )
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: string, quantity: number, size?: string) {
    const item = items.value.find(
      item => item.product.id === productId && item.selectedSize === size
    )
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId, size)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }
})
