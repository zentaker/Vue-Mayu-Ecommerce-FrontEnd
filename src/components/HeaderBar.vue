<template>
  <header class="header-bar">
    <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    
    <!-- Tabs en Home, Logo en otras páginas -->
    <div v-if="isHomeView" class="header-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="emit('tab-change', tab.id)"
      >
        {{ tab.label }}
        <span v-if="tab.id === 'following' && tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    <div v-else class="logo">
      <router-link to="/">Apricot Outfits</router-link>
    </div>
    
    <div class="header-actions">
      <router-link v-if="isAccountView" to="/settings" class="icon-btn" aria-label="Ajustes">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M12 1v6m0 6v6m6-11h-6m6 6h-6M7 7l4 4m2 2l4 4M7 17l4-4m2-2l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </router-link>
      <button v-else class="icon-btn" aria-label="Search">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="5" stroke="currentColor" stroke-width="2"/>
          <path d="M13 13L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <router-link v-if="authStore.isAdmin && !isAccountView" to="/admin" class="icon-btn" aria-label="Administración">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M12 1v6m0 6v6m6-11h-6m6 6h-6M7 7l4 4m2 2l4 4M7 17l4-4m2-2l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()

const isHomeView = computed(() => route.path === '/')
const isAccountView = computed(() => route.path === '/account')

const props = defineProps<{
  activeTab?: string
  tabs?: Array<{ id: string; label: string; badge?: number | null }>
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
  (e: 'tab-change', tabId: string): void
}>()

function toggleMenu() {
  emit('toggle-menu')
}
</script>

<style scoped lang="scss">
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #f0ebe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 100;
}

.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #4a4238;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: #c67b5c;
  
  a {
    color: inherit;
    text-decoration: none;
  }
}

.header-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex: 1;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
}

.tab-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 0.9375rem;
  font-weight: 400;
  color: #7c6a5b;
  cursor: pointer;
  padding: 0.5rem 0.25rem;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  
  &:hover {
    color: #4a4238;
  }
  
  &.active {
    color: #4a4238;
    font-weight: 500;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1.125rem;
      left: 0;
      right: 0;
      height: 2px;
      background: #4a4238;
    }
  }
}

.tab-badge {
  background: #c67b5c;
  color: white;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #4a4238;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #c67b5c;
  }
}
</style>
