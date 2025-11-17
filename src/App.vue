<template>
  <div id="app">
    <HeaderBar 
      @toggle-menu="menuOpen = !menuOpen" 
      :activeTab="activeTab"
      :tabs="tabs"
      @tab-change="handleTabChange"
    />
    <OffCanvasMenu :isOpen="menuOpen" @close="menuOpen = false" />
    <main class="main-content">
      <router-view />
    </main>
    <FloatingCart />
    <FloatingUpload />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import OffCanvasMenu from '@/components/OffCanvasMenu.vue'
import FloatingCart from '@/components/FloatingCart.vue'
import FloatingUpload from '@/components/FloatingUpload.vue'
import { useAuthStore } from '@/stores/authStore'

const menuOpen = ref(false)
const authStore = useAuthStore()

// Tabs state for Home page
const activeTab = ref('discover')
const tabs = ref([
  { id: 'following', label: 'Seguir', badge: 8 },
  { id: 'discover', label: 'Descubrir', badge: null },
  { id: 'nearby', label: 'Cerca', badge: null }
])

function handleTabChange(tabId: string) {
  activeTab.value = tabId
}

// Provide activeTab to all child components
provide('activeTab', activeTab)

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
  padding-top: 65px;
}
</style>
