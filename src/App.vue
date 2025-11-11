<template>
  <div id="app">
    <HeaderBar @toggle-menu="menuOpen = !menuOpen" />
    <OffCanvasMenu :isOpen="menuOpen" @close="menuOpen = false" />
    <main class="main-content">
      <router-view />
    </main>
    <FloatingCart />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import OffCanvasMenu from '@/components/OffCanvasMenu.vue'
import FloatingCart from '@/components/FloatingCart.vue'
import { useAuthStore } from '@/stores/authStore'

const menuOpen = ref(false)
const authStore = useAuthStore()

onMounted(async () => {
  // Initialize auth (will gracefully fail if Firebase is not configured)
  try {
    await authStore.initializeAuth()
  } catch (error) {
    console.log('Auth initialization skipped - Firebase not configured')
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 60px;
}
</style>
