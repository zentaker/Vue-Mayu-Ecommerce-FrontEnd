import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type UserProfile } from '@/firebase/auth.service'
import type { UserRole } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => currentUser.value !== null)
  
  // Role computed properties
  const isSuperadmin = computed(() => currentUser.value?.role === 'superadmin')
  const isAdmin = computed(() => 
    currentUser.value?.role === 'admin' || isSuperadmin.value
  )
  const isStaff = computed(() => 
    currentUser.value?.role === 'staff' || isSuperadmin.value
  )
  
  // Helper function to check if user has any of the required roles
  function hasRole(requiredRoles: UserRole | UserRole[]): boolean {
    if (!currentUser.value) return false
    
    // Superadmin has access to everything
    if (currentUser.value.role === 'superadmin') return true
    
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
    return roles.includes(currentUser.value.role)
  }

  async function signIn(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    
    try {
      currentUser.value = await authService.signIn(email, password)
      return true
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión'
      return false
    } finally {
      loading.value = false
    }
  }

  async function signOut(): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      await authService.signOut()
      currentUser.value = null
    } catch (err: any) {
      error.value = err.message || 'Error al cerrar sesión'
    } finally {
      loading.value = false
    }
  }

  async function initializeAuth(): Promise<void> {
    return new Promise((resolve) => {
      authService.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            currentUser.value = await authService.getUserProfile(user.uid)
          } catch (err) {
            console.error('Error loading user profile:', err)
            currentUser.value = null
          }
        } else {
          currentUser.value = null
        }
        resolve()
      })
    })
  }

  function clearError() {
    error.value = null
  }

  return {
    currentUser,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isStaff,
    isSuperadmin,
    hasRole,
    signIn,
    signOut,
    initializeAuth,
    clearError
  }
})
