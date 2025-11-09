import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>({
    id: '1',
    name: 'María García',
    email: 'maria@example.com',
    vipLevel: 'gold',
    points: 2450,
    address: {
      street: 'Calle Principal 123',
      city: 'Madrid',
      zipCode: '28001',
      country: 'España'
    },
    preferences: {
      notifications: true,
      newsletter: true
    }
  })

  const isAuthenticated = ref(true)

  function login(email: string, password: string) {
    isAuthenticated.value = true
  }

  function logout() {
    isAuthenticated.value = false
    currentUser.value = null
  }

  function updatePreferences(prefs: Partial<User['preferences']>) {
    if (currentUser.value) {
      currentUser.value.preferences = { ...currentUser.value.preferences, ...prefs }
    }
  }

  function updateAddress(address: User['address']) {
    if (currentUser.value) {
      currentUser.value.address = address
    }
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    updatePreferences,
    updateAddress
  }
})
